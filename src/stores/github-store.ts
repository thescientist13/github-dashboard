import { RepositoryInterface, UserInterface, IssueDetailsInterface } from '../services/github-api';

const initialState = {
  userDetails: {},
  userRepositories: {
    repositories: [],
    nextReposUrl: null
  },
  userSubscriptions: {
    repositories: [],
    nextReposUrl: null
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

//TODO state should be immutable!
const githubStoreReducer = function(state: any, action: any) {

  //TODO initialize default data in constructor?
  if(typeof state === 'undefined'){
    return initialState;
  }

  // GET - user details
  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_DETAILS) {
    let newState: UserInterface = {
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
    let newState: Array<RepositoryInterface> = [].concat(state.userRepositories.repositories);

    action.repositories.forEach((responseItem: RepositoryInterface, index: number) => {
      let match = false;

      state.userRepositories.repositories.forEach((stateItem: RepositoryInterface) => {
        if (responseItem.id === stateItem.id) {
          newState[index] = stateItem;
          match = true;
          return match;
        }
      });

      if (!match) {
        newState.push({
          id: responseItem.id,
          name: responseItem.name,
          url: responseItem.url,
          owner: responseItem.owner
        })
      }
    });

    return (<any>Object).assign({}, state, {
      userRepositories: {
        repositories: newState,
        nextReposUrl: action.nextReposUrl
      }
    })

  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS) {
    let newState: Array<RepositoryInterface> = [].concat(state.userSubscriptions.repositories);

    action.repositories.forEach((responseItem: RepositoryInterface, index: number) => {
      let match = false;

      state.userSubscriptions.repositories.forEach((stateItem: RepositoryInterface) => {
        if (responseItem.id === stateItem.id) {
          newState[index] = responseItem;
          match = true;
          return match;
        }
      });

      if (!match) {
        newState.push({
          id: responseItem.id,
          name: responseItem.name,
          url: responseItem.url,
          owner: responseItem.owner
        })
      }
    });

    return (<any>Object).assign({}, state, {
      userSubscriptions: {
        repositories: newState,
        nextReposUrl: action.nextReposUrl
      }
    })
  }

  //GET - issues
  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY) {
    //TODO define type
    let newState: Array<RepositoryInterface> = [].concat(state.userRepositories.repositories);

    state.userRepositories.repositories.forEach((item: RepositoryInterface, index: number) => {
      let aIdx = action.index;

      if(aIdx === index) {
        newState[aIdx].issues = action.issues;
        newState[aIdx].openIssues = action.openIssues;
        newState[aIdx].pullRequests = action.pullRequests;
        newState[aIdx].hasAssignedIssues = action.hasAssignedIssues;
      }
    });

    return (<any>Object).assign({}, state, {
      userRepositories: {
        repositories: newState,
        nextReposUrl: state.userRepositories.nextReposUrl
      }
    });
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION) {
    let newState: Array<RepositoryInterface> = [].concat(state.userSubscriptions.repositories);

    state.userSubscriptions.repositories.forEach((item: RepositoryInterface, index: number) => {
      let aIdx = action.index;

      if(aIdx === index){
        newState[aIdx].issues = action.issues;
        newState[aIdx].openIssues = action.openIssues;
        newState[aIdx].pullRequests = action.pullRequests;
        newState[aIdx].hasAssignedIssues = action.hasAssignedIssues;
      }
    });

    return (<any>Object).assign({}, state, {
      userSubscriptions: {
        repositories: newState,
        nextReposUrl: state.userSubscriptions.nextReposUrl
      }
    });
  }

  //READ - user details
  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_DETAILS) {
    let newState: UserInterface = {
      username: state.userDetails.username,
      avatar: state.userDetails.avatar
    };

    return state;
  }

  //READ - repositories
  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_REPOSITORIES) {
    let newState: Array<RepositoryInterface> = [].concat(state.userRepositories.repositories);

    return (<any>Object).assign({}, state, {
      userRepositories: {
        repositories: newState,
        nextReposUrl: state.userRepositories.nextReposUrl
      }
    });
  }

  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_SUBSCRIPTIONS) {
    let newState: Array<RepositoryInterface> = [].concat(state.userSubscriptions.repositories);

    return (<any>Object).assign({}, state, {
      userSubscriptions: {
        repositories: newState,
        nextReposUrl: state.userSubscriptions.nextReposUrl
      }
    });
  }

  return state;
};

//TODO move to a seperate file - github-action.ts ?
export function getUserDetails(response) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
    userDetails: response
  }
}

export function getUserRepositories(repositories: Array<RepositoryInterface>, nextReposUrl?: string) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
    repositories,
    nextReposUrl
  }
}

export function getUserSubscriptions(repositories: Array<RepositoryInterface>, nextReposUrl?: string) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
    repositories,
    nextReposUrl
  }
}

export function getIssuesForUserRepository(response: IssueDetailsInterface, offsetIdx) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY,
    index: offsetIdx,
    issues: response.issues,
    openIssues: response.openIssues,
    pullRequests: response.pullRequests,
    hasAssignedIssues: response.hasAssignedIssues,
  }
}


export function getIssuesForUserSubscription(response: IssueDetailsInterface, offsetIdx) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION,
    index: offsetIdx,
    issues: response.issues,
    openIssues: response.openIssues,
    pullRequests: response.pullRequests,
    hasAssignedIssues: response.hasAssignedIssues,
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