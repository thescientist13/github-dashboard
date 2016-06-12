import {GithubIssue, GithubIssues} from "./github-issues";

export class GithubRepo {
  // TODO list out properties
  private details: any;
  private issues: GithubIssues;

  constructor(repository:any){
    this.details = repository;
  }

  setIssues(issues: GithubIssues){
    this.issues = issues;
  }

  getRepoDetails() {
    return {
      details: this.details,
      issues: this.issues
    }
  }
}

export class GithubRepos {
  private repositories:Array<GithubRepo> = [];

  constructor(repositories: Array<any>) {
    const repos = repositories;

    repos.map(repository => {
      this.repositories.push(new GithubRepo(repository));
    });
  }

  getRepos(): Array<GithubRepo> {
    return this.repositories;
  }

}