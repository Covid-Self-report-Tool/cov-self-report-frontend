// Circular self-reported markers
export const SELF_REPORTED_STYLES = {
  borderColor: 'hsl(39, 100%, 40%)',
  fillColor: 'hsl(39, 100%, 50%)',
  borderWidth: 2,
  borderStyle: 'solid',
  size: 15,
};

// Good tool: https://learnui.design/tools/data-color-picker.html#single
export const countriesSymbology = {
  total_confirmed: {
    palette: [
      '#b0edf3',
      '#99d7de',
      '#83c2c9',
      '#6caeb4',
      '#5699a0',
      '#3f858c',
      '#267279',
      '#005f66',
    ],
    ranges: [100, 500, 2500, 12500, 62500, 312500],
  },
  total_deaths: {
    palette: [
      '#fff5f0',
      '#fee0d2',
      '#fcbba1',
      '#fc9272',
      '#fb6a4a',
      '#ef3b2c',
      '#cb181d',
      '#99000d',
    ],
    ranges: [625, 1250, 2500, 5000, 10000, 20000],
  },
  total_recovered: {
    palette: [
      '#f7fcf5',
      '#e5f5e0',
      '#c7e9c0',
      '#a1d99b',
      '#74c476',
      '#41ab5d',
      '#238b45',
      '#005a32',
    ],
    ranges: [78.125, 312.5, 1250, 5000, 20000, 80000],
  },
};

// TODO: wire up the colors
export const tickersConfig = {
  selfReported: {
    defText: 'Number of individuals who have reported their data on this site',
    heading: 'Self-reported',
    omitLastUpdated: true,
    symbol: {
      alwaysShow: true,
      borderWidth: SELF_REPORTED_STYLES.borderWidth,
      borderColor: SELF_REPORTED_STYLES.borderColor,
      fillColor: SELF_REPORTED_STYLES.fillColor,
      isCircular: true,
      colorStops: [],
    },
  },
  recovered: {
    defText:
      'Number of individuals clinically confirmed positive for COVID-19 with a test, who have recovered from symptoms',
    heading: 'Recovered',
    symbol: {
      globalStateKey: 'total_recovered',
      fillColor: '#41ab5d',
      colorStops: countriesSymbology.total_recovered.palette,
    },
  },
  confirmed: {
    defText:
      'Number of individuals clinically confirmed positive for COVID-19 with a test',
    heading: 'Confirmed',
    symbol: {
      globalStateKey: 'total_confirmed',
      fillColor: '#5699a0',
      colorStops: countriesSymbology.total_confirmed.palette,
    },
  },
  deaths: {
    defText:
      'Number of individuals clinically confirmed positive for COVID-19 with a test, who have died from complications related to illness caused by COVID-19',
    heading: 'Deaths',
    symbol: {
      globalStateKey: 'total_deaths',
      fillColor: '#ef3b2c',
      colorStops: countriesSymbology.total_deaths.palette,
    },
  },
};
