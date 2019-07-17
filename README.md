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

# Debugging exercise

The current state of the app is not great! We've found a few pretty bad bugs. The developer who made it has left the company, and we need somebody to fix these issues ASAP.

We've done QA as a team and found several bugs. Apologies for lack of description on some of them, we're a bit stretched for time. See the bugs below.

## Updating an event, then opening modal causes event to reset in background

Steps to reproduce:

1. Click a date to create an event
2. Drag and drop the event to a new date
3. Click the event to open the modal

Expected: The event in the background shouldn't change dates
Actual: The event in the background briefly reverts back to the original date, but then fixes itself when you close the modal.

## Creating an event then opening it to edit goes weird

Steps to reproduce:

1. Click an empty date (modal for new event should show)
2. Enter a title
3. Click away to close the modal and save the event (works fine...)
4. Click to open the event again
5. Edit the title to something else
6. Click away to close the modal and save the event

Expected: New title saves
Actual: New title doesn't update, but if you refresh the page it works fine.

## Creating a new event with no title or updating an event to have no title throws an error!

This is a bad user experience! Let's fix or make it better!

# Recurring events (New functionality we need)

## Basic specification

We need to support recurring events just like Google Calendar does.Let's add a checkbox to define an event as "recurring". If the checkbox is checked, show the user a UI component with the following options:

- A single select dropdown called "Interval" which has numbers 1-10
- A multi select dropdown called "Days to repeat" which has all 7 days in the week
- A date input called "Start date" - this is when the recurring series should begin
- A date input called "End date" - this is when the recurring series should end

## Start with building the function

I would suggest starting by building a function which outputs a series of dates based on the input values **before building any UI**. The function should look something like this:

```
function getDates(interval, days, startDate, endDate) {
  // Logic here
}
```

And an example call to the function would look like:

```
const interval = 1;
const daysOfWeek = [1, 2]; // 1 = Monday, 2 = Tuesday
const startDate = new Date('9/1/2017');
const endDate = new Date('9/30/2017');
// Calling the following:
getDates(interval, daysOfWeek, startDate, endDate)
/*
Would return an array of dates like:
[
  '9/4/2017',
  '9/5/2017',
  '9/11/2017',
  '9/12/2017',
  '9/18/2017',
  '9/19/2017',
  '9/25/2017',
  '9/26/2017',
];

Calling with an interval of 2 would return the following:
[
  '9/4/2017',
  '9/5/2017',
  '9/18/2017',
  '9/19/2017',
];
*/
```

## Implementing the data model

Once you have the function and UI, you should consider the data model for storing this in Mongo. We're not sure yet what data model makes sense, but we know that in the future we might want to allow users to create recurring events which never end so let's make sure we take that into consideration.
