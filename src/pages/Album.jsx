import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
// import MusicCard from '../componentsMusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: [],
      artistName: '',
      albumName: '',
    };
  }

  async pegarMusica() {
    const musics = await getMusics(id);
    this.setState({ musics });
    this.setState({ artistName: musics[0].artistName });
    this.setState({ albumName: musics[0].collectionName });
  }

  render() {
    const { musics, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{albumName}</h2>
        {musics.map(({ trackName, previewUrl }, index) => (
          <MusicCard
            musicName={ trackName }
            previewUrl={ previewUrl }
            key={ index }
          />
        ))}
      </div>
    );
  }
}

export default Album;
