# github-dashboard

## Overview
This project is a locally running dashboard web application to help streamline management of Github repos and issues.
It is expected that you have the latest LTS version of [Node][] installed and its package manager, [NPM][].

#### Update 11/17/2016
The project has shifted away from Gulp and JSPM / SystemJS, in favor of Webpack (eye on 2.0).  Webpack has proven to be
an ideal and practical build tool in addition to being module bundler.  It will also support ES6 imports natively in
the 2.0 release.

[Node]: https://nodejs.org/
[NPM]: https://www.npmjs.com/

## Setup
After cloning the repo, please do the following

1. Run `npm install`
2. Run `npm run install:typings`
3. Run `cp src/credentials.ts.tmpl src/credentials.ts` and replace the `xxx`'s with your Github username and a Github
_"Personal Access Token"_ with the following scopes:
-- repo
-- admin:org
-- notifications

## Architecture
This project is intended to be as closely aligned with modern day JavaScript standards and conventions by leveraging as
much from the ES6 / ES7 language specification.  The tools being used in the application are:

- [React][] - Component first UI library by Facebook.  This project will leverage [JSX].
- [Webpack][]  Module bundler and build tool
- [SystemJS][] - Universal module loader, coming in ES7.  Polyfilled for now so we can use ES6 `import` for JS, with
a plugin installed to allow us to load CSS too.  _**deprecated**_
- [JSPM] - ES6 forward thinking package manager to support SyatemJS instead of using [Bower][].  It can install packages
from Github or NPM and prepares them for being used in the browser. _**deprecated**_
- [TypeScript] - Super set of JavaScript, providing type support and more.  Added in version 0.4.0
- [NPM Scripts] - exposed Gulp tasks through npm, for simplicity.  Formalized in version 0.4.0

There is also intent to look into [Flux] and [Reactive] state management patterns, looking to libraries like [Redux]
and [Mobx].

[React]: https://facebook.github.io/react/
[JSX]: https://facebook.github.io/react/docs/jsx-in-depth.html
[Webpack]: https://webpack.github.io/
[SystemJS]: https://github.com/systemjs/systemjs
[JSPM]: http://jspm.io/
[Bower]: http://bower.io/
[Flux]: https://facebook.github.io/flux/
[Reactive]: https://github.com/Reactive-Extensions/RxJS
[Redux]: https://github.com/reactjs/redux
[Mobx]: https://github.com/mobxjs/mobx
[TypeScript]: https://www.typescriptlang.org/
[NPM Scripts]: https://docs.npmjs.com/misc/scripts

## Project Layout
The _src_ directory contains all relevant source code needed to run the app
- _bootstrap.ts_ - SystemJS bootstrap for the application
- _credentials.ts_ - from a template, with Github credentials
- _components/_ - UI components extending React.Component class
- _layouts/_ - HTML views
- _stores/_ - State management classes
-- _github/_ - Manages a Github store for a given user, tracking their profile, repositories and issues

## Running the App
`npm run app` - starts the app in a webrowser

## Development
1. In one tab run `npm run develop`  (initiates a watch task)
2. In another tab, run `npm run serve` (will also have livereload)

To see all available gulp tasks, run `npm run help`

**Note: For development, it is recommended to use an IDE like [Webstorm][], and install React / JSX plugins, as well
as setting any JavaScript language version settings to recognize ES6 or JSX syntax.**

[Webstorm]: https://www.jetbrains.com/webstorm/