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

    console.log('constructor!!!');
    GithubStore.subscribe(() => {
      console.log('GithubStore.state', GithubStore.getState().userDetails);
      // this.setState({
      //   avatar: userDetailsState.avatar,
      //   username: userDetailsState.username
      // });
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