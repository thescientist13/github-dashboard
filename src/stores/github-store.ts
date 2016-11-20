import { createStore } from 'redux';

export const GITHUB_STORE_ACTIONS = {
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  GET_USER_REPOSITORIES: 'GET_USER_REPOSITORIES',
  GET_USER_SUBSCRIPTIONS: 'GET_USER_SUBSCRIPTIONS'
};

const githubReducer = function(state: any, action: any) {
  if(state === undefined){
    state = {
      userDetails: {},
      userRepositories: {},
      userSubscriptions: {}
    };
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_DETAILS) {
    //TODO state should be immutable!
    let newState = state;

    newState.userDetails = {
      avatar: action.userDetails.avatar,
      username: action.userDetails.username
    };

    return newState;
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES) {
    //TODO state should be immutable!
    let newState = state;
    newState.userRepositories = [];

    action.userRepositories.forEach(item => {
      newState.userRepositories.push({
        details: item.details,
        id: item.id,
        issues: []
      })
    });

    return newState;
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS) {
    //TODO state should be immutable!
    let newState = state;
    newState.userSubscriptions = [];

    action.userSubscriptions.forEach(item => {
      newState.userSubscriptions.push({
        details: item.details,
        id: item.id,
        issues: []
      })
    });

    return newState;
  }


  //     api.getIssuesForRepository(repoInfo.details.name, repoInfo.details.owner.login).then((response: GithubIssuesInterface) => {
  //       repos[index].issues = response;
  //
  //       this.setState({
  //         repositories: repos
  //       });
  return state;
};

let GithubStore = createStore(githubReducer);

export default GithubStore;