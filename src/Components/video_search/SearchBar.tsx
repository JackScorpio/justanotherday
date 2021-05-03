import React, { useState } from "react";

function SearchBar({ onFormSubmit }: any) {
  const [term, setTerm] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    onFormSubmit(term);
  };
  return (
    <div className='search-bar ui segment'>
      <form onSubmit={onSubmit} className='ui form'>
        <div className='field'>
          <label>Video Search</label>
          <input
            type='text'
            value={term}
            onChange={(e: any) => setTerm(e.target.value)}
            placeholder='Search Videos Here..'
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
