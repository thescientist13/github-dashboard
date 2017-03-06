# github-dashboard

## Overview
This project is a locally running dashboard web application to help streamline management of Github repos and issues.
It is expected that you have the latest LTS version of [Node][] installed and its package manager, [NPM][].

#### Update 11/17/2016
The project has shifted away from Gulp and JSPM / SystemJS, in favor of Webpack (eye on 2.0).  Webpack has proven to be
an ideal and practical build tool in addition to being a module bundler.  It will also support ES6 imports natively in
the 2.0 release.

[Node]: https://nodejs.org/
[NPM]: https://www.npmjs.com/

## Setup
After cloning the repo, please do the following

1. Run `npm install`
2. Run `cp src/services/credentials.ts.tmpl src/services/credentials.ts` and replace the `xxx`'s with your Github username and a Github
_"Personal Access Token"_ with the following scopes:
- repo
- admin:org
- notifications

## Architecture
This project is intended to be as closely aligned with modern day JavaScript standards and conventions by leveraging as
much from the ES6 / ES7 language specification.  The tools being used in the application are:

- [React][] - Component first UI library by Facebook.  This project will leverage [JSX].
- [Redux][] - [Flux][] inspired state-management library
- [Webpack][]  Module bundler and build tool
- [TypeScript][] - Super set of JavaScript, providing type support and more.  Added in version 0.4.0
- [NPM Scripts][] - exposed "userland" tasks through NPM.  Formalized in version 0.4.0

[React]: https://facebook.github.io/react/
[JSX]: https://facebook.github.io/react/docs/jsx-in-depth.html
[Webpack]: https://webpack.github.io/
[Flux]: https://facebook.github.io/flux/
[Redux]: https://github.com/reactjs/redux
[TypeScript]: https://www.typescriptlang.org/
[NPM Scripts]: https://docs.npmjs.com/misc/scripts

## Project Layout
The _src_ directory contains all relevant source code needed to run the app
- _index.tsx_ - bootstrap for the application
- _credentials.ts_ - from a template, with Github credentials
- _components/_ - stateless UI components extending `React.Component` class
- _views/_ - stateful UI components extending `React.Component` class and wired up to react-router
- _services/_ - classes for interacting with 3rd party APIs or other non UI related functionality

## Tasks
#### Running the app
`npm run serve`

#### Local Development
`npm run develop`

You can run the app from `localhost:4567`

**Note: For development, it is recommended to use an IDE like [Webstorm][], and install React / JSX plugins, as well
as setting any JavaScript language version settings to recognize ES6 or JSX syntax.**

[Webstorm]: https://www.jetbrains.com/webstorm/