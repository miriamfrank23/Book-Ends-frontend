import React from 'react'


const SearchBar = ({ captureInput }) => {


    return (
      <p>
        <input onChange={(e) => captureInput(e.target.value)}
        placeholder='Search for books here'/>
      </p>
    )

}

export default SearchBar
