import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'
import BooksBody from './components/BooksBody'
import NavBar from './components/NavBar'
import BookShow from './components/BookShow'



class App extends Component {


  constructor() {
    super()
    this.state = {
      fetchedBooks: [],
      searchInput: '',
      currentBookId: null
    }
  }

  componentDidMount() {
    this.fetchBooks()
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
      console.log(this.state.currentBookId);
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

 // google books
  // fetchBooks = () => {
  //   //only include books with ratings?
  //   fetch('https://www.googleapis.com/books/v1/volumes?q=subject:mystery&subject:thriller&maxResults=40&langRestrict=en&key=AIzaSyBYNWrl0SYXUnucBkyzuia9nVTRDDUzdbs')
  //     .then(resp => resp.json())
  //   .then(json => {
  //     this.setState({
  //       fetchedBooks: json.items
  //     }, () => {
  //       console.log(this.state)
  //     })
  //   })
  // }

  fetchBooks = () => {
    const booksArray = []
    //only include books with ratings?
    // for (let i = 0; i <= 80; i += 40) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:mystery&maxResults=40&langRestrict=en&key=AIzaSyBYNWrl0SYXUnucBkyzuia9nVTRDDUzdbs`)
      .then(resp => resp.json())
      .then(console.log)
      // .then(json => {
      //   this.setState({
      //     fetchedBooks: json
      //   }, () => {
      //     console.log(this.state)
      //   })
      // })
    // }
    console.log(booksArray);
  }


  render() {
    return (
      <div className="App">
        <NavBar
        captureInput={this.captureInput}
        currentBookId={this.state.currentBookId}
        noBookSelected={this.noBookSelected}
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
    );
  }
}

export default App
