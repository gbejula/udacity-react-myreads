import React from 'react';
import Book from './Book';

function BookShelf(props) {
  const { title, books, changeBookShelf } = props;

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        {books.length ? (
          <ol className='books-grid'>
            {books.map(book => (
              <Book
                changeBookShelf={changeBookShelf}
                key={book.id}
                book={book}
              />
            ))}
          </ol>
        ) : (
          <p>error</p>
        )}
      </div>
    </div>
  );
}

export default BookShelf;
