'use strict';

import './repositories-personal.css!';
import {GithubStore} from '../github-store/github-store';
import React from 'react';

const RepositoriesPersonal = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      repositories: []
    };
  },

  // TOOD really need to clean this up
  componentDidMount: function() {
    let store = new GithubStore();

    store.getUserRepositories(response => {
      var repos = response;

      for(let i = 0, l = repos.length; i < l; i += 1){
        var repo = repos[i];

        store.getIssuesForRepository(repo.name, data => {
          repos[i].issues = data || [];
          repos[i].pullRequests = 0;

          for(var j = 0, k = data.length; j < k; j += 1){
            if(data[j].pull_request) {
              repos[i].pullRequests += 1;
            }
          }

          repos[i].openIssues = repos[i].issues.length - repos[i].pullRequests;

          if(i === (repos.length - 1)) {
            this.setState({
              repositories: repos
            });
          }
        });
      }

    });
  },

  render: function() {
    return (
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Repo Name</th>
            <th>Total Issues</th>
            <th>Pull Requests</th>
            <th>Open Issues</th>
          </tr>
        </thead>
        <tbody>
          {this.state.repositories.map(function(repository){
            return <tr key={repository.id}>
                     <td><a target="_blank" href={repository.html_url}>{repository.name}</a></td>
                     <td>{repository.issues.length}</td>
                     <td>{repository.pullRequests}</td>
                     <td>{repository.openIssues}</td>
                   </tr>
          })}
        </tbody>
      </table>
    )
  }

});

export default RepositoriesPersonal;