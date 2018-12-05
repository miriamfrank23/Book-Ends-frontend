import React, { Component } from 'react'
import './App.css'
import BooksBody from './components/BooksBody'
import NavBar from './components/NavBar'
import BookShow from './components/BookShow'
import UserProfile from './components/UserProfile'
import LoginPage from './components/LoginPage'
import MysteryImage from './components/MysteryImage'
import SearchBar from './components/SearchBar'

const axios = require('axios')


class App extends Component {


  constructor() {
    super()
    this.state = {
      fetchedBooks: [],
      searchInput: '',
      currentBookId: null,
      bookStart: 0,
      bookEnd: 16,
      currentUser: null,
      showingUserProfile: false
    }
  }

  componentDidMount() {
    this.fetchBooks()
    this.resetCurrentUser()
  }

  fetchBooks = () => {
    console.log('start fetching books')
    axios.get('http://localhost:4000/api/v1/books', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(resp => {
      this.setState({
        fetchedBooks: resp.data
      }, () => {
        console.log('end fetching books')
        this.defaultSort()
        console.log('sorted')
      })
    })
  }


  setCurrentUser = (user) => {
      this.setState({
        currentUser: user
      })
  }

  logOut = () => {
    this.setState({
      currentUser: null
    }, () => {
      window.localStorage.removeItem('jwt')
      console.log(window.localStorage)
    })
  }


  resetCurrentUser = () => {
    console.log(localStorage.getItem('jwt'))
    if (localStorage.getItem('jwt')) {
      fetch('http://localhost:4000/api/v1/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.user)
        this.setState({
          currentUser: data.user
        })
      })
    }
  }

  nextPage = () => {
    this.setState({
      bookStart: this.state.bookStart + 16,
      bookEnd: this.state.bookEnd + 16
    })
  }

  previousPage = () => {
    this.setState({
      bookStart: this.state.bookStart - 16,
      bookEnd: this.state.bookEnd - 16
    })
  }

  firstPage = () => {
    this.setState({
      bookStart: 0,
      bookEnd: 16
    })
  }

  lastPage = () => {
    this.setState({
      bookStart: this.state.fetchedBooks.length - 16,
      bookEnd: this.state.fetchedBooks.length
    })
  }


  defaultSort = () => {
    const sorted_by_rating = this.state.fetchedBooks.sort((a, b) => {
      return a.average_rating - b.average_rating
    }).reverse()
    this.setState({
      fetchedBooks: sorted_by_rating
    })
  }

  sortBooks = (e) => {
    switch (e.target.value) {
    case 'ra':
      const sorted_by_rating_ascending = this.state.fetchedBooks.sort((a, b) => {
        return a.average_rating - b.average_rating
      })
     this.setState({
      fetchedBooks: sorted_by_rating_ascending
      })
      break;
    case 'td':
      const sorted_by_title_descending = this.state.fetchedBooks.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
      this.setState({
        fetchedBooks: sorted_by_title_descending
      })
      break;
    case 'ta':
      const sorted_by_title_ascending = this.state.fetchedBooks.sort((a, b) => {
        return a.title.localeCompare(b.title)
      }).reverse()
      this.setState({
        fetchedBooks: sorted_by_title_ascending
      })
      break;
    case 'ad':
      const sorted_by_author_descending = this.state.fetchedBooks.sort((a, b) => {
        return a.authors[0].substr(a.authors[0].indexOf(' ')+1).localeCompare(b.authors[0].substr(b.authors[0].indexOf(' ')+1))
      })
      this.setState({
        fetchedBooks: sorted_by_author_descending
      })
      break;
    case 'aa':
      const sorted_by_author_ascending = this.state.fetchedBooks.sort((a, b) => {
        return a.authors[0].substr(a.authors[0].indexOf(' ')+1).localeCompare(b.authors[0].substr(b.authors[0].indexOf(' ')+1))
      }).reverse()
      this.setState({
        fetchedBooks: sorted_by_author_ascending
      })
      break;
    default:
      const sorted_by_rating = this.state.fetchedBooks.sort((a, b) => {
        return a.average_rating - b.average_rating
      }).reverse()
      this.setState({
        fetchedBooks: sorted_by_rating
      })
    }
  }

  setCurrentBook = (id) => {
    this.setState({
      currentBookId: id
    }, () => {
      console.log(this.state.currentBookId)
    })
  }

  noBookSelected = () => {
    this.setState({
      currentBookId: null
    }, () => {
      console.log(this.state.currentBookId)
    })
  }

  captureInput = (input) => {
    this.setState({
      searchInput: input
    }, () => {
      console.log(this.state.searchInput)
    })
  }

  findCurrentBook = () => {
    return this.state.fetchedBooks.find(book => {
      return book.id === this.state.currentBookId
    })
  }


  filterThroughBooks = () => {
    // console.log(this.state.fetchedBooks);
    return this.state.fetchedBooks.filter(book => {
      return (
        book.title.toLowerCase().includes(this.state.searchInput.toLowerCase())
        ||
          book.description.toLowerCase().includes(this.state.searchInput.toLowerCase())
        ||
        book.authors.filter(author => author.toLowerCase().includes(this.state.searchInput.toLowerCase())).length > 0
      )}
    ).slice(this.state.bookStart, this.state.bookEnd)
  }

