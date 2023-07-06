import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'src/components/Header';
import searchBanner from 'src/assets/images/main5.png';
import './style.scss';

const SearchBar = () => {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/Search?q=${query}`);
  };
  return (
    <form onSubmit={handleSearch} className="search-bar">
      <img src={searchBanner} alt="nature" className="search-bar__img" />
      <Header />
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="search-bar__search-box"
        placeholder="جست‌وجو برای مقصد..."
      />
    </form>
  );
};

export default SearchBar;
