import { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { SearchHistoryContext } from '../provider/SearchHistoryContext';

const MapComponent = ({ initialCenter }) => {

  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(initialCenter);
  const { addSearchHistory } = useContext(SearchHistoryContext);
  const [placePhotoUrl, setPlacePhotoUrl] = useState('');
  useEffect(()=>{
    setCenter(initialCenter);
  },[initialCenter])
  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting geolocation", error);
            alert("Error getting geolocation: " + error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
    getLocation();
  }, []);
  
  const initializeMap = () => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 15,
    });
    setMap(mapInstance);

    const input = searchInputRef.current;
    const searchBox = new window.google.maps.places.SearchBox(input);

    mapInstance.addListener('bounds_changed', () => {
      searchBox.setBounds(mapInstance.getBounds());
    });

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) return;

        addSearchHistory(place);

        if (place.photos && place.photos.length > 0) {
          setPlacePhotoUrl(place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 }));
        } else {
          setPlacePhotoUrl('');
        }

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      mapInstance.fitBounds(bounds);
    });
  };

  useEffect(() => {
    if (!window.google) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_MAP_API_KEY}&libraries=places`)
        .then(() => {
          initializeMap();
        })
        .catch((error) => {
          console.error('Error loading Google Maps script:', error);
          alert('Error loading Google Maps script: ' + error.message);
        });
    } else {
      initializeMap();
    }
  }, [center]);

return (
  <div className='flex flex-col items-center w-full'>
    <input
      type="text"
      ref={searchInputRef}
      placeholder="Search for a place"
      className="mb-4 w-full max-w-sm border border-gray-300 rounded"
    />
    <div ref={mapRef} className="w-full h-64 sm:h-56 md:h-56 lg:h-96 mb-4" />
    {/* {placePhotoUrl && (
      <img
        src={placePhotoUrl}
        alt="Place Photo"
        className="max-w-sm mb-4"
      />
    )} */}
  </div>
);
};

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export default MapComponent;