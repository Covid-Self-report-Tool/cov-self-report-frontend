import React, { FC, useContext } from 'react';
import { Map as LeafletMap, FeatureGroup, ZoomControl } from 'react-leaflet';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { CountriesFieldsForTotals } from 'context/types';
import { MapProps } from './types';
import { countriesSymbology } from 'config/map';
import { setSymbology } from 'utils/map';
import { GlobalContext } from 'components';
import { Polygons, MapboxTileLayer, SubmittedCases } from 'components/map';

require('react-leaflet-markercluster/dist/styles.min.css');

// @ts-ignore: Unreachable code error
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const useStyles = makeStyles(theme => ({
  theMapItself: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    '& .leaflet-tooltip': {
      padding: theme.spacing(2),
    },
    // No one cares about zoom controls on small touch devices
    '& .leaflet-control-zoom': {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
}));

export const Map: FC<MapProps> = ({ data, submittedFeats }) => {
  const { state } = useContext(GlobalContext);
  const activeCountrySymbKey: keyof CountriesFieldsForTotals =
    state.activeCountrySymbKey;
  const styles = useStyles();
  const theme = useTheme();
  const smallToMid = useMediaQuery(theme.breakpoints.up('sm'));
  const midsizeAndUp = useMediaQuery(theme.breakpoints.up('md'));
  const huge = useMediaQuery(theme.breakpoints.up('xl'));

  // @ts-ignore // TODO: remove this shame
  const polySymb = countriesSymbology[activeCountrySymbKey];

  let center = { lat: 0, lng: -90 };
  let zoom = 2;

  if (smallToMid) {
    center = { lat: 0, lng: -75 };
    zoom = 3;
  }

  if (midsizeAndUp) {
    center = { lat: 34, lng: 15 };
    zoom = 2;
  }

  if (huge) {
    center = { lat: 24, lng: 5 };
    zoom = 3;
  }

  return (
    <LeafletMap
      center={center}
      zoom={zoom}
      className={styles.theMapItself}
      zoomControl={false}
    >
      <MapboxTileLayer tilesetId="dark-v9" />
      {state.layerVisibility.countries && (
        <FeatureGroup>
          <Polygons
            // @ts-ignore
            features={
              setSymbology(data, { ...polySymb, field: activeCountrySymbKey })
                .features
            }
          />
        </FeatureGroup>
      )}
      {state.layerVisibility.selfReported && (
        <FeatureGroup>
          <SubmittedCases data={submittedFeats} />
        </FeatureGroup>
      )}
      <ZoomControl position="bottomright" />
    </LeafletMap>
  );
};
