import { GithubRepoInterface } from '../services/github-api';

const initialState = {
  userDetails: {},
  userRepositories: [],
  userSubscriptions: [],
  hasMoreRepos: false,
  nextReposUrl: ''
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
    let newState = [].concat(state.userRepositories);
    let isPristineState: boolean = state.userRepositories.length === 0;

    if(isPristineState){
      action.userRepositories.forEach((responseItem: GithubRepoInterface, index: number) => {
        if(isPristineState) {
          newState.push({
            details: responseItem.details,
            id: responseItem.id,
            issues: DEFAULT_ISSUES_MODEL
          })
        }
      })
    }else{
      action.userRepositories.forEach((responseItem: GithubRepoInterface, index: number) => {
        let match = false;

        state.userRepositories.forEach((stateItem) => {
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
      })
    }

    return (<any>Object).assign({}, state, {
      userRepositories: newState,
      hasMoreRepos: action.hasMoreRepos,
      nextReposUrl: action.nextReposUrl
    })

  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS) {
    let newState = [].concat(state.userSubscriptions);
    let isPristineState: boolean = state.userSubscriptions.length === 0;

    //console.log('isPristineState', isPristineState);
    if(isPristineState){
      action.userSubscriptions.forEach((responseItem: GithubRepoInterface) => {
        if(isPristineState) {
          newState.push({
            details: responseItem.details,
            id: responseItem.id,
            issues: DEFAULT_ISSUES_MODEL
          })
        }
      })
    }else{
      action.userSubscriptions.forEach((responseItem: GithubRepoInterface, index: number) => {
        let match = false;

        state.userSubscriptions.forEach((stateItem) => {
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
      })
    }

    // console.log('newState', newState);
    // console.log('hasMoreRepos', action.hasMoreRepos);
    // console.log('nextReposUrl', action.nextReposUrl);
    return (<any>Object).assign({}, state, {
      userSubscriptions: newState,
      hasMoreRepos: action.hasMoreRepos,
      nextReposUrl: action.nextReposUrl
    })
  }

  //GET - issues
  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY) {
    //TODO define type
    let newState = [].concat(state.userRepositories);

    state.userRepositories.forEach((item: GithubRepoInterface, index: number) => {
      if(action.index === index){
        newState[action.index].issues = action.issues;
      }
    });

    return (<any>Object).assign({}, state, {
      userRepositories: newState
    });
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION) {
    //TODO define type
    let newState = [].concat(state.userSubscriptions);

    state.userSubscriptions.forEach((item: GithubRepoInterface, index: number) => {
      if(action.index === index){
        newState[index].issues = action.issues;
      }
    });

    return (<any>Object).assign({}, state, {
      userSubscriptions: newState
    });
  }

  //READ - user details
  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_DETAILS) {
    console.log('GITHUB_STORE_ACTIONS.READ_USER_DETAILS');
    let newState = {
      username: state.userDetails.username,
      avatar: state.userDetails.avatar
    };

    return state;
  }

  //READ - repositories
  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_REPOSITORIES) {
    console.log('GITHUB_STORE_ACTIONS.READ_USER_REPOSITORIES');
    let newState = [].concat(state.userRepositories);

    return (<any>Object).assign({}, state, {
      userRepositories: newState
    });
  }

  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_SUBSCRIPTIONS) {
    console.log('GITHUB_STORE_ACTIONS.READ_USER_SUBSCRIPTIONS');
    let newState = [].concat(state.userSubscriptions);

    return (<any>Object).assign({}, state, {
      userSubscriptions: newState
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
  console.log('store - readUserDetails');
  return {
    type: GITHUB_STORE_ACTIONS.READ_USER_DETAILS
  }
}


export function readUserRepositories() {
  console.log('store - readUserRepositories');
  return {
    type: GITHUB_STORE_ACTIONS.READ_USER_REPOSITORIES
  }
}

export function readUserSubscriptions() {
  console.log('store - readUserDetails');
  return {
    type: GITHUB_STORE_ACTIONS.READ_USER_SUBSCRIPTIONS
  }
}

export default githubStoreReducer;