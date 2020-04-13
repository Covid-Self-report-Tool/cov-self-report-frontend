# COVID-19 Untested Tracker

## Local setup

Need an `.env` file in root dir with auth keys, etc. Also stored in AWS as environment variables. Ask Gabe for info.

## Development

```bash
npm start
```

## Links

- [AWS Amplify console](https://console.aws.amazon.com/amplify/home?region=us-east-1)
- [Amplify prod deploy](https://master.d27kqd75u1q0ac.amplifyapp.com/) (will obvi be legit domain eventually)
- [Jira project](https://cmu-covid.atlassian.net/browse/COV)
- [Production deploy](https://master.d3detajy1g4axn.amplifyapp.com/) (as of 4/12/20)
- [JHU GitHub data](https://github.com/CSSEGISandData/COVID-19) (CSVs)

## Fixes

- [AWS Amplify react-router issue](https://github.com/aws-amplify/amplify-js/issues/2498#issuecomment-455162939)
- [Use env vars in React app](https://create-react-app.dev/docs/adding-custom-environment-variables/#referencing-environment-variables-in-the-html)

## Data

### Dummy data

Some [dummy data w/5k points](https://gist.githubusercontent.com/abettermap/099c2d469314cf90fcea0cc3c61643f5/raw/2df05ec61ca435a27a2dddbc1b624ad54a957613/fake-covid-pts.json) if needed for clustering style work. Comes back as text and different schema tho, need to parse:

```js
const parsed = JSON.parse(response.text);
setSubmittedFeats(parsed.features);
```

### User-submitted data

#### Notes on spatial precision

This is not crazy important since all values are from geocoded sources (as opposed to someone out in the field using GPS), but here are some notes:

- Google's Geocoding service returns 7 decimal places (e.g. `{ "lat": 27.6648274, "lng": -81.5157535 }`).
- BUT the actual spec only recommends 6, as does MapBox (at the most).

So we can either POST as-is from the geocode result, or round down to the recommended, or round down even further to save space (we aren't showing data at super-close zooms anyway). If it doesn't affect how the backend schema and POST requests are structured, then let's use the untouched value from Google unless we need to start nickel-and-diming perf gains.

#### User-submitted schema (WIP)

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "date": "Dinagat Islands",
    "testnest": {
      "deeper": true
    }
  }
}
```
