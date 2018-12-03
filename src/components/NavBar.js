import React from 'react'
import SearchBar from './SearchBar'


const NavBar = ({ captureInput, currentBookId, noBookSelected, searchInput, currentUser, showLoginPage, logOut, showUserProfile }) => {

// debugger

    return (
      <div className='navBar'>
      <div id='logo'>
        <i className='fas fa-book-open'></i>
        Book Ends
      </div>
        {currentBookId ?
          <button id='navBarButton'
          onClick={noBookSelected}>
            Back to browse
          </button> :
          <SearchBar
            captureInput={captureInput}
            searchInput={searchInput}
          />
        }
        {currentUser ? <div className='profileIcon'>
          <h3>
          {`Welcome ${currentUser.first_name}!`}
          </h3>
          <div id='profileButtons'>
            <button onClick={showUserProfile}>
              View my profile
            </button>
            <button onClick={logOut}>
              Sign out
            </button>
          </div>
        </div>
        :
        <div onClick={showLoginPage}>
          Sign in
        </div>}
      </div>
    )

    // <img src={'https://avatars2.githubusercontent.com/u/16786985?s=460&v=4'}
    // className='profileImage' alt=''/>
}

export default NavBar
