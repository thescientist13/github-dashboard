import * as axios from 'axios';
import Credentials from '../credentials';

export interface GithubUser {
  avatar: string,
  username: string
}

export interface GithubIssue {
  details: any
}

export interface GithubIssues {
  count: number,
  hasAssignedIssues: boolean,
  issues: Array<GithubIssue>,
  openIssues: number,
  pullRequests: number
}

export interface GithubRepo {
  details: any,
  id: number,
  issues?: Array<GithubIssues>
}

export class GithubApi {
  private credentials = Credentials.getCredentials();
  private baseUrl:string = 'https://api.github.com/';
  private $ = axios.create({
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'token ' +  this.credentials.accessToken
    }
  });

  private modelIssuesAndGetPullRequests(issues): any {
    let modeledIssues: Array<GithubIssue> = [];
    let pullRequests: number = 0;

    issues.map(issue => {
      modeledIssues.push({
        details: issue
      });

      if (issue.pull_request) {
        pullRequests += 1;
      }
    });

    return {
      modeledIssues: modeledIssues,
      pullRequests: pullRequests
    };
  }

  private getUserHasAssignedIssues(issues: Array<GithubIssue>, username: string) {
    let hasAssignedIssues = false;

    issues.forEach(function (issue) {
      let assignee = issue.details.assignee ? issue.details.assignee.login : '';

      if (username === assignee) {
        hasAssignedIssues = true;
      }
    });

    return hasAssignedIssues;
  }

  private modelGithubIssuesForRepository(issues, currentUser: string): GithubIssues {
    let modeledIssuesAndPullRequests = this.modelIssuesAndGetPullRequests(issues);
    let modeledIssues: any = modeledIssuesAndPullRequests.modeledIssues;

    return {
      pullRequests: 0,
      issues: modeledIssues,
      count: modeledIssues.length,
      openIssues: modeledIssues.length - modeledIssuesAndPullRequests.pullRequests,
      hasAssignedIssues: this.getUserHasAssignedIssues(modeledIssues, currentUser)
    };
  }

  getUserDetails() {
    return this.$.get(this.baseUrl + 'user').then(function(response) {
      let data = response.data;
      let user: GithubUser = {
        avatar: data.avatar_url,
        username: data.login,
      };

      return user;
    }).catch(function(response) {
      console.error('UNHANDLED ERROR', response);
    });
  }

  getIssuesForRepository(repositoryName: string, username?: string) {
    let user = username || this.credentials.username;

    return this.$.get(this.baseUrl + 'repos/' + user + '/' + repositoryName + '/issues').then(response => {
      return this.modelGithubIssuesForRepository(response.data, user);
    }).catch(function(response){
      if(response.status === 404){
        console.warn('404 NOT FOUND - ' + repositoryName + '.  Repo may be private.');
      }else{
        console.error('UNHANDLED ERROR', response);
      }
    });
  }

  getUserRepositories (username?: string) {
    // TODO should this even be required since its a call specifically for the user?
    let user = username || this.credentials.username;

    return this.$.get(this.baseUrl + 'users/' + user + '/repos').then(response => {
      let modeledRepos: Array<GithubRepo> = [];

      response.data.map(repository => {
        modeledRepos.push({
          details: repository,
          id: new Date().getTime(),
          issues: []
        });
      });

      return modeledRepos;
    }).catch(function(response) {
      console.error('UNHANDLED ERROR', response);
    });
  }

  getUserSubscriptions (username?: string) {
    // TODO should this even be required since its a call specifically for the user?
    let user = username || this.credentials.username;

    return this.$.get(this.baseUrl + 'users/' + user + '/subscriptions').then(response => {
      let modeledRepos: Array<GithubRepo> = [];

      response.data.map(repository => {
        modeledRepos.push({
          details: repository,
          id: new Date().getTime(),
          issues: []
        });
      });

      return modeledRepos;
    }).catch(function(response) {
      console.error('UNHANDLED ERROR', response);
    });
  }
}