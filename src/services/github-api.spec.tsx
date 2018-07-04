import { GithubApi } from './github-api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Credentials, CredentialsInterface } from './credentials';
import * as MOCK_USER_DETAILS from '../../test/mocks/user-details.json';
import * as MOCK_USER_REPOS from '../../test/mocks/user-repositories.json';
import * as MOCK_USER_SUBSCRIPTIONS from '../../test/mocks/user-repositories.json';
import * as MOCK_ISSUES_FOR_REPOSITORY from '../../test/mocks/issues-user-repository.json';
import * as MOCK_ISSUES_FOR_SUBSCRIPTION from '../../test/mocks/issues-user-subscription.json';

jest.mock('./credentials');

describe('GitHub API Service', () => {
  let mockAxios, mockCredentials;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    mockCredentials = new Credentials().getCredentials();
  });

  it('should test getUserDetails returns correct user data', () => {
    mockAxios.onGet('https://api.github.com/user').reply(200, MOCK_USER_DETAILS);

    new GithubApi(mockCredentials).getUserDetails().then((response) => {
      expect(response.username).toEqual(MOCK_USER_DETAILS.login);
      expect(response.avatar).toEqual(MOCK_USER_DETAILS.avatar_url);
    }).catch((response) => {
      console.log('error response', response)
    });
  });

  it('should test getUserRepositories returns correct user repositories data with no more repos', () => {
    mockAxios.onGet(`https://api.github.com/users/${mockCredentials.username}/repos`).reply(200, MOCK_USER_REPOS, {});

    new GithubApi(mockCredentials).getUserRepositories().then((response) => {
      expect(response.repositories.length).toEqual(MOCK_USER_REPOS.length);
      expect(response.nextReposUrl).toEqual(undefined);
    }).catch(((error) => {
      console.log(error);
    }));
  });

  it('should test getUserRepositories returns correct user repositories data with additional repos', () => {
    mockAxios.onGet(`https://api.github.com/users/${mockCredentials.username}/repos`).reply(200, MOCK_USER_REPOS,  {
      link: '<https://api.github.com/user/895923/repos?page=2>; rel="next", <https://api.github.com/user/895923/repos?page=5>; rel="last"'
    });

    new GithubApi(mockCredentials).getUserRepositories().then((response) => {
      expect(response.repositories.length).toEqual(MOCK_USER_REPOS.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/repos?page=2');
    }).catch(((error) => {
      console.log(error);
    }));
  });


  it('should test getUserSubscriptions returns correct user subscriptions data with more repos', () => {
    mockAxios.onGet(`https://api.github.com/users/${mockCredentials.username}/subscriptions`).reply(200, MOCK_USER_SUBSCRIPTIONS, {
      link: '<https://api.github.com/user/895923/subscriptions?page=2>; rel="next", <https://api.github.com/user/895923/subscriptions?page=5>; rel="last"'
    });

    new GithubApi(mockCredentials).getUserSubscriptions().then((response) => {
      expect(response.repositories.length).toEqual(MOCK_USER_SUBSCRIPTIONS.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/subscriptions?page=2');
    }).catch(((error) => {
      console.log(error);
    }));
  });

  it('should test getUserSubscriptions returns no user subscriptions with no more repos', () => {
    mockAxios.onGet(`https://api.github.com/users/${mockCredentials.username}/subscriptions`).reply(200, [], {});

    new GithubApi(mockCredentials).getUserSubscriptions().then((response) => {
      expect(response.repositories.length).toEqual(0);
      expect(response.nextReposUrl).toBe(undefined);
    });
  });

  it('should test getUserRepositories returns correct user repositories data and next URL', () => {
    mockAxios.onGet(`https://api.github.com/users/${mockCredentials.username}/subscriptions`).reply(200, MOCK_USER_REPOS, {
      link: '<https://api.github.com/user/895923/subscriptions?page=2>; rel="next", <https://api.github.com/user/895923/subscriptions?page=5>; rel="last"'
    });

    new GithubApi(mockCredentials).getUserSubscriptions().then((response) => {
      expect(response.repositories.length).toEqual(MOCK_USER_REPOS.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/subscriptions?page=2');
    }).catch(((error) => {
      console.log(error);
    }));
  });

  it('should test getIssuesForRepository (personal) returns correctly modeled data', () => {
    const repoName = 'github-dashboard';
    const mockGithubUserCredentials: CredentialsInterface = {
      username: 'thescientist13', 
      accessToken: mockCredentials.accessToken
    };

    mockAxios.onGet(`https://api.github.com/repos/${mockGithubUserCredentials.username}/${repoName}/issues`).reply(200, MOCK_ISSUES_FOR_REPOSITORY);

    new GithubApi(mockGithubUserCredentials).getIssuesForRepository(repoName).then((response) => {
      expect(response.pullRequests).toEqual(3);
      expect(response.issues.length).toEqual(18);
      expect(response.openIssues).toEqual(15);
      expect(response.hasAssignedIssues).toEqual(true);
    }).catch(((error) => {
      console.log(error);
    }));
  });

  it('should test getIssuesForRepository (subscribed) returns correctly modeled data', () => {
    const repoName = 'spinikube';

    mockAxios.onGet(`https://api.github.com/repos/${mockCredentials.username}/${repoName}/issues`).reply(200, MOCK_ISSUES_FOR_SUBSCRIPTION);

    new GithubApi(mockCredentials).getIssuesForRepository(repoName).then((response) => {
      expect(response.pullRequests).toEqual(1);
      expect(response.issues.length).toEqual(15);
      expect(response.openIssues).toEqual(14);
      expect(response.hasAssignedIssues).toEqual(false);
    }).catch(((error) => {
      console.log(error);
    }));
  });


});