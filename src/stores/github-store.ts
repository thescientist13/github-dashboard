import { createStore } from 'redux';

export const GITHUB_STORE_ACTIONS = {
  GET_USER_DETAILS: 'GET_USER_DETAILS'
};

const githubReducer = function(state: any, action: any) {

  if(state === undefined){
    state = {};
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_DETAILS) {
    console.log('storeAction', GITHUB_STORE_ACTIONS.GET_USER_DETAILS);
    state.userDertails = action.userDetails;
  }

  console.log('storeState', state);
  return state;
};

let GithubStore = createStore(githubReducer);

export default GithubStore;