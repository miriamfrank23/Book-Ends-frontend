import React from 'react'
import SearchBar from './SearchBar'

const NavBar = ({ captureInput }) => {


    return (
      <div>
      <SearchBar
        captureInput={captureInput}
      />
      </div>
    )

}

export default NavBar
