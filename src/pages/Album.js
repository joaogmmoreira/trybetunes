import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      isLoading: false,
      songsList: [],
    };
  }

  componentDidMount() {
    this.songs();
  }

  songs = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { songsList } = this.state;

    this.setState({
      isLoading: true,
    });

    const music = await getMusics(id);

    this.setState({
      artistName: music[0].artistName,
      albumName: music[0].collectionName,
      isLoading: false,
      songsList: music,
    });
  };

  render() {
    const { artistName, albumName, isLoading, songsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading
          ? (<Loading />)
          : (
            <div>
              <h2 data-testid="artist-name">{artistName}</h2>
              <h3 data-testid="album-name">{albumName}</h3>
              {
                songsList.filter((element) => element.kind === 'song')
                  .map((element, index) => (
                    <div key={ index }>
                      <MusicCard
                        trackName={ element.trackName }
                        previewUrl={ element.previewUrl }
                      />
                    </div>
                  ))
              }
            </div>
          )}
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
