import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import Loading from './loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.getUserName = this.getUserName.bind(this);
  }

  getUserName() {
    this.setState({ isLoading: true }, getUser());
  }

  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">{this.getUserName}</p>
            <Link to="/search" data-testid="link-to-search" />
            <Link to="/favorites" data-testid="link-to-favorites" />
            <Link to="/profile" data-testid="link-to-profile" />
          </header>
        )
    );
  }
}

export default Header;
