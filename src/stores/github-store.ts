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
    return (<any>Object).assign({}, state, {
      userDetails: {
        username: action.userDetails.username,
        avatar: action.userDetails.avatar
      }
    })
  }

  //repositories
  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES) {
    let newState = state;
    newState.userRepositories = [];

    action.userRepositories.forEach((item: GithubRepoInterface) => {
      newState.userRepositories.push({
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

    return newState;
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS) {
    let newState = state;
    newState.userSubscriptions = [];

    action.userSubscriptions.forEach((item: GithubRepoInterface) => {
      newState.userSubscriptions.push({
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

    return newState;
  }

  //issues
  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY) {
    let newState = state;

    newState.userRepositories[action.index].issues = action.issues;

    return newState;
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION) {
    let newState = state;

    newState.userSubscriptions[action.index].issues = action.issues;

    return newState;
  }

  return state;
};

export default githubStoreReducer;