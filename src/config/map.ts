// Circular self-reported markers
export const SELF_REPORTED_STYLES = {
  borderColor: 'hsl(39, 100%, 40%)',
  fillColor: 'hsl(39, 100%, 50%)',
  borderWidth: 2,
  borderStyle: 'solid',
  size: 15,
};

// TODO: wire up the colors
export const tickersConfig = {
  selfReported: {
    defText: 'Number of individuals who have reported their data on this site',
    heading: 'Self-reported',
    omitLastUpdated: true,
    symbol: {
      borderWidth: SELF_REPORTED_STYLES.borderWidth,
      borderColor: SELF_REPORTED_STYLES.borderColor,
      fillColor: SELF_REPORTED_STYLES.fillColor,
      isCircular: true,
    },
  },
  recovered: {
    defText:
      'Number of individuals clinically confirmed positive for COVID-19 with a test, who have recovered from symptoms',
    heading: 'Recovered',
    symbol: {
      fillColor: '#31a354',
    },
  },
  confirmed: {
    defText:
      'Number of individuals clinically confirmed positive for COVID-19 with a test',
    heading: 'Confirmed',
    symbol: {
      fillColor: '#267279',
    },
  },
  deaths: {
    defText:
      'Number of individuals clinically confirmed positive for COVID-19 with a test, who have died from complications related to illness caused by COVID-19',
    heading: 'Deaths',
    symbol: {
      fillColor: '#de2d26',
    },
  },
};
