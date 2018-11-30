import React from 'react'
import SearchBar from './SearchBar'


const NavBar = ({ captureInput, currentBookId, noBookSelected, searchInput, currentUser, showLoginPage, logOut, showUserProfile }) => {


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
        {currentUser ? <div className='profileIcon'>
          <img src={'https://avatars2.githubusercontent.com/u/16786985?s=460&v=4'}
          className='profileImage' alt=''/>
          <button onClick={showUserProfile}>
            View my profile
          </button>
          <button onClick={logOut}>
          Sign out
          </button>
        </div>
        :
        <div onClick={showLoginPage}>
        Sign in
        </div>}
      </div>
    )

}

export default NavBar
