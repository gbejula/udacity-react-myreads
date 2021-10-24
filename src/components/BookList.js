import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

function BookList(props) {
  const { books, changeBookShelf } = props;

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
          changeBookShelf={changeBookShelf}
          books={currentlyReading}
          title='Currently Reading'
        />
        <BookShelf
          changeBookShelf={changeBookShelf}
          books={wantToRead}
          title='Want To Read'
        />
        <BookShelf
          changeBookShelf={changeBookShelf}
          books={read}
          title='Read'
        />
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
}

export default BookList;
