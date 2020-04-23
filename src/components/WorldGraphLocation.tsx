import React, { FC, useContext } from 'react';
import {
  Map,
  TileLayer,
  Marker,
  FeatureGroup,
  ZoomControl,
  Popup,
} from 'react-leaflet';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { CountriesFieldsForTotals } from 'context/types';
import { MAPBOX_API_KEY as accessToken } from 'config';
import { countriesSymbology } from 'config/map';
import {
  createClusterCustomIcon,
  indivMarkerIcon,
  setSymbology,
} from 'utils/map';
import { Polygons, GlobalContext } from 'components';

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
    // No one cares about zoom controls on small touch devices
    '& .leaflet-control-zoom': {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
}));

type MapboxType = {
  tilesetId: string;
};

type PositionType = { lat: number; lng: number };

type WorldGraphProps = {
  data: any[]; // TODO: type this
  submittedFeats: PositionType[];
};

type SubmittedType = {
  data: PositionType[];
};

const SubmittedCases: FC<SubmittedType> = ({ data }) => (
  <MarkerClusterGroup
    showCoverageOnHover={false}
    iconCreateFunction={createClusterCustomIcon}
    disableClusteringAtZoom={8}
    maxClusterRadius={60}
  >
    {data.map((position, i) => (
      <Marker
        key={i}
        position={[position.lat, position.lng]}
        icon={indivMarkerIcon}
      >
        <Popup maxWidth={200}>
          <h2>Self-reported location</h2>
          {`Latitude: ${position.lat}`},<br />
          {`Longitude: ${position.lng}`}
        </Popup>
      </Marker>
    ))}
  </MarkerClusterGroup>
);

const MapboxTileLayer: FC<MapboxType> = ({ tilesetId }) => {
  const baseUrl = 'https://api.mapbox.com/styles/v1/mapbox';
  const attribution = `Ã‚Â© <a href="https://apps.mapbox.com/feedback/">Mapbox</a>`;
  const url = `${baseUrl}/${tilesetId}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;

  // CRED: https://stackoverflow.com/a/37043490/1048518
  // Prevent tiny font/overly sharp resolution
  return <TileLayer {...{ url, attribution, tileSize: 512, zoomOffset: -1 }} />;
};

export const WorldGraphLocation: FC<WorldGraphProps> = ({
  data,
  submittedFeats,
}) => {
  const { state } = useContext(GlobalContext);
  const activeCountrySymbKey: keyof CountriesFieldsForTotals =
    state.activeCountrySymbKey;
  const styles = useStyles();
  const theme = useTheme();
  const bigGuy = useMediaQuery(theme.breakpoints.up('sm'));
  // TODO: preserve on route change, and use bounds instead
  const initMapCenter = bigGuy ? { lat: 34, lng: -5 } : { lat: 10, lng: -90 };

  // @ts-ignore // TODO: remove this shame
  const polySymb = countriesSymbology[activeCountrySymbKey];

  return (
    <Map
      center={initMapCenter}
      zoom={bigGuy ? 3 : 2}
      className={styles.theMapItself}
      minZoom={2}
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
    </Map>
  );
};
