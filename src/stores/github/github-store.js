'use strict';

import axios from 'axios';

import CREDENTIALS from '../../credentials';
import { GithubIssues } from './github-issues';
import { GithubRepos } from './github-repos';
import { GithubUser } from './github-user';

// TODO make these private to the class
const baseUrl = 'https://api.github.com/';
const $ = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': 'token ' +  CREDENTIALS.accessToken
  }
});

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
        let user = new GithubUser(resp.avatar_url, resp.login);

        this.user = user.getUserDetails();

        return this.user;
      }]
    })
  }

  getUserRepositories (username) {
    let user = username || CREDENTIALS.username;

    return $.get(baseUrl + 'users/' + user + '/repos').then(response => {
      let repos = new GithubRepos(response.data);

      this.repositories.personal = repos.getRepos();

      return this.repositories.personal;
    })
  }

  getUserSubscriptions (username) {
    let user = username || CREDENTIALS.username;

    return $.get(baseUrl + 'users/' + user + '/subscriptions').then(response => {
      let repos = new GithubRepos(response.data);

      this.repositories.following = repos.getRepos();

      return this.repositories.following;
    })
  }

  getIssuesForRepository(repository, username) {
    let user = username || CREDENTIALS.username;

    return $.get(baseUrl + 'repos/' + user + '/' + repository + '/issues').then(response => {
      let issues = new GithubIssues(response.data, CREDENTIALS.username);

      return issues.getIssues();
    });
  }

}