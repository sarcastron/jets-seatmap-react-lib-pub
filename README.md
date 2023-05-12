# jets-seatmap-react-lib

React library that helps to render a plane seat map by flight relying on Quicket GmbH API and data.

## Installation

Need to `clone` this repository and install dependencies:

`npm i`

Here you have 2 options:

1. rename _.env-sample_ to _.env_. Also you need to get the `APP_ID` and `PRIVATE_KEY` from Quicket GmbH support team
   and put them into fields in _.env_ file.
2. or directly change `config-mock.js`:

```
  apiUrl: process.env.JETS_BASE_API_URL,
  apiAppId: process.env.JETS_APP_ID,
  apiKey: process.env.JETS_PRIVATE_KEY,
```

replace reading of env-variables with your credentials.

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

The build is minified.<br /> Your lib is ready to be deployed!
