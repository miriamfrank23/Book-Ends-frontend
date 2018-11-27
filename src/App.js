import React, { Component, Fragment } from 'react'
import './App.css'
import BooksBody from './components/BooksBody'
import NavBar from './components/NavBar'
import BookShow from './components/BookShow'
import UserProfile from './components/UserProfile'
import { Pagination } from 'semantic-ui-react'


class App extends Component {


  constructor() {
    super()
    this.state = {
      fetchedBooks: [],
      searchInput: '',
      currentBookId: null,
      bookStart: 0,
      bookEnd: 20,
      // loading: true,
      // page: null,
      // pages: null
    }
  }

  componentDidMount() {
    this.fetchBooks()
  }

  nextPage = () => {
    this.setState({
      bookStart: this.state.bookStart + 20,
      bookEnd: this.state.bookEnd + 20
    })
  }

  previousPage = () => {
    this.setState({
      bookStart: this.state.bookStart - 20,
      bookEnd: this.state.bookEnd - 20
    })
  }

  firstPage = () => {
    this.setState({
      bookStart: 0,
      bookEnd: 20
    })
  }

  lastPage = () => {
    this.setState({
      bookStart: this.state.fetchedBooks.length - 20,
      bookEnd: this.state.fetchedBooks.length
    })
  }

  sliceBooks = () => {
    return this.state.fetchedBooks.slice(this.state.bookStart, this.state.bookEnd)
  }

  fetchBooks = () => {
    fetch('http://localhost:4000/api/v1/books')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        fetchedBooks: json,
        loading: false,
        // page: json.page,
        // pages: json.pages
      }, () => {
        console.log(this.state);
      })
    })
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
      // console.log(this.state.searchInput)
    })
  }

  findCurrentBook = () => {
    return this.state.fetchedBooks.find(book => {
      return book.id === this.state.currentBookId
    })
  }

  // handlePage = (e, { activePage }) => {
  //   this.setState({
  //     loading: true
  //   })
  //   fetch(`http://localhost:4000/api/v1/books/?page=${activePage}`)
  //   .then(resp => resp.json())
  //   .then(json => {
  //     this.setState({
  //       loading: false,
  //       fetchedBooks: json.books,
  //       page: json.page
  //     })
  //   })
  // }

  pageRender = () => {
    if (!this.state.currentBookId && this.state.bookStart && (this.state.bookEnd !== this.state.fetchedBooks.length)) {
      return <div className='pageBody'>
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
      <BooksBody
      setCurrentBook={this.setCurrentBook}
      fetchedBooks={this.sliceBooks()}
      searchInput={this.state.searchInput} />
      </div>
    } else if (!this.state.currentBookId && !this.state.bookStart) {
      return <div className='pageBody'>
      <div className='pageButtons'>
        <button onClick={this.nextPage}>
        Next Page
        </button>
        <button onClick={this.lastPage}>
        Last page
        </button>
      </div>
      <BooksBody
      setCurrentBook={this.setCurrentBook}
      fetchedBooks={this.sliceBooks()}
      searchInput={this.state.searchInput} />
      </div>
    } else if (!this.state.currentBookId && this.state.bookEnd === this.state.fetchedBooks.length) {
      return <div className='pageBody'>
      <div className='pageButtons'>
        <button onClick={this.firstPage}>
        First page
        </button>
        <button onClick={this.previousPage}>
        Previous Page
        </button>
      </div>
      <BooksBody
      setCurrentBook={this.setCurrentBook}
      fetchedBooks={this.sliceBooks()}
      searchInput={this.state.searchInput} />
      </div>
    } else {
      return <BookShow
      findCurrentBook={this.findCurrentBook}
      />
    }
  }


  render() {
    return (
      <div className="App">
        <NavBar
        captureInput={this.captureInput}
        currentBookId={this.state.currentBookId}
        noBookSelected={this.noBookSelected}
        searchInput={this.state.searchInput}
        />
        {this.pageRender()}
        </div>
    )
  }
}

// <div id='pagination'>
//   <Pagination onPageChange={this.handlePage} defaultActivePage={this.state.page}
//   totalPages={this.state.pages}/>
// </div>

export default App
