import './user-details.css';
import * as React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  console.log('mapStateToProps', state);
  return {
    avatar: state.userDetails.avatar,
    username: state.userDetails.username
  };
}

//TODO any
class UserDetails extends React.Component<any, any> {

  constructor(props) {
    super(props);

    this.state = {
      avatar: '',
      username: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  componentDidMount(){
    console.log('componentDidMount props', this.props);
    console.log('componentDidMount state', this.state);
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