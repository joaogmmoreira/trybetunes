import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isBtnDisabled: true,
      inputValue: '',
      isLoading: false,
      // isThereReturn: false,
      copyInputValue: '',
      albumsList: [],
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      inputValue: target.value,
    }, () => {
      this.handleButton();
    });
  }

  handleButton = () => {
    const { inputValue } = this.state;
    if (inputValue.length >= 2) {
      return this.setState({
        isBtnDisabled: false,
      });
    }
    return this.setState({
      isBtnDisabled: true,
    });
  }

  getList = async () => {
    const { inputValue } = this.state;
    this.setState((prevState) => ({
      isLoading: true,
      copyInputValue: prevState.inputValue,
    }));
    const list = await searchAlbumsAPI(inputValue);
    this.setState({
      inputValue: '',
      isLoading: false,
      // isThereReturn: true,
      albumsList: list,
    });
  }

  render() {
    const {
      isBtnDisabled,
      inputValue,
      isLoading,
      // isThereReturn,
      albumsList,
      copyInputValue,
    } = this.state;

    if (isLoading) {
      return (
        <div data-testid="page-search">
          <Header />
          <Loading />
        </div>
      );
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchInput">
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchInput"
              id="searchInput"
              placeholder="Artists or album"
              value={ inputValue }
              onChange={ this.onInputChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isBtnDisabled }
              onClick={ this.getList }
            >
              Pesquisar
            </button>
          </label>
        </form>
        <div>
          <h3>
            {`Resultado de álbuns de:
            ${copyInputValue}`}
          </h3>
          { albumsList.length && copyInputValue
            ? albumsList.map((element, index) => (
              <div key={ index }>
                <img src={ element.artworkUrl100 } alt={ element.collectionName } />
                <Link
                  data-testid={ `link-to-album-${element.collectionId}` }
                  to={ `/album/${element.collectionId} ` }
                >
                  { element.collectionName }

                </Link>
                <p>{ element.artistName }</p>
              </div>
            )) : 'Nenhum álbum foi encontrado' }
        </div>
      </div>
    );
  }
}

export default Search;
