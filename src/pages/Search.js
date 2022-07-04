import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isBtnDisabled: true,
      inputValue: '',
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

  render() {
    const { isBtnDisabled, inputValue } = this.state;
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
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>);
  }
}

export default Search;
