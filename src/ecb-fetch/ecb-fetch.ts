import axios from "axios";
import { ExceptionBuilder } from "../exceptions/builder/ExceptionBuilder";

const url = "https://sdw-wsrest.ecb.europa.eu/service/data/EXR/";

export const ecbFetch = async (startPeriod: string, endPeriod: string, ...currencies: string[]) => {
  try {
    const endpoint = `${url}${buildCurrencyResource(currencies)}?${buildQueryParams(
      startPeriod,
      endPeriod
    )}`;
    console.log(`Fetch ${endpoint} ...`);
    let response = await axios.get(endpoint);
    return response.data;
  } catch (e) {
    const err = e.toJSON();
    throw ExceptionBuilder.build(err.status, err.message);
  }
};

const buildCurrencyResource = (currencies: string[]) => {
  const currenciesString = currencies?.join("+") ?? "";
  return `D.${currenciesString}.EUR.SP00.A`;
};

const buildQueryParams = (startPeriod?: string, endPeriod?: string): string => {
  const queryParams = [
    "format=jsondata",
    "detail=dataonly",
    buildQueryParam("startPeriod", startPeriod),
    buildQueryParam("endPeriod", endPeriod),
  ];
  return queryParams.filter((param) => !!param).join("&");
};

const buildQueryParam = (id: string, param?: string): string => {
  return param ? `${id}=${param}` : "";
};
