'use strict';

import './footer.css!';
import React from 'react';

const Footer = React.createClass({

  render: function() {
    return (
      <footer className="footer">
        <h5>&copy; 2016 - Owen Buckley, The Greenhouse</h5>
      </footer>
    )
  }
});

export default Footer;