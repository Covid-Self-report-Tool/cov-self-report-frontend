import React, { FC } from 'react';
import { GeoJSON as NonReactGeoJSON } from 'leaflet';
import { Popup, Polygon } from 'react-leaflet';

import { CountryRow, IGeometry } from 'types';
import { prettyPrint } from 'utils';

interface PolygonProperties extends CountryRow {
  style: {
    color: string;
    fillColor: string;
    fill: boolean;
    fillOpacity: number; // L default = 0.2
    opacity: number; // line opacity
    stroke: boolean; // line color
    weight: number; // L default = 3
  };
}

interface PolygonFeature {
  properties: PolygonProperties;
  geometry: IGeometry;
}

interface PolygonsTypes {
  features: PolygonFeature[];
}

const PolygonPopup: FC<CountryRow> = props => (
  <Popup>
    {props.country_name ? (
      <>
        <h2>{props.country_name}</h2>
        <ul style={{ paddingLeft: 5, margin: 0, listStyleType: 'none' }}>
          <li>
            <b>Total confirmed:</b> {prettyPrint(props.total_confirmed)}
          </li>
          <li>
            <b>Total deaths:</b> {prettyPrint(props.total_deaths)}
          </li>
          <li>
            <b>Total recovered:</b> {prettyPrint(props.total_recovered)}
          </li>
          <li>
            <b>Confirmed day change:</b> {prettyPrint(props.new_confirmed)}
          </li>
          <li>
            <b>Dead day change:</b> {prettyPrint(props.new_deaths)}
          </li>
          <li>
            <b>Recovered day change:</b> {prettyPrint(props.new_recovered)}
          </li>
        </ul>
      </>
    ) : (
      <>
        <h2>{props.NAME_LONG}</h2>
        <b>No Data Available</b>
      </>
    )}
  </Popup>
);

export const Polygons: FC<PolygonsTypes> = ({ features }) => (
  <>
    {features.map(({ geometry, properties }: PolygonFeature) => {
      // Had to do this since some sources have both Poly and Multipoly geom.
      // See source code for how it's used: https://bit.ly/2PizL8i
      const levelsDeep = geometry.type === 'Polygon' ? 1 : 2;
      const positions = NonReactGeoJSON.coordsToLatLngs(
        geometry.coordinates,
        levelsDeep
      );
      const {
        color,
        fillColor,
        fill = true,
        fillOpacity = 1, // L default = 0.2
        opacity = 1, // line opacity
        stroke = true, // line color
        weight = 1, // L default = 3
      } = properties.style || {};

      return (
        <Polygon
          key={properties.country_code}
          positions={positions}
          {...{
            color,
            fill,
            fillColor,
            fillOpacity,
            opacity,
            stroke,
            weight,
          }}
        >
          <PolygonPopup {...properties} />
        </Polygon>
      );
    })}
  </>
);
