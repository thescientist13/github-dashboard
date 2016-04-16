import React from 'react';
import ReactDOM from 'react-dom';

var Header = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <header>
        <h1 className="header-text">My Dashboard</h1>
      </header>
    )
  }
});

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);