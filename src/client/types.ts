import { ECBSeries } from "./interfaces";

export type NullOrNum = number | null;
export type ECBObservation = [
  number,
  NullOrNum,
  NullOrNum,
  NullOrNum,
  NullOrNum
];
export type ECBSeriesSet = { [key: string]: ECBSeries };
export type ECBObservationSet = { [key: string]: ECBObservation };
export type ExchangeRatesResponse = { [key: string]: number };