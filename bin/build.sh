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

# project setup
yarn run setup

# build
yarn run clean
yarn run test -- --coverage
yarn run build