import { GithubApi } from './github-api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MOCK_USER_CREDENTIALS from  '../../test/mocks/user-credentials.json';
import MOCK_USER_DETAILS from '../../test/mocks/user-details.json';
import MOCK_USER_REPOS from '../../test/mocks/user-repositories.json';
import MOCK_USER_SUBSCRIPTIONS from '../../test/mocks/user-repositories.json';


describe('GitHub API Service', () => {

  it('should test getUserDetails returns correct user data', () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://api.github.com/user').reply(200, MOCK_USER_DETAILS);

    let userDetails = new GithubApi(MOCK_USER_CREDENTIALS).getUserDetails().then((response) => {
      expect(response.username).toEqual(MOCK_USER_DETAILS.login);
      expect(response.avatar).toEqual(MOCK_USER_DETAILS.avatar_url);
    });

  });

  it('should test getUserRepositories returns correct user repositories data with no more repos', () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/repos').reply(200, MOCK_USER_REPOS, {});

    new GithubApi(MOCK_USER_CREDENTIALS).getUserRepositories().then((response) => {
      //XXX TODO assert details property and other meta data, after changing from any
      expect(response.repos.length).toEqual(MOCK_USER_REPOS.length);
      expect(response.nextReposUrl).toEqual(null);
      expect(response.hasMoreRepos).toEqual(false);
    });

  });

  it('should test getUserRepositories returns correct user repositories data with additional repos', () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/repos').reply(200, MOCK_USER_REPOS,  {
      link: '<https://api.github.com/user/895923/repos?page=2>; rel="next", <https://api.github.com/user/895923/repos?page=5>; rel="last"'
    });

    new GithubApi(MOCK_USER_CREDENTIALS).getUserRepositories().then((response) => {
      //XXX TODO assert details property and other meta data, after changing from any
      expect(response.repos.length).toEqual(MOCK_USER_REPOS.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/repos?page=2');
      expect(response.hasMoreRepos).toEqual(true);
    });

  });


  it('should test getUserSubscriptions returns correct user subscriptions data with more repos', () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/subscriptions').reply(200, MOCK_USER_SUBSCRIPTIONS, {
      link: '<https://api.github.com/user/895923/subscriptions?page=2>; rel="next", <https://api.github.com/user/895923/subscriptions?page=5>; rel="last"'
    });

    new GithubApi(MOCK_USER_CREDENTIALS).getUserSubscriptions().then((response) => {
      //XXX TODO assert details property and other meta data, after changing from any
      expect(response.repos.length).toEqual(MOCK_USER_SUBSCRIPTIONS.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/subscriptions?page=2');
      expect(response.hasMoreRepos).toEqual(true);
    });

  });

  it('should test getUserSubscriptions returns no user subscriptions with no more repos', () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/subscriptions').reply(200, [], {});

    new GithubApi(MOCK_USER_CREDENTIALS).getUserSubscriptions().then((response) => {
      //XXX TODO assert details property and other meta data, after changing from any
      expect(response.repos.length).toEqual(0);
      expect(response.nextReposUrl).toEqual(null);
      expect(response.hasMoreRepos).toEqual(false);
    });

  });

  it('should test getUserRepositories returns correct user repositories data with no more repos', () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/subscriptions').reply(200, MOCK_USER_REPOS, {
      link: '<https://api.github.com/user/895923/subscriptions?page=2>; rel="next", <https://api.github.com/user/895923/subscriptions?page=5>; rel="last"'
    });

    new GithubApi(MOCK_USER_CREDENTIALS).getUserSubscriptions().then((response) => {
      //XXX TODO assert details property and other meta data, after changing from any
      expect(response.repos.length).toEqual(MOCK_USER_REPOS.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/subscriptions?page=2');
      expect(response.hasMoreRepos).toEqual(true);
    });

  });

  xit('should test for multiple assignees', () => {

  });

});