import { createStore } from 'redux';

export const GITHUB_STORE_ACTIONS = {
  GET_USER_DETAILS: 'GET_USER_DETAILS'
};

const githubReducer = function(state: any, action: any) {
  if(state === undefined){
    state = {};
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

  return state;
};

let GithubStore = createStore(githubReducer);

export default GithubStore;