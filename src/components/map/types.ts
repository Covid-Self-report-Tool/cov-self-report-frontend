import { CountryRow } from 'types';

export type IGeometry = {
  type: string;
  coordinates: number[];
};

export type IGeoJson = {
  type: string;
  geometry: IGeometry;
  properties: CountryRow; // TODO: make this flexible for non-country GeoJSON
  bbox?: number[];
};

export interface GenericGeojsonType {
  type: string;
  geometry: IGeometry;
  properties: {};
  bbox?: number[];
}
export type PositionType = [number, number];

export type MapboxType = {
  tilesetId: string;
};

export type SubmittedType = {
  data: PositionType[];
};
