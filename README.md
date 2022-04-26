# jets-seatmap-react-lib

React library that helps to render a plane seat map by flight relying on Quicket GmbH API and data.

## Installation

First of all you need to `fork` this repository and install dependencies:

`npm i`

Rename _.env-sample_ to _.env_. Also you need to get the `APP_ID` and `PRIVATE_KEY` from Quicket GmbH support and put
them into fields in _.env_ file.

Run storybook:

`npm run dev`

By default you will see a loading progress bar - just input your flight parameters and press `INIT SEAT MAP`.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Open storybook and runs the app in the development mode .<br /> Open [http://localhost:6006](http://localhost:6006) to
view it in the browser.

The page will reload if you make edits.<br />

### `npm run build-lib`

Builds the app for production to the `dist` folder.<br />

The build is minified.<br /> Your app is ready to be deployed!
