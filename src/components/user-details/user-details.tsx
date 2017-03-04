import './user-details.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Credentials, CredentialsInterface } from '../../services/credentials';
import { GithubApi, GithubIssuesInterface, GithubRepoInterface } from '../../services/github-api';
import { GITHUB_STORE_ACTIONS } from '../../stores/github-store';

function mapStateToProps(state) {
  return {
    avatar: state.userDetails.avatar,
    username: state.userDetails.username
  };
}

//TODO any
class UserDetails extends React.Component<any, any> {
  private credentials: CredentialsInterface;
  private githubApi: any;

  constructor(props) {
    super(props);

    this.state = {
      avatar: '',
      username: ''
    };

    this.credentials = new Credentials().getCredentials();
    this.githubApi = new GithubApi(this.credentials);
    this.getUserDetails();
  }


  getUserDetails() {
    let dispatch = this.props.dispatch;

    this.githubApi.getUserDetails().then((response: any) => {
      dispatch({
        type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
        userDetails: response
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      avatar: nextProps.avatar,
      username: nextProps.username
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

export default connect(mapStateToProps)(UserDetails);