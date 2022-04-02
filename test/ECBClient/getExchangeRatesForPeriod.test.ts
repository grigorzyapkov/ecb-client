import { ecbClient } from "../../src/ECBClient/ECBClient";
import ecbFetch from "../../src/ecb-fetch";
import { NotFoundException } from "../../src/exceptions/NotFoundException";
import { allRatesResponse, usdRateResponse } from "./mockResponse";
jest.mock("../../src/ecb-fetch");
const ecbFetchMock = ecbFetch as jest.MockedFunction<typeof ecbFetch>;

describe("getExchangeRatesForPeriod", () => {
  it("should throw NotFoundException when status code is 200 and empty response", async () => {
    ecbFetchMock.mockImplementation((startPeriod, endPeriod) => {
      if (startPeriod !== "2022-04-02" || endPeriod !== "2022-04-02") {
        throw new Error();
      }

      throw new NotFoundException("Exchange rates data not found");
    });

    const action = async () =>
      await ecbClient.getExchangeRatesForPeriod("2022-04-02", "2022-04-02");
    await expect(action()).rejects.toThrowError(NotFoundException);
    await expect(action()).rejects.toThrowError("Exchange rates data not found");
    expect(ecbFetchMock.mock.calls.length).toBe(2);
    expect(ecbFetchMock).toBeCalledWith("2022-04-02", "2022-04-02");
  });

  it("should return correct USD exchange rates for given period", async () => {
    const expected = {
      "2022-03-30": {
        USD: 1.1126,
      },
    };
    ecbFetchMock.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(usdRateResponse);
      });
    });

    const actual = await ecbClient.getExchangeRatesForPeriod("2022-03-30", "2022-03-30", "USD");

    expect(actual).toEqual(expected);
    expect(ecbFetchMock).toBeCalledWith("2022-03-30", "2022-03-30", "USD");
    expect(ecbFetchMock.mock.calls.length).toBe(1);
  });

  it("should return correct exchange rates for all currencies for given period", async () => {
    const expected = {
      "2022-03-30": {
        AUD: 1.4809,
        BGN: 1.9558,
        BRL: 5.2808,
        CAD: 1.3891,
        CHF: 1.0309,
        CNY: 7.0666,
        CZK: 24.45,
        DKK: 7.4391,
        GBP: 0.84563,
        HKD: 8.7081,
        HRK: 7.572,
        HUF: 368.13,
        IDR: 15957.24,
        ILS: 3.5399,
        INR: 84.38,
        ISK: 142.2,
        JPY: 135.47,
        KRW: 1346.97,
        MXN: 22.1557,
        MYR: 4.6779,
        NOK: 9.6398,
        NZD: 1.5947,
        PHP: 57.906,
        PLN: 4.6679,
        RON: 4.9477,
        SEK: 10.3498,
        SGD: 1.5064,
        THB: 37.144,
        TRY: 16.3296,
        USD: 1.1126,
        ZAR: 16.1288,
      },
    };

    ecbFetchMock.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(allRatesResponse);
      });
    });

    const actual = await ecbClient.getExchangeRatesForPeriod("2022-03-31", "2022-03-31");

    expect(actual).toEqual(expected);
    expect(ecbFetchMock).toBeCalledWith("2022-03-31", "2022-03-31");
    expect(ecbFetchMock.mock.calls.length).toBe(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
