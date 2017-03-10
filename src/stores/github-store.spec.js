import githubStoreReducer, { GITHUB_STORE_ACTIONS, getUserDetails, getUserRepositories, getUserSubsctiptions, getIssuesForUserRepository, getIssuesForUserSubscription } from './github-store';
import MOCK_ISSUES_USER_REPOS from '../../test/mocks/issues-user-repository.json';
import MOCK_ISSUES_USER_SUBSCRIPTIONS from '../../test/mocks/issues-user-subscription.json';
import MOCK_USER_DETAILS from '../../test/mocks/user-details.json';
import MOCK_USER_REPOS from '../../test/mocks/user-repositories.json';
import MOCK_USER_SUBSCRIPTIONS from '../../test/mocks/user-subscriptions.json';

describe('GitHub Store Actions', () => {

  it('should get user details', () => {
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      userDetails: MOCK_USER_DETAILS
    };

    expect(getUserDetails(MOCK_USER_DETAILS)).toEqual(expectedAction)
  });

  it('should get user repositories', () => {
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      userRepositories: MOCK_USER_REPOS,
      hasMoreRepos: true,
      nextReposUrl: null
    };

    expect(getUserRepositories({
      repos: MOCK_USER_REPOS,
      hasMoreRepos: true,
      nextReposUrl: null
    })).toEqual(expectedAction)
  });

  it('should get user subscriptions', () => {
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      userSubscriptions: MOCK_USER_SUBSCRIPTIONS,
      hasMoreRepos: true,
      nextReposUrl: 'http://api.github.com?page=2'
    };

    expect(getUserSubsctiptions({
      repos: MOCK_USER_SUBSCRIPTIONS,
      hasMoreRepos: true,
      nextReposUrl: 'http://api.github.com?page=2'
    })).toEqual(expectedAction)
  });

  it('should get issues for a user repository', () => {
    const idx = 30;
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY,
      index: idx,
      issues: MOCK_ISSUES_USER_REPOS
    };

    expect(getIssuesForUserRepository(MOCK_ISSUES_USER_REPOS, idx)).toEqual(expectedAction)
  });

  it('should get issues for a user subscription', () => {
    const idx = 60;
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION,
      index: idx,
      issues: MOCK_ISSUES_USER_SUBSCRIPTIONS
    };

    expect(getIssuesForUserSubscription(MOCK_ISSUES_USER_SUBSCRIPTIONS, idx)).toEqual(expectedAction)
  });

});

describe('GitHub Store Reducer', () => {

  it('should return the initial state', () => {
    expect(
      githubStoreReducer(undefined, {})
    ).toEqual({
      userDetails: {},
      userRepositories: [],
      userSubscriptions: [],
      hasMoreRepos: false,
      nextReposUrl: ''
    })
  })

});