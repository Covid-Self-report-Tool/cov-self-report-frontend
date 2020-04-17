import React, { FC } from 'react';
import { GeoJSON as NonReactGeoJSON } from 'leaflet';
import { Popup, Polygon } from 'react-leaflet';

import { IGeometry, GenericGeojsonType } from 'types';

interface PolygonsTypes {
  features: GenericGeojsonType[];
}

interface FeatPropertiesTypes {
  total_deaths: string;
  total_confirmed: string;
  total_recovered: string;
  confirmed_day_change: string;
  dead_day_change: string;
  recovered_day_change: string;
  country_name: string;
  country_code: string;
}

export const Polygons: FC<PolygonsTypes> = ({ features }) => (
  <>
    {features.map(({ geometry, properties }, i: number) => {
      // Had to do this since some sources have both Poly and Multipoly geom.
      // See source code for how it's used: https://bit.ly/2PizL8i
      const levelsDeep = geometry.type === 'Polygon' ? 1 : 2;
      const positions = NonReactGeoJSON.coordsToLatLngs(
        geometry.coordinates,
        levelsDeep
      );
      // https://leafletjs.com/reference-1.5.0.html#polygon
      const {
        color = 'teal',
        fill = true,
        fillColor = 'teal',
        fillOpacity = 0.9, // L default = 0.2
        opacity = 0.9,
        stroke = true,
        weight = 1, // L default = 3
        // dashArray,
        // dashOffset,
        // fillRule,
        // lineCap,
        // lineJoin,
        // @ts-ignore
      } = properties.style || {};
      // @ts-ignore
      const fukk: FeatPropertiesTypes = properties;

      return (
        <Polygon
          key={fukk.country_code}
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
          <Popup>
            <h2>{fukk.country_name}</h2>
            <ul>
              <li>
                <b>total_deaths:</b> {fukk.total_deaths}
              </li>
              <li>
                <b>total_confirmed:</b> {fukk.total_confirmed}
              </li>
              <li>
                <b>total_recovered:</b> {fukk.total_recovered}
              </li>
              <li>
                <b>confirmed_day_change:</b> {fukk.confirmed_day_change}
              </li>
              <li>
                <b>dead_day_change:</b> {fukk.dead_day_change}
              </li>
              <li>
                <b>recovered_day_change:</b> {fukk.recovered_day_change}
              </li>
            </ul>
          </Popup>
        </Polygon>
      );
    })}
  </>
);
