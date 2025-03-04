import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div className='search-bar'>
      <input
        className='search-input'
        type='text'
        placeholder='Search Movie'
        name='search'
        value={searchTerm}
        onChange={onSearch}
      />
      
    </div>
  );
};

export default SearchBar;