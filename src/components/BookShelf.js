import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function BookShelf(props) {
  const { title, books, changedBookShelf } = props;

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        {books.length ? (
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
          <p>Loading...</p>
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
