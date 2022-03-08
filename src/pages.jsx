import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Login from './Login';
import Search from './search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logado: false,
    };
  }

  render() {
    const { logado } = this.state;
    return (
      <BrowserRouter>
        <div data-testid="page-login">
          <Route exact path="/">
            {logado ? <Redirect to="/search" /> : <Login logado={ logado } />}
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
