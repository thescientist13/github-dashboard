'use strict';

import * as axios from 'axios';

import Credentials from '../../credentials';
import { GithubIssue, GithubIssues } from './github-issues';
import { GithubRepo, GithubRepos } from './github-repos';
import { GithubUser } from './github-user';

// TODO make these private to the class
const credentials = new Credentials().getCredentials();
const baseUrl = 'https://api.github.com/';
const $ = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': 'token ' +  credentials.accessToken
  }
});

export class GithubStore {
  private user:GithubUser;
  private repositoriesFollowing: Array <GithubRepo>;
  private repositoriesPersonal: Array <GithubRepo>;

  getUserDetails() {
    return $.get(baseUrl + 'user', {
      transformResponse: [response => {
        let resp = JSON.parse(response);
        this.user = new GithubUser(resp.avatar_url, resp.login);

        return this.user.getUserDetails();
      }]
    })
  }

  getUserRepositories (username?: string) {
    //TOOD should this even be required since its a call specifically for the user?
    let user = username || credentials.username;

    return $.get(baseUrl + 'users/' + user + '/repos').then(response => {
      this.repositoriesPersonal = new GithubRepos(response.data).getRepos();

      return this.repositoriesPersonal;
    })
  }

  getUserSubscriptions (username?: string) {
    //TOOD should this even be required since its a call specifically for the user?
    let user = username || credentials.username;

    return $.get(baseUrl + 'users/' + user + '/subscriptions').then(response => {
      this.repositoriesFollowing = new GithubRepos(response.data).getRepos();;

      return this.repositoriesFollowing;
    })
  }

  getIssuesForRepository(repository: string, username: string) {
    let user = username || credentials.username;

    return $.get(baseUrl + 'repos/' + user + '/' + repository + '/issues').then(response => {
      let issues = new GithubIssues(response.data, CREDENTIALS.username);

      return issues.getIssues();
    });
  }

}