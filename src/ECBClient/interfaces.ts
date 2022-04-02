import { ECBObservationSet, NullOrNum } from "./types";

export interface ECBSeries {
  attributes: NullOrNum[];
  observations: ECBObservationSet;
}

export interface ECBStructureObservation {
  id: string;
  name: string;
  role: string;
  values: any[];
}

export interface ECBStructureSeries {
  id: string;
  name: string;
  values: any[];
}

export interface ECBStructureObservation {
  id: string;
  name: string;
  role: string;
  values: any[];
}

export interface ECBTimePeriodObservationValue {
  id: string;
  name: string;
  start: string;
  end: string;
}

export interface ECBCurrencySeriesValue {
  id: string;
  name: string;
}

export type ExchangeRatesResponse = { [key: string]: number };
