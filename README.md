# Interview Scheduler PROJECT

Tired of using your excel sheet to track your appointments? Good thing you work with Lighthouse Labs with this nifty scheduler.

The Interview Scheduler is a single-page app with simple navigations for each workday. Selecting a work day would grant you a clean layout of booked and empty appointment slots with the ability to edit delete or create appointments. Start booking today!

## Getting Started

1. Clone this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8000/> in your browser.

## Backend Setup

1. Install the separate scheduler-api for mock data by going to <https://github.com/lighthouse-labs/scheduler-api>.
2. Follow its README.md, `npm install`.
3. Start the database server using `npm start`.
4. Go to <http://localhost:8001/> in your browser.
5. If you need to reset the database to its randomly generated default, visit <http://localhost:8001/api/debug/reset>.


## Dependencies

- axios": "^0.26.0"
- cypress": "^9.5.1"
- classnames": "^2.2.6"
- normalize.css": "^8.0.1"
- react": "^16.9.0"
- react-dom": "^16.9.0"
- react-scripts": "3.0.0"

Enjoy!

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
!["several modes when interacting with appointments"](https://github.com/glitjch/scheduler/blob/master/docs/scheduler-screenshot-modes.png?raw=true)

!["schedule days"](https://github.com/glitjch/scheduler/blob/master/docs/interview-scheduler-days.gif?raw=true)

!["schedule creating"](https://github.com/glitjch/scheduler/blob/master/docs/interview-scheduler-creating.gif?raw=true)

!["schedule editing"](https://github.com/glitjch/scheduler/blob/master/docs/interview-scheduler-editting.gif?raw=true)

!["schedule delting"](https://github.com/glitjch/scheduler/blob/master/docs/interview-scheduler-deleting.gif?raw=true)
