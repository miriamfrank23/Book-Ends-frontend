import React from 'react'
import SearchBar from './SearchBar'

const NavBar = ({ captureInput, currentBookId, noBookSelected }) => {


    return (
      <div className='navBar'>
        <img src='https://vignette.wikia.nocookie.net/harrypotter/images/d/d4/LibraryPottermore.png/revision/latest?cb=20160530005252' className="App-logo" alt="logo" />
        {currentBookId ?
          <button id='navBarButton'
          onClick={noBookSelected}>
            Back to browse books
          </button> :
          <SearchBar
            captureInput={captureInput}
          />
        }
        <div className='profileIcon'>
          <img src={'https://avatars2.githubusercontent.com/u/16786985?s=460&v=4'}
          className='profileImage'/>
          View my profile
        </div>
      </div>
    )

}

export default NavBar
