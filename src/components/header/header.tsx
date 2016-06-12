'use strict';

import * as React from 'react';

import './header.css!';

// TODO make this DRY?
interface MyProps {}
interface MyState {}

class Header extends React.Component<MyProps, MyState> {

  render() {
    return (
      <header>
        <h1 className="header-text">Github Dashboard</h1>
      </header>
    )
  }

}

export default Header;