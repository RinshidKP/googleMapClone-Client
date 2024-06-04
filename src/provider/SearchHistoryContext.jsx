import React, { createContext, useState } from 'react';

const SearchHistoryContext = createContext();

const SearchHistoryProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState(() => {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  });

  const addSearchHistory = (place) => {
    setSearchHistory((prevHistory) => {
      const newHistory = [place, ...prevHistory.filter(item => item.place_id !== place.place_id)];
      const limitedHistory = newHistory.slice(0, 6);
      localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
      return limitedHistory;
    });
  };

  const removeSearchHistoryItem = (placeId) => {
    setSearchHistory((prevHistory) => {
      const newHistory = prevHistory.filter(item => item.place_id !== placeId);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, addSearchHistory, removeSearchHistoryItem }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export { SearchHistoryContext, SearchHistoryProvider };
