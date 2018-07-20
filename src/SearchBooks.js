import React from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {

  state = {
    books: []
  }

  updateQuery(query) {
    this.setState({ books: [] })

    if (query === '') {
      return
    }

    BooksAPI.search(query).then((result) => {
      if (!result.error) {
        let books = result.map((b) => {

          let currentBook = this.props.currentBooks.filter((currentBook) => currentBook.id === b.id)[0]

          if (currentBook) {
              b.shelf = currentBook.shelf
          }

          return b
        })

        books.sort(sortBy('title'))

        this.setState({ books: books })
      }
    })
  }

  updateShelf = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf
        }

        return b
      })
    }))

    let currentBook = this.props.currentBooks.filter((currentBook) => currentBook.id === book.id)[0]

    // Is current book exist update shelf else add a new one
    if (!currentBook) {
      let newBook = this.state.books.filter((newBook) => newBook.id === book.id)[0]
      this.props.addBook(newBook)
    }

    this.props.onUpdateShelf(book, shelf)
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              /*changed the name of the line (just for me), does not carry any changes in the code*/
              placeholder="Search book by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateShelf={this.updateShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
