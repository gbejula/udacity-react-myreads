import React from 'react';
import * as BooksAPI from './utils/BooksAPI';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import BookList from './components/BookList';
import SearchBooks from './components/SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  changedBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      book.shelf = shelf;
      this.setState(currentState => ({
        books: currentState.books
          .filter(bk => bk.id !== book.id)
          .concat([book]),
      }));
    });
  };

  render() {
    const { books } = this.state;

    return (
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <BookList books={books} changedBookShelf={this.changedBookShelf} />
          </Route>

          <Route
            path='/search'
            render={() => (
              <SearchBooks
                books={books}
                changedBookShelf={this.changedBookShelf}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
