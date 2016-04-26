'use strict';

import * as React from 'react';
import { Link } from 'react-router';

import './navigation.css!';

class Navigation extends React.Component {

  render() {
    return (
      <navigation>
        <ul role="nav">
          <li><Link to="/personal">Personal</Link></li>
          <li><Link to="/following">Following</Link></li>
        </ul>
      </navigation>
    )
  }

}

export default Navigation;