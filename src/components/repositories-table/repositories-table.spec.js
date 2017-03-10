import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import RepositoriesTable from './repositories-table';

describe('RepositoriesTable Component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    render(<RepositoriesTable
      repositories={[]}
      hasMoreRepos={false}
      nextReposUrl={undefined}/>, div);
  });

  it('should render a table with one repo', () => {
    const div = document.createElement('div');

    let repos = [{
      details: {
        name: 'test-repo',
        hasAssignedIssues: true,
        html_url: 'http://api.github.com/my-org/my-repo'
      },
      issues: 3,
      pullRequests: 1,
      openIssues: 2
    }];

    const table = shallow(<RepositoriesTable repositories={repos} hasMoreRepos={false} nextReposUrl={undefined}/>);

    expect(table.find('table').length).toEqual(1);
    expect(table.find('thead').length).toEqual(1);
    expect(table.find('tbody').length).toEqual(1);
    expect(table.find('tr').length).toEqual(2);
    expect(table.find('th').length).toEqual(4);
    expect(table.find('td').length).toEqual(4);
    expect(table.find('button').length).toEqual(0);
  });

  it('should render a load more repos button', () => {
    const div = document.createElement('div');

    let repos = [{
      details: {
        name: 'test-repo',
        hasAssignedIssues: true,
        html_url: 'http://api.github.com/my-org/my-repo'
      },
      issues: 3,
      pullRequests: 1,
      openIssues: 2
    }];

    const table = shallow(<RepositoriesTable repositories={repos} hasMoreRepos={true} nextReposUrl={'http://api.github.com?page=2'}/>);

    expect(table.find('button').length).toEqual(1);
  });

  //TODO good oppourtunity for snapshot testing?
});