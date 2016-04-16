'use strict';

import './header.css!';
import React from 'react';

export const Header = React.createClass({

  render: function() {
    return (
      <header>
        <h1 className="header-text">Github Dashboard</h1>
      </header>
    )
  }
});