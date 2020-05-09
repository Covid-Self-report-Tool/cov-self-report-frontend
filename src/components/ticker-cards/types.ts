import { RequiredKeys } from 'types';
import { CurrentTotalsTypes } from 'context/types';

export type TickerInfoType = {
  heading: string;
  defText: string;
  omitLastUpdated?: boolean; // e.g. don't need to show time for self-reported
};

export type RequiredTotalsKeys = RequiredKeys<CurrentTotalsTypes>;

export type TickerTitleTypes = {
  heading: string;
  renderLegendSymbol: () => React.ReactNode;
};

export type TickerCard = Omit<TickerTitleTypes, 'renderLegendSymbol'> & {
  // Some render() props so as not to pass down data through so many levels, and
  // add more options than just `children` would.
  renderTitle: () => React.ReactNode;
  renderPopover: () => React.ReactNode;
  renderSymbolBar: () => React.ReactNode;
  number?: number;
};

export type TickerConfigTypes = {
  [key in RequiredTotalsKeys & string]: TickerInfoType & {
    symbol: LegendSymbolTypes;
  };
};

export type TickerCardTypes = {
  data: CurrentTotalsTypes; // individual totals combined into single object
  config: TickerConfigTypes;
};

export type LegendSymbolTypes = {
  fillColor: string;
  borderColor?: string;
  isCircular?: boolean; // default to square
  size?: string | number;
  borderWidth?: number;
  alwaysShow?: boolean;
  globalStateKey?: string;
  colorStops: string[];
};

export type LegendSymbolBarTypes = {
  colorStops: string[];
  footerLinkClassName: string;
  globalStateKey: string;
};

export type SetCountriesSymbTypes = {
  className: string;
  globalStateKey: string;
};

export type ToggleLayerTypes = {
  // TODO: use `keyof` to restrict possible values appropriately
  visibilityKey: string;
  className: string;
};
