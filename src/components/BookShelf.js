import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function BookShelf(props) {
  const { bookTitle, books, changedBookShelf } = props;

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{bookTitle}</h2>
      <div className='bookshelf-books'>
        {books.length > 0 ? (
          <ol className='books-grid'>
            {books.map(book => (
              <Book
                changedBookShelf={changedBookShelf}
                key={book.id}
                book={book}
              />
            ))}
          </ol>
        ) : (
          <h3>Loading..., please wait for the books</h3>
        )}
      </div>
    </div>
  );
}

BookShelf.protoType = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changedBookShelf: PropTypes.func.isRequired,
};

export default BookShelf;
