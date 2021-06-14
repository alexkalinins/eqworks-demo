import React from "react";

/**
 * The search bar component. searchString is the current search string, setSearchString
 * is function that is called when the searchString changes (it is passed to the function),
 * size is the maximum width of the search bar.
 * @returns 
 */
export default function SearchBar({ searchString, setSearchString, size }) {
  return (
    <div className="search-bar" style={{maxWidth:size}} >
      <form>
        <label>
        &#x1F50D; {"  "}
          <input
            type="text"
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
            autoFocus={true}
          />
        </label>
      </form>
    </div>
  );
}
