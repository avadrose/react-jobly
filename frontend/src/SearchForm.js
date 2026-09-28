import React, { useState } from "react";

function SearchForm({ search, placeholder = "Search..." }) {
  const [term, setTerm] = useState("");

  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    search(term.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={handleChange}
        placeholder={placeholder}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;