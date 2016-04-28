# github-dashboard

## Overview
This project is a locally running dashboard web application to help streamline management of Github repos and issues.
It is expected that you have the latest LTS version of [Node][] installed and its package manager, [NPM][].

[Node]: https://nodejs.org/
[NPM]: https://www.npmjs.com/

## Setup
After cloning the repo, please do the following

1. Run `npm install -g gulp`
1. Run `npm install`
2. Run `npm run install:jspm`
3. Run `cp src/credentials.ts.tmpl _src/credentials.js` and replace the `xxx`'s with your Github username and a Github
_"Personal Access Token"_ with the following scopes:

- repo
- admin:org
- notifications

## Architecture
This project is intended to be as closely aligned with modern day JavaScript standards and conventions by leveraging as
much from the ES6 language specification.  The tools being used in the application are:

- [React][] - Component first UI library by Facebook.  This project will leverage [JSX].
- [SystemJS][] - Universal module loader, coming in ES7.  Polyfilled for now so we can use ES6 `import` for JS, with
a plugin installed to allow us to load CSS too.
- [JSPM] - ES6 forward thinking package manager to support SyatemJS instead of using [Bower][].  It can install packages
from Github or NPM and prepares them for being used in the browser.

There is also intent to look into [Flux] and [Reactive] state management patterns, looking to libraries like [Redux]
and [Mobx] as well as converting to [TypeScript].

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


## Running the App
`gulp serve` - starts the app in a webrowser (with livereload)

## Development
`gulp build` - runs the build with linting
`gulp help` - show all available gulp tasks

**Note: For development, it is recommended to use an IDE like [Webstorm][], and install React / JSX plugins, as well
as setting any JavaScript language version settings to recognize ES6 or JSX syntax.**

[Webstorm]: https://www.jetbrains.com/webstorm/