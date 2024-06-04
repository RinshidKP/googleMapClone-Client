import React, { useContext } from 'react';
import { SearchHistoryContext } from '../provider/SearchHistoryContext';

const SearchHistory = ({ onHistoryItemClick }) => {
  const { searchHistory, removeSearchHistoryItem } = useContext(SearchHistoryContext);

  return (
    <div className="mx-auto max-w-full p-4">
      <h3 className="text-xl font-bold mb-4 text-gray-200 md:text-sm">Recent Searches</h3>
      <ul className="space-y-2">
        {searchHistory.map((place) => (
          <li key={place.place_id} className="flex justify-between items-center text-gray-200">
            <span
              onClick={() => onHistoryItemClick(place)}
              className="cursor-pointer truncate"
            >
              {place.name}
            </span>
            <button
              onClick={() => removeSearchHistoryItem(place.place_id)}
              className="ml-2 text-red-500"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
