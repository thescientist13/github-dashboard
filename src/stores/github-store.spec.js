import githubStoreReducer, { GITHUB_STORE_ACTIONS, getUserDetails, getUserRepositories, getUserSubscriptions, getIssuesForUserRepository, getIssuesForUserSubscription } from './github-store';
import MOCK_ISSUES_USER_REPOSITORIES from '../../test/mocks/issues-user-repository.json';
import MOCK_ISSUES_USER_SUBSCRIPTIONS from '../../test/mocks/issues-user-subscription.json';
import MOCK_USER_DETAILS from '../../test/mocks/user-details.json';
import MOCK_USER_REPOSITORIES from '../../test/mocks/user-repositories.json';
import MOCK_USER_SUBSCRIPTIONS from '../../test/mocks/user-subscriptions.json';

const MOCK_INIT_STATE = {
  userDetails: {},
  userSubscriptions: {
    repos: [],
    nextReposUrl: null
  },
  userRepositories: {
    repos: [],
    nextReposUrl: null
  }
};

describe('GitHub Store Actions', () => {

  it('should get user details', () => {
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      userDetails: MOCK_USER_DETAILS
    };

    expect(getUserDetails(MOCK_USER_DETAILS)).toEqual(expectedAction)
  });

  it('should test get user repositories action', () => {
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      userRepositories: MOCK_USER_REPOSITORIES,
      nextReposUrl: null
    };

    expect(getUserRepositories({
      repos: MOCK_USER_REPOSITORIES,
      nextReposUrl: null
    })).toEqual(expectedAction)
  });

  it('it should test get user subscriptions action', () => {
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      userSubscriptions: MOCK_USER_SUBSCRIPTIONS,
      nextReposUrl: 'http://api.github.com?page=2'
    };

    expect(getUserSubscriptions({
      repos: MOCK_USER_SUBSCRIPTIONS,
      nextReposUrl: 'http://api.github.com?page=2'
    })).toEqual(expectedAction)
  });

  it('should test get issues for a user repository action', () => {
    const idx = 30;
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY,
      index: idx,
      issues: MOCK_ISSUES_USER_REPOSITORIES
    };

    expect(getIssuesForUserRepository(MOCK_ISSUES_USER_REPOSITORIES, idx)).toEqual(expectedAction)
  });

  it('should test get issues for a user subscription action', () => {
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

  it('it should return the initial state', () => {
    expect(
      githubStoreReducer(undefined, {})
    ).toEqual(MOCK_INIT_STATE)
  });

  it('it should return user details state', () => {
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
      userRepositories: {
        repos: [],
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: [],
        nextReposUrl: null
      }
    })
  });

  it('should test get user repositories state', () => {
    let slicedRepo = MOCK_USER_REPOSITORIES.slice(0, 1);

    expect(
      githubStoreReducer(MOCK_INIT_STATE, {
        type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
        userRepositories: [{
          id: slicedRepo.id,
          details: slicedRepo,
        }],
        nextReposUrl: null
      })
    ).toEqual({
      userDetails: {},
      userRepositories: {
        repos: [{
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
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: [],
        nextReposUrl: null
      }
    })
  });

  it('it should test get user subscriptions state', () => {
    let slicedRepo = MOCK_USER_SUBSCRIPTIONS.slice(0, 1);

    expect(
      githubStoreReducer(MOCK_INIT_STATE, {
        type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
        userSubscriptions: [{
          id: slicedRepo.id,
          details: slicedRepo,
        }],
        nextReposUrl: null,
      })
    ).toEqual({
      userDetails: {},
      userSubscriptions: {
        repos: [{
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
        nextReposUrl: null
      },
      userRepositories: {
        repos: [],
        nextReposUrl: null
      }
    })
  });

  it('should test get user repositories and user details state', () => {
    let slicedRepo = MOCK_USER_REPOSITORIES.slice(0, 1);
    let action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      }
    });
    let action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      userRepositories: [{
        id: slicedRepo.id,
        details: slicedRepo,
      }],
      nextReposUrl: null
    });

    expect(action2).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: {
        repos: [{
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
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: [],
        nextReposUrl: null
      }
    })
  });

  it('should test get user subscriptions and user details state', () => {
    let slicedRepo = MOCK_USER_SUBSCRIPTIONS.slice(0, 1);
    let action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      }
    });
    let action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      userSubscriptions: [{
        id: slicedRepo.id,
        details: slicedRepo,
      }],
      nextReposUrl: null
    });

    expect(action2).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: {
        repos: [],
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: [{
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
        nextReposUrl: null
      }
    })
  });

  it('should test get user subscriptions and user repositories and user details', () => {
    let slicedRepo = MOCK_USER_SUBSCRIPTIONS.slice(0, 1);
    let action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      }
    });
    let action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      userRepositories: [{
        id: slicedRepo.id,
        details: slicedRepo,
      }],
      nextReposUrl: null
    });
    let action3 = githubStoreReducer(action2, {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      userSubscriptions: [{
        id: slicedRepo.id,
        details: slicedRepo,
      }],
      nextReposUrl: null
    });

    expect(action3).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: {
        repos: [{
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
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: [{
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
        nextReposUrl: null
      }
    })
  });

  it('should test adding 9 + 9 user repositories', () => {
    let expectedSlicedReposFirst = [];
    let expectedSlicedReposSecond = [];
    let slicedReposFirst = MOCK_ISSUES_USER_REPOSITORIES.slice(0, 9);
    let slicedReposSecond = MOCK_ISSUES_USER_REPOSITORIES.slice(9);
    let action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      userRepositories: slicedReposFirst,
      nextReposUrl: null
    });

    slicedReposFirst.forEach((repo) => {
      expectedSlicedReposFirst.push({
        "details": repo.details,
        "id": repo.id,
        "issues": {
          "count": 0,
          "hasAssignedIssues": false,
          "issues": [],
          "openIssues": 0,
          "pullRequests": 0
        }
      })
    });

    slicedReposSecond.forEach((repo) => {
      expectedSlicedReposSecond.push({
        "details": repo.details,
        "id": repo.id,
        "issues": {
          "count": 0,
          "hasAssignedIssues": false,
          "issues": [],
          "openIssues": 0,
          "pullRequests": 0
        }
      })
    });

    expect(action1).toEqual({
      userDetails: {},
      userRepositories: {
        repos: expectedSlicedReposFirst,
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: [],
        nextReposUrl: null
      }
    });

    let action2 = githubStoreReducer({
      userDetails: {},
      userRepositories: {
        repos: expectedSlicedReposFirst,
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: [],
        nextReposUrl: null
      }
    }, {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      userRepositories: slicedReposSecond,
      nextReposUrl: null
    });

    expect(action2).toEqual({
      userDetails: {},
      userRepositories: {
        repos: expectedSlicedReposFirst.concat(expectedSlicedReposSecond),
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: [],
        nextReposUrl: null
      }
    });
  });


  it('should test adding 15 + 15 user subscriptions', () => {
    let expectedSlicedReposFirst = [];
    let expectedSlicedReposSecond = [];
    let slicedReposFirst = MOCK_ISSUES_USER_SUBSCRIPTIONS.slice(0, 15);
    let slicedReposSecond = MOCK_ISSUES_USER_SUBSCRIPTIONS.slice(15);
    let action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      userSubscriptions: slicedReposFirst,
      nextReposUrl: null
    });

    slicedReposFirst.forEach((repo) => {
      expectedSlicedReposFirst.push({
        "details": repo.details,
        "id": repo.id,
        "issues": {
          "count": 0,
          "hasAssignedIssues": false,
          "issues": [],
          "openIssues": 0,
          "pullRequests": 0
        }
      })
    });

    slicedReposSecond.forEach((repo) => {
      expectedSlicedReposSecond.push({
        "details": repo.details,
        "id": repo.id,
        "issues": {
          "count": 0,
          "hasAssignedIssues": false,
          "issues": [],
          "openIssues": 0,
          "pullRequests": 0
        }
      })
    });

    expect(action1).toEqual({
      userDetails: {},
      userRepositories: {
        repos: [],
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: expectedSlicedReposFirst,
        nextReposUrl: null
      }
    });

    let action2 = githubStoreReducer({
      userDetails: {},
      userRepositories: {
        repos: [],
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: expectedSlicedReposFirst,
        nextReposUrl: null
      }
    }, {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      userSubscriptions: slicedReposSecond,
      nextReposUrl: null
    });

    expect(action2).toEqual({
      userDetails: {},
      userRepositories: {
        repos: [],
        nextReposUrl: null
      },
      userSubscriptions: {
        repos: expectedSlicedReposFirst.concat(expectedSlicedReposSecond),
        nextReposUrl: null
      }
    });
  });

  xit('should test read user details', () => {
  });

  xit('should test read user repositories', () => {
  });

  xit('should test read user subscriptions', () => {
  });

  xit('should test getting issues', () => {
  });

});