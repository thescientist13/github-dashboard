export class GithubIssues {

  constructor(issues) {
    this.issues = issues || [];
    this.pullRequests = 0;

    this.issues.map(issue => {
      if (issue.pull_request) {
        this.pullRequests += 1;
      }
    });
  }

  getIssues() {
    return {
      issues: this.issues,
      count: this.issues.length,
      pullRequests: this.pullRequests,
      openIssues: this.issues.length - this.pullRequests
    }
  }

}