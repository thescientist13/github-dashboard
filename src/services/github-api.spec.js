import { GithubApi } from './github-api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('GitHub API Service', () => {

  it('should test getUserDetails returns correct user data', () => {
    const mock = new MockAdapter(axios);
    const credentials = {
      username: 'thescientist13',
      accessToken: 'xxx'
    };
    const mockUserDetailsResponse = {
      login: 'thescientist13',
      avatar_url: 'https://avatars3.githubusercontent.com/u/895923?v=3'
    };

    mock.onGet('https://api.github.com/user').reply(200, mockUserDetailsResponse);

    let userDetails = new GithubApi(credentials).getUserDetails().then((response) => {
      expect(response.username).toEqual(credentials.username);
      expect(response.avatar).toEqual(mockUserDetailsResponse.avatar_url);
    });

  });

  it('should test getUserSubscriptions returns correct user subscriptions data with more repos', () => {
    const mock = new MockAdapter(axios);
    const credentials = {
      username: 'thescientist13',
      accessToken: 'xxx'
    };

    const mockUserSubscriptionsResponse = [{
      "id": 11163592,
      "name": "skyui",
      "full_name": "active-video/skyui",
      "owner": {
        "login": "active-video",
        "id": 4934376,
        "avatar_url": "https://avatars2.githubusercontent.com/u/4934376?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/active-video",
        "html_url": "https://github.com/active-video",
        "followers_url": "https://api.github.com/users/active-video/followers",
        "following_url": "https://api.github.com/users/active-video/following{/other_user}",
        "gists_url": "https://api.github.com/users/active-video/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/active-video/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/active-video/subscriptions",
        "organizations_url": "https://api.github.com/users/active-video/orgs",
        "repos_url": "https://api.github.com/users/active-video/repos",
        "events_url": "https://api.github.com/users/active-video/events{/privacy}",
        "received_events_url": "https://api.github.com/users/active-video/received_events",
        "type": "Organization",
        "site_admin": false
      },
      "private": true,
      "html_url": "https://github.com/active-video/skyui",
      "description": "SkyUI HTML5 Application",
      "fork": false,
      "url": "https://api.github.com/repos/active-video/skyui",
      "forks_url": "https://api.github.com/repos/active-video/skyui/forks",
      "keys_url": "https://api.github.com/repos/active-video/skyui/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/active-video/skyui/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/active-video/skyui/teams",
      "hooks_url": "https://api.github.com/repos/active-video/skyui/hooks",
      "issue_events_url": "https://api.github.com/repos/active-video/skyui/issues/events{/number}",
      "events_url": "https://api.github.com/repos/active-video/skyui/events",
      "assignees_url": "https://api.github.com/repos/active-video/skyui/assignees{/user}",
      "branches_url": "https://api.github.com/repos/active-video/skyui/branches{/branch}",
      "tags_url": "https://api.github.com/repos/active-video/skyui/tags",
      "blobs_url": "https://api.github.com/repos/active-video/skyui/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/active-video/skyui/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/active-video/skyui/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/active-video/skyui/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/active-video/skyui/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/active-video/skyui/languages",
      "stargazers_url": "https://api.github.com/repos/active-video/skyui/stargazers",
      "contributors_url": "https://api.github.com/repos/active-video/skyui/contributors",
      "subscribers_url": "https://api.github.com/repos/active-video/skyui/subscribers",
      "subscription_url": "https://api.github.com/repos/active-video/skyui/subscription",
      "commits_url": "https://api.github.com/repos/active-video/skyui/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/active-video/skyui/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/active-video/skyui/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/active-video/skyui/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/active-video/skyui/contents/{+path}",
      "compare_url": "https://api.github.com/repos/active-video/skyui/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/active-video/skyui/merges",
      "archive_url": "https://api.github.com/repos/active-video/skyui/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/active-video/skyui/downloads",
      "issues_url": "https://api.github.com/repos/active-video/skyui/issues{/number}",
      "pulls_url": "https://api.github.com/repos/active-video/skyui/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/active-video/skyui/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/active-video/skyui/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/active-video/skyui/labels{/name}",
      "releases_url": "https://api.github.com/repos/active-video/skyui/releases{/id}",
      "deployments_url": "https://api.github.com/repos/active-video/skyui/deployments",
      "created_at": "2013-07-03T23:34:01Z",
      "updated_at": "2015-04-21T22:49:50Z",
      "pushed_at": "2016-04-05T20:32:12Z",
      "git_url": "git://github.com/active-video/skyui.git",
      "ssh_url": "git@github.com:active-video/skyui.git",
      "clone_url": "https://github.com/active-video/skyui.git",
      "svn_url": "https://github.com/active-video/skyui",
      "homepage": null,
      "size": 402529,
      "stargazers_count": 2,
      "watchers_count": 2,
      "language": "JavaScript",
      "has_issues": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": false,
      "forks_count": 0,
      "mirror_url": null,
      "open_issues_count": 0,
      "forks": 0,
      "open_issues": 0,
      "watchers": 2,
      "default_branch": "version/1.5.8",
      "permissions": {
        "admin": false,
        "push": true,
        "pull": true
      }
    }, {
      "id": 15351457,
      "name": "uiframework",
      "full_name": "active-video/uiframework",
      "owner": {
        "login": "active-video",
        "id": 4934376,
        "avatar_url": "https://avatars2.githubusercontent.com/u/4934376?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/active-video",
        "html_url": "https://github.com/active-video",
        "followers_url": "https://api.github.com/users/active-video/followers",
        "following_url": "https://api.github.com/users/active-video/following{/other_user}",
        "gists_url": "https://api.github.com/users/active-video/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/active-video/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/active-video/subscriptions",
        "organizations_url": "https://api.github.com/users/active-video/orgs",
        "repos_url": "https://api.github.com/users/active-video/repos",
        "events_url": "https://api.github.com/users/active-video/events{/privacy}",
        "received_events_url": "https://api.github.com/users/active-video/received_events",
        "type": "Organization",
        "site_admin": false
      },
      "private": true,
      "html_url": "https://github.com/active-video/uiframework",
      "description": "ActiveVideo TV UI Framework",
      "fork": false,
      "url": "https://api.github.com/repos/active-video/uiframework",
      "forks_url": "https://api.github.com/repos/active-video/uiframework/forks",
      "keys_url": "https://api.github.com/repos/active-video/uiframework/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/active-video/uiframework/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/active-video/uiframework/teams",
      "hooks_url": "https://api.github.com/repos/active-video/uiframework/hooks",
      "issue_events_url": "https://api.github.com/repos/active-video/uiframework/issues/events{/number}",
      "events_url": "https://api.github.com/repos/active-video/uiframework/events",
      "assignees_url": "https://api.github.com/repos/active-video/uiframework/assignees{/user}",
      "branches_url": "https://api.github.com/repos/active-video/uiframework/branches{/branch}",
      "tags_url": "https://api.github.com/repos/active-video/uiframework/tags",
      "blobs_url": "https://api.github.com/repos/active-video/uiframework/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/active-video/uiframework/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/active-video/uiframework/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/active-video/uiframework/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/active-video/uiframework/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/active-video/uiframework/languages",
      "stargazers_url": "https://api.github.com/repos/active-video/uiframework/stargazers",
      "contributors_url": "https://api.github.com/repos/active-video/uiframework/contributors",
      "subscribers_url": "https://api.github.com/repos/active-video/uiframework/subscribers",
      "subscription_url": "https://api.github.com/repos/active-video/uiframework/subscription",
      "commits_url": "https://api.github.com/repos/active-video/uiframework/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/active-video/uiframework/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/active-video/uiframework/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/active-video/uiframework/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/active-video/uiframework/contents/{+path}",
      "compare_url": "https://api.github.com/repos/active-video/uiframework/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/active-video/uiframework/merges",
      "archive_url": "https://api.github.com/repos/active-video/uiframework/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/active-video/uiframework/downloads",
      "issues_url": "https://api.github.com/repos/active-video/uiframework/issues{/number}",
      "pulls_url": "https://api.github.com/repos/active-video/uiframework/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/active-video/uiframework/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/active-video/uiframework/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/active-video/uiframework/labels{/name}",
      "releases_url": "https://api.github.com/repos/active-video/uiframework/releases{/id}",
      "deployments_url": "https://api.github.com/repos/active-video/uiframework/deployments",
      "created_at": "2013-12-21T00:34:48Z",
      "updated_at": "2014-05-15T22:08:01Z",
      "pushed_at": "2014-07-30T23:47:47Z",
      "git_url": "git://github.com/active-video/uiframework.git",
      "ssh_url": "git@github.com:active-video/uiframework.git",
      "clone_url": "https://github.com/active-video/uiframework.git",
      "svn_url": "https://github.com/active-video/uiframework",
      "homepage": null,
      "size": 6135,
      "stargazers_count": 1,
      "watchers_count": 1,
      "language": "JavaScript",
      "has_issues": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": false,
      "forks_count": 0,
      "mirror_url": null,
      "open_issues_count": 0,
      "forks": 0,
      "open_issues": 0,
      "watchers": 1,
      "default_branch": "master",
      "permissions": {
        "admin": false,
        "push": true,
        "pull": true
      }
    }, {
      "id": 16005343,
      "name": "uiframework-twitter",
      "full_name": "active-video/uiframework-twitter",
      "owner": {
        "login": "active-video",
        "id": 4934376,
        "avatar_url": "https://avatars2.githubusercontent.com/u/4934376?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/active-video",
        "html_url": "https://github.com/active-video",
        "followers_url": "https://api.github.com/users/active-video/followers",
        "following_url": "https://api.github.com/users/active-video/following{/other_user}",
        "gists_url": "https://api.github.com/users/active-video/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/active-video/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/active-video/subscriptions",
        "organizations_url": "https://api.github.com/users/active-video/orgs",
        "repos_url": "https://api.github.com/users/active-video/repos",
        "events_url": "https://api.github.com/users/active-video/events{/privacy}",
        "received_events_url": "https://api.github.com/users/active-video/received_events",
        "type": "Organization",
        "site_admin": false
      },
      "private": true,
      "html_url": "https://github.com/active-video/uiframework-twitter",
      "description": "Sample twitter application - built on the CloudTV TV UI Framework",
      "fork": false,
      "url": "https://api.github.com/repos/active-video/uiframework-twitter",
      "forks_url": "https://api.github.com/repos/active-video/uiframework-twitter/forks",
      "keys_url": "https://api.github.com/repos/active-video/uiframework-twitter/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/active-video/uiframework-twitter/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/active-video/uiframework-twitter/teams",
      "hooks_url": "https://api.github.com/repos/active-video/uiframework-twitter/hooks",
      "issue_events_url": "https://api.github.com/repos/active-video/uiframework-twitter/issues/events{/number}",
      "events_url": "https://api.github.com/repos/active-video/uiframework-twitter/events",
      "assignees_url": "https://api.github.com/repos/active-video/uiframework-twitter/assignees{/user}",
      "branches_url": "https://api.github.com/repos/active-video/uiframework-twitter/branches{/branch}",
      "tags_url": "https://api.github.com/repos/active-video/uiframework-twitter/tags",
      "blobs_url": "https://api.github.com/repos/active-video/uiframework-twitter/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/active-video/uiframework-twitter/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/active-video/uiframework-twitter/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/active-video/uiframework-twitter/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/active-video/uiframework-twitter/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/active-video/uiframework-twitter/languages",
      "stargazers_url": "https://api.github.com/repos/active-video/uiframework-twitter/stargazers",
      "contributors_url": "https://api.github.com/repos/active-video/uiframework-twitter/contributors",
      "subscribers_url": "https://api.github.com/repos/active-video/uiframework-twitter/subscribers",
      "subscription_url": "https://api.github.com/repos/active-video/uiframework-twitter/subscription",
      "commits_url": "https://api.github.com/repos/active-video/uiframework-twitter/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/active-video/uiframework-twitter/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/active-video/uiframework-twitter/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/active-video/uiframework-twitter/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/active-video/uiframework-twitter/contents/{+path}",
      "compare_url": "https://api.github.com/repos/active-video/uiframework-twitter/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/active-video/uiframework-twitter/merges",
      "archive_url": "https://api.github.com/repos/active-video/uiframework-twitter/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/active-video/uiframework-twitter/downloads",
      "issues_url": "https://api.github.com/repos/active-video/uiframework-twitter/issues{/number}",
      "pulls_url": "https://api.github.com/repos/active-video/uiframework-twitter/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/active-video/uiframework-twitter/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/active-video/uiframework-twitter/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/active-video/uiframework-twitter/labels{/name}",
      "releases_url": "https://api.github.com/repos/active-video/uiframework-twitter/releases{/id}",
      "deployments_url": "https://api.github.com/repos/active-video/uiframework-twitter/deployments",
      "created_at": "2014-01-17T16:42:11Z",
      "updated_at": "2014-05-15T22:08:01Z",
      "pushed_at": "2014-08-14T16:07:38Z",
      "git_url": "git://github.com/active-video/uiframework-twitter.git",
      "ssh_url": "git@github.com:active-video/uiframework-twitter.git",
      "clone_url": "https://github.com/active-video/uiframework-twitter.git",
      "svn_url": "https://github.com/active-video/uiframework-twitter",
      "homepage": null,
      "size": 5992,
      "stargazers_count": 0,
      "watchers_count": 0,
      "language": null,
      "has_issues": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": false,
      "forks_count": 0,
      "mirror_url": null,
      "open_issues_count": 1,
      "forks": 0,
      "open_issues": 1,
      "watchers": 0,
      "default_branch": "master",
      "permissions": {
        "admin": false,
        "push": true,
        "pull": true
      }
    }];

    mock.onGet('https://api.github.com/users/' + credentials.username + '/subscriptions').reply(200, mockUserSubscriptionsResponse, {
      Link: '<https://api.github.com/user/895923/subscriptions?page=2>; rel="next", <https://api.github.com/user/895923/subscriptions?page=5>; rel="last"'
    });

    new GithubApi(credentials).getUserSubscriptions().then((response) => {
      //XXX TODO assert details property and other meta data, after changing from any
      expect(response.repos.length).toEqual(mockUserSubscriptionsResponse.length);
      expect(response.nextReposUrl).toEqual('https://api.github.com/user/895923/subscriptions?page=2');
      expect(response.hasMoreRepos).toEqual(true);
    });

  });

  it('should test getUserSubscriptions returns no user subscriptions with no more repos', () => {
    const mock = new MockAdapter(axios);
    const credentials = {
      username: 'thescientist13',
      accessToken: 'xxx'
    };

    mock.onGet('https://api.github.com/users/' + credentials.username + '/subscriptions').reply(200, [], {});

    new GithubApi(credentials).getUserSubscriptions().then((response) => {
      //XXX TODO assert details property and other meta data, after changing from any
      expect(response.repos.length).toEqual(0);
      expect(response.nextReposUrl).toEqual(null);
      expect(response.hasMoreRepos).toEqual(false);
    });

  });
});