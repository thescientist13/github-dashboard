'use strict';

import './table-repositories.css!';
import * as React from 'react';
import {GithubRepos, GithubRepo} from "../../stores/github/github-repos";

class TableRepositories extends React.Component<GithubRepos, GithubRepos> {

  render() {
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
        {this.props.repositories.map(function(repository){
          return <tr key={repository.id} className={repository.hasAssignedIssues ? 'bg-danger' : ''}>
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
}

export default TableRepositories;