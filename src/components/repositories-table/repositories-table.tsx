import './repositories-table.css';
import * as React from 'react';
import { RepositoryInterface } from '../../services/github-api';

interface RepositoriesTableStateInterface {}
interface RepositoriesTablePropsInterface {
  hasMoreRepos: boolean,
  getNextRepos: any,
  repositories: Array<RepositoryInterface>
}

class RepositoriesTable extends React.Component<RepositoriesTablePropsInterface, RepositoriesTableStateInterface> {

  constructor(props: RepositoriesTablePropsInterface){
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
          {props.repositories.map(function(repository: RepositoryInterface, index: number){
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
          props.hasMoreRepos
            ? <button className="btn btn-primary" onClick={props.getNextRepos}>Load More</button>
            : ''
        }
      </div>
    )
  }

}

export default RepositoriesTable;