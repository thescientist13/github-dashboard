import { GithubRepoInterface } from '../services/github-api';

const initialState = {
  userDetails: {},
  userRepositories: {
    repos: [],
    hasMoreRepos: false,
    nextReposUrl: ''
  },
  userSubscriptions: {
    repos: [],
    hasMoreRepos: false,
    nextReposUrl: ''
  }
};

export const GITHUB_STORE_ACTIONS = {
  GET_ISSUES_FOR_USER_REPOSITORY: 'GET_ISSUES_FOR_USER_REPOSITORY',
  GET_ISSUES_FOR_USER_SUBSCRIPTION: 'GET_ISSUES_FOR_USER_SUBSCRIPTION',
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  GET_USER_REPOSITORIES: 'GET_USER_REPOSITORIES',
  GET_USER_SUBSCRIPTIONS: 'GET_USER_SUBSCRIPTIONS',
  READ_USER_DETAILS: 'READ_USER_DETAILS',
  READ_USER_REPOSITORIES: 'READ_USER_REPOSITORIES',
  READ_USER_SUBSCRIPTIONS: 'READ_USER_SUBSCRIPTIONS'
};

const DEFAULT_ISSUES_MODEL = {
  count: 0,
  hasAssignedIssues: false,
  issues: [],
  openIssues: 0,
  pullRequests: 0
};

//TODO state should be immutable!
const githubStoreReducer = function(state: any, action: any) {

  //TODO initialize default data in constructor?
  if(typeof state === 'undefined'){
    return initialState;
  }

  // GET - user details
  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_DETAILS) {
    let newState = {
      username: action.userDetails.username,
      avatar: action.userDetails.avatar
    };

    return (<any>Object).assign({}, state, {
      userDetails: newState
    });
  }

  //GET - repositories
  //XXX TODO LOTS OF DUPLICATION IN THIS CODE
  //XXX TODO SHOULD HAVE UNIT TESTS
  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES) {
    let newState = [].concat(state.userRepositories.repos);

    action.userRepositories.forEach((responseItem: GithubRepoInterface, index: number) => {
      let match = false;

      state.userRepositories.repos.forEach((stateItem) => {
        if (responseItem.id === stateItem.id) {
          newState[index] = stateItem;
          match = true;
          return match;
        }
      });

      if (!match) {
        newState.push({
          details: responseItem.details,
          id: responseItem.id,
          issues: DEFAULT_ISSUES_MODEL
        })
      }
    });

    return (<any>Object).assign({}, state, {
      userRepositories: {
        repos: newState,
        hasMoreRepos: action.hasMoreRepos,
        nextReposUrl: action.nextReposUrl
      }
    })

  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS) {
    let newState = [].concat(state.userSubscriptions.repos);

    action.userSubscriptions.forEach((responseItem: GithubRepoInterface, index: number) => {
      let match = false;

      state.userSubscriptions.repos.forEach((stateItem) => {
        if (responseItem.id === stateItem.id) {
          newState[index] = responseItem;
          match = true;
          return match;
        }
      });

      if (!match) {
        newState.push({
          details: responseItem.details,
          id: responseItem.id,
          issues: DEFAULT_ISSUES_MODEL
        })
      }
    });

    return (<any>Object).assign({}, state, {
      userSubscriptions: {
        repos: newState,
        hasMoreRepos: action.hasMoreRepos,
        nextReposUrl: action.nextReposUrl
      }
    })
  }

  //GET - issues
  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY) {
    //TODO define type
    let newState = [].concat(state.userRepositories.repos);

    state.userRepositories.repos.forEach((item: GithubRepoInterface, index: number) => {
      if(action.index === index){
        newState[action.index].issues = action.issues;
      }
    });

    return (<any>Object).assign({}, state, {
      userRepositories: {
        repos: newState,
        hasMoreRepos: state.userRepositories.hasMoreRepos,
        nextReposUrl: state.userRepositories.nextReposUrl
      }
    });
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION) {
    //TODO define type
    let newState = [].concat(state.userSubscriptions.repos);

    state.userSubscriptions.repos.forEach((item: GithubRepoInterface, index: number) => {
      if(action.index === index){
        newState[index].issues = action.issues;
      }
    });

    return (<any>Object).assign({}, state, {
      userSubscriptions: {
        repos: newState,
        hasMoreRepos: state.userSubscriptions.hasMoreRepos,
        nextReposUrl: state.userSubscriptions.nextReposUrl
      }
    });
  }

  //READ - user details
  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_DETAILS) {
    let newState = {
      username: state.userDetails.username,
      avatar: state.userDetails.avatar
    };

    return state;
  }

  //READ - repositories
  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_REPOSITORIES) {
    let newState = [].concat(state.userRepositories.repos);

    return (<any>Object).assign({}, state, {
      userRepositories: {
        repos: newState,
        hasMoreRepos: state.userRepositories.hasMoreRepos,
        nextReposUrl: state.userRepositories.nextReposUrl
      }
    });
  }

  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_SUBSCRIPTIONS) {
    let newState = [].concat(state.userSubscriptions.repos);

    return (<any>Object).assign({}, state, {
      userSubscriptions: {
        repos: newState,
        hasMoreRepos: state.userSubscriptions.hasMoreRepos,
        nextReposUrl: state.userSubscriptions.nextReposUrl
      }
    });
  }

  return state;
};

//TODO move to a seperate file - github-action.ts
export function getUserDetails(response) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
    userDetails: response
  }
}

export function getUserRepositories(response) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
    userRepositories: response.repos,
    hasMoreRepos: response.hasMoreRepos,
    nextReposUrl: response.nextReposUrl
  }
}

export function getUserSubscriptions(response) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
    userSubscriptions: response.repos,
    hasMoreRepos: response.hasMoreRepos,
    nextReposUrl: response.nextReposUrl
  }
}

export function getIssuesForUserRepository(response, offsetIdx) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY,
    index: offsetIdx,
    issues: response
  }
}


export function getIssuesForUserSubscription(response, offsetIdx) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION,
    index: offsetIdx,
    issues: response
  }
}

export function readUserDetails() {
  return {
    type: GITHUB_STORE_ACTIONS.READ_USER_DETAILS
  }
}


export function readUserRepositories() {
  return {
    type: GITHUB_STORE_ACTIONS.READ_USER_REPOSITORIES
  }
}

export function readUserSubscriptions() {
  return {
    type: GITHUB_STORE_ACTIONS.READ_USER_SUBSCRIPTIONS
  }
}

export default githubStoreReducer;