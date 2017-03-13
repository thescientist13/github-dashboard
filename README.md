# github-dashboard

[![GitHub release](https://img.shields.io/github/release/thescientist13/github-dashboard.svg)](https://github.com/thescientist13/github-dashboard/releases)
[![Jenkins](https://img.shields.io/jenkins/s/http/www.thegreenhouse.io:8080/job/MASTER-github-dashboard.svg)](http://www.thegreenhouse.io:8080/job/MASTER-github-dashboard/)
[![Jenkins tests](https://img.shields.io/jenkins/t/http/www.thegreenhouse.io:8080/job/MASTER-github-dashboard.svg)](http://www.thegreenhouse.io:8080/job/MASTER-github-dashboard/lastCompletedBuild/testReport/)
[![Jenkins coverage](https://img.shields.io/jenkins/c/http/www.thegreenhouse.io:8080/job/MASTER-github-dashboard.svg)](http://www.thegreenhouse.io:8080/job/MASTER-github-dashboard/Coverage_Report/)
[![GitHub issues](https://img.shields.io/github/issues-raw/thescientist13/github-dashboard.svg)](https://github.com/thescientist13/github-dashboard/issues)
[![GitHub issues](https://img.shields.io/github/issues-pr-raw/thescientist13/github-dashboard.svg)](https://github.com/thescientist13/github-dashboard/issues)
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/thescientist13/github-dashboard/master/LICENSE.md)

## Overview
GitHub Dashboard is a locally running web application that aims to help streamline the management of your GitHub repos 
and issues in one place.  Browse all your repos (personal and subscribed), see open issues, see if any are assigned 
to you, and direct link directly to any repo.  You can check out a full product overview [here](https://github.com/thescientist13/github-dashboard/wiki/Product-Overview)

![GitHub Dashboard](https://s3.amazonaws.com/hosted.thegreenhouse.io/oss-projects/github-dashboard/github-dashboard.png)

To run, all that is required is to you have the latest LTS version of [Node][] installed (v6.x) and the package manager, 
[Yarn][]. A GitHub access token will also need to be generated.  The _Setup_ section below will cover all of this.

[Node]: https://nodejs.org/
[Yarn]: https://yarnpkg.com/

## Setup
After cloning the repo, and making sure you have [Node LTS](https://nodejs.org/) installed, please do the following

1. Run `npm install -g yarn@0.21.3`
1. Run `yarn install`
1. Run `npm run setup` 
1. Replace the `xxx`'s with your Github username and a GitHub
_"Personal Access Token"_ with the following scopes:

- repo
- admin:org
- notifications

For information on architecture and design of this application, checkout the Developer's Guide [here](https://github.com/thescientist13/github-dashboard/wiki/Developers-Guide)

## Starting the application
Run `yarn run serve`

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
