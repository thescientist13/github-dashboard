import './repositories-table.css';
import * as React from 'react';
import { RepositoryInterface } from '../../services/github-api';

interface RepositoriesTableStateInterface {
  repoFilterText: string
}
interface RepositoriesTablePropsInterface {
  hasMoreRepos: boolean,
  getNextRepos: any,
  repositories: Array<RepositoryInterface>
}

class RepositoriesTable extends React.Component<RepositoriesTablePropsInterface, RepositoriesTableStateInterface> {

  constructor(props: RepositoriesTablePropsInterface){
    super(props);

    this.state = {
      repoFilterText: ''
    }
  }

  handleRepoNameFilterChange(event: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      repoFilterText: event.currentTarget.value
    });
  }

  matchRepositoryName(repositoryName: string): boolean {
    let filter = this.state.repoFilterText;

    return filter !== '' && repositoryName.indexOf(filter) < 0;
  }

  render() {
    return (
      <div>
        <label>Filter by Repository Name</label>
        <input placeholder="Repository Name" value={this.state.repoFilterText} onChange={this.handleRepoNameFilterChange.bind(this)}/>

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
          {this.props.repositories.map((repository: RepositoryInterface, index: number) => {
            const filter = this.state.repoFilterText;

            if (this.matchRepositoryName(repository.name)) {
              return;
            }

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
            ? <button className="btn btn-primary" onClick={this.props.getNextRepos}>Load More</button>
            : ''
        }
      </div>
    )
  }

}

export default RepositoriesTable;