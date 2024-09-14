import React, { useState } from 'react';

function Search({ facilities, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const results = facilities.filter(facility =>
      facility.name.toLowerCase().includes(query.toLowerCase())
    );
    onSearch(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a facility..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
