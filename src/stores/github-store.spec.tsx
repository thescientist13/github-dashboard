import githubStoreReducer, { GITHUB_STORE_ACTIONS, getUserDetails, getUserRepositories, getUserSubscriptions, getIssuesForUserRepository, getIssuesForUserSubscription } from './github-store';
import * as MOCK_ISSUES_USER_REPOSITORIES from '../../test/mocks/issues-user-repository.json';
import * as MOCK_ISSUES_USER_SUBSCRIPTIONS from '../../test/mocks/issues-user-subscription.json';
import * as MOCK_USER_DETAILS from '../../test/mocks/user-details.json';
import * as MOCK_USER_REPOSITORIES from '../../test/mocks/user-repositories.json';
import * as MOCK_USER_SUBSCRIPTIONS from '../../test/mocks/user-subscriptions.json';

const MOCK_INIT_STATE = {
  userDetails: {
    username: '',
    avatar: ''
  },
  userSubscriptions: {
    repositories: [],
    nextReposUrl: undefined
  },
  userRepositories: {
    repositories: [],
    nextReposUrl: undefined
  }
};


describe('GitHub Store Actions', () => {

  it('should get user details', () => {
    const action = {
      username: MOCK_USER_DETAILS.login,
      avatar: MOCK_USER_DETAILS.avatar_url
    };
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      username: MOCK_USER_DETAILS.login,
      avatar: MOCK_USER_DETAILS.avatar_url
    };

    expect(getUserDetails(action)).toEqual(expectedAction);
  });

  it('should test get user repositories action', () => {
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      repositories: MOCK_USER_REPOSITORIES,
      nextReposUrl: undefined
    };

    expect(getUserRepositories(MOCK_USER_REPOSITORIES, undefined)).toEqual(expectedAction);
  });

  it('should test get user repositories action with nextReposUrl', () => {
    const url = 'http://api.github.com?page=1';
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      repositories: MOCK_USER_REPOSITORIES,
      nextReposUrl: url
    };

    expect(getUserRepositories(MOCK_USER_REPOSITORIES, url)).toEqual(expectedAction);
  });

  it('it should test get user subscriptions action', () => {
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      repositories: MOCK_USER_SUBSCRIPTIONS,
      nextReposUrl: undefined
    };

    expect(getUserSubscriptions(MOCK_USER_SUBSCRIPTIONS, undefined)).toEqual(expectedAction);
  });

  it('it should test get user subscriptions action with nextReposUrl', () => {
    const url = 'http://api.github.com?page=2';
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      repositories: MOCK_USER_SUBSCRIPTIONS,
      nextReposUrl: url
    };

    expect(getUserSubscriptions(MOCK_USER_SUBSCRIPTIONS, url)).toEqual(expectedAction);
  });

  it('should test get issues for a user repository action', () => {
    const offsetIdx = 30;
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY,
      index: offsetIdx,
      issues: MOCK_ISSUES_USER_REPOSITORIES,
      openIssues: MOCK_ISSUES_USER_REPOSITORIES.length,
      pullRequests: 1,
      hasAssignedIssues: false
    };

    expect(getIssuesForUserRepository({
      issues: MOCK_ISSUES_USER_REPOSITORIES,
      openIssues: MOCK_ISSUES_USER_REPOSITORIES.length,
      pullRequests: 1,
      hasAssignedIssues: false
    }, offsetIdx)).toEqual(expectedAction)
  });

  it('should test get issues for a user subscription action', () => {
    const offsetIdx = 60;
    const expectedAction = {
      type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION,
      index: offsetIdx,
      issues: MOCK_ISSUES_USER_SUBSCRIPTIONS,
      openIssues: MOCK_ISSUES_USER_SUBSCRIPTIONS.length,
      pullRequests: 1,
      hasAssignedIssues: true
    };

    expect(getIssuesForUserSubscription({
      issues: MOCK_ISSUES_USER_SUBSCRIPTIONS,
      openIssues: MOCK_ISSUES_USER_SUBSCRIPTIONS.length,
      pullRequests: 1,
      hasAssignedIssues: true
    }, offsetIdx)).toEqual(expectedAction)
  });

});

