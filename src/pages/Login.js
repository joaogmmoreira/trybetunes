import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isSaveBtnDisabled: true,
      name: '',
      isLoading: false,
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      name: target.value,
    }, () => {
      this.handleButton();
    });
  }

  handleButton = () => {
    const { name } = this.state;
    if (name.length > 2) {
      return this.setState({ isSaveBtnDisabled: false });
    }
    return this.setState({ isSaveBtnDisabled: true });
  };

  handleCreateUserParameter = () => {
    // const { isLoading, isLoggedIn } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      const { name } = this.state;
      const { history } = this.props;
      const { push } = history;
      await createUser({ name });
      return push('/search');
    });
  }

  render() {
    const { isSaveBtnDisabled, name, isLoading } = this.state;

    if (isLoading) {
      return (<Loading />);
    }
    return (
      <div data-testid="page-login">
        <form>
          <div>
            <label htmlFor="name-input">
              Name:
              <input
                data-testid="login-name-input"
                type="text"
                name="name-input"
                id="name-input"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ isSaveBtnDisabled }
              onClick={ this.handleCreateUserParameter }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>);
  }
}

Login.propTypes = {
  history: {
    push: PropTypes.func,
  },
}.isRequired;

export default Login;
