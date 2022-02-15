import { BaseException } from './exceptions/BaseException';
import ecbClient from "./client/ECBClient";

ecbClient
  .getExchangeRatesForPeriod("2022-02-02", "2022-02-02")
  .then(rates => {
    console.log('rates came: ' + JSON.stringify(rates));
  })
  .catch((err: BaseException) => {
    console.log(err.getStatus());
  });
