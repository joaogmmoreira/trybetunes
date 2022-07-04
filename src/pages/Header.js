import React from 'react';
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
        Header
      </div>);
  }
}

export default Header;
