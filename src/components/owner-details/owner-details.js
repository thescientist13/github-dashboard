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
    // TODO use owner API
    $.ajax({
      method: 'GET',
      url: 'https://api.github.com/users/thescientist13/repos',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token aaaf5d8024e5aeff295067243b9ea0330cedb39a'
      }
    }).done(response => {
      var owner = response[0].owner;

      console.log(owner.avatar_url);
      this.setState({
        avatar: owner.avatar_url,
        name: owner.login
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
  document.getElementById('root')
);