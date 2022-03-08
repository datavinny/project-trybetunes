import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import Loading from './loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userName: '',
    };

    this.getUserName = this.getUserName.bind(this);
  }

  getUserName() {
    this.setState({ isLoading: true }, getUser());
    const userName = getUser();
    this.setState({ userName });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">{userName}</p>
            <Link to="/search" data-testid="link-to-search" />
            <Link to="/favorites" data-testid="link-to-favorites" />
            <Link to="/profile" data-testid="link-to-profile" />
          </header>
        )
    );
  }
}

export default Header;
