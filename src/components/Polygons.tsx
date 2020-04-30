import React, { FC } from 'react';
import { GeoJSON as NonReactGeoJSON } from 'leaflet';
import { Polygon, Tooltip } from 'react-leaflet';

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

const PolygonTooltip: FC<CountryRow> = props => (
  <Tooltip
    opacity={1}
    permanent={props.country_name === 'United States of America'}
  >
    {props.country_name ? (
      <div style={{ width: 225 }}>
        <h2 style={{ whiteSpace: 'pre-wrap', marginTop: 0 }}>
          {props.country_name}
        </h2>
        <h3 style={{ marginBottom: 5 }}>Totals</h3>
        <ul style={{ paddingLeft: 5, margin: 0, listStyleType: 'none' }}>
          <li>
            <b>Confirmed:</b> {prettyPrint(props.total_confirmed)}
          </li>
          <li>
            <b>Deaths:</b> {prettyPrint(props.total_deaths)}
          </li>
          <li>
            <b>Recovered:</b> {prettyPrint(props.total_recovered)}
          </li>
        </ul>
        <h3 style={{ marginBottom: 5 }}>Day changes</h3>
        <ul style={{ paddingLeft: 5, margin: 0, listStyleType: 'none' }}>
          <li>
            <b>Confirmed:</b> {prettyPrint(props.new_confirmed)}
          </li>
          <li>
            <b>Dead:</b> {prettyPrint(props.new_deaths)}
          </li>
          <li>
            <b>Recovered:</b> {prettyPrint(props.new_recovered)}
          </li>
        </ul>
      </div>
    ) : (
      <>
        <h2>{props.NAME_LONG}</h2>
        <b>No Data Available</b>
      </>
    )}
  </Tooltip>
);

export const Polygons: FC<PolygonsTypes> = ({ features }) => (
  <>
    {features.map(({ geometry, properties }: PolygonFeature, i: number) => {
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
        fillOpacity = 0.75, // L default = 0.2
        opacity = 1, // line opacity
        stroke = true, // line color
        weight = 1, // L default = 3
      } = properties.style || {};

      return (
        <Polygon
          key={i}
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
          <PolygonTooltip {...properties} />
        </Polygon>
      );
    })}
  </>
);
