# github-dashboard

## Overview
This is a concept project to streamline management of Github repos into a dashboard application that can be run locally.

## Setup
1. Install [Node][]
2. Run `npm install -g jspm`  (may need `sudo`)
3. Run `npm install && jspm install`
4. Run `mv src/credentials.js.tmpl _src/credentials.js` and replace the `xxx` with your Gitub username and a Github
_"Personal Access Token"_ with the following scopes:
* repo
* admin:org
* notifications

[Node]: https://nodejs.org/en/

## Running
1. Run `gulp run`