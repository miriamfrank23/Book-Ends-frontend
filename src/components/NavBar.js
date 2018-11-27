import React from 'react'
import SearchBar from './SearchBar'

// {*<img src='https://vignette.wikia.nocookie.net/harrypotter/images/d/d4/LibraryPottermore.png/revision/latest?cb=20160530005252' className="App-logo" alt="logo" />
// *}
const NavBar = ({ captureInput, currentBookId, noBookSelected, searchInput }) => {


    return (
      <div className='navBar'>
      <h1 id='logo'>
        Bookz 
      </h1>
        {currentBookId ?
          <button id='navBarButton'
          onClick={noBookSelected}>
            Back to browse books
          </button> :
          <SearchBar
            captureInput={captureInput}
            searchInput={searchInput}
          />
        }
        <div className='profileIcon'>
          <img src={'https://avatars2.githubusercontent.com/u/16786985?s=460&v=4'}
          className='profileImage' alt=''/>
          View my profile
        </div>
      </div>
    )

}

export default NavBar
