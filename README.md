# github-dashboard

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
1. Replace replace the `xxx`'s with your Github username and a GitHub
_"Personal Access Token"_ with the following scopes:

- repo
- admin:org
- notifications

For information on architecture and design of this application, checkout the Developer's Guide [here](https://github.com/thescientist13/github-dashboard/wiki/Developers-Guide)

## Starting the application
Run `npm run serve`

For more information on available tasks, check out the [Developer's Guide](https://github.com/thescientist13/github-dashboard/wiki/Developers-Guide).

## Additional References
- [Product Overview](https://github.com/thescientist13/github-dashboard/wiki/Product-Overview)
- [FAQ](https://github.com/thescientist13/github-dashboard/wiki/F.A.Q.)
- [Developer's Guide](https://github.com/thescientist13/github-dashboard/wiki/Developers-Guide) 
