import React, { FC } from 'react';
import { GeoJSON as NonReactGeoJSON } from 'leaflet';
import { Polygon } from 'react-leaflet';

import { IGeometry } from './types';
import { CountryRow } from 'types';
import { PolygonTooltip } from './PolygonTooltip';

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
