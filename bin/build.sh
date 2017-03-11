#!/usr/bin/env bash

echo "node version"
node -v
echo "npm version"
npm -v
echo "yarn version"
yarn --version

echo "install dependencies..."
rm -rf node_modules/ > /dev/null 2>&1
yarn install

# build prep
cp src/services/credentials.ts.tmpl src/services/credentials.ts

# build
yarn run build