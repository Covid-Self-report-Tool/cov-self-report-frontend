import React, { FC, useEffect } from 'react';
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
// @ts-ignore
import Choropleth from 'react-leaflet-choropleth';
import { mapBoxApiKey as accessToken } from 'config';
import { createClusterCustomIcon, indivMarkerIcon } from 'utils/map';
import { getCountryData, getCountryGeoJSONData } from 'utils/api';

require('react-leaflet-markercluster/dist/styles.min.css');

// @ts-ignore: Unreachable code error
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const useStyles = makeStyles({
  theMapItself: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

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
  console.log('data', data);
  const styles = useStyles();
  const initMapCenter = { lat: 30, lng: -10 }; // TODO: preserve on route change

  return (
    <Map
      center={initMapCenter}
      zoom={3}
      className={styles.theMapItself}
      minZoom={2}
      zoomControl={false}
    >
      <MapboxTileLayer tilesetId="dark-v9" />
      <LayersControl position="bottomright" collapsed={true}>
        <LayersControl.Overlay name="Confirmed" checked>
          <Choropleth
            data={{
              type: 'FeatureCollection',
              features: data,
            }}
            valueProperty={(feature: any) => {
              if (!feature.properties) {
                debugger;
              }
              return feature.properties.total_confirmed;
            }}
            scale={['hsl(184, 69%, 60%)', 'hsl(184, 69%, 10%)']}
            steps={100}
            onEachFeature={(feature: any, layer: any) =>
              layer.bindPopup(
                `${feature.properties.name} Confirmed: ${feature.properties.total_confirmed}`
              )
            }
            style={{
              fillColor: '#F28F3B',
              weight: 0.5,
              opacity: 1,
              color: 'hsl(0, 0%, 10%)',
              fillOpacity: 0.75,
            }}
            mode="q"
          />
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
