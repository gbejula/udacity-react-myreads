import React from 'react';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BookList(props) {
  const { books, changedBookShelf } = props;

  let currentlyReading = books.filter(
    book => book.shelf === 'currentlyReading'
  );
  let wantToRead = books.filter(book => book.shelf === 'wantToRead');
  let read = books.filter(book => book.shelf === 'read');

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <BookShelf
          changedBookShelf={changedBookShelf}
          books={currentlyReading}
          title='Currently Reading'
        />
        <BookShelf
          changedBookShelf={changedBookShelf}
          books={wantToRead}
          title='Want To Read'
        />
        <BookShelf
          changedBookShelf={changedBookShelf}
          books={read}
          title='Read'
        />
      </div>
      <div className='open-search'>
        <Link to='/search' className='open-search'>
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  changedBookShelf: PropTypes.func.isRequired,
};

export default BookList;
