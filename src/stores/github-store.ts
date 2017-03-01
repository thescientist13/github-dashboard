import { createStore } from 'redux';
import { GithubRepoInterface } from '../services/github-api';

const initialState = {
  userDetails: {},
  userRepositories: [],
  userSubscriptions: []
};

export const GITHUB_STORE_ACTIONS = {
  GET_ISSUES_FOR_USER_REPOSITORY: 'GET_ISSUES_FOR_USER_REPOSITORY',
  GET_ISSUES_FOR_USER_SUBSCRIPTION: 'GET_ISSUES_FOR_USER_SUBSCRIPTION',
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  GET_USER_REPOSITORIES: 'GET_USER_REPOSITORIES',
  GET_USER_SUBSCRIPTIONS: 'GET_USER_SUBSCRIPTIONS'
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
        issues: {
          count: '',
          hasAssignedIssues: '',
          issues: [],
          openIssues: '',
          pullRequests: ''
        }
      })
    });

    return (<any>Object).assign({}, state, {
      userRepositories: newState
    })

  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS) {
    let newState = [];

    action.userSubscriptions.forEach((item: GithubRepoInterface) => {
      newState.push({
        details: item.details,
        id: item.id,
        issues: {
          count: '',
          hasAssignedIssues: '',
          issues: [],
          openIssues: '',
          pullRequests: ''
        }
      })
    });

    return (<any>Object).assign({}, state, {
      userSubscriptions: newState
    })
  }

  //issues
  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY) {
    let newState = [];

    state.userRepositories.forEach((item: GithubRepoInterface, index: number) => {
      newState.push(state.userRepositories[index]);

      if(action.index === index){
        newState[action.index].issues = action.issues;
      }
    });

    return (<any>Object).assign({}, state, {
      userRepositories: newState
    });
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION) {
    let newState = [];

    state.userSubscriptions.forEach((item: GithubRepoInterface, index: number) => {
      newState.push(state.userSubscriptions[index]);

      if(action.index === index){
        newState[action.index].issues = action.issues;
      }
    });

    return (<any>Object).assign({}, state, {
      userSubscriptions: newState
    });
  }

  return state;
};

export default githubStoreReducer;