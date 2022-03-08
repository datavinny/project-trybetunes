import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     favoritas: [],
  //   };

  //   // this.Favoritar = this.Favoritar.bind(this);
  // }

  // Favoritar({ target }) {
  //   if (target.checked === true) {
  //     const novoFavorito = target.id;
  //     const { favoritas } = this.state;
  //     this.setState({ favoritas: [...favoritas, novoFavorito] });
  //     console.log(favoritas);
  //   }
  //   if (target.checked === false) {
  //     const desmarcar = target.name;
  //     const { favoritas } = this.state;
  //     const arrFavoritas = favoritas.slice(desmarcar, desmarcar);
  //     this.setState({ favoritas: [...arrFavoritas] });
  //     console.log(arrFavoritas);
  //   }
  // }

  render() {
    const { musicName, previewUrl, trackId, index, favoritar } = this.props;
    return (
      <div>
        <h2 data-testid="music-name">{musicName}</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code> audio </code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            name={ index }
            id={ trackId }
            onClick={ favoritar }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string.isRequired,
  musicName: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  index: propTypes.number.isRequired,
  favoritar: propTypes.func.isRequired,
};

export default MusicCard;
