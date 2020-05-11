# COVID-19 Self Reporting Tool ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ![Dependabot Status](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)

A website to track global self reported cases and predict future outbreaks. See
our [About page](https://www.covidselfreport.org/about) for more background on
the project.

## Contributing

If you are interested in contributing to our project, read our [contributing
guidelines](https://github.com/Covid-Self-report-Tool/.github/blob/master/CONTRIBUTING.md)
first.

## Local setup

First, copy over the sample.env file to .env

```bash
mv sample.env .env
```

You will need a few API keys for the map, geocoder, authentication, and database
to work correctly. Luckily as of this writing, they are all free for development
purposes.

### Mapbox

Sign up on [Mapbox](https://account.mapbox.com/auth/signup/) and copy your
access token into the `REACT_APP_MABPOX_TOKEN` variable in the `.env` file. This
is required for the map to render correctly.

### Google Places API

Create a [Google Developer](https://developers.google.com/) account and get an
API key. Make sure both the Places API and Geocoder API is selected. Set this
api key to the `REACT_APP_GOOGLE_MAPS_API_KEY` variable in the `.env` file.

### Firebase

Create a [Firebase account](https://firebase.google.com) and a new project. You
will only need the Authentication part of Firebase. Copy over the client
Javascript SDK variables into the `# Firebase` section of your `.env` file.

### Backend

Finally, setup the [API
backend](https://github.com/Covid-Self-report-Tool/cov-self-report-backend) and
run it in the background. Set the `REACT_APP_BACKEND_URL` to the local URL that
it's running under (most likely `http://localhost:8000`).

## Development

```bash
npm start
```

## Testing

This uses Cypress and
[cypress-firebase](https://github.com/prescottprue/cypress-firebase) for
integration tests. You will need to get a `serviceAccount.json` containing your
firebase service account credentials in your root directory for the login flow
to work. You can get this from the Firebase account you created.

Then, create a test account and copy the UID into the `CYPRESS_TEST_UID` in your
`.env` file.

Start the Node server (`npm start`) in the background before running tests.

To run tests in headless mode:

```
npm run cy:run
```

To run the Cypress test runner:

```
npm run cy:open
```

For cypress tests, add the following property to your HTML elements to be easier
to find them:

```html
<div data-cy="example_element"></div>
```

This is more stable/maintainable than using classes or IDs and assures that they
don't change.

## Conventions

### File Structure

- One component per file with the same name as the file
- One `types.ts` per directory
- Shared functions go in utils
- One index.ts per directory in `components` directory, that exports all other
  components. This allows us to do things like:

```js
import { Component1, Component2 } from 'components';
```

### Other Conventions

- Functional components with React hooks
- useContext + useReducer used sparingly, only for shared **UI** state
- react-query for all backend API calls (queries should go in
  `utils/queries.ts`)
- `async`/`await` over Promises
- `type` over `interface`, except for component prop types

### Data

#### Backend API

- [Swagger Docs](https://api.covidselfreport.org/apidocs)

#### Other

- [JHU GitHub data](https://github.com/CSSEGISandData/COVID-19) (CSVs)
- [JHU Postman API
  docs](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest)
  (currently scraping the `/summary` route and adding to DynamoDB daily, the
  joining on the fly to countries geojson client-side)
- [JHU
  Counties](https://services9.arcgis.com/6Hv9AANartyT7fJW/ArcGIS/rest/services/USCounties_cases_V1/FeatureServer)
  with geojson + totals, or non-geojson time series. May be useful for scraping.
- [ArcGIS County COVID-19
  data](https://services9.arcgis.com/6Hv9AANartyT7fJW/ArcGIS/rest/services/USCounties_cases_V1/FeatureServer)
  with both spatial and time-series data. In case we need an easy way to scrape
  time-series.

### Maps

- [NYT US
  cases](https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html)

### Fixes

- [AWS Amplify react-router
  issue](https://github.com/aws-amplify/amplify-js/issues/2498#issuecomment-455162939)
- [Use env vars in React
  app](https://create-react-app.dev/docs/adding-custom-environment-variables/#referencing-environment-variables-in-the-html)

### Handy tools

- [HTML to Markdown converter](https://markdowntohtml.com/) even puts `id` tags
  in, easy for linking to with `href` later...
- [Facebook Sharing
  Debugger](https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fwww.covidselfreport.org%2F)
  is suuuuper handy for seeing why share previews aren't working.
- [Mapshaper](https://mapshaper.org/) for simplifying/optimizing spatial data in
  a web GUI.
- [DynamoDB Geo](https://github.com/rh389/dynamodb-geo.js) later if we want to
  do spatial queries in Dynamo.
- [HTML Cleaner](https://html-cleaner.com/) works pretty well for converting
  Gdocs or Word into HTML sans all the cruft. Need to play w/the "Cleaning
  options" a bit though.
- [Livestream: Refactoring to
  react-query](https://www.youtube.com/watch?v=eEKn8UJfYgc)

## Data notes

### Dummy data

Some [dummy data w/5k
points](https://gist.githubusercontent.com/abettermap/099c2d469314cf90fcea0cc3c61643f5/raw/2df05ec61ca435a27a2dddbc1b624ad54a957613/fake-covid-pts.json)
if needed for clustering style work. Comes back as text and different schema
tho, need to parse:

```js
const parsed = JSON.parse(response.text);
setSubmittedFeats(parsed.features);
```

### User-submitted data

#### Notes on spatial precision

This is not crazy important since all values are from geocoded sources (as
opposed to someone out in the field using GPS), but here are some notes:

- Google's Geocoding service returns 7 decimal places (e.g. `{ "lat": 27.6648274, "lng": -81.5157535 }`).
- BUT the actual spec only recommends 6, as does MapBox (at the most).

So we can either POST as-is from the geocode result, or round down to the
recommended, or round down even further to save space (we aren't showing data at
super-close zooms anyway). If it doesn't affect how the backend schema and POST
requests are structured, then let's use the untouched value from Google unless
we need to start nickel-and-diming perf gains.

## Admins

- [Gabriel Abud](https://github.com/Buuntu)
- [Jason Lampel](https://github.com/abettermap)

## Contributors

- [Jot Samra](https://github.com/ajsamra)
