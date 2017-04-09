import './repositories-table.css';
import * as React from 'react';
import { RepositoryInterface } from '../../services/github-api';

//TODO change use any, any to use types
class RepositoriesTable extends React.Component<any, any> {

  constructor(props){
    super(props);
  }

  render() {
    let props = this.props;

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
          {this.props.repositories.map(function(repository: RepositoryInterface, index: number){
            return <tr key={index} className={repository.hasAssignedIssues ? 'bg-danger' : ''}>
              <td><a target="_blank" href={repository.url}>{(index + 1) + ') ' + repository.name}</a></td>
              <td>{repository.issues? repository.issues.length : 0} </td>
              <td>{repository.pullRequests ? repository.pullRequests : 0}</td>
              <td>{repository.openIssues ? repository.openIssues : 0}</td>
            </tr>
          })}
          </tbody>
        </table>

        {
          this.props.hasMoreRepos
            ? <button className="btn btn-primary" onClick={props.getNextRepos}>Load More</button>
            : ''
        }
      </div>
    )
  }

}

export default RepositoriesTable;