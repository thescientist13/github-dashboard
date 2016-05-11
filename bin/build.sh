#!/usr/bin/env bash

echo "node version"
node -v
echo "npm version"
npm -v

echo "install dependencies..."
rm -rf node_modules/ > /dev/null 2>&1
rm -rf jspm_packages/ > /dev/null 2>&1

npm install

./node_modules/.bin/jspm install
./node_modules/.bin/gulp  build