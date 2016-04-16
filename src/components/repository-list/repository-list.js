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
      url: 'https://api.github.com/users/thescientist13/repos',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token 83f15d2eb6e6029dd9d20a79551c6f701a046c95'
      }
    }).done(response => {
      this.setState({
        repositories: response
      });
    });
  },

  render: function() {
    return (
      <section>
        {this.state.repositories.map(function(repository){
          return <li><a target="_blank" href={repository.html_url}>{repository.name}</a></li>
        })}
      </section>
    )
  }
});

ReactDOM.render(
  <RepositoryList />,
  document.getElementById('repository-list')
);