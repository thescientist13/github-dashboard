# github-dashboard

[![GitHub release](https://img.shields.io/github/release/thescientist13/github-dashboard.svg)](https://github.com/thescientist13/github-dashboard/releases)
[![Jenkins](https://img.shields.io/jenkins/s/http/www.thegreenhouse.io:8080/job/MASTER-github-dashboard.svg)](http://www.thegreenhouse.io:8080/job/MASTER-github-dashboard/)
[![Jenkins tests](https://img.shields.io/jenkins/t/http/www.thegreenhouse.io:8080/job/MASTER-github-dashboard.svg)](http://www.thegreenhouse.io:8080/job/MASTER-github-dashboard/lastCompletedBuild/testReport/)
[![Jenkins coverage](https://img.shields.io/jenkins/c/http/www.thegreenhouse.io:8080/job/MASTER-github-dashboard.svg)](http://www.thegreenhouse.io:8080/job/MASTER-github-dashboard/Coverage_Report/)
[![GitHub issues](https://img.shields.io/github/issues-raw/thescientist13/github-dashboard.svg)](https://github.com/thescientist13/github-dashboard/issues)
[![GitHub issues](https://img.shields.io/github/issues-pr-raw/thescientist13/github-dashboard.svg)](https://github.com/thescientist13/github-dashboard/issues)
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/thescientist13/github-dashboard/master/LICENSE.md)

## Overview
GitHub Dashboard is a locally running web application that aims to help streamline the management of your GitHub repos and issues in one place.  Browse all your repos (personal and subscribed), see open issues, see if any are assigned to you, and link directly to any repo.  You can check out a full product overview [here](https://github.com/thescientist13/github-dashboard/wiki/Product-Overview)

![GitHub Dashboard](https://s3.amazonaws.com/uploads.thegreenhouse.io/oss/github-dashboard-v1.2.0.png)

To run, all that is required is the latest LTS version of [Node][] installed (v6.x) and the package manager, [Yarn][]. A GitHub access token will also need to be generated.  The _Setup_ section below will cover all of this.

[Node]: https://nodejs.org/
[Yarn]: https://yarnpkg.com/

## Setup
After cloning the repo, and making sure you have [Node LTS](https://nodejs.org/) installed, please do the following

1. [Install Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) globally (>= 1.0)
1. Install dependencies
   ```bash
   $ yarn install
   ```
1. Setup the application
   ```bash
   $ yarn run setup
   ```
1. Log into your GitHub account and create an [Personal Access Token](https://github.com/settings/tokens) with the following scopes:
   - repo
   - admin:org
   - notifications

   For information on creating an access token, please visit the [GitHub article on creating access tokens](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
1. Open `/src/services/credentials.ts` and replace the `xxx`'s with your GitHub username and a Personal Access Token

Note: The `credentials.ts` file is listed within the `.gitignore` to prevent accidental inclusion within the repository files.

For information on architecture and design of this application, checkout the Developer's Guide [here](https://github.com/thescientist13/github-dashboard/wiki/Developers-Guide)

## Starting the application
Once you've entered in your credentials, you can start the application:

```bash
$ yarn run serve
```

For more information on available tasks, check out the [Developer's Guide](https://github.com/thescientist13/github-dashboard/wiki/Developers-Guide).

[Webstorm]: https://www.jetbrains.com/webstorm/

## Additional References
- [Product Overview](https://github.com/thescientist13/github-dashboard/wiki/Product-Overview)
- [FAQ](https://github.com/thescientist13/github-dashboard/wiki/F.A.Q.)
- [Developer's Guide](https://github.com/thescientist13/github-dashboard/wiki/Developers-Guide)

## License
Copyright 2017 Owen Buckley, The Greenhouse.io

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.