import './user-details.css';
import * as React from 'react';

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

export class UserDetails extends React.Component<UserDetailsPropsInterface, UserDetailsStateInterface> {

  constructor(props: UserDetailsPropsInterface) {
    super(props);
  }

  render() {
    return (
      <div className="tgh-user-details">
        <img className="user-avatar img-responsive" src={this.props.avatar}/>
        <h1><span className="user-name">{this.props.username}</span></h1>
      </div>
    )
  }

}

export default UserDetails;