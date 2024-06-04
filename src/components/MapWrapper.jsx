import React, { useEffect, useState } from 'react'
import { SearchHistoryProvider } from '../provider/SearchHistoryContext';
import SearchHistory from './SearchHistory';
import MapComponent from './MapComponent';
import { useSelector } from 'react-redux';
import Header from './Header';

const MapWrapper = () => {
  const { DisplayName } = useSelector((state) => state.User);
  const [center, setCenter] = useState({ lat: 11.258753, lng: 75.78041 });

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
              console.error('Error getting geolocation', error);
              alert('Error getting geolocation: ' + error.message);
            }
          );
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      }
      getLocation();
    }, []);

    const onHistoryItemClick = (place) => {
      console.log(center)
      console.log({lat:place.geometry.location.lat,lng: place.geometry.location.lng})
      if (place.geometry && place.geometry.location) {
        setCenter({lat:place.geometry.location.lat,lng: place.geometry.location.lng});
      } else {
        console.error("Invalid place object or missing geometry/location data.");
      }
    };
  
    return (
      <SearchHistoryProvider>
      <div className="homeBackground flex flex-col h-screen w-screen">
          <Header/>
        <div className="flex flex-1 w-full">
          <div className="w-1/5 p-4 overflow-auto">
            <SearchHistory onHistoryItemClick={onHistoryItemClick} />
          </div>
          <div className="w-4/5 flex flex-col items-center justify-center">
            <div className="w-5/6 h-auto">
              <MapComponent initialCenter={center} />
            </div>
          </div>
        </div>
      </div>
    </SearchHistoryProvider>
    );
}

export default MapWrapper
