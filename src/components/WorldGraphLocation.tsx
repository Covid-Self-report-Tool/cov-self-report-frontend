import React, { FC } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
  data: Object;
  region: string;
};

export const WorldGraphLocation: FC<WorldGraphProps> = ({ data, region }) => {
  const styles = useStyles();
  const position = { lat: 40.505, lng: -100 };

  return (
    <div>
      <Map center={position} zoom={4} length={1} className={styles.root}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[50, 10]}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};
