import React, { FC } from 'react';
import {
  Map,
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
// @ts-ignore
import Choropleth from 'react-leaflet-choropleth';
import { mapBoxApiKey as accessToken } from 'config';

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
    flex: 1,
  },
});

type WorldGraphProps = {
  data: any[];
};

type MapboxType = {
  tilesetId: string;
};

const MapboxTileLayer: FC<MapboxType> = ({ tilesetId }) => {
  console.log(process.env);
  console.log('accessToken', accessToken);
  const baseUrl = 'https://api.mapbox.com/styles/v1/mapbox';
  const attribution = `Ã‚Â© <a href="https://apps.mapbox.com/feedback/">Mapbox</a>`;
  const url = `${baseUrl}/${tilesetId}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;

  // CRED: https://stackoverflow.com/a/37043490/1048518
  // Prevent tiny font/overly sharp resolution
  return <TileLayer {...{ url, attribution, tileSize: 512, zoomOffset: -1 }} />;
};

export const WorldGraphLocation: FC<WorldGraphProps> = ({ data }) => {
  const styles = useStyles();
  const position = { lat: 40.505, lng: -100 };
  console.log('data', data);

  return (
    <Map
      center={position}
      zoom={4}
      length={1}
      className={styles.theMapItself}
      minZoom={2}
    >
      <MapboxTileLayer tilesetId="dark-v9" />
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
  );
};
