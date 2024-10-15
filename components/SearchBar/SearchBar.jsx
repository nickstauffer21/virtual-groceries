import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div>
      <form className="groceries-form" onSubmit={handleSearch}>
        <input
          className="groceries-search-bar"
          value={query}
          onChange={handleInputChange}
          type="search"
          name="searchbar"
          placeholder="Search for products"
        />
        <button type="submit" onClick={handleSearch}>
          {" "}
          Search{" "}
        </button>
      </form>
    </div>
  );
}
