# Interview Scheduler PROJECT

Tired of using your excel sheet to track your appointments? Good thing you work with Lighthouse Labs with this nifty scheduler.

The Interview Scheduler is a single-page app with simple navigations for each workday. Selecting a work day would grant you a clean layout of booked and empty appointment slots with the ability to edit delete or create appointments. Start booking today!

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
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
!["iPad Air viewport"](https://github.com/glitjch/scheduler/blob/master/docs/scheduler-screenshot-ipad-air.png?raw=true)

!["several modes when interacting with appointments"](https://github.com/glitjch/scheduler/blob/master/docs/scheduler-screenshot-modes.png?raw=true)

!["Saving an appointment status"](https://github.com/glitjch/scheduler/blob/master/docs/scheduler-screenshot-saving.png?raw=true)

!["iPhone 12 viewport"](https://github.com/glitjch/scheduler/blob/master/docs/scheduler-screenshot-iphone-12.png?raw=true)
!["Samsung Galaxy S8 viewport"](https://github.com/glitjch/scheduler/blob/master/docs/scheduler-screenshot-samsung-galaxy-s8.png?raw=true)
