import React from 'react';
import ReactDOM from 'react-dom';

var Footer = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <footer className="footer">
        <h5>&copy; 2016 - Owen Buckley, The Greenhouse</h5>
      </footer>
    )
  }
});

ReactDOM.render(
  <Footer />,
  document.getElementById('footer')
);