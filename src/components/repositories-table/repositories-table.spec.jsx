import * as React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import RepositoriesTable from './repositories-table';

describe('RepositoriesTable Component', () => {

  it('renders without crashing', () => {
    let table = shallow(<RepositoriesTable repositories={[]} nextReposUrl={null}/>);

    expect(table.length).toEqual(1);
  });

  it('should test repository fullName filter when there is a match', () => {
    const userInput = 'github';
    const repositories = [{
      fullName: 'xxx'
    }, {
      fullName: userInput
    }, {
      fullName: 'yyy'
    }];
    const wrapper = mount(<RepositoriesTable repositories={repositories} nextReposUrl={null}/>);
    const label = wrapper.find('label');
    const input = wrapper.find('input');
    const rows = wrapper.find('tbody tr');

    expect(input.length).toEqual(1);
    expect(label.length).toEqual(1);
    expect(rows.length).toEqual(3);

    input.node.value = userInput;
    wrapper.find('input').simulate('change', input);

    let newRows = wrapper.find('tbody tr');

    expect(newRows.length).toEqual(1);
  });

  it('should test repository fullName filter when there isnt a match', () => {
    const userInput = 'github';
    const repositories = [{
      fullName: 'xxx'
    }, {
      fullName: 'yyy'
    }];
    const wrapper = mount(<RepositoriesTable repositories={repositories} nextReposUrl={null}/>);
    const label = wrapper.find('label');
    const input = wrapper.find('input');
    const rows = wrapper.find('tbody tr');

    expect(input.length).toEqual(1);
    expect(label.length).toEqual(1);
    expect(rows.length).toEqual(2);

    input.node.value = userInput;
    wrapper.find('input').simulate('change', input);

    let newRows = wrapper.find('tbody tr');

    expect(newRows.length).toEqual(0);
  });

  it('should test repository fullName filter does nothing when there is no input', () => {
    const userInput = '';
    const repositories = [{
      fullName: 'xxx'
    }, {
      fullName: 'abc'
    }, {
      fullName: 'yyy'
    }];
    const wrapper = mount(<RepositoriesTable repositories={repositories} nextReposUrl={null}/>);
    const label = wrapper.find('label');
    const input = wrapper.find('input');
    const rows = wrapper.find('tbody tr');

    expect(input.length).toEqual(1);
    expect(label.length).toEqual(1);
    expect(rows.length).toEqual(3);

    input.node.value = userInput;
    wrapper.find('input').simulate('change', input);

    let newRows = wrapper.find('tbody tr');

    expect(newRows.length).toEqual(3);
  });

  it('should test that repo fullName filter controls exist', () => {
    const table = shallow(<RepositoriesTable repositories={[]} nextReposUrl={null}/>);

    expect(table.find('label').length).toEqual(1);
    expect(table.find('input').length).toEqual(1);
  });

  it('should render a table with one repo', () => {
    let repos = [{
      details: {
        fullName: 'test-repo',
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
      fullName: 'test-repo',
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
        fullName: 'test-repo' + nextInc,
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

  it('should add a fork icon when repo is a fork', () => {
    let repos = [{
      id: 'mockForkId',
      fullName: 'test-forked-repo',
      isFork: true,
      url: 'http://api.github.com/my-org/my-repo',
      hasAssignedIssues: 0,
      issues: [],
      issueCount: 0,
      pullRequests: 0,
      openIssues: 0
    }, {
      id: 'mockId',
      fullName: 'test-repo',
      isFork: false,
      url: 'http://api.github.com/my-org/my-repo',
      hasAssignedIssues: 0,
      issues: [],
      issueCount: 0,
      pullRequests: 0,
      openIssues: 0
    }];

    const table = renderer.create(
      <RepositoriesTable repositories={repos}/>
    ).toJSON();

    expect(table).toMatchSnapshot();
  });

});