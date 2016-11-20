#!/usr/bin/env bash

echo "node version"
node -v
echo "npm version"
npm -v

echo "install dependencies..."
rm -rf node_modules/ > /dev/null 2>&1
npm cache clean
npm install

//build prep
cp src/credentials.ts.tmpl src/credentials.ts

//build
npm run ci