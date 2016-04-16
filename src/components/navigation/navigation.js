'use strict';

import './navigation.css!';
import React from 'react';
import { Link } from 'react-router';

export const Navigation = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <navigation>
        <ul>
          <li><Link to={'personal'}>Personal</Link></li>
          <li><Link to={'following'}>Following</Link></li>
        </ul>
      </navigation>
    )
  }
});