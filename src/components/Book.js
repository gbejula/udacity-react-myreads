import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
  const { book, changedBookShelf } = props;

  let bookDisplayImage = book.imageLinks
    ? book.imageLinks.thumbnail
    : 'https://books.google.com/googlebooks/image/no_cover_thumb.gif';

  // let currentShelf = 'none';

  // for (let item of books) {
  //   if (item.id === book.id) {
  //     currentShelf = item.shelf;
  //     break;
  //   }
  // }

  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${bookDisplayImage})`,
            }}
          />
          <div className='book-shelf-changer'>
            <select
              value={book.shelf}
              onChange={event => changedBookShelf(book, event.target.value)}>
              <option value='move' disabled>
                Move to...
              </option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        <div className='book-authors'>
          {book.authors ? book.authors.join(', ') : 'Author unknown!'}
        </div>
      </div>
    </li>
  );
}

Book.propTypes = {
  changedBookShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
};

export default Book;
