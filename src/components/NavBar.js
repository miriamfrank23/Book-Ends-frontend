import React from 'react'
import Books from '../images/books.svg'



const NavBar = ({ captureInput, currentBookId, noBookSelected, searchInput, currentUser, showLoginPage, logOut, showUserProfile, backToIndex, showingUserProfile }) => {


  const displayNavBar = () => {

    if (currentBookId) {
      return <div className='navBar'>
      <div id='logo' onClick={noBookSelected}>
        <div>
          Book
        </div>
        <img alt='' src={Books}
        id='logoBook'/>
        <div>
         Ends
        </div>
      </div>
      <button
      onClick={noBookSelected}>
        Back to browse
      </button>
      <div id='profileButtons'>
        <h2>
          {`Welcome ${currentUser.first_name}!`}
        </h2>
        <button onClick={() => {
          showUserProfile()
          noBookSelected()
        }}>
          View my profile
        </button>
      </div>
      </div>
    } else if (showingUserProfile) {
      return <div className='navBar'>
      <div id='logo' onClick={backToIndex}>
        <div>
          Book
        </div>
        <img alt='' src={Books}
        id='logoBook'/>
        <div>
         Ends
        </div>
      </div>
      <button id='navBarButton'
      onClick={backToIndex}>
        Back to browse
      </button>
      </div>
    } else if (currentUser && !currentBookId && !showingUserProfile) {
      return <div className='navBar'>
      <div id='logo'>
        <div>
          Book
        </div>
        <img alt='' src={Books}
        id='logoBook'/>
        <div>
         Ends
        </div>
      </div>
        <div className='profileIcon'>
          <h2>
          {`Welcome ${currentUser.first_name}!`}
          </h2>
          <div id='profileButtons'>
            <button onClick={showUserProfile}>
              View my profile
            </button>
            <button onClick={logOut}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    }
  }


    return (
      <div>



        {displayNavBar()}
      </div>
    )

}

export default NavBar
