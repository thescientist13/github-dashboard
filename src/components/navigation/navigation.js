'use strict';

import './navigation.css!';
import React from 'react';
import { Link } from 'react-router';

const Navigation = React.createClass({

  render: function() {
    return (
      <navigation>
        <ul role="nav">
          <li><Link key="1" to="/personal">Personal</Link></li>
          <li><Link key="2" to="/following">Following</Link></li>
        </ul>
      </navigation>
    )
  }
});

export default Navigation;