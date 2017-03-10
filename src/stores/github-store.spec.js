import {GITHUB_STORE_ACTIONS, getUserDetails, getUserRepositories, getUserSubsctiptions, getIssuesForUserRepository, getIssuesForUserSubscription}   from './github-store';
import MOCK_USER_DETAILS from '../../test/mocks/user-details.json';
import MOCK_USER_REPOS from '../../test/mocks/user-repositories.json';
import MOCK_USER_SUBSCRIPTIONS from '../../test/mocks/user-subscriptions.json';

describe('Actions', () => {

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

});