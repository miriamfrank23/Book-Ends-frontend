import React from 'react'


const SearchBar = ({ captureInput, searchInput }) => {


    return (
      <p id='searchBar'>
        <input onChange={(e) => captureInput(e.target.value)}
        placeholder='Search for books here'
        value={searchInput}/>
      </p>
    )

}

export default SearchBar
