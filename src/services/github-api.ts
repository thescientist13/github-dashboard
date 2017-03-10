import * as axios from 'axios';
import { CredentialsInterface } from './credentials';

export interface GithubUserInterface {
  avatar: string,
  username: string
}

export interface GithubIssueInterface {
  details: any
}

export interface GithubIssuesInterface {
  count: number,
  hasAssignedIssues: boolean,
  issues: Array<GithubIssueInterface>,
  openIssues: number,
  pullRequests: number
}

export interface GithubRepoInterface {
  details: any,
  id: number,
  issues?: GithubIssuesInterface
}

export class GithubApi {
  private baseUrl:string = 'https://api.github.com/';
  private $: any;
  private credentials: CredentialsInterface;

  constructor(credentials: CredentialsInterface){
    this.credentials = credentials;

    //TODO better way to DI axios??
    axios.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';
    axios.defaults.headers.common['Authorization'] = 'token ' + this.credentials.accessToken;
  }

  private modelIssuesAndGetPullRequests(issues): any {
    let modeledIssues: Array<GithubIssueInterface> = [];
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

  private getUserHasAssignedIssues(issues: Array<GithubIssueInterface>, username: string) {
    let hasAssignedIssues = false;

    issues.forEach(function (issue) {
      let assignee = issue.details.assignee ? issue.details.assignee.login : '';

      if (username === assignee) {
        hasAssignedIssues = true;
      }
    });

    return hasAssignedIssues;
  }

  private modelGithubIssuesForRepository(issues, currentUser: string): GithubIssuesInterface {
    let modeledIssuesAndPullRequests = this.modelIssuesAndGetPullRequests(issues);
    let modeledIssues: any = modeledIssuesAndPullRequests.modeledIssues;
    let pullRequests: any = modeledIssuesAndPullRequests.pullRequests;

    return {
      pullRequests: pullRequests,
      issues: modeledIssues,
      count: modeledIssues.length,
      openIssues: modeledIssues.length - pullRequests,
      hasAssignedIssues: this.getUserHasAssignedIssues(modeledIssues, currentUser)
    };
  }

  private parseNextReposUrl(linkHeader: string): string{
    let url = linkHeader ? linkHeader.split(';')[0].replace('<', '').replace('>', '') : null;

    //stop paging if all repos have been requested
    return url && url.search('page=1') >= 0 ? null : url;
  }

  private generateUniqueRepoId(): number {
    return new Date().getTime() * (Math.floor((Math.random() * 9999) + 1));
  }

  getUserDetails(): any {
    return axios.get(this.baseUrl + 'user').then((response: any) => {
      let data = response.data;
      let user: GithubUserInterface = {
        avatar: data.avatar_url,
        username: data.login
      };

      return user;
    }).catch(function(response) {
      console.error('UNHANDLED ERROR', response);
    });
  }

  getUserRepositories (username?: string, nextUrl?: string): any {
    // TODO should this even be required since its a call specifically for the user?
    let user = username || this.credentials.username;
    let url = nextUrl || this.baseUrl + 'users/' + user + '/repos';

    return axios.get(url).then((response: any) => {
      let modeledRepos: Array<GithubRepoInterface> = [];
      let nextRepoUrl: string = this.parseNextReposUrl(response.headers.link);
      let moreReposExist: boolean = !!nextRepoUrl;

      response.data.map(repository => {
        modeledRepos.push({
          details: repository,
          id: this.generateUniqueRepoId()
        });
      });

      return {
        repos: modeledRepos,
        hasMoreRepos: moreReposExist,
        nextReposUrl: nextRepoUrl
      };
    }).catch(function(response) {
      console.error('UNHANDLED ERROR', response);
    });
  }

  getUserSubscriptions (username?: string, nextUrl?: string): any {
    // TODO should this even be required since its a call specifically for the user?
    let user = username || this.credentials.username;
    let url = nextUrl || this.baseUrl + 'users/' + user + '/subscriptions';

    return axios.get(url).then((response: any) => {
      let modeledRepos: Array<GithubRepoInterface> = [];
      let nextRepoUrl: string = this.parseNextReposUrl(response.headers.link);
      let moreReposExist: boolean = !!nextRepoUrl;

      response.data.map(repository => {
        modeledRepos.push({
          details: repository,
          id: this.generateUniqueRepoId()
        });
      });

      return {
        repos: modeledRepos,
        hasMoreRepos: moreReposExist,
        nextReposUrl: nextRepoUrl
      };
    }).catch(function(response) {
      console.error('UNHANDLED ERROR', response);
    });
  }

  getIssuesForRepository(repositoryName: string, username?: string): any {
    let user = username || this.credentials.username;

    return axios.get(this.baseUrl + 'repos/' + user + '/' + repositoryName + '/issues').then(response => {
      return this.modelGithubIssuesForRepository(response.data, user);
    }).catch(function(response){
      if(response.status === 404){
        console.warn('404 NOT FOUND - ' + repositoryName + '.  Repo may be private.');
      }else{
        console.error('UNHANDLED ERROR', response);
      }
    });
  }
}