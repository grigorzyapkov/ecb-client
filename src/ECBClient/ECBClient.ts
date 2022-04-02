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

class ECBCLient {
  private url = "https://sdw-wsrest.ecb.europa.eu/service/data/EXR/";

  public async getExchangeRatesForPeriod(
    startPeriod: string,
    endPeriod: string,
    ...currencies: string[]
  ) {
    const data = await ecbFetch(startPeriod, endPeriod, ...currencies);
    if (!data) {
      throw ExceptionBuilder.build(HttpStatus.NOT_FOUND, "Exchange rates data not found");
    }

    return this.buildRates(data);
  }

  public async getExchangeRatesForDate(
    date: string,
    ...currencies: string[]
  ) {
    const rates = await this.getExchangeRatesForPeriod(date, date, ...currencies);
    return rates[date];
  }

  private buildRates(data: any) {
    const dataSets = data.dataSets?.[0];
    const structure = data.structure;
    const exchangeRates = this.buildExchangeRates(dataSets?.series);
    const dates = this.buildDates(structure.dimensions.observation);
    const currencies = this.buildCurrencies(structure.dimensions.series);

    return arraysToMap(dates || [], Array.from(Array(dates?.length).keys()), (idx: number) =>
      this.buildExchangeRatesResponse(currencies || [], exchangeRates, idx)
    );
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
}

const ecbClient = new ECBCLient();
export { ecbClient };
