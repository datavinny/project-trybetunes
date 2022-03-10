import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  constructor() {
    super();

    this.veryfyFavorite = this.veryfyFavorite.bind(this);
  }

  veryfyFavorite(id) {
    const { favoritas } = this.props;
    const retorno = favoritas.some((element) => Number(element) === Number(id));
    return retorno;
  }

  render() {
    const { musicName, previewUrl, trackId,
      index, favoritar } = this.props;
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
            onChange={ favoritar }
            checked={ this.veryfyFavorite(trackId) }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string,
  musicName: propTypes.string,
  trackId: propTypes.number,
  index: propTypes.number,
  favoritar: propTypes.func,
  favoritas: propTypes.arrayOf(propTypes.string),
}.isRequired;

export default MusicCard;
