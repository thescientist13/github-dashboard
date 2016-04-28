export class GithubIssue {
  public details: any;

  constructor(issue){
    this.details = issue || null;
  }

  getIssueDetails() {
    return this.details;
  }
}

export class GithubIssues {
  private count: number;
  private issues: Array<GithubIssue> = [];
  private openIssues: number;
  private pullRequests: number;

  private modelIssues(issues) {
    issues.map(issue => {
      this.issues.push(new GithubIssue(issue));

      if (issue.pull_request) {
        this.pullRequests += 1;
      }
    });
  }

  constructor(issues) {
    this.pullRequests = 0;

    this.modelIssues(issues);

    this.count = this.issues.length;
    this.openIssues = this.issues.length - this.pullRequests;
  }

  getIssueDetails() {
    return {
      issues: this.issues,
      count: this.issues.length,
      pullRequests: this.pullRequests,
      openIssues: this.openIssues
    }
  }

}