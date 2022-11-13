import { HttpStatus } from "../constants/http-status.enum";
import { ExceptionBuilder } from "../exceptions/builder/ExceptionBuilder";
import { arraysToMap } from "../utils/object.formatters";
import ecbFetch from "../ecb-fetch";
import {
  ECBCurrencySeriesValue,
  ECBStructureObservation,
  ECBStructureSeries,
  ECBTimePeriodObservationValue,
  ExchangeRatesResponse,
} from "./interfaces";
import { ECBSeriesSet } from "./types";
import {
  add,
  format,
  isAfter,
  isBefore,
  isMatch,
  max,
  min,
  parse,
  startOfToday,
  sub,
} from "date-fns";
import { DATE_FORMAT } from "../constants/general";

class ECBCLient {
  public async getExchangeRatesForPeriod(
    startPeriod: string,
    endPeriod: string,
    ...currencies: string[]
  ) {
    const startPeriodDate = parse(startPeriod, DATE_FORMAT, new Date());
    const endPeriodDate = parse(endPeriod, DATE_FORMAT, new Date());
    if (
      !this.validate(startPeriod) ||
      !this.validate(endPeriod) ||
      isBefore(endPeriodDate, startPeriodDate)
    ) {
      throw ExceptionBuilder.build(HttpStatus.BAD_REQUEST, "Invalid date");
    }
    const fiveDaysBeforeStartPeriod = sub(startPeriodDate, { days: 5 });
    const newStartPeriod = format(fiveDaysBeforeStartPeriod, DATE_FORMAT);
    const data = await ecbFetch(newStartPeriod, endPeriod, ...currencies);
    if (!data) {
      console.error(
        "exchange rates not found between startPeriod=",
        startPeriod,
        " and endPeriod=",
        endPeriod
      );
      throw ExceptionBuilder.build(HttpStatus.NOT_FOUND, "Exchange rates data not found.");
    }

    const exchangeRates = this.buildRates(data, endPeriod);
    // remove first and second date because not needed
    delete exchangeRates[newStartPeriod];
    delete exchangeRates[format(sub(startPeriodDate, { days: 1 }), DATE_FORMAT)];
    delete exchangeRates[format(sub(startPeriodDate, { days: 2 }), DATE_FORMAT)];
    delete exchangeRates[format(sub(startPeriodDate, { days: 3 }), DATE_FORMAT)];
    delete exchangeRates[format(sub(startPeriodDate, { days: 4 }), DATE_FORMAT)];

    return exchangeRates;
  }

  public async getExchangeRatesForDate(dateString: string, ...currencies: string[]) {
    const rates = await this.getExchangeRatesForPeriod(dateString, dateString, ...currencies);
    return rates[dateString];
  }

  private buildRates(data: any, endPeriod: string) {
    const dataSets = data.dataSets?.[0];
    const structure = data.structure;

    const exchangeRates = this.buildExchangeRates(dataSets?.series);
    const dates = this.buildDates(structure.dimensions.observation);
    const currencies = this.buildCurrencies(structure.dimensions.series);

    const availableExchangeRates = arraysToMap(
      dates || [],
      Array.from(Array(dates?.length).keys()),
      (idx: number) => this.buildExchangeRatesResponse(currencies || [], exchangeRates, idx)
    );

    // Manually add endPeriod = data[endPeriod] || {}, because it could be undefined if no available rates
    return this.populateDatesWithoutRates({
      ...availableExchangeRates,
      [endPeriod]: availableExchangeRates[endPeriod] || null,
    });
  }

  // Populates exchange rates for dates without exchange rates
  // Removes the first two days
  private populateDatesWithoutRates(availableExchangeRates: { [key: string]: any }): {
    [key: string]: any;
  } {
    const availableDates = Object.keys(availableExchangeRates).map((dateString) =>
      parse(dateString, DATE_FORMAT, new Date())
    );
    const minDate = min(availableDates);
    const maxDate = max(availableDates);

    const result = {};
    let currDate = minDate;
    let lastAvailableRates = {};
    while (!isAfter(currDate, maxDate)) {
      const currDateString = format(currDate, DATE_FORMAT);
      lastAvailableRates = availableExchangeRates[currDateString] || lastAvailableRates;

      // true except for the two days (min = SAT, min + 1 = SUN)
      if (lastAvailableRates) {
        result[currDateString] = lastAvailableRates;
      }
      currDate = add(currDate, { days: 1 });
    }

    return result;
  }

  private buildExchangeRatesResponse(
    currencies: string[],
    exchangeRates: number[][],
    rateIdx: number
  ): ExchangeRatesResponse {
    const rates = exchangeRates.map((rates) => rates[rateIdx]);
    return arraysToMap(currencies, rates);
  }

  private buildExchangeRates(series: ECBSeriesSet): number[][] {
    const observations = Object.values(series || {}).map((x) => x.observations);
    return observations.map((x) => Object.values(x || {}).map((v) => v?.[0]));
  }

  private buildDates(structureDimensions: ECBStructureObservation[]): string[] | undefined {
    const values = structureDimensions.find((x) => x.id === "TIME_PERIOD")
      ?.values as ECBTimePeriodObservationValue[];
    return values?.map((v) => v.id);
  }

  private buildCurrencies(structureSeries: ECBStructureSeries[]): string[] | undefined {
    const values = structureSeries.find((x) => x.id === "CURRENCY")
      ?.values as ECBCurrencySeriesValue[];
    return values?.map((v) => v.id);
  }

  private validate(dateString: string): boolean {
    const date = parse(dateString, DATE_FORMAT, new Date());
    return isMatch(dateString, DATE_FORMAT) && isBefore(date, startOfToday());
  }
}

const ecbClient = new ECBCLient();
export { ecbClient };
