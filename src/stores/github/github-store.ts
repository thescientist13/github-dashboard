'use strict';

import * as axios from 'axios';

// TODO make these private to the class ???
import Credentials from '../../credentials';
import { GithubIssues } from './github-issues';
import { GithubRepo, GithubRepos } from './github-repos';
import { GithubUser } from './github-user';

// TODO implement some sort of caching mechanism
export class GithubStore {
  private user: GithubUser;
  private repositoriesFollowing: Array<GithubRepo>;
  private repositoriesPersonal: Array<GithubRepo>;

  private credentials = Credentials.getCredentials();
  private baseUrl:string = 'https://api.github.com/';
  private $ = axios.create({
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'token ' +  this.credentials.accessToken
    }
  });

  getUserDetails() {
    return this.$.get(this.baseUrl + 'user', {
      transformResponse: [response => {
        let resp = JSON.parse(response);
        this.user = new GithubUser(resp.login, resp.avatar_url);

        return this.user;
      }]
    })
  }

  getIssuesForRepository(repositoryName: string, username?: string) {
    let user = username || this.credentials.username;

    return this.$.get(this.baseUrl + 'repos/' + user + '/' + repositoryName + '/issues').then(response => {
      return new GithubIssues(response.data);
    });
  }

  getUserRepositories (username?: string) {
    // TODO should this even be required since its a call specifically for the user?
    let user = username || this.credentials.username;

    return this.$.get(this.baseUrl + 'users/' + user + '/repos').then(response => {
      var repos = new GithubRepos(response.data).getRepos();

      this.repositoriesPersonal = repos;

      return this.repositoriesPersonal;
    })
  }

  getUserSubscriptions (username?: string) {
    // TODO should this even be required since its a call specifically for the user?
    let user = username || this.credentials.username;

    return this.$.get(this.baseUrl + 'users/' + user + '/subscriptions').then(response => {
      var repos = new GithubRepos(response.data).getRepos();

      this.repositoriesFollowing = repos;

      return this.repositoriesFollowing;
    })
  }

}