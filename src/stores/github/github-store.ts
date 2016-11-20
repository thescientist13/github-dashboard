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

  getUserDetails(): any {
    return this.$.get(this.baseUrl + 'user').then(function(response: any) {
      let data = response.data;

      return new GithubUser(data.login, data.avatar_url);
    }).catch(function(response) {
      console.error('UNHANDLED ERROR', response);
    });;
  }

  getIssuesForRepository(repositoryName: string, username?: string): any {
    let user = username || this.credentials.username;

    return this.$.get(this.baseUrl + 'repos/' + user + '/' + repositoryName + '/issues').then(response => {
      return new GithubIssues(response.data, user);
    }).catch(function(response){
      if(response.status === 404){
        console.warn('404 NOT FOUND - ' + repositoryName + '.  Repo may be private.');
      }else{
        console.error('UNHANDLED ERROR', response);
      }
    });
  }

  getUserRepositories (username?: string): any {
    // TODO should this even be required since its a call specifically for the user?
    let user = username || this.credentials.username;

    return this.$.get(this.baseUrl + 'users/' + user + '/repos').then(response => {
      this.repositoriesPersonal = new GithubRepos(response.data).getRepos();

      return this.repositoriesPersonal;
    }).catch(function(response) {
      console.error('UNHANDLED ERROR', response);
    });
  }

  getUserSubscriptions (username?: string): any {
    // TODO should this even be required since its a call specifically for the user?
    let user = username || this.credentials.username;

    return this.$.get(this.baseUrl + 'users/' + user + '/subscriptions').then(response => {
      this.repositoriesFollowing = new GithubRepos(response.data).getRepos();

      return this.repositoriesFollowing;
    }).catch(function(response) {
      console.error('UNHANDLED ERROR', response);
    });
  }

}