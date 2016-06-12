'use strict';

import './table-repositories.css!';
import * as React from 'react';
import { GithubRepo } from "../../stores/github/github-repos";

//TODO fix any, any
class TableRepositories extends React.Component<any, any> {

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
              <td><a target="_blank" href={repository.getRepoDetails().details.html_url}>{repository.getRepoDetails().details.name}</a></td>
              <td>{repository.getRepoDetails().issues.getIssueDetails().count}</td>
              <td>{repository.getRepoDetails().issues.getIssueDetails().pullRequests}</td>
              <td>{repository.getRepoDetails().issues.getIssueDetails().openIssues}</td>
          </tr>
        })}
        </tbody>
      </table>
    )
  }
}

export default TableRepositories;