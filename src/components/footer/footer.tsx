'use strict';

import * as React from 'react';

import './footer.css!';

// TODO make this DRY?
interface MyProps {}
interface MyState {}

class Footer extends React.Component<MyProps, MyState> {

  render() {
    return (
      <footer className="footer">
        <h5>&copy; 2016 - Owen Buckley, The Greenhouse</h5>
      </footer>
    )
  }

}

export default Footer;