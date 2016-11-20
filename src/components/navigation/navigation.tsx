import * as React from 'react';
import { Link } from 'react-router';

import './navigation.css';

// TODO make this DRY?
interface MyProps {}
interface MyState {}

class Navigation extends React.Component<MyProps, MyState> {

  render() {
    return (
      <nav>
        <ul role="nav">
          <li><Link to="/personal">Personal</Link></li>
          <li><Link to="/following">Following</Link></li>
        </ul>
      </nav>
    )
  }

}

export default Navigation;