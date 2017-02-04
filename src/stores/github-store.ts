import { createStore } from 'redux';
//import { GithubIssueInterface } from '../services/github-api';

const initialState = {
  userDetails: {},
  userRepositories: {},
  userSubscriptions: {}
};

export const GITHUB_STORE_ACTIONS = {
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  GET_USER_REPOSITORIES: 'GET_USER_REPOSITORIES',
  GET_USER_SUBSCRIPTIONS: 'GET_USER_SUBSCRIPTIONS'
};

//TODO state should be immutable!
export const githubStoreReducer = function(state: any, action: any) {
  //TODO initialize default data in constructor?
  if(typeof state === 'undefined'){
    return initialState;
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_DETAILS) {
    let newState = state;

    newState.userDetails = {
      avatar: action.userDetails.avatar,
      username: action.userDetails.username
    };

    return newState;
  }

  return state;
};


// let GithubStore = createStore(githubReducer, {
//   userDetails: {},
//   userRepositories: [],
//   userSubscriptions: []
// });
//
// if(action.type === GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES) {
//   //TODO state should be immutable!
//   let newState = state;
//   newState.userRepositories = [];
//
//   action.userRepositories.forEach(item => {
//     newState.userRepositories.push({
//       details: item.details,
//       id: item.id,
//       issues: {
//         count: '',
//         hasAssignedIssues: '',
//         issues: [],
//         openIssues: '',
//         pullRequests: ''
//       }
//     })
//   });
//
//   console.log('GET_USER_REPOSITORIES', newState);
//   return newState;
// }
//
// if(action.type === GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS) {
//   //TODO state should be immutable!
//   let newState = state;
//   newState.userSubscriptions = [];
//
//   action.userSubscriptions.forEach(item => {
//     newState.userSubscriptions.push({
//       details: item.details,
//       id: item.id,
//       issues: {
//         count: '',
//         hasAssignedIssues: '',
//         issues: [],
//         openIssues: '',
//         pullRequests: ''
//       }
//     })
//   });
//   console.log('GET_USER_SUBSCRIPTIONS', newState);
//   return newState;
// }


//     api.getIssuesForRepository(repoInfo.details.name, repoInfo.details.owner.login).then((response: GithubIssuesInterface) => {
//       repos[index].issues = response;
//
//       this.setState({
//         repositories: repos
//       });

//export default githubStoreReducer;