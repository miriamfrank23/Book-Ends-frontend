import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'
import BooksBody from './components/BooksBody'
import NavBar from './components/NavBar'



class App extends Component {


  constructor() {
    super()
    this.state = {
      fetchedBooks: [],
      searchInput: ''
    }
  }

  componentDidMount() {
    this.fetchBooks()
  }

  captureInput = (input) => {
    this.setState({
      searchInput: input
    }, () => {
      console.log(this.state.searchInput)
    })
  }



  fetchBooks = () => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=lord+inauthor:tolkien&maxResults=40&langRestrict=en&key=AIzaSyBYNWrl0SYXUnucBkyzuia9nVTRDDUzdbs')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        fetchedBooks: json.items
      }, () => {
        // console.log(this.state)
      })
    })
  }


  render() {
    return (
      <div className="App">
        <NavBar
        captureInput={this.captureInput}
        />
        <BooksBody  fetchedBooks={this.state.fetchedBooks}
        searchInput={this.state.searchInput} />
      </div>
    );
  }
}

export default App
