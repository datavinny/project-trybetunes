import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: [],
      artistName: '',
      albumName: '',
      favoritas: [],
    };

    this.pegarMusica = this.pegarMusica.bind(this);
    this.Favoritar = this.Favoritar.bind(this);
  }

  componentDidMount() {
    this.pegarMusica();
  }

  async pegarMusica() {
    const musics = await getMusics('1314699505');
    this.setState({ musics });
    this.setState({ artistName: musics[0].artistName });
    this.setState({ albumName: musics[0].collectionName });
  }

  Favoritar({ target }) {
    if (target.checked === true) {
      const novoFavorito = target.id;
      const { favoritas } = this.state;
      this.setState({ favoritas: [...favoritas, novoFavorito] });
      console.log(favoritas);
    }
    if (target.checked === false) {
      const desmarcar = target.name;
      const { favoritas } = this.state;
      const arrFavoritas = favoritas.slice(desmarcar, desmarcar);
      this.setState({ favoritas: [...arrFavoritas] });
      console.log(arrFavoritas);
    }
  }

  render() {
    const { musics, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{albumName}</h2>
        {musics.map(({ trackName, previewUrl, trackId }, index) => (
          <MusicCard
            musicName={ trackName }
            previewUrl={ previewUrl }
            trackId={ trackId }
            key={ index }
            index={ index }
            favoritar={ this.Favoritar }
          />
        ))}
      </div>
    );
  }
}

export default Album;
