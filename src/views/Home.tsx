import React, { FC, useEffect, useState, useContext } from 'react';
import {
  Typography,
  Grid,
  FormControlLabel,
  FormGroup,
  Switch,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  WorldGraphLocation,
  CountryTable,
  Modal,
  NotifierCard,
} from 'components';
import { IGeoJson } from 'types';

const superagent = require('superagent');
const countryGeoJson = require('utils/countries.json');

const useStyles = makeStyles({
  center: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
  },
});

type ApiResponse = {
  body: {
    latest: {
      confirmed: number;
      deaths: number;
      recovered: number;
    };
    locations: [
      {
        country: string;
        latest: {
          confirmed: number;
          deaths: number;
          recovered: number;
        };
        province: string;
      }
    ];
  };
};

type GeoLocation = {
  [key: string]: {
    confirmed: number;
    dead: number;
    recovered: number;
    confirmed_day_change?: number;
    dead_day_change?: number;
    recovered_day_change?: number;
  };
};

const flattenLocations = (locations: GeoLocation): CountryTable => {
  const rows: CountryTable = [];
  Object.keys(locations).forEach(countryName => {
    const newRow = {
      name: countryName,
      ...locations[countryName],
    };

    rows.push(newRow);
  });

  return rows;
};

export const Home: FC = () => {
  const [covidData, setCovidData] = useState<CountryTable>([]);
  const [confirmed, setConfirmed] = useState<number | null>(null);
  const [deaths, setDeaths] = useState<number | null>(null);
  const [recovered, setRecovered] = useState<number | null>(null);
  const [features, setFeatures] = useState<IGeoJson[]>([]);
  const [isMap, setIsMap] = useState<boolean>(true);
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    superagent
      .get('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
      .set('Accept', 'application/json')
      .then((response: ApiResponse) => {
        const infectedByCountry: GeoLocation = {};
        setConfirmed(response.body.latest.confirmed);
        setDeaths(response.body.latest.deaths);
        setRecovered(response.body.latest.recovered);
        response.body.locations.forEach(location => {
          if (
            infectedByCountry[location.country] &&
            infectedByCountry[location.country].confirmed !== undefined
          ) {
            infectedByCountry[location.country].confirmed +=
              location.latest.confirmed;
            infectedByCountry[location.country].dead += location.latest.deaths;
            infectedByCountry[location.country].recovered +=
              location.latest.recovered;
          } else {
            infectedByCountry[location.country] = {
              confirmed: location.latest.confirmed,
              dead: location.latest.deaths,
              recovered: location.latest.recovered,
            };
          }
        });
        setCovidData(flattenLocations(infectedByCountry));
        console.log('covidData', infectedByCountry);
        const newFeatures: IGeoJson[] = [];

        console.log('countryGeoJson', countryGeoJson);
        countryGeoJson.features.forEach((feature: IGeoJson) => {
          if (feature.properties !== null) {
            const newFeature = { ...feature };

            if (
              newFeature.properties !== undefined &&
              infectedByCountry[feature.properties.name]
            ) {
              newFeature.properties.confirmed =
                infectedByCountry[feature.properties.name].confirmed;
            }
            newFeatures.push(newFeature);
          }
        });

        const geoJson: any = {
          type: 'FeatureCollection',
          features: newFeatures,
        };

        console.log(geoJson);

        setFeatures(geoJson);
      })
      .catch(console.error);
  }, []);

  const handleViewChange = () => {
    setIsMap(!isMap);
  };

  return (
    <div>
      <Typography variant="h2" align="center">
        Covid-19 Tracker
      </Typography>
      <Grid container justify="center">
        <Grid item xs={10}>
          {isMap ? (
            <WorldGraphLocation data={features} />
          ) : (
            <CountryTable data={covidData} />
          )}
        </Grid>
        <Grid item xs={2}>
          <Grid container spacing={0} justify="center">
            <Grid item xs={12}>
              <FormGroup className={styles.center}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isMap}
                      onChange={handleViewChange}
                      name="isMap"
                      color="primary"
                    />
                  }
                  label={isMap ? 'Switch to List View' : 'Switch to Map View'}
                />
              </FormGroup>
            </Grid>
            {confirmed !== null && (
              <Grid item xs={12}>
                <NotifierCard text="Confirmed" number={confirmed} />
              </Grid>
            )}
            {deaths !== null && (
              <Grid item xs={12}>
                <NotifierCard text="Deaths" number={deaths} />
              </Grid>
            )}
            {recovered !== null && recovered !== 0 && (
              <Grid item xs={12}>
                <NotifierCard text="Recovered" number={recovered} />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                className={styles.center}
                variant="contained"
                onClick={handleOpen}
              >
                Self Report
              </Button>
              <Modal isOpen={open} handleClose={handleClose} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
