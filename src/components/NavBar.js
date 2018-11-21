import React from 'react'
import SearchBar from './SearchBar'

const NavBar = ({ captureInput }) => {


    return (
      <div className='navBar'>
        <img src='http://www.tolkienlibrary.com/press/images/deluxe-pocket-boxed-set2.jpg' className="App-logo" alt="logo" />
        <br/>
        <SearchBar
          captureInput={captureInput}
        />

      </div>
    )

}

export default NavBar
