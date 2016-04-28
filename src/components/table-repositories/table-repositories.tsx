'use strict';

import './table-repositories.css!';

import * as React from 'react';

// TODO make this DRY?
interface MyProps {}
interface MyState {}

class TableRepositories extends React.Component<MyProps, MyState> {

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