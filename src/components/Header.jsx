import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userName: '',
    };

    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    this.setState({ isLoading: true });
    const userInfo = await getUser();
    const userName = await userInfo.name;
    this.setState({ userName, isLoading: false });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">{userName}</p>
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </header>
        )
    );
  }
}

export default Header;
