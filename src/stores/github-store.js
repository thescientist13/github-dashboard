'use strict';

import CREDENTIALS from '../credentials';
import axios from 'axios';

const baseUrl = 'https://api.github.com/';
const $ = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': 'token ' +  CREDENTIALS.accessToken
  }
});

export class GithubStore {
  constructor() {
    this.user = null;
    this.repositories = null;
  }

  getUserDetails() {
    return $.get(baseUrl + 'user', {
      transformResponse: [response => {
        var resp = JSON.parse(response);

        this.user = {
          avatar: resp.avatar_url,
          name: resp.login
        };

        return this.user;
      }]
    })
  }
  //
  // getUserRepositories(doneCallback) {
  //   this.makeRequest('GET', 'users/' + CREDENTIALS.username + '/repos', doneCallback);
  // }
  //
  // getIssuesForRepository(repository, doneCallback) {
  //   this.makeRequest('GET', 'repos/' + CREDENTIALS.username + '/' + repository + '/issues', doneCallback)
  // }
  //
  // getUserWatchedRepositories(doneCallback) {
  //   this.makeRequest('GET', 'users/' + CREDENTIALS.username + '/subscriptions', doneCallback);
  // }
  //
  // getIssuesForUserWatchedRepositories(username, repository, doneCallback) {
  //   this.makeRequest('GET', 'repos/' + username + '/' + repository + '/issues', doneCallback)
  // }

}