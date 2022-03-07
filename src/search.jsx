import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isSearchBtnDisable: true,
    };

    this.verifyLength = this.verifyLength.bind(this);
  }

  verifyLength({ target }) {
    const minLength = 2;
    const { length } = target.value;
    if (length >= minLength) {
      this.setState({ isSearchBtnDisable: false });
    } else {
      this.setState({ isSearchBtnDisable: true });
    }
  }

  render() {
    const { isSearchBtnDisable } = this.state;
    return (
      <div>
        <input
          type="text"
          onChange={ this.verifyLength }
          data-testid="search-artist-input"
        />
        <button
          type="submit"
          disabled={ isSearchBtnDisable }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
