import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './loading';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import Header from './components';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchBtnDisable: true,
      isLoading: false,
      artist: '',
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
    const pesquisa = target.parentElement.children[0].value;
    const arrAlbums = await searchAlbumsAPI(pesquisa);
    this.setState({ albums: arrAlbums });
    if (arrAlbums.length > 0) {
      this.setState({ isAlbumEmpty: false });
      this.setState({ artist: arrAlbums[0].artistName });
    }
    target.parentElement.children[0].value = '';
  }

  render() {
    const { isSearchBtnDisable, isLoading, artist, albums, isAlbumEmpty } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <div>
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
                  <>
                    <h2>
                      Resultado de álbuns de:
                      {artist}
                    </h2>
                    <div>
                      {albums.map(({ collectionName, collectionId, trackCount }) => (
                        <div key={ trackCount }>
                          <p>
                            {collectionName}
                          </p>
                          <Link
                            to={ `/album/${collectionId}` }
                            data-testid={ `link-to-album-${collectionId}` }
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
            </div>
          </div>
        )
    );
  }
}

export default Search;