describe('GitHub Store Reducer', () => {

  it('it should return the initial state', () => {
    expect(githubStoreReducer(undefined, {})).toEqual(MOCK_INIT_STATE)
  });

  it('it should return user details state', () => {
    const action = {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      username: MOCK_USER_DETAILS.login,
      avatar: MOCK_USER_DETAILS.avatar_url
    };

    expect(githubStoreReducer(MOCK_INIT_STATE, action)).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: {
        repositories: [],
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: [],
        nextReposUrl: undefined
      }
    })
  });

  it('should test get user repositories state', () => {
    const mockRepos = MOCK_USER_REPOSITORIES.slice(0, 1);
    const action = {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      repositories: mockRepos,
      nextReposUrl: undefined
    };

    expect(githubStoreReducer(MOCK_INIT_STATE, action)).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userRepositories: {
        repositories: [{
          id: mockRepos[0].id,
          name: mockRepos[0].name,
          url: mockRepos[0].url,
          owner: mockRepos[0].owner
        }],
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: [],
        nextReposUrl: undefined
      }
    })
  });

  it('it should test get user subscriptions state', () => {
    const mockRepos = MOCK_USER_SUBSCRIPTIONS.slice(0, 1);
    const action = {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      repositories: mockRepos,
      nextReposUrl: undefined,
    };

    expect(githubStoreReducer(MOCK_INIT_STATE, action)).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userSubscriptions: {
        repositories: [{
          id: mockRepos[0].id,
          name: mockRepos[0].name,
          url: mockRepos[0].url,
          owner: mockRepos[0].owner
        }],
        nextReposUrl: undefined
      },
      userRepositories: {
        repositories: [],
        nextReposUrl: undefined
      }
    })
  });

  it('should test get user repositories and user details state', () => {
    const mockRepos = MOCK_USER_REPOSITORIES.slice(0, 1);
    const action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      username: MOCK_USER_DETAILS.login,
      avatar: MOCK_USER_DETAILS.avatar_url
    });
    const action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      repositories: mockRepos,
      nextReposUrl: undefined
    });

    expect(action2).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: {
        repositories: [{
          id: mockRepos[0].id,
          name: mockRepos[0].name,
          url: mockRepos[0].url,
          owner: mockRepos[0].owner
        }],
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: [],
        nextReposUrl: undefined
      }
    })
  });

  it('should test get user subscriptions and user details state', () => {
    const mockRepos = MOCK_USER_SUBSCRIPTIONS.slice(0, 1);
    const action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      username: MOCK_USER_DETAILS.login,
      avatar: MOCK_USER_DETAILS.avatar_url
    });
    const action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      repositories: mockRepos,
      nextReposUrl: undefined
    });

    expect(action2).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: {
        repositories: [],
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: [{
          id: mockRepos[0].id,
          name: mockRepos[0].name,
          url: mockRepos[0].url,
          owner: mockRepos[0].owner
        }],
        nextReposUrl: undefined
      }
    })
  });

  it('should test get user subscriptions and user repositories and user details', () => {
    const mockRepos = MOCK_USER_SUBSCRIPTIONS.slice(0, 1);
    const action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      username: MOCK_USER_DETAILS.login,
      avatar: MOCK_USER_DETAILS.avatar_url
    });
    const action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      repositories: mockRepos,
      nextReposUrl: undefined
    });
    const action3 = githubStoreReducer(action2, {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      repositories: mockRepos,
      nextReposUrl: undefined
    });

    expect(action3).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: {
        repositories: [{
          id: mockRepos[0].id,
          name: mockRepos[0].name,
          url: mockRepos[0].url,
          owner: mockRepos[0].owner
        }],
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: [{
          id: mockRepos[0].id,
          name: mockRepos[0].name,
          url: mockRepos[0].url,
          owner: mockRepos[0].owner
        }],
        nextReposUrl: undefined
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
      repositories: slicedReposFirst,
      nextReposUrl: undefined
    });

    slicedReposFirst.forEach((repo) => {
      expectedSlicedReposFirst.push({
        id: repo.id,
        name: repo.name,
        url: repo.url,
        owner: repo.owner
      })
    });

    slicedReposSecond.forEach((repo) => {
      expectedSlicedReposSecond.push({
        id: repo.id,
        name: repo.name,
        url: repo.url,
        owner: repo.owner
      })
    });

    expect(action1).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userRepositories: {
        repositories: expectedSlicedReposFirst,
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: [],
        nextReposUrl: undefined
      }
    });

    let action2 = githubStoreReducer({
      userDetails: {
        username: '',
        avatar: ''
      },
      userRepositories: {
        repositories: expectedSlicedReposFirst,
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: [],
        nextReposUrl: undefined
      }
    }, {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      repositories: slicedReposSecond,
      nextReposUrl: undefined
    });

    expect(action2).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userRepositories: {
        repositories: expectedSlicedReposFirst.concat(expectedSlicedReposSecond),
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: [],
        nextReposUrl: undefined
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
      repositories: slicedReposFirst,
      nextReposUrl: undefined
    });

    slicedReposFirst.forEach((repo) => {
      expectedSlicedReposFirst.push({
        id: repo.id,
        name: repo.name,
        url: repo.url,
        owner: repo.owner
      })
    });

    slicedReposSecond.forEach((repo) => {
      expectedSlicedReposSecond.push({
        id: repo.id,
        name: repo.name,
        url: repo.url,
        owner: repo.owner
      })
    });

    expect(action1).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userRepositories: {
        repositories: [],
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: expectedSlicedReposFirst,
        nextReposUrl: undefined
      }
    });

    let action2 = githubStoreReducer({
      userDetails: {
        username: '',
        avatar: ''
      },
      userRepositories: {
        repositories: [],
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: expectedSlicedReposFirst,
        nextReposUrl: undefined
      }
    }, {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      repositories: slicedReposSecond,
      nextReposUrl: undefined
    });

    expect(action2).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userRepositories: {
        repositories: [],
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: expectedSlicedReposFirst.concat(expectedSlicedReposSecond),
        nextReposUrl: undefined
      }
    });
  });

  it('should test read user details', () => {
    const action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
      username: MOCK_USER_DETAILS.login,
      avatar: MOCK_USER_DETAILS.avatar_url
    });
    const action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.READ_USER_DETAILS
    });

    expect(action2).toEqual({
      userDetails: {
        username: MOCK_USER_DETAILS.login,
        avatar: MOCK_USER_DETAILS.avatar_url
      },
      userRepositories: {
        repositories: [],
        nextReposUrl: undefined
      },
      userSubscriptions: {
        repositories: [],
        nextReposUrl: undefined
      }
    })
  });

  it('should test read user repositories', () => {
    const expectedSlicedRepos = [];
    const slicedRepos = MOCK_ISSUES_USER_REPOSITORIES.slice(0, 9);
    const action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      repositories: slicedRepos,
      nextReposUrl: 'http://api.github.com/thegreenhouse.io?page=2'
    });
    const action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.READ_USER_REPOSITORIES
    });

    slicedRepos.forEach((repo) => {
      expectedSlicedRepos.push({
        id: repo.id,
        name: repo.name,
        url: repo.url,
        owner: repo.owner
      })
    });

    expect(action2).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userRepositories: {
        repositories: expectedSlicedRepos,
        nextReposUrl: 'http://api.github.com/thegreenhouse.io?page=2'
      },
      userSubscriptions: {
        repositories: [],
        nextReposUrl: undefined
      }
    });
  });

  it('should test read user subscriptions', () => {
    const expectedSlicedRepos = [];
    const slicedRepos = MOCK_ISSUES_USER_SUBSCRIPTIONS.slice(0, 15);
    const action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      repositories: slicedRepos,
      nextReposUrl: 'http://api.github.com/thegreenhouse.io?page=2'
    });
    const action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.READ_USER_SUBSCRIPTIONS
    });

    slicedRepos.forEach((repo) => {
      expectedSlicedRepos.push({
        id: repo.id,
        name: repo.name,
        url: repo.url,
        owner: repo.owner
      })
    });

    expect(action2).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userSubscriptions: {
        repositories: expectedSlicedRepos,
        nextReposUrl: 'http://api.github.com/thegreenhouse.io?page=2'
      },
      userRepositories: {
        repositories: [],
        nextReposUrl: undefined
      }
    });
  });

  it('should test getting issues for user repositories', () => {
    let mockRepo = MOCK_USER_REPOSITORIES.slice(0, 1);
    let mockIssue = MOCK_ISSUES_USER_REPOSITORIES.slice(0, 1);
    let action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
      repositories: [{
        details: mockRepo.details,
        id: mockRepo.id,
        hasAssignedIssues: false,
        issues: [],
        openIssues: 0,
        pullRequests: 0
      }],
      nextReposUrl: undefined
    });
    let action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY,
      index: 0,
      hasAssignedIssues: false,
      issues: mockIssue,
      openIssues: 1,
      pullRequests: 1
    });

    expect(action2).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userSubscriptions: {
        repositories: [],
        nextReposUrl: undefined
      },
      userRepositories: {
        repositories: [{
          id: mockRepo.id,
          hasAssignedIssues: false,
          issues: mockIssue,
          openIssues: 1,
          pullRequests: 1
        }],
        nextReposUrl: undefined
      }
    });
  });

  it('should test getting issues for user subscriptions', () => {
    const mockRepo = MOCK_USER_SUBSCRIPTIONS.slice(0, 1);
    const mockIssue = MOCK_ISSUES_USER_SUBSCRIPTIONS.slice(0, 1);
    const action1 = githubStoreReducer(MOCK_INIT_STATE, {
      type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
      repositories: [{
        details: mockRepo.details,
        id: mockRepo.id,
        hasAssignedIssues: false,
        issues: [],
        openIssues: 0,
        pullRequests: 0
      }],
      nextReposUrl: 'http://api.github/com/subscriptions?page=2'
    });
    const action2 = githubStoreReducer(action1, {
      type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION,
      index: 0,
      hasAssignedIssues: false,
      issues: mockIssue,
      openIssues: 1,
      pullRequests: 1
    });

    expect(action2).toEqual({
      userDetails: {
        username: '',
        avatar: ''
      },
      userSubscriptions: {
        repositories: [{
          id: mockRepo.id,
          hasAssignedIssues: false,
          issues: mockIssue,
          openIssues: 1,
          pullRequests: 1
        }],
        nextReposUrl: 'http://api.github/com/subscriptions?page=2'
      },
      userRepositories: {
        repositories: [],
        nextReposUrl: undefined
      }
    });

  });

});