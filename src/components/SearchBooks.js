import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import PropTypes from 'prop-types';
import Book from './Book';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  static propTypes = {
    changedBookShelf: PropTypes.func.isRequired,
  };

  state = {
    query: '',
    availableBooks: [],
  };

  updateQuery = e => {
    const query = e.target.value;
    this.setState(() => ({
      query: query,
    }));

    if (!query) {
      this.setState({ availableBooks: [] });
    }

    BooksAPI.search(query).then(books => {
      if (!books) {
        this.setState({
          availableBooks: [],
        });
        return;
      }
      books = books.map(book => {
        const bookLocatedOnShelf = this.props.books.find(b => b.id === book.id);
        book.shelf = bookLocatedOnShelf ? bookLocatedOnShelf.shelf : 'none';
        return book;
      });
      this.setState({ availableBooks: books });
    });
  };

  render() {
    const { query, availableBooks } = this.state;
    const { changedBookShelf } = this.props;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className='search-books-results'>
          {availableBooks.length > 0 && (
            <ol className='books-grid'>
              {availableBooks.map(book => (
                <Book
                  changedBookShelf={changedBookShelf}
                  key={book.id}
                  book={book}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
