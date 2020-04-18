import { IGeoJson } from 'types';

export type GeoJSONCollection = {
  type: string;
  features: IGeoJson[];
};

export type GeoJSONData = {
  type: string;
  geometry: Object;
  properties: {
    date?: string;
  };
}[];
