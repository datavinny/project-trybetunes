import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: [],
      artistName: '',
      albumName: '',
    };

    this.pegarMusica = this.pegarMusica.bind(this);
  }

  componentDidMount() {
    this.pegarMusica();
    // console.log(this.props.match.params);
  }

  async pegarMusica() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const musicsCorrigido = musics.filter((item, index) => index !== 0);
    this.setState({ album: musicsCorrigido,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName });
  }

  render() {
    const { album, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{albumName}</h2>
        {album.map(({ trackName, previewUrl, trackId }, index) => (
          <MusicCard
            musicName={ trackName }
            previewUrl={ previewUrl }
            trackId={ trackId }
            key={ index }
            index={ index }
          />
        ))}
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
