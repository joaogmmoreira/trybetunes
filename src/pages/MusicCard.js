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
      // favorite: [],
    };
  }

  componentDidMount() {
    this.getFavSongsBack();
  }

  getFavSongsBack = async () => {
    // const { favorite } = this.state;
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
    });
    const fav = await getFavoriteSongs();
    const fav2 = fav.some((element) => element.trackId === trackId);
    console.log(fav);
    // console.log(fav2);
    this.setState({
      isLoading: false,
      isChecked: fav2,
    });
  }

  handleCheck = async ({ target }) => {
    this.setState({
      isLoading: true,
      isChecked: target.checked,
    });
    await addSong({ ...this.props });

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
    // console.log(isChecked);
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
            <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                name={ trackId }
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
