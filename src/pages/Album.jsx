import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: [],
      artistName: '',
      albumName: '',
      isLoading: false,
      favoritas: [],
    };
    this.pegarMusica = this.pegarMusica.bind(this);
    this.favoritar = this.favoritar.bind(this);
    this.recuperarFavoritas = this.recuperarFavoritas.bind(this);
  }

  componentDidMount() {
    this.recuperarFavoritas();
    this.pegarMusica();
  }

  async pegarMusica() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const musicsCorrigido = musics.filter((item, index) => index !== 0);
    this.setState({ album: musicsCorrigido,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName });
  }

  async favoritar({ target }) {
    const { album } = this.state;
    const objAlvo = album[target.name];
    if (target.checked === true) {
      this.setState({ isLoading: true });
      await addSong(objAlvo);
    } else {
      this.setState({ isLoading: true });
      await removeSong(objAlvo);
    }
    // this.recuperarFavoritas();
    this.setState({ isLoading: false }, () => this.recuperarFavoritas());
  }

  async recuperarFavoritas() {
    this.setState({ isLoading: true });
    const arrFavoritas = await getFavoriteSongs();
    const idFavoritas = arrFavoritas.map(({ trackId }) => trackId);
    this.setState({ favoritas: idFavoritas, isLoading: false });
    // const { favoritas } = this.state;
    // if (favoritas.length > 0) {
    //   favoritas.forEach((element) => {
    //     const inputFavorito = document.getElementById(element);
    //     inputFavorito.checked = true;
    //   });
    // }
  }

  render() {
    const { album, artistName, albumName, isLoading, favoritas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Loading />
          : (
            <>
              <h1 data-testid="artist-name">{artistName}</h1>
              <h2 data-testid="album-name">{albumName}</h2>
              <div>
                {album.map(({ trackName, previewUrl, trackId }, index) => (
                  <MusicCard
                    musicName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    key={ index }
                    favoritar={ this.favoritar }
                    index={ index }
                    favoritas={ favoritas }
                  />
                ))}
              </div>
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
}.isRequired;
export default Album;
