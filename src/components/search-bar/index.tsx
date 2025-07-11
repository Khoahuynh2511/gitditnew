import React, { useState, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import './styles.css';

const SearchBar: React.FC = () => {
  const { searchQuery, updateSearchQuery, clearSearch } = useAppContext();
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = useCallback((value: string) => {
    setInputValue(value);
    updateSearchQuery(value.trim());
  }, [updateSearchQuery]);

  const handleClear = useCallback(() => {
    setInputValue('');
    clearSearch();
  }, [clearSearch]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <i className="fa fa-search search-icon"></i>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onBlur={() => handleSearch(inputValue)}
          placeholder="Tìm kiếm repositories..."
          className="form-control search-input"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
            title="Xóa tìm kiếm"
          >
            <i className="fa fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 