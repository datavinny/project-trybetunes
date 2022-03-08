import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicName, previewUrl } = this.props;
    return (
      <div>
        <h2 data-testid="music-name">{musicName}</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code> audio </code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string.isRequired,
  musicName: propTypes.string.isRequired,
};

export default MusicCard;
