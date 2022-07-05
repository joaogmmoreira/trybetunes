import React from 'react';
import PropTypes from 'prop-types';
// import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isChecked: false,
  //   };
  // }

  render() {
    const { trackName,
      previewUrl,
      // trackId
    } = this.props;

    return (
      <>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {/* <label data-testid={ `checkbox-music-${trackId}` } htmlFor="favorita">
          Favorita
          <input
            id="favorita"
            name="favorita"
            type="checkbox"
            onChange={ handleCheck }
            checked={ isChecked }
          />
        </label> */}
      </>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  // trackId: PropTypes.string.isRequired,
};

export default MusicCard;
