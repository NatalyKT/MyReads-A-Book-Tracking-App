import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (book, shelf) => {
    this.setState(state => ({
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf
        }

        return b
      })
    }))

    BooksAPI.update(book, shelf).then((response) => {

    })
  }

  addBook = (book) => {
    console.log(book);
    this.setState(state => ({
      books: state.books.concat([ book ])
    }))
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
            onUpdateShelf={this.updateShelf}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <SearchBooks
            currentBooks={books}
            onUpdateShelf={this.updateShelf}
            addBook={this.addBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
