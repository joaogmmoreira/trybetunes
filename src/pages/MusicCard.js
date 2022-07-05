import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
      favorite: [],
    };
  }

  componentDidMount() {
    this.getFavSongs();
  }

  getFavSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const fav = await getFavoriteSongs();
    console.log(fav);
    this.setState({
      isLoading: false,
      favorite: fav,
    });
  }

  handleCheck = async ({ target }) => {
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
      isChecked: target.checked,
    });
    await addSong(trackId);

    this.setState({
      isLoading: false,
    });
  };

  render() {
    const {
      isLoading,
      isChecked,
    } = this.state;

    const { trackName,
      previewUrl,
      trackId,
    } = this.props;
    console.log(isChecked);
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
        { isLoading
          ? (<Loading />) : (
            <label data-testid={ `checkbox-music-${trackId}` } htmlFor="favorita">
              Favorita
              <input
                id="favorita"
                name="favorita"
                type="checkbox"
                onChange={ this.handleCheck }
                checked={ isChecked }
              />
            </label>
          )}
      </>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
