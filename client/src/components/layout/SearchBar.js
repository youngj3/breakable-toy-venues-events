import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <input onClick={handleSearch} className='button' type='button' value='Search'/>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar