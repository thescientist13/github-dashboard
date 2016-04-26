'use strict';

import * as React from 'react';

import './header.css!';

class Header extends React.Component {

  render() {
    return (
      <header>
        <h1 className="header-text">Github Dashboard</h1>
      </header>
    )
  }

}

export default Header;