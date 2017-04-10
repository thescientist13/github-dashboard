import * as axios from 'axios';
import { CredentialsInterface } from './credentials';

// private interfaces to help model the GitHub API domain
interface GitHubApiResponse {
  data: any,
  headers: any
}

interface GitHubApiHeadersInterface {
  link?: string
}

interface GitHubApiUserInterface {
  avatar_url: string,
  login: string
}

interface GitHubApiRepositoryInterface {
  id: number,
  html_url: string,
  name: string,
  owner: {
    login: string
  }
}

interface GitHubApiAssigneeInterface {
  login: string
}

interface GitHubApiIssueInterface {
  pull_request?: boolean,
  assignees: Array<GitHubApiAssigneeInterface>
}

// public interfaces to help model the application domain
export interface AssigneeInterface {
  username: string
}

export interface UserInterface {
  avatar: string,
  username: string
}

export interface IssueInterface {
  assignees: Array<AssigneeInterface>
}

// helper just for making standalone issue details requests and managing the response
// subset of RepositoryInterface
export interface IssueDetailsInterface {
  issues: Array<IssueInterface>,
  openIssues: number,
  pullRequests: number,
  hasAssignedIssues: boolean
}

export interface RepositoryInterface {
  id: number,
  name: string,
  url: string,
  owner: string,
  issues?: Array<IssueInterface>,
  openIssues?: number|null,
  pullRequests?: number|null,
  nextReposUrl?: string|null,
  hasAssignedIssues?: boolean|null
}

export interface RepositoriesInterface {
  repositories: Array<RepositoryInterface>,
  nextReposUrl: string|null
}

export class GithubApi {
  private baseUrl:string = 'https://api.github.com/';
  private credentials: CredentialsInterface;

  constructor(credentials: CredentialsInterface){
    this.credentials = credentials;

    // TODO better way to DI axios??
    axios.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';
    axios.defaults.headers.common['Authorization'] = 'token ' + this.credentials.accessToken;
  }

  private parseNextReposUrl(linkHeader: string): string {
    let url = linkHeader ? linkHeader.split(';')[0].replace('<', '').replace('>', '') : undefined;

    // null tells us to "stop" paging if all repos have been requested
    return url && url.search('page=1') >= 0 ? null : url;
  }

  private handleGitHubApiError(response: any, args: any): void {
    switch (response.status) {
      case 404:
        console.warn('404 NOT FOUND - ' + args.message + '.  Repo may be private.');
        break;
      default:
        console.error('UNHANDLED ERROR', response);
    }
  }

  private modelGitHubRepositoriesResponse(data: Array<GitHubApiRepositoryInterface>, headers: GitHubApiHeadersInterface): RepositoriesInterface {
    let repositories: Array<RepositoryInterface> = [];
    let nextReposUrl: string = this.parseNextReposUrl(headers.link);

    data.map((repository: GitHubApiRepositoryInterface) => {
      repositories.push({
        id: repository.id,
        name: repository.name,
        url: repository.html_url,
        owner: repository.owner.login,
        issues: [],
        openIssues: null,
        pullRequests: null
      });
    });

    return {
      repositories,
      nextReposUrl
    };
  }

  private modelGitHubIssuesResponse(data: Array<GitHubApiIssueInterface>, currentUser: string): any {
    let modeledIssues: Array<IssueInterface> = [];
    let pullRequests: number = 0;
    let hasAssignedIssues: boolean = false;

    data.map((issue: GitHubApiIssueInterface) => {
      modeledIssues.push({
        assignees: [].concat(issue.assignees)
      });

      if (issue.pull_request) {
        pullRequests += 1;
      }

      issue.assignees.forEach((assignee: GitHubApiAssigneeInterface) => {
        if (currentUser === assignee.login) {
          hasAssignedIssues = true;
        }
      })
    });

    return {
      pullRequests: pullRequests,
      issues: modeledIssues,
      openIssues: modeledIssues.length - pullRequests,
      hasAssignedIssues: hasAssignedIssues
    };
  }

  getUserDetails() {
    return axios.get(this.baseUrl + 'user').then((response: GitHubApiResponse): UserInterface => {
      let data: GitHubApiUserInterface = response.data;
      let user: UserInterface = {
        avatar: data.avatar_url,
        username: data.login
      };

      return user;
    }).catch(this.handleGitHubApiError.bind(this));
  }

  getUserRepositories (nextUrl?: string) {
    let url = nextUrl || this.baseUrl + 'users/' + this.credentials.username + '/repos';

    return axios.get(url).then((response: GitHubApiResponse): RepositoriesInterface => {
      // console.log('getUserRepositories', response);
      return this.modelGitHubRepositoriesResponse(response.data, response.headers)
    })
      .catch(this.handleGitHubApiError.bind(this));
  }

  getUserSubscriptions (nextUrl?: string) {
    let url = nextUrl || this.baseUrl + 'users/' + this.credentials.username + '/subscriptions';

    return axios.get(url).then((response: GitHubApiResponse): RepositoriesInterface => {
      return this.modelGitHubRepositoriesResponse(response.data, response.headers)
    })
      .catch(this.handleGitHubApiError.bind(this));
  }

  getIssuesForRepository(repositoryName: string, username?: string) {
    let name: string = username || this.credentials.username;
    let url: string = this.baseUrl + 'repos/' + name + '/' + repositoryName + '/issues';

    return axios.get(url).then((response: GitHubApiResponse): IssueDetailsInterface => {
      return this.modelGitHubIssuesResponse(response.data, this.credentials.username);
    })
      .catch(this.handleGitHubApiError.bind(this));
  }
}