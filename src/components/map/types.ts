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

export type MapProps = {
  data: any[]; // TODO: type this
  submittedFeats: PositionType[];
};

// TODO: extend the existing type in `SymptomForm`?
export type SelfReportedType = {
  address: string;
  city: string | null;
  country: string | null;
  county: string | null;
  date: string | null;
  lat: number;
  lng: number;
  state: string | null;
};
