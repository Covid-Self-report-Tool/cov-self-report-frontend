import L from 'leaflet';
import chroma from 'chroma-js';
// @ts-ignore
import GeoStats from 'geostats';

import { GenericGeojsonType } from 'types';
const indivMarkerDiameter = 15;

// https://github.com/Leaflet/Leaflet.markercluster#customising-the-clustered-markers
// NOTE: iconCreateFunction run by leaflet, which doesn't support ES6 arrow func
export const createClusterCustomIcon = function(
  cluster: any // TODO: legit type?
) {
  const value = cluster.getChildCount();
  let diameter = value / 10;

  if (diameter > 100) {
    diameter = 100;
  } else if (diameter < indivMarkerDiameter) {
    diameter = indivMarkerDiameter;
  } else {
    diameter = Math.floor(diameter);
  }

  return L.divIcon({
    className: 'marker--override',
    html: `<div style="
      height: ${diameter}px;
      width: ${diameter}px;
      background: orange;
      border: 3px solid #ededed;
      border-radius: 100%;
      text-align: center;
    "></div>`,
    iconSize: L.point(diameter, diameter, true),
  });
};

// Individual circular icon (divIcon has more style flexibility than <Circle>)
export const indivMarkerIcon = L.divIcon({
  // Class is arbitrary and unused, just needs to exist to override default bg
  className: 'marker--override',
  iconSize: L.point(indivMarkerDiameter, indivMarkerDiameter, true),
  html: `<div style="
      height: ${indivMarkerDiameter}px;
      width: ${indivMarkerDiameter}px;
      background-color: hsl(39, 100%, 50%);
      border: 2px solid hsl(39, 100%, 40%);
      border-radius: 100%;
    "></div>`,
});

interface SymbConfigTypes {
  field: string;
  type?: 'quantile' | 'unique';
  palette: string[];
  fillOpacity?: number;
  numClasses: number; // 5, // assuming type !== unique
  gradSymbol?: boolean;
  precision?: number; // round to nearest whole by default
}

export const setSymbology = (
  srcFeats: GenericGeojsonType[],
  config: SymbConfigTypes
) => {
  // GTFO if nothing to work with (e.g. filter causes empty dataset)
  if (!srcFeats.length) {
    return {
      features: [],
      legend: [],
    };
  }

  const {
    field,
    palette,
    fillOpacity = 0.9,
    numClasses = 5, // assuming type !== unique
    precision = 4, // round to nearest whole by default
  } = config;

  // @ts-ignore
  const arrValsForSymb = srcFeats.map(({ properties }) => properties[field]);
  const serie = new GeoStats(arrValsForSymb);
  // Round to nearest whole
  serie.setPrecision(precision);
  serie.getClassQuantile(numClasses);
  serie.setColors(palette);

  // TODO: restore legend
  // const { ranges } = serie;
  // const legend = (ranges.length ? ranges : classes).map(
  // const legend = ranges.map((item: string, i: number) => {
  //   return {
  //     label: item,
  //     color: palette[i],
  //   };
  // });

  const features = srcFeats.map(feature => {
    const { properties } = feature;
    // @ts-ignore
    const classValue = serie.getClass(properties[field]);
    const color = palette[classValue];
    // TODO: fix wtf
    const fillColor = color ? chroma(color).darken(2) : 'purple';

    return {
      ...feature,
      properties: {
        ...properties,
        style: {
          color: color || 'green',
          fillColor,
          fillOpacity,
        },
      },
    };
  });

  return { features };
};
