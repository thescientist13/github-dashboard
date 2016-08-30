# github-dashboard

test 1233333   456 etc

## Overview
This project is a locally running dashboard web application to help streamline management of Github repos and issues.
It is expected thasdfdsfsdfdst you have the latest LTS version of [Node][] installed and its package manager, [NPM][].

[Node]: https://nodejs.org/
[NPM]: https://www.npmjs.com/

## Setup
After cloning the repo, please do the following

1. Run `npm install`
2. Run `npm run install:jspm`
3. Run `npm run install:typings`
4. Run `cp src/credentials.ts.tmpl src/credentials.ts` and replace the `xxx`'s with your Github username and a Github
_"Personal Access Token"_ with the following scopes:
-- repo
-- admin:org
-- notifications

## Architecture
This project is intended to be as closely aligned with modern day JavaScript standards and conventions by leveraging as
much from the ES6 / ES7 language specification.  The tools being used in the application are:

- [React][] - Component first UI library by Facebook.  This project will leverage [JSX].
- [SystemJS][] - Universal module loader, coming in ES7.  Polyfilled for now so we can use ES6 `import` for JS, with
a plugin installed to allow us to load CSS too.
- [JSPM] - ES6 forward thinking package manager to support SyatemJS instead of using [Bower][].  It can install packages
from Github or NPM and prepares them for being used in the browser.
- [TypeScript] - Super set of JavaScript, providing type support and more.  Added in version 0.4.0
- [NPM Scripts] - exposed Gulp tasks through npm, for simplicity.  Formalized in version 0.4.0

There is also intent to look into [Flux] and [Reactive] state management patterns, looking to libraries like [Redux]
and [Mobx].

[React]: https://facebook.github.io/react/
[JSX]: https://facebook.github.io/react/docs/jsx-in-depth.html
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
