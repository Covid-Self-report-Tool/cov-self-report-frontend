import React, { FC, useEffect, useState } from 'react';
import {
  Map,
  Popup,
  TileLayer,
  Marker,
  LayersControl,
  FeatureGroup,
  Circle,
  ZoomControl,
} from 'react-leaflet';
import { makeStyles } from '@material-ui/core';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// @ts-ignore
import Choropleth from 'react-leaflet-choropleth';
import { mapBoxApiKey as accessToken } from 'config';

const superagent = require('superagent');
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

type PositionType = [number, number];

type SubmittedType = {
  data: PositionType[];
};

type ApiResponse = {
  text: string;
  body: {
    features: PositionType[];
  };
};

const SubmittedCases: FC<SubmittedType> = ({ data }) => (
  <MarkerClusterGroup>
    {data.map((position, i) => (
      <Marker key={i} position={position} />
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

export const WorldGraphLocation: FC<WorldGraphProps> = ({ data }) => {
  const styles = useStyles();
  const [submittedFeats, setSubmittedFeats] = useState<PositionType[]>([]);
  const initMapCenter = { lat: 30, lng: -85 };

  useEffect(() => {
    // CRED: https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435#30a3
    async function getThatData() {
      await superagent
        .get(
          'https://gist.githubusercontent.com/abettermap/099c2d469314cf90fcea0cc3c61643f5/raw/2df05ec61ca435a27a2dddbc1b624ad54a957613/fake-covid-pts.json'
        )
        .set('Accept', 'application/json')
        .then((response: Readonly<ApiResponse>) => {
          const parsed = JSON.parse(response.text); // GitHub returns as text
          setSubmittedFeats(parsed.features);
        })
        .catch(console.error);
    }

    getThatData();
  }, []);

  return (
    <Map
      center={initMapCenter}
      zoom={5}
      className={styles.theMapItself}
      minZoom={2}
      zoomControl={false}
    >
      <MapboxTileLayer tilesetId="dark-v9" />
      <LayersControl position="bottomright">
        <LayersControl.Overlay name="Confirmed">
          <Choropleth
            data={data}
            valueProperty={(feature: any) => feature.properties.confirmed}
            scale={['#2b83ba', '#abdda4', '#ffffbf', '#fdae61', '#d7191c']}
            steps={5}
            onEachFeature={(feature: any, layer: any) =>
              layer.bindPopup(
                `${feature.properties.name} Confirmed: ${feature.properties.confirmed}`
              )
            }
            style={{
              fillColor: '#F28F3B',
              weight: 1,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.5,
            }}
            mode="q"
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
