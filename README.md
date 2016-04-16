# github-dashboard

## Overview
This is a concept project to streamline management of Github repos into a dashboard application that can be run locally.

## Setup
1. Install [Node][]
2. Run `npm install -g jspm`  (may need `sudo`)
3. Run `npm install && jspm install`
4. Copy _credentials.js.tmpl_ to _credentials.js_ and replace the `XXX` with a Github _"Personal Access Token"_
with the following scopes:
* repo
* admin:org
* notifications

[Node]: https://nodejs.org/en/

## Running
1. Run `gulp serve`