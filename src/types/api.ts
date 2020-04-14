import { IGeoJson } from 'types';

export type GeoJSONCollection = {
  type: string;
  features: IGeoJson[];
};
