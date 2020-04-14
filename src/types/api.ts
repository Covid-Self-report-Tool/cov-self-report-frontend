import { IGeoJson } from 'types';

export type GeoJSONCollection = {
  type: string;
  features: IGeoJson[];
};

export type GeoJSONData = {
  type: string;
  properties: Object;
  geometry: Object;
}[];
