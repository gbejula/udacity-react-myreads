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
    searchError: false,
  };

  updateQuery = e => {
    const query = e.target.value;
    this.setState(() => ({
      query: query,
    }));

    if (!query) {
      this.setState({ availableBooks: [] });
      return;
    }

    BooksAPI.search(query)
      .then(books => {
        if (!books || books.searchError) {
          this.setState({
            availableBooks: [],
          });
          return;
        }
        books = books.map(book => {
          const bookLocatedOnShelf = this.props.books.find(
            b => b.id === book.id
          );
          book.shelf = bookLocatedOnShelf ? bookLocatedOnShelf.shelf : 'none';
          return book;
        });
        this.setState({ availableBooks: books, searchError: false });
      })
      .catch(err => {
        this.setState({
          availableBooks: [],
          searchError: 'There was an error',
        });
      });
  };

  render() {
    const { query, availableBooks, searchError } = this.state;
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
          {searchError && (
            <h2 className='searchError'>
              No books match the search, please change the search term.
            </h2>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
