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
  GET_NEXT_USER_REPOSITORIES: 'GET_NEXT_USER_REPOSITORIES',
  GET_NEXT_USER_SUBSCRIPTIONS: 'GET_NEXT_USER_SUBSCRIPTIONS',
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  GET_USER_REPOSITORIES: 'GET_USER_REPOSITORIES',
  GET_USER_SUBSCRIPTIONS: 'GET_USER_SUBSCRIPTIONS'
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

  // user details
  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_DETAILS) {
    let newState = {
      username: action.userDetails.username,
      avatar: action.userDetails.avatar
    };

    return (<any>Object).assign({}, state, {
      userDetails: newState
    });
  }

  //repositories
  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES) {
    let newState = [];

    action.userRepositories.forEach((item: GithubRepoInterface) => {
      newState.push({
        details: item.details,
        id: item.id,
        issues: DEFAULT_ISSUES_MODEL
      })
    });

    return (<any>Object).assign({}, state, {
      userRepositories: newState,
      hasMoreRepos: action.hasMoreRepos,
      nextReposUrl: action.nextReposUrl
    })

  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS) {
    let newState = [];

    action.userSubscriptions.forEach((item: GithubRepoInterface) => {
      newState.push({
        details: item.details,
        id: item.id,
        issues: DEFAULT_ISSUES_MODEL
      })
    });

    return (<any>Object).assign({}, state, {
      userSubscriptions: newState,
      hasMoreRepos: action.hasMoreRepos,
      nextReposUrl: action.nextReposUrl
    })
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_NEXT_USER_REPOSITORIES){
    let newState = [];

    action.userRepositories.forEach((item: GithubRepoInterface) => {
      newState.push({
        details: item.details,
        id: item.id,
        issues: DEFAULT_ISSUES_MODEL
      })
    });

    return (<any>Object).assign({}, state, {
      userRepositories: state.userRepositories.concat(newState),
      hasMoreRepos: action.hasMoreRepos,
      nextReposUrl: action.nextReposUrl
    })
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_NEXT_USER_SUBSCRIPTIONS){
    let newState = [];

    action.userSubscriptions.forEach((item: GithubRepoInterface) => {
      newState.push({
        details: item.details,
        id: item.id,
        issues: DEFAULT_ISSUES_MODEL
      })
    });

    return (<any>Object).assign({}, state, {
      userSubscriptions: state.userSubscriptions.concat(newState),
      hasMoreRepos: action.hasMoreRepos,
      nextReposUrl: action.nextReposUrl
    })
  }

  //issues
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

  return state;
};

export default githubStoreReducer;