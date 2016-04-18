'use strict';

import CREDENTIALS from '../credentials';
import axios from 'axios';
import q from 'q';

const baseUrl = 'https://api.github.com/';
const $ = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': 'token ' +  CREDENTIALS.accessToken
  }
});

class GithubUser {
  construct(avatar, name) {
    this.avatar = avatar;
    this.name = name;
    console.log(this.avatar);
    console.log(this.name);
  }

  getDetails() {
    return {
      avatar: this.avatar,
      name: this.name
    }
  }
}

export class GithubStore {
  constructor() {
    this.user = {
      avatar: '',
      name: ''
    };
    this.repositories = {
      personal: []
    };
  }

  getUserDetails() {
    return $.get(baseUrl + 'user', {
      transformResponse: [response => {
        let resp = JSON.parse(response);
        //let user = new GithubUser(resp.avatar_url, resp.login);
        //console.log(user);
        //console.log(user.getDetails());
        this.user = {
          avatar: resp.avatar_url,
          name: resp.login
        };
        //console.log(this.user);
        return this.user;
      }]
    })
  }

  getUserRepositories (username) {
    let user = username || CREDENTIALS.username;

    return $.get(baseUrl + 'users/' + user + '/repos').then(response => {
      this.repositories.personal = response.data;

      this.repositories.personal.map(repository => {
        repository.issues = [];
      });

      console.log('modded repos', this.repositories.personal);
      return this.repositories.personal;
    })
  }

  getIssuesForRepository(repository, username) {
    let user = username || CREDENTIALS.username;

    return $.get(baseUrl + 'repos/' + user + '/' + repository + '/issues').then(response => {
      let issues = response.data || [];
      let pullRequests = 0;
      let openIssues = null;

      issues.map(issue => {
        if (issue.pull_request) {
          pullRequests += 1;
        }
      });

      return {
        issues: issues,
        count: issues.length,
        pullRequests: pullRequests,
        openIssues: issues.length - pullRequests
      }
    });
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