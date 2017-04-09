import * as React from 'react';
import { connect } from 'react-redux';
import { RepositoryInterface } from '../../services/github-api';
import { readUserRepositories } from '../../stores/github-store';
import RepositoriesTable from '../../components/repositories-table/repositories-table';

interface PersonalPropsInterface {
  repositories: Array<RepositoryInterface>,
  nextReposUrl: string,
  getNextUserRepositoriesWithIssues: any,
  dispatch: any
}

interface PersonalStateInterface {
  repositories: Array<RepositoryInterface>,
  nextReposUrl: string,
  hasMoreRepos: boolean
}

function mapStateToProps(state: PersonalStateInterface) {
  return {
    repositories: state.repositories,
    nextReposUrl: state.nextReposUrl
  };
}

export class PersonalRepositoriesView extends React.Component<PersonalPropsInterface, PersonalStateInterface>{

  constructor(props: PersonalPropsInterface) {
    super(props);


    this.state = {
      repositories: [],
      nextReposUrl: '',
      hasMoreRepos: false
    };
  }

  componentWillReceiveProps(nextProps: PersonalPropsInterface): void {
    this.setState({
      repositories: nextProps.repositories,
      nextReposUrl: nextProps.nextReposUrl,
      hasMoreRepos: !!nextProps.nextReposUrl
    });
  }

  componentWillMount(): void {
    this.props.dispatch(readUserRepositories());
  }

  private getNextUserRepositoriesWithIssues(): void {
    this.props.getNextUserRepositoriesWithIssues(this.state.nextReposUrl, this.state.repositories.length);
  }

  render() {
    return (
      <div>
        <h3>Personal Repositories</h3>
        <RepositoriesTable
          repositories={this.state.repositories}
          hasMoreRepos={this.state.hasMoreRepos}
          getNextRepos={this.getNextUserRepositoriesWithIssues.bind(this)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(PersonalRepositoriesView);