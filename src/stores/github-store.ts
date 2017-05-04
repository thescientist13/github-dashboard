import { RepositoryInterface, UserInterface, IssueDetailsInterface } from '../services/github-api';

interface StoreState {
  userDetails: {
    username: string,
    avatar: string
  },
  userRepositories: {
    repositories: Array<RepositoryInterface>,
    nextReposUrl: string|undefined
  },
  userSubscriptions: {
    repositories: Array<RepositoryInterface>,
    nextReposUrl: string|undefined
  }
}

const initialState: StoreState = {
  userDetails: {
    username: '',
    avatar: ''
  },
  userRepositories: {
    repositories: [],
    nextReposUrl: undefined
  },
  userSubscriptions: {
    repositories: [],
    nextReposUrl: undefined
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

function mapGitHubReposToStateRepos(repositories: Array<RepositoryInterface>, action: any) {
  let newState: Array<RepositoryInterface> = [].concat(repositories);

  action.repositories.forEach((responseItem: RepositoryInterface, index: number) => {
    let match = false;

    //iterate over each current item in state to find matches
    repositories.forEach((stateItem: RepositoryInterface) => {

      // we update the state (maybe from the outside world?) if the repository is pre-existing in the store (eg. PUT)
      if (responseItem.id === stateItem.id) {
        newState[index] = stateItem;
        match = true;

        return match;
      }
    });

    // we assume then that this is a new repository fetched from the API (eg. POST)
    if (!match) {
      newState.push({
        id: responseItem.id,
        name: responseItem.name,
        url: responseItem.url,
        owner: responseItem.owner,
        fullName: responseItem.fullName,
        isFork: responseItem.isFork,
      })
    }
  });

  return newState;
}

function mapGitHubIssuesToStateRepository(repositories: Array<RepositoryInterface>, action: any) {
  let newState: Array<RepositoryInterface> = [].concat(repositories);

  repositories.forEach((item: RepositoryInterface, index: number) => {
    let aIdx = action.index;

    if(aIdx === index) {
      newState[index].issues = action.issues;
      newState[index].openIssues = action.openIssues;
      newState[index].pullRequests = action.pullRequests;
      newState[index].hasAssignedIssues = action.hasAssignedIssues;
    }
  });

  return newState;
}

const githubStoreReducer = function(state: StoreState, action: any) {

  if(typeof state === 'undefined'){
    return initialState;
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_DETAILS) {
    let newState: UserInterface = {
      username: action.username,
      avatar: action.avatar
    };

    return (<any>Object).assign({}, state, {
      userDetails: newState
    });
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES) {
    const newState = mapGitHubReposToStateRepos(state.userRepositories.repositories, action);

    return (<any>Object).assign({}, state, {
      userRepositories: {
        repositories: newState,
        nextReposUrl: action.nextReposUrl
      }
    })
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS) {
    const newState = mapGitHubReposToStateRepos(state.userSubscriptions.repositories, action);

    return (<any>Object).assign({}, state, {
      userSubscriptions: {
        repositories: newState,
        nextReposUrl: action.nextReposUrl
      }
    })
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY) {
    const newState = mapGitHubIssuesToStateRepository(state.userRepositories.repositories, action);

    return (<any>Object).assign({}, state, {
      userRepositories: {
        repositories: newState,
        nextReposUrl: state.userRepositories.nextReposUrl
      }
    });
  }

  if(action.type === GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION) {
    const newState = mapGitHubIssuesToStateRepository(state.userSubscriptions.repositories, action);

    return (<any>Object).assign({}, state, {
      userSubscriptions: {
        repositories: newState,
        nextReposUrl: state.userSubscriptions.nextReposUrl
      }
    });
  }

  // READ actions - for component "rehydrating"
  if(action.type === GITHUB_STORE_ACTIONS.READ_USER_DETAILS) {
    let newState: UserInterface = {
      username: state.userDetails.username,
      avatar: state.userDetails.avatar
    };

    return state;
  }

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

export function getUserDetails(user: UserInterface) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
    username: user.username,
    avatar: user.avatar,
  }
}

export function getUserRepositories(repositories: Array<RepositoryInterface>, nextReposUrl?: string) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
    repositories: repositories,
    nextReposUrl: nextReposUrl
  }
}

export function getUserSubscriptions(repositories: Array<RepositoryInterface>, nextReposUrl?: string) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
    repositories,
    nextReposUrl
  }
}

export function getIssuesForUserRepository(issueDetails: IssueDetailsInterface, offsetIdx: number) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY,
    issues: issueDetails.issues,
    openIssues: issueDetails.openIssues,
    pullRequests: issueDetails.pullRequests,
    hasAssignedIssues: issueDetails.hasAssignedIssues,
    index: offsetIdx,
  }
}


export function getIssuesForUserSubscription(issueDetails: IssueDetailsInterface, offsetIdx: number) {
  return {
    type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION,
    issues: issueDetails.issues,
    openIssues: issueDetails.openIssues,
    pullRequests: issueDetails.pullRequests,
    hasAssignedIssues: issueDetails.hasAssignedIssues,
    index: offsetIdx,
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