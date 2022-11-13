import { ecbClient } from "../../src/ECBClient/ECBClient";

const currencies = [
  "USD",
  "JPY",
  "BGN",
  "CZK",
  "DKK",
  "GBP",
  "HUF",
  "PLN",
  "RON",
  "SEK",
  "CHF",
  "ISK",
  "NOK",
  "HRK",
  "TRY",
  "AUD",
  "BRL",
  "CAD",
  "CNY",
  "HKD",
  "IDR",
  "ILS",
  "INR",
  "KRW",
  "MXN",
  "MYR",
  "NZD",
  "PHP",
  "SGD",
  "THB",
  "ZAR",
];

describe("GetExchangeRatesForDate IT", () => {
  it("should return exchange rates holiday date", async () => {
    const exchangeRates = await ecbClient.getExchangeRatesForDate("2020-04-13");
    expect(!!exchangeRates).toEqual(true);
    currencies.forEach((currency) => expect(typeof exchangeRates[currency]).toEqual("number"));
  });
});
