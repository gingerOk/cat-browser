import React from 'react';
import './SearchForm.scss';
const SearchForm = ({ value, changeValue, placeholder }) => {
  return (
    <div className="search-form-wrapper">
      <input
        className="search-form-input"
        value={value}
        onChange={changeValue}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default SearchForm;
