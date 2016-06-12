import {GithubIssue, GithubIssues} from "./github-issues";

export class GithubRepo {
  // TODO list out properties
  private details: any;
  private issues: GithubIssues;
  public id: number;

  constructor(repository:any){
    this.details = repository;
    this.id = new Date().getTime();
  }

  setIssues(issues: GithubIssues){
    this.issues = issues;
  }

  getRepoDetails() {
    return {
      details: this.details,
      id: this.id,
      issues: this.issues
    }
  }
}

export class GithubRepos {
  //TODO why do this have to public to return them from the getter?
  public repositories: Array<GithubRepo> = [];

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