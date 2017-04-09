import * as React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import RepositoriesTable from './repositories-table';

describe('RepositoriesTable Component', () => {
  it('renders without crashing', () => {
    let table = shallow(<RepositoriesTable repositories={[]} nextReposUrl={null}/>);

    expect(table.length).toEqual(1);
  });

  it('should render a table with one repo', () => {
    let repos = [{
      details: {
        name: 'test-repo',
        html_url: 'http://api.github.com/my-org/my-repo' // eslint-disable-line camelcase
      },
      issues: [],
      count: 3,
      pullRequests: 1,
      openIssues: 2,
      hasAssignedIssues: false
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
      id: new Date().getTime(),
      name: 'test-repo',
      url: 'http://api.github.com/my-org/my-repo',  // eslint-disable-line camelcase
      hasAssignedIssues: true,
      issues: [],
      count: 3,
      pullRequests: 1,
      openIssues: 2
    }];

    const table = shallow(<RepositoriesTable repositories={repos} hasMoreRepos={true} nextReposUrl={'http://api.github.com?page=2'}/>);

    expect(table.find('button').length).toEqual(1);
  });

  it('should render a table of repos with assignees, pull requests, and issues using snapshot testing', () => {
    let repos = [];

    function noop() {
      return () => {};
    }

    for (let i = 0; i <= 30; i += 1) {
      let nextInc = i + 1;

      repos.push({
        id: nextInc,
        name: 'test-repo' + nextInc,
        url: 'http://api.github.com/my-org/my-repo' + nextInc,
        hasAssignedIssues: i % 2 === 0 || i === 3,  // ensure we have a case where user is the assignee two consecutive row (test bootstrap style hack)
        issues: new Array(i + nextInc),  // intentionally empty, no issue meta data is shown in the UI at this time
        issueCount: i + nextInc,
        pullRequests: i,
        openIssues: nextInc
      });
    }

    const tree = renderer.create(
      <RepositoriesTable repositories={repos} hasMoreRepos={true} getNextRepos={ noop.bind(this) }/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});