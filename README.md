# Getting started

This app has both server and front-end code available in it. Before you get started, you'll want to make sure you have some pre-requisites installed:

## Pre-requisites

We recommend installing all pre-requisites with [Homebrew](https://brew.sh/), but you can install them independently if you'd prefer.

### With Homebrew

- MongoDB: `brew install mongodb`
- Node + npm: `brew install node`

### Without Homebrew

- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [Node + npm](https://www.npmjs.com/get-npm)

## Running locally

1. Make sure pre-requisites are installed and switch into the root directory of the app
2. Start up your local mongo with the command `npm run mongo:start`
3. Run `npm install` to ensure latest modules are installed
4. Start Webpack to watch + build all front-end code (anything inside `src` directory): `npm run dev:watch`
5. Start the server: `npm run server:start`
6. Visit [http://localhost:3000](http://localhost:3000) to see your app

## Debugging the server

If you're using VSCode, you can simply run the "Debug server" launch configuration already set up. Otherwise, you can run `npm run server:debug` to start the server in debug mode - once up, you can use node-inspector to debug.

## Debugging Mongo

If you need to connect to the local mongo shell, you can use the `npm run mongo:shell` command. This is useful for inspecting the database or inserting/updating/removing sample data.
