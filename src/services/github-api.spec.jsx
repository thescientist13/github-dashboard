import { GithubApi } from './github-api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MOCK_USER_CREDENTIALS from  '../../test/mocks/user-credentials.json';
import MOCK_USER_DETAILS from '../../test/mocks/user-details.json';
import MOCK_USER_REPOS from '../../test/mocks/user-repositories.json';
import MOCK_USER_SUBSCRIPTIONS from '../../test/mocks/user-repositories.json';
import MOCK_ISSUES_FOR_REPOSITORY from '../../test/mocks/issues-user-repository.json';
import MOCK_ISSUES_FOR_SUBSCRIPTION from '../../test/mocks/issues-user-subscription.json';

describe('GitHub API Service', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('should test getUserDetails returns correct user data', () => {
    mock.onGet('https://api.github.com/user').reply(200, MOCK_USER_DETAILS);

    const userDetails = new GithubApi(MOCK_USER_CREDENTIALS).getUserDetails().then((response) => {
      expect(response.username).toEqual(MOCK_USER_DETAILS.login);
      expect(response.avatar).toEqual(MOCK_USER_DETAILS.avatar_url);
    });
  });

  it('should test getUserRepositories returns correct user repositories data with no more repos', () => {
    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/repos').reply(200, MOCK_USER_REPOS, {});

    new GithubApi(MOCK_USER_CREDENTIALS).getUserRepositories().then((response) => {
      expect(response.repositories.length).toEqual(MOCK_USER_REPOS.length);
      expect(response.nextReposUrl).toEqual(null);
    });
  });

  it('should test getUserRepositories returns correct user repositories data with additional repos', () => {
    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/repos').reply(200, MOCK_USER_REPOS,  {
      link: '<https://api.github.com/user/895923/repos?page=2>; rel="next", <https://api.github.com/user/895923/repos?page=5>; rel="last"'
    });

    new GithubApi(MOCK_USER_CREDENTIALS).getUserRepositories().then((response) => {
      expect(response.repositories.length).toEqual(MOCK_USER_REPOS.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/repos?page=2');
    });
  });


  it('should test getUserSubscriptions returns correct user subscriptions data with more repos', () => {
    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/subscriptions').reply(200, MOCK_USER_SUBSCRIPTIONS, {
      link: '<https://api.github.com/user/895923/subscriptions?page=2>; rel="next", <https://api.github.com/user/895923/subscriptions?page=5>; rel="last"'
    });

    new GithubApi(MOCK_USER_CREDENTIALS).getUserSubscriptions().then((response) => {
      expect(response.repositories.length).toEqual(MOCK_USER_SUBSCRIPTIONS.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/subscriptions?page=2');
    });
  });

  it('should test getUserSubscriptions returns no user subscriptions with no more repos', () => {
    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/subscriptions').reply(200, [], {});

    new GithubApi(MOCK_USER_CREDENTIALS).getUserSubscriptions().then((response) => {
      expect(response.repositories.length).toEqual(0);
      expect(response.nextReposUrl).toEqual(undefined);
    });
  });

  it('should test getUserRepositories returns correct user repositories data with no more repos', () => {
    mock.onGet('https://api.github.com/users/' + MOCK_USER_CREDENTIALS.username + '/subscriptions').reply(200, MOCK_USER_REPOS, {
      link: '<https://api.github.com/user/895923/subscriptions?page=2>; rel="next", <https://api.github.com/user/895923/subscriptions?page=5>; rel="last"'
    });

    new GithubApi(MOCK_USER_CREDENTIALS).getUserSubscriptions().then((response) => {
      expect(response.repositories.length).toEqual(MOCK_USER_REPOS.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/subscriptions?page=2');
    });
  });

  it('should test getIssuesForRepository (personal) returns correctly modeled data', () => {
    const repoName = 'github-dashboard';

    mock.onGet('https://api.github.com/repos/' + MOCK_USER_CREDENTIALS.username + '/' + repoName + '/issues').reply(200, MOCK_ISSUES_FOR_REPOSITORY);

    new GithubApi(MOCK_USER_CREDENTIALS).getIssuesForRepository(repoName).then((response) => {
      expect(response.pullRequests).toEqual(3);
      expect(response.issues.length).toEqual(18);
      expect(response.issueCount).toEqual(18);
      expect(response.openIssues).toEqual(15);
      expect(response.hasAssignedIssues).toEqual(true);
    });
  });

  it('should test getIssuesForRepository (subscribed) returns correctly modeled data', () => {
    const repoName = 'spinikube';

    mock.onGet('https://api.github.com/repos/' + MOCK_USER_CREDENTIALS.username + '/' + repoName + '/issues').reply(200, MOCK_ISSUES_FOR_SUBSCRIPTION);

    new GithubApi(MOCK_USER_CREDENTIALS).getIssuesForRepository(repoName).then((response) => {
      expect(response.pullRequests).toEqual(1);
      expect(response.issues.length).toEqual(15);
      expect(response.issueCount).toEqual(15);
      expect(response.openIssues).toEqual(14);
      expect(response.hasAssignedIssues).toEqual(false);
    });
  });

});