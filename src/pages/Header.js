import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userName: '',
    };
  }

  async componentDidMount() {
    this.showUserName();
  }

  showUserName = async () => {
    const user = await getUser();
    this.setState({
      isLoading: false,
      userName: user.name,
    });
  };

  render() {
    const { isLoading, userName } = this.state;

    if (isLoading) {
      return (<Loading />);
    }

    return (
      <div data-testid="header-component">
        <div data-testid="header-user-name">
          {userName}
        </div>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </div>);
  }
}

export default Header;
