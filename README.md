# COVID-19 Untested Tracker

## Local setup

Need an `.env` file in root dir with auth keys, etc. Also stored in AWS as environment variables. Ask Gabe for info.

## Development

```bash
npm start
```

## Links

### Workflow

- [AWS CodeCommit repos](https://us-east-1.console.aws.amazon.com/codesuite/codecommit/repositories)
- [AWS Amplify console](https://console.aws.amazon.com/amplify/home?region=us-east-1)
- [Jira project](https://cmu-covid.atlassian.net/browse/COV)
- [Google Drive website content](https://drive.google.com/drive/folders/1kq-gfqbckws7O9_Md7QhycbsYTxnxZnH) (includes instructions for updating About HTML files)

### Deploys

- [Production](https://www.covidselfreport.org/)
- [Non-CMU Amplify prod deploy](https://master.d3detajy1g4axn.amplifyapp.com/) (as of 4/15/20)
- [Non-CMU Amplify all deploys](https://console.aws.amazon.com/amplify/home?region=us-east-1#/d3detajy1g4axn) (as of 4/15/20)

### Data

#### Our API endpoints

- [Countries prod](https://s0vnmyj6fg.execute-api.us-east-1.amazonaws.com/prod/countries)
- [Countries dev](https://f1t0v67ydj.execute-api.us-east-1.amazonaws.com/dev/countries)

#### Other

- [JHU GitHub data](https://github.com/CSSEGISandData/COVID-19) (CSVs)
- [JHU Postman API docs](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest) (currently scraping the `/summary` route and adding to DynamoDB daily, the joining on the fly to countries geojson client-side)
- [MD data source of About content](https://drive.google.com/file/d/1wk_GNkU-hJZBeh6ic5ZkOoJgVAsrMsSO/view?usp=sharing) (Guneeta is editing, Jason converts to HTML and commits it)
- [JHU Counties](https://services9.arcgis.com/6Hv9AANartyT7fJW/ArcGIS/rest/services/USCounties_cases_V1/FeatureServer) with geojson + totals, or non-geojson time series. May be useful for scraping.
- [ArcGIS County COVID-19 data](https://services9.arcgis.com/6Hv9AANartyT7fJW/ArcGIS/rest/services/USCounties_cases_V1/FeatureServer) with both spatial and time-series data. In case we need an easy way to scrape time-series.

### Fixes

- [AWS Amplify react-router issue](https://github.com/aws-amplify/amplify-js/issues/2498#issuecomment-455162939)
- [Use env vars in React app](https://create-react-app.dev/docs/adding-custom-environment-variables/#referencing-environment-variables-in-the-html)

### Handy tools

- [HTML to Markdown converter](https://markdowntohtml.com/) even puts `id` tags in, easy for linking to with `href` later...
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fwww.covidselfreport.org%2F) is suuuuper handy for seeing why share previews aren't working.
- [Mapshaper](https://mapshaper.org/) for simplifying/optimizing spatial data in a web GUI.
- [DynamoDB Geo](https://github.com/rh389/dynamodb-geo.js) later if we want to do spatial queries in Dynamo.
- [HTML Cleaner](https://html-cleaner.com/) works pretty well for converting Gdocs or Word into HTML sans all the cruft. Need to play w/the "Cleaning options" a bit though.

## Data notes

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

## AWS CloudWatch queries

### Parsed `INFO` with response code

```
parse @message '[*]\t*\t*\t* - - [*] "* * *" * * "*" "*" *' as eventType, stampy, someId, ip, someTimezone, requestType, path, protocol, statusCode, bytes, referrer, userAgent, unknown
| filter eventType = 'INFO'
| filter requestType = 'POST'
| filter path = '/self_report'
| filter statusCode >= 400
| display eventType, @timestamp, requestType, path, statusCode, ip
```
