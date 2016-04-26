export class GithubIssues {

  constructor(issues, currentUser) {
    this.issues = issues || [];
    this.pullRequests = 0;
    this.hasAssignedIssues = this.getHasAssignedIssues(issues, currentUser);

    this.issues.map(issue => {
      if (issue.pull_request) {
        this.pullRequests += 1;
      }
    });
  }

  getHasAssignedIssues(issues, username) {
    let hasAssignedIssues = false;

    issues.forEach(function (issue) {
      let assignee = issue.assignee ? issue.assignee.login : '';

      if (username === assignee) {
        hasAssignedIssues = true;
      }
    });

    return hasAssignedIssues;
  }

  getIssues() {
    return {
      hasAssignedIssues: this.hasAssignedIssues,
      issues: this.issues,
      count: this.issues.length,
      pullRequests: this.pullRequests,
      openIssues: this.issues.length - this.pullRequests
    }
  }

}