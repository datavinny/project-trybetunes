import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLoggedIn: false,
    };

    this.setUserIn = this.setUserIn.bind(this);
  }

  setUserIn() {
    this.setState({ isUserLoggedIn: true });
  }

  render() {
    const { isUserLoggedIn } = this.state;
    return (
      <BrowserRouter>
        <div data-testid="page-login">
          <Route exact path="/">
            {isUserLoggedIn ? <Redirect to="/search" />
              : <Login setUserIn={ this.setUserIn } />}
          </Route>
        </div>
        <div data-testid="page-search">
          <Route exact path="/search" component={ Search } />
        </div>
        <div data-testid="page-album">
          <Route exact path="/album/:id" component={ Album } />
        </div>
        <div data-testid="page-favorites">
          <Route exact path="/favorites" component={ Favorites } />
        </div>
        <div data-testid="page-profile">
          <Route exact path="/profile" component={ Profile } />
        </div>
        <div data-testid="page-profile-edit">
          <Route exact path="/profile/edit" component={ ProfileEdit } />
        </div>
        <div data-testid="page-not-found">
          <Route exact path="" component={ NotFound } />
        </div>
      </BrowserRouter>
    );
  }
}

export default Pages;
