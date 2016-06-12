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
  private hasAssignedIssues: boolean;
  private issues: Array<GithubIssue> = [];
  private openIssues: number;
  private pullRequests: number;

  private modelIssues(issues): Array<GithubIssue> {
    issues.map(issue => {
      this.issues.push(new GithubIssue(issue));

      if (issue.pull_request) {
        this.pullRequests += 1;
      }
    });

    return issues;
  }

  private getHasAssignedIssues(issues, username) {
    let hasAssignedIssues = false;

    issues.forEach(function (issue) {
      let assignee = issue.assignee ? issue.assignee.login : '';

      if (username === assignee) {
        hasAssignedIssues = true;
        console.log('HAS ASSIGNED ISSUES', username);
        console.log(issues);
      }
    });

    return hasAssignedIssues;
  }

  constructor(issues, currentUser) {
    this.pullRequests = 0;
    this.issues = this.modelIssues(issues);
    this.count = this.issues.length;
    this.openIssues = this.issues.length - this.pullRequests;
    this.hasAssignedIssues = this.getHasAssignedIssues(this.issues, currentUser);
  }

  getIssueDetails() {
    return {
      hasAssignedIssues: this.hasAssignedIssues,
      issues: this.issues,
      count: this.issues.length,
      pullRequests: this.pullRequests,
      openIssues: this.openIssues
    }
  }

}