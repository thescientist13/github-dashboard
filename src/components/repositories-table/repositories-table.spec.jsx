import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import RepositoriesTable from './repositories-table';

describe('RepositoriesTable Component', () => {
  // TODO getNextRepos
  it('renders without crashing', () => {
    let table = shallow(<RepositoriesTable repositories={[]} nextReposUrl={null}/>);
    expect(table.length).toEqual(1);
  });

  it('should render a table with one repo', () => {
    let repos = [{
      details: {
        name: 'test-repo',
        hasAssignedIssues: true,
        html_url: 'http://api.github.com/my-org/my-repo' // eslint-disable-line camelcase
      },
      issues: 3,
      pullRequests: 1,
      openIssues: 2
    }];

    const table = shallow(<RepositoriesTable repositories={repos} nextReposUrl={null}/>);

    expect(table.find('table').length).toEqual(1);
    expect(table.find('thead').length).toEqual(1);
    expect(table.find('tbody').length).toEqual(1);
    expect(table.find('tr').length).toEqual(2);
    expect(table.find('th').length).toEqual(4);
    expect(table.find('td').length).toEqual(4);
    expect(table.find('button').length).toEqual(0);
  });

  it('should render a load more repos button', () => {
    let repos = [{
      details: {
        name: 'test-repo',
        hasAssignedIssues: true,
        html_url: 'http://api.github.com/my-org/my-repo'  // eslint-disable-line camelcase
      },
      issues: 3,
      pullRequests: 1,
      openIssues: 2
    }];

    const table = shallow(<RepositoriesTable repositories={repos} hasMoreRepos={true} nextReposUrl={'http://api.github.com?page=2'}/>);

    expect(table.find('button').length).toEqual(1);
  });

  // TODO good oppourtunity for snapshot testing?

  xit('should test nextReposUrl', () => {

  });

  xit('should test assignee background', () => {

  });

  xit('should test assignee background', () => {

  });

  xit('should test two assigned repos in a row both have a red background color', () => {

  });

  xit('should test links for repos are set correctly', () => {

  });

  xit('should test name for repos are set correctly', () => {

  });

  xit('should test counts for repos are set correctly', () => {

  });
});