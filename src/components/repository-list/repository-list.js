import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';


var RepositoryList = React.createClass({
  getInitialState: function() {
    return {
      repositories: []
    };
  },

  componentDidMount: function() {
    $.ajax({
      method: 'GET',
      url: 'https://api.github.com/users/' + CREDENTIALS.username + '/repos',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + CREDENTIALS.accessToken
      }
    }).done(response => {
      this.setState({
       repositories: response
      });
    });
  },

  render: function() {
    return (
      <ul>
        {this.state.repositories.map(function(repository){
          return <li><a target="_blank" href={repository.html_url}>{repository.name}</a></li>
        })}
      </ul>
    )
  }
});

ReactDOM.render(
  <RepositoryList />,
  document.getElementById('repository-list')
);