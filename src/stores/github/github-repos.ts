export class GithubRepos {

  constructor(repos) {
    this.repositories = repos;

    this.repositories.map(repository => {
      repository.issues = [];
    });
  }

  getRepos() {
    return this.repositories;
  }

}