import React from 'react'
import SearchBar from './SearchBar'


const NavBar = ({ captureInput, currentBookId, noBookSelected, searchInput, currentUser, showLoginPage, logOut, showUserProfile }) => {


    return (
      <div className='navBar'>

      <div id='logo'>
        <img alt='' src='http://animalcare.umich.edu/sites/default/files/acu-cont-ed-icon_0.png'
        id='logoBook'/>
        <div>
          Book Ends
        </div>
      </div>
        {currentBookId ?
            <button id='navBarButton'
            onClick={noBookSelected}>
              Back to browse
            </button>
           :
          <SearchBar
            captureInput={captureInput}
            searchInput={searchInput}
          />
        }
        {currentUser && !currentBookId ? <div className='profileIcon'>
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
        <div id='profileButtons'>
          <h3>
            {`Welcome ${currentUser.first_name}!`}
          </h3>
          <button onClick={() => {
            showUserProfile()
            noBookSelected()
          }}>
            View my profile
          </button>
        </div>}
      </div>
    )

    // <img src={'https://avatars2.githubusercontent.com/u/16786985?s=460&v=4'}
    // className='profileImage' alt=''/>
}

export default NavBar
