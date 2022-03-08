import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchBtnDisable: true,
      isLoading: false,
      artistName: '',
      albums: [],
      isAlbumEmpty: true,
    };

    this.verifyLength = this.verifyLength.bind(this);
    this.pesquisar = this.pesquisar.bind(this);
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

  async pesquisar({ target }) {
    this.setState({ isLoading: true });
    const pesquisa = target.parentElement.children[0].value;
    const arrAlbums = await searchAlbumsAPI(pesquisa);
    this.setState({ albums: arrAlbums });
    if (arrAlbums.length > 0) {
      this.setState({ isAlbumEmpty: false });
      this.setState({ artistName: pesquisa, isLoading: false });
    } else {
      this.setState({ isAlbumEmpty: true, isLoading: false });
    }
    target.parentElement.children[0].value = '';
  }

  render() {
    const { isSearchBtnDisable,
      isLoading, artistName, albums, isAlbumEmpty } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <div data-testid="page-search">
            <div>
              <Header />
            </div>
            <div>
              <input
                type="text"
                onChange={ this.verifyLength }
                data-testid="search-artist-input"
              />
              <button
                type="submit"
                disabled={ isSearchBtnDisable }
                onClick={ this.pesquisar }
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
              { isAlbumEmpty ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <div>
                    <h2>
                      Resultado de álbuns de:
                      {' '}
                      {artistName}
                    </h2>
                    {albums.map(({ collectionName, collectionId }, index) => (
                      <div key={ index }>
                        <p>
                          {collectionName}
                        </p>
                        <Link
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          Go To Album
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        )
    );
  }
}

export default Search;
