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

  // TODO: make this more portable since nearly identical to indiv. icon style
  return L.divIcon({
    className: 'marker--override',
    html: `<div style="
      height: ${diameter}px;
      width: ${diameter}px;
      background-color: hsl(39, 100%, 50%);
      border: 2px solid hsl(39, 100%, 40%);
      border-radius: 100%;
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
  field: string; // field to symbolize on
  palette: string[]; // array of colors
  precision?: number; // round to nearest whole by default
}

interface PropertiesGeneric {
  properties: {
    [key: string]: number; // generic key since properties[field] is dynamic
  };
}

export const setSymbology = (
  srcFeats: GenericGeojsonType[],
  config: SymbConfigTypes
) => {
  // GTFO if nothing to work with
  if (!srcFeats.length) {
    return {
      features: [],
      legend: [],
    };
  }

  // Round to nearest whole by default
  const { precision = 0, field, palette } = config;
  const arrValsForSymb = srcFeats
    .filter(
      ({ properties }: PropertiesGeneric) => properties[field] !== undefined
    )
    .map(({ properties }: PropertiesGeneric) => properties[field]);

  const serie = new GeoStats(arrValsForSymb);
  const min = Math.min(...arrValsForSymb); // likely 0, but just in case...
  const max = Math.max(...arrValsForSymb);

  serie.setClassManually([min, 100, 500, 2500, 12500, 62500, 312500, max]);
  serie.setPrecision(precision);
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

  const features = srcFeats.map((feature: PropertiesGeneric) => {
    // Default to gray if there is no data available
    const gray = 'hsl(0, 0%, 89%)';
    let color = gray;
    let fillColor: string | chroma.Color = gray;
    const { properties } = feature;
    let valueToUse = properties[field];

    if (valueToUse !== undefined) {
      const classValue = serie.getClass(valueToUse);
      color = palette[classValue];
      fillColor = chroma(color);
    }

    return {
      ...feature,
      properties: {
        ...properties,
        style: {
          color: 'hsl(180, 2%, 70%)',
          fillColor,
        },
      },
    };
  });

  return { features };
};
