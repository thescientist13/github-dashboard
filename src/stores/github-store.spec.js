import githubStoreReducer, { GITHUB_STORE_ACTIONS, getUserDetails, getUserRepositories, getUserSubsctiptions, getIssuesForUserRepository, getIssuesForUserSubscription } from './github-store';
import MOCK_ISSUES_USER_REPOS from '../../test/mocks/issues-user-repository.json';
import MOCK_ISSUES_USER_SUBSCRIPTIONS from '../../test/mocks/issues-user-subscription.json';
import MOCK_USER_DETAILS from '../../test/mocks/user-details.json';
import MOCK_USER_REPOS from '../../test/mocks/user-repositories.json';
import MOCK_USER_SUBSCRIPTIONS from '../../test/mocks/user-subscriptions.json';

const MOCK_INIT_STATE = {
  userDetails: {},
  userRepositories: [],
  userSubscriptions: [],
  hasMoreRepos: false,
  nextReposUrl: ''
};

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
    ).toEqual(MOCK_INIT_STATE)
  });

  it('should return user details', () => {
    expect(
      githubStoreReducer(MOCK_INIT_STATE, {
        type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
        userDetails: {
          username: MOCK_USER_DETAILS.login,
          avatar: MOCK_USER_DETAILS.avatar_url
        }
      })
    ).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: [],
      userSubscriptions: [],
      hasMoreRepos: false,
      nextReposUrl: ''
    })
  });

  it('should return user repositories', () => {
    let slicedRepo = MOCK_USER_REPOS.slice(0, 1);

    expect(
      githubStoreReducer(MOCK_INIT_STATE, {
        type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
        userRepositories: [{
          id: slicedRepo.id,
          details: slicedRepo,
        }],
        hasMoreRepos: false,
      })
    ).toEqual({
      userDetails: {},
      userRepositories: [{
        "details": slicedRepo,
        "id": slicedRepo.id,
        "issues": {
          "count": 0,
          "hasAssignedIssues": false,
          "issues": [],
          "openIssues": 0,
          "pullRequests": 0,
        }
      }],
      userSubscriptions: [],
      hasMoreRepos: false,
      nextReposUrl: undefined
    })
  });

  //TODO test with more repos

  it('should return get user subscriptions', () => {
    let slicedRepo = MOCK_USER_SUBSCRIPTIONS.slice(0, 1);

    expect(
      githubStoreReducer(MOCK_INIT_STATE, {
        type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
        userSubscriptions: [{
          id: slicedRepo.id,
          details: slicedRepo,
        }],
        hasMoreRepos: false,
      })
    ).toEqual({
      userDetails: {},
      userSubscriptions: [{
        "details": slicedRepo,
        "id": slicedRepo.id,
        "issues": {
          "count": 0,
          "hasAssignedIssues": false,
          "issues": [],
          "openIssues": 0,
          "pullRequests": 0,
        }
      }],
      userRepositories: [],
      hasMoreRepos: false,
      nextReposUrl: undefined
    })
  });

  xit('should return get user subscriptions on top of user details', () => {
    expect(
      githubStoreReducer(MOCK_INIT_STATE, {
        type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
        userDetails: {
          username: MOCK_USER_DETAILS.login,
          avatar: MOCK_USER_DETAILS.avatar_url
        }
      })
    ).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: [],
      userSubscriptions: [],
      hasMoreRepos: false,
      nextReposUrl: ''
    })
  });


  xit('should return get user repositories and initial user details', () => {
  });


  xit('should return get user subscriptions and initial user details', () => {
  });


  xit('should test more state permutations, eg subs, repos and user details', () => {
  });

});