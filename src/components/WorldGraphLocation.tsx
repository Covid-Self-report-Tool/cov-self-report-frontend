import React, { FC } from 'react';
import {
  Map,
  TileLayer,
  Marker,
  LayersControl,
  FeatureGroup,
  ZoomControl,
} from 'react-leaflet';
import { makeStyles } from '@material-ui/core';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MAPBOX_API_KEY as accessToken } from 'config';
import { createClusterCustomIcon, indivMarkerIcon } from 'utils/map';
import { Polygons } from 'components';
import { setSymbology } from 'utils/map';

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
    // Leaflet garbage default control for now, but room for custom MUI later
    '& .leaflet-control-layers': {
      bottom: 54, // above Share for now
      marginLeft: 8,
    },
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

type PositionType = [number, number];

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
      <Marker key={i} position={position} icon={indivMarkerIcon} />
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
  const styles = useStyles();
  const initMapCenter = { lat: 30, lng: -10 }; // TODO: preserve on route change

  // TODO: move all this into context and make it dynamic
  const polySymb = {
    // Good tool: https://learnui.design/tools/data-color-picker.html#single
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
    label: 'Number of cases',
    field: 'total_confirmed', // TODO: wire up dynamicness
    symbId: 'total_confirmed',
  };

  return (
    <Map
      center={initMapCenter}
      zoom={3}
      className={styles.theMapItself}
      minZoom={2}
      zoomControl={false}
    >
      <MapboxTileLayer tilesetId="dark-v9" />
      <LayersControl position="bottomleft" collapsed={true}>
        <LayersControl.Overlay name="Confirmed" checked>
          <FeatureGroup>
            <Polygons
              // @ts-ignore
              features={setSymbology(data, polySymb).features}
            />
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="User-submitted">
          <FeatureGroup>
            <SubmittedCases data={submittedFeats} />
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
      <ZoomControl position="bottomright" />
    </Map>
  );
};
