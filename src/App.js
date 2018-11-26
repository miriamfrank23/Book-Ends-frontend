import React, { Component } from 'react'
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
      loading: true,
      page: null,
      pages: null
    }
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    //only include books with ratings? and author and description? change database to only include
    fetch('http://localhost:4000/api/v1/books')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        fetchedBooks: json.books,
        loading: false,
        page: json.page,
        pages: json.pages
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

  handlePage = (e, { activePage }) => {
    debugger
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
        {!this.state.currentBookId ? <BooksBody
          setCurrentBook={this.setCurrentBook}
          fetchedBooks={this.state.fetchedBooks}
          searchInput={this.state.searchInput} />
          :
          <BookShow
          findCurrentBook={this.findCurrentBook}
          />
        }
        </div>
    )
  }
}
// <Pagination onPageChange={this.handlePage} size='mini' siblingRange='6' defaultActivePage={this.state.page}
// totalPages={this.state.pages}/>


export default App
