// Circular self-reported markers
export const SELF_REPORTED_STYLES = {
  borderColor: 'hsl(39, 100%, 40%)',
  backgroundColor: 'hsl(39, 100%, 50%)',
  borderWidth: 2,
  borderStyle: 'solid',
  size: 15,
};

// TODO: wire up the colors
export const tickersConfig = {
  selfReported: {
    defText: 'Number of individuals who have reported their data on this site',
    heading: 'Self-reported',
    symbolClassName: 'self-reported-symbol',
    omitLastUpdated: true,
    symbol: {
      borderColor: 'brown',
      fillColor: 'orange',
    },
  },
  recovered: {
    defText:
      'Number of individuals clinically confirmed positive for COVID-19 with a test, who have recovered from symptoms',
    heading: 'Recovered',
    symbol: {
      borderColor: 'green',
      fillColor: 'teal',
    },
  },
  confirmed: {
    defText:
      'Number of individuals clinically confirmed positive for COVID-19 with a test',
    heading: 'Confirmed',
    symbol: {
      borderColor: 'gold',
      fillColor: 'yellow',
    },
  },
  deaths: {
    defText:
      'Number of individuals clinically confirmed positive for COVID-19 with a test, who have died from complications related to illness caused by COVID-19',
    heading: 'Deaths',
    symbol: {
      borderColor: 'maroon',
      fillColor: 'red',
    },
  },
};
