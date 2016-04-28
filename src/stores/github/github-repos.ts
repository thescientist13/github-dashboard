export class GithubRepo {
  private details:any;
  private issues: Array<any>;

  constructor(repository:any){
    this.details = repository;
    this.issues = [];
  }

  getRepoInfo() {
    return {
      details: this.details,
      issues: this.issues
    }
  }
}

export class GithubRepos {
  private repositories:Array<GithubRepo>;

  constructor(repositories: Array<any>) {
    const repos = repositories;

    repos.map(repository => {
      this.repositories.push(new GithubRepo(repository));
    });
  }

  getRepos() {
    return this.repositories;
  }

}