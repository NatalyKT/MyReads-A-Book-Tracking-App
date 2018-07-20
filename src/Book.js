import React from 'react'

class Book extends React.Component {
  getAuthors() {
    const book = this.props.book

    if (book.authors) {
      let authors = ''

      book.authors.map((author, index) => {
        return authors += (index === book.authors.length - 1) ? author : author + ', '
      })

      return authors
    }
  }

  render() {
    const { book, onUpdateShelf } = this.props

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf ? book.shelf : 'none' } onChange={(event) => onUpdateShelf({id: book.id}, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{this.getAuthors()}</div>
      </div>
    )
  }
}

export default Book
