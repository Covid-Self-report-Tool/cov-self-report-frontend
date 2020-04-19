import React, { FC } from 'react';
import { GeoJSON as NonReactGeoJSON } from 'leaflet';
import { Popup, Polygon } from 'react-leaflet';

import { IGeoJson } from 'types';

interface PolygonsTypes {
  features: IGeoJson[];
}

export const Polygons: FC<PolygonsTypes> = ({ features }) => (
  <>
    {features.map(({ geometry, properties }: IGeoJson) => {
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
        // @ts-ignore
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
          <Popup>
            <h2>{properties.country_name}</h2>
            <ul style={{ paddingLeft: 10, margin: 0, listStyleType: 'none' }}>
              <li>
                <b>total_deaths:</b> {properties.total_deaths}
              </li>
              <li>
                <b>total_confirmed:</b> {properties.total_confirmed}
              </li>
              <li>
                <b>total_recovered:</b> {properties.total_recovered}
              </li>
              <li>
                <b>confirmed_day_change:</b> {properties.new_confirmed}
              </li>
              <li>
                <b>dead_day_change:</b> {properties.new_deaths}
              </li>
              <li>
                <b>recovered_day_change:</b> {properties.new_recovered}
              </li>
            </ul>
          </Popup>
        </Polygon>
      );
    })}
  </>
);
