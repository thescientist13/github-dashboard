import './user-details.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { readUserDetails } from '../../stores/github-store';

interface UserDetailsStateInterface {
  userDetails: {
    avatar: string,
    username: string
  }
}
interface UserDetailsPropsInterface {
  username: string,
  avatar: string
  dispatch?: any
}

function mapStateToProps(state: UserDetailsStateInterface) {
  return {
    avatar: state.userDetails.avatar,
    username: state.userDetails.username
  };
}

export class UserDetails extends React.Component<UserDetailsPropsInterface, UserDetailsStateInterface> {

  constructor(props: UserDetailsPropsInterface) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(readUserDetails());
  }

  render() {
    return (
      <div className="user-details">
        <img className="user-avatar img-responsive" src={this.props.avatar}/>
        <h1><span className="user-name">{this.props.username}</span></h1>
      </div>
    )
  }

}

export default connect(mapStateToProps)(UserDetails);