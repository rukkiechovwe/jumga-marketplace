import React, { useState, useEffect } from "react";

const searches = ["store1", "store2", "item1", "item2", "product1", "product2"];

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const results = searches.filter((item) =>
      item.toLowerCase().includes(searchTerm)
    );
    setSearchResult(results);
  }, [searchTerm]);
  // it's in the homepage already na, be whining me ohhhh, that's the marketplace
  //
  return (
    <div>
      <input
        type="search"
        name="search"
        placeholder="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-24"
      />
      <ul className="text-black">
        {searchTerm.length !== 0 ? (
          searchResult.length === 0 ? (
            <span>No result found for "{searchTerm}"</span>
          ) : (
            searchResult.map((result) => <li>{result}</li>)
          )
        ) : (
          <div />
        )}
      </ul>
    </div>
  );
}

export default SearchBox;
