#!/usr/bin/env bash

echo "node version"
node -v
echo "npm version"
npm -v

echo "install dependencies..."
rm -rf node_modules/ > /dev/null 2>&1
rm -rf jspm_packages/ > /dev/null 2>&1

npm install

//build prep
npm run install:jspm
npm run install:typings
cp src/credentials.ts.tmpl src/credentials.ts

//build
npm run build