  sliceBooks = () => {
    return this.state.fetchedBooks.slice(this.state.bookStart, this.state.bookEnd)
  }

  chooseBookRendering = () => {
    if (this.state.searchInput) {
      return <BooksBody
      setCurrentBook={this.setCurrentBook}
      fetchedBooks={this.filterThroughBooks()}
      searchInput={this.state.searchInput}
      captureInput={this.captureInput}
      searchInput={this.state.searchInput}/>
    } else {
      return <BooksBody
      setCurrentBook={this.setCurrentBook}
      fetchedBooks={this.sliceBooks()}
      captureInput={this.captureInput}
      searchInput={this.state.searchInput} />
    }
  }


  pageRender = () => {
    if (!this.state.currentBookId && this.state.bookStart && (this.state.bookEnd !== this.state.fetchedBooks.length)) {
      return <div className='pageBody'>
      <SearchBar captureInput={this.captureInput}
      searchInput={this.state.searchInput}/>
      <div className='pageButtons'>
        <button onClick={this.firstPage}>
        First page
        </button>
        <button onClick={this.previousPage}>
        Previous Page
        </button>
        <button onClick={this.nextPage}>
        Next Page
        </button>
        <button onClick={this.lastPage}>
        Last page
        </button>
      </div>

      {this.chooseBookRendering()}

      </div>
    } else if (!this.state.currentBookId && !this.state.bookStart) {
      return <div className='pageBody'>
      <SearchBar captureInput={this.captureInput}
      searchInput={this.state.searchInput}/>
      <div className='pageButtons'>
        <button onClick={this.nextPage}>
        Next Page
        </button>
        <button onClick={this.lastPage}>
        Last page
        </button>
      </div>

      {this.chooseBookRendering()}

      </div>
    } else if (!this.state.currentBookId && this.state.bookEnd === this.state.fetchedBooks.length) {
      return <div className='pageBody'>
      <SearchBar captureInput={this.captureInput}
      searchInput={this.state.searchInput}/>
      <div className='pageButtons'>
        <button onClick={this.firstPage}>
        First page
        </button>
        <button onClick={this.previousPage}>
        Previous Page
        </button>
      </div>

      {this.chooseBookRendering()}

      </div>
    } else {
      return <BookShow
      findCurrentBook={this.findCurrentBook}
      currentUser={this.state.currentUser}
      setCurrentUser={this.setCurrentUser}
      />
    }
  }


  intialRender = () => {
    if(!this.state.currentUser){
      return(
        <LoginPage setCurrentUser={this.setCurrentUser}
        resetCurrentUser={this.resetCurrentUser}/>
      )
    } else if (this.state.currentUser && this.state.showingUserProfile && !this.state.currentBookId) {
      return (
        <div>
          <NavBar
            captureInput={this.captureInput}
            currentBookId={this.state.currentBookId}
            noBookSelected={this.noBookSelected}
            searchInput={this.state.searchInput}
            currentUser={this.state.currentUser}
            showLoginPage={this.showLoginPage}
            logOut={this.logOut}
            showUserProfile={this.showUserProfile}
            backToIndex={this.backToIndex}
            showingUserProfile={this.state.showingUserProfile}
            />
          <UserProfile currentUser={this.state.currentUser}
            backToIndex={this.backToIndex}
            fetchedBooks={this.state.fetchedBooks}
            setCurrentBook={this.setCurrentBook}
          />
        </div>
      )
    } else if(this.state.currentUser && !this.state.currentBookId) {
      return(
      <div>
      <NavBar
        captureInput={this.captureInput}
        currentBookId={this.state.currentBookId}
        noBookSelected={this.noBookSelected}
        searchInput={this.state.searchInput}
        currentUser={this.state.currentUser}
        showLoginPage={this.showLoginPage}
        logOut={this.logOut}
        showUserProfile={this.showUserProfile}
        backToIndex={this.backToIndex}
        showingUserProfile={this.state.showingUserProfile}
        />
        <MysteryImage />
          <select onChange={this.sortBooks} type="select" name="select">
            <option value='rd'>Average rating descending</option>
            <option value='ra'>Average rating ascending</option>
            <option value='td'>Title descending</option>
            <option value='ta'>Title ascending</option>
            <option value='ad'>Author descending</option>
            <option value='aa'>Author ascending</option>
          </select>
          {this.pageRender()}
        </div>
      )
    }
    else {
      return (
        <div>
        <NavBar
          captureInput={this.captureInput}
          currentBookId={this.state.currentBookId}
          noBookSelected={this.noBookSelected}
          searchInput={this.state.searchInput}
          currentUser={this.state.currentUser}
          showLoginPage={this.showLoginPage}
          logOut={this.logOut}
          showUserProfile={this.showUserProfile}
          backToIndex={this.backToIndex}
          showingUserProfile={this.state.showingUserProfile}
        />
        {this.pageRender()}
        </div>
      )
    }
  }


  showUserProfile = () => {
    this.setState({
      showingUserProfile: true
    })
  }

  backToIndex = () => {
    this.setState({
      showingUserProfile: false
    })
  }


  render() {
    return (
      <div className="App">
        {this.intialRender()}
      </div>
    )
  }
}


export default App
