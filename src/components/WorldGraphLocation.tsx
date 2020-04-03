import React, { FC } from 'react';
import {
  Map,
  GeoJSON,
  Popup,
  TileLayer,
  Marker,
  LayersControl,
  FeatureGroup,
  Circle,
} from 'react-leaflet';
import { makeStyles } from '@material-ui/core';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IGeoJson } from '../types';
// @ts-ignore
import Choropleth from 'react-leaflet-choropleth';

require('react-leaflet-markercluster/dist/styles.min.css');

// @ts-ignore: Unreachable code error
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '750px',
  },
});

type WorldGraphProps = {
  data: any[];
};

export const WorldGraphLocation: FC<WorldGraphProps> = ({ data }) => {
  const styles = useStyles();
  const position = { lat: 40.505, lng: -100 };
  console.log('data', data);

  return (
    <div>
      <Map
        center={position}
        zoom={4}
        length={1}
        className={styles.root}
        minZoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Confirmed">
            <Choropleth
              data={data}
              valueProperty={(feature: any) => feature.properties.confirmed}
              scale={['white', 'red']}
              steps={7}
              onEachFeature={(feature: any, layer: any) =>
                layer.bindPopup(
                  `${feature.properties.name} Confirmed: ${feature.properties.confirmed}`
                )
              }
              mode="e"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Dead">
            <FeatureGroup color="purple">
              <Popup>
                <span>Popup in FeatureGroup</span>
              </Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Suspected">
            <FeatureGroup>
              <MarkerClusterGroup>
                <Marker position={[49.8397, 24.0297]} />
                <Marker position={[52.2297, 21.0122]} />
                <Marker position={[51.5074, -0.0901]} />
              </MarkerClusterGroup>
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    </div>
  );
};
