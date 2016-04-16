import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

var OwnerDetails = React.createClass({
  getInitialState: function() {
    return {
      avatar: '',
      name: ''
    };
  },

  componentDidMount: function() {
    $.ajax({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token aaaf5d8024e5aeff295067243b9ea0330cedb39a'
      }
    }).done(response => {
      this.setState({
        avatar: response.avatar_url,
        name: response.login
      });
    });
  },

  render: function() {
    return (
      <section>
        <img class="owner-avatar" src={this.state.avatar}/>
        <h1><span class="owner-name">{this.state.name}</span>'s Repositories</h1>
      </section>
    )
  }
});

ReactDOM.render(
  <OwnerDetails />,
  document.getElementById('owner-details')
);