import * as React from 'react';
import './user-details.css';
import GithubStore from '../../stores/github-store';

class UserDetails extends React.Component<any, any> {
  state = {
    avatar: '',
    username: ''
  };

  constructor() {
    super();

    GithubStore.subscribe(() => {
      const state: any = GithubStore.getState();

      this.setState({
        avatar: state.userDetails.avatar,
        username: state.userDetails.username
      });
    });
  }

  render() {
    return (
      <div className="user-details">
        <img className="user-avatar img-responsive" src={this.state.avatar}/>
        <h1><span className="user-name">{this.state.username}</span></h1>
      </div>
    )
  }

}

export default UserDetails;