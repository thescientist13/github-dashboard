import * as React from 'react';
import { GithubRepoInterface } from '../../services/github-api';

//TODO change use any, any to use types
class TableRepositories extends React.Component<any, any> {

  constructor(props){
    super(props);
  }

  handleMoreButtonClick(url) {
    console.log('handleMoreButtonClick', url);
  }

  render() {
    return (
      <div>
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
          {this.props.repositories.map(function(repository: GithubRepoInterface){
            return <tr key={repository.details.id} className={repository.issues && repository.issues.hasAssignedIssues ? 'bg-danger' : ''}>
              <td><a target="_blank" href={repository.details.html_url}>{repository.details.name}</a></td>
              <td>{repository.issues ? repository.issues.count : ''} </td>
              <td>{repository.issues ? repository.issues.pullRequests : ''}</td>
              <td>{repository.issues ? repository.issues.openIssues : ''}</td>
            </tr>
          })}
          </tbody>
        </table>

        {/*XXX show conditionally*/}
        <button className="btn btn-primary" onClick={() => this.handleMoreButtonClick(this.props.nextReposUrl)}>Load More</button>

      </div>
    )
  }

}

export default TableRepositories;