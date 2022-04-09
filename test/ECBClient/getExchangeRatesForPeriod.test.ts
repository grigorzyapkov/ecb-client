import { ecbClient } from "../../src/ECBClient/ECBClient";
import ecbFetch from "../../src/ecb-fetch";
import { NotFoundException } from "../../src/exceptions/NotFoundException";
import {
  allResponse29Mrch2022To31March2022,
  usdResponse23March2022To27March2022,
  usdResponse28March2022To30March2022,
} from "./mockResponse";
import { BadRequestException } from "../../src/exceptions/BadRequestException";
jest.mock("../../src/ecb-fetch");
const ecbFetchMock = ecbFetch as jest.MockedFunction<typeof ecbFetch>;

describe("getExchangeRatesForPeriod", () => {
  it("should throw NotFoundException when status code is 200 and empty response", async () => {
    ecbFetchMock.mockRejectedValue(new NotFoundException("Exchange rates data not found"));

    const action = async () =>
      await ecbClient.getExchangeRatesForPeriod("2022-04-02", "2022-04-02");
    await expect(action()).rejects.toThrowError(NotFoundException);
    expect(ecbFetchMock.mock.calls.length).toBe(1);
    expect(ecbFetchMock).toBeCalledWith("2022-03-31", "2022-04-02");
  });

  it("should return correct USD exchange rates for given period and only days with available rates", async () => {
    const expected = {
      "2022-03-30": {
        USD: 1.1126,
      },
    };
    ecbFetchMock.mockResolvedValue(usdResponse28March2022To30March2022);

    const actual = await ecbClient.getExchangeRatesForPeriod("2022-03-30", "2022-03-30", "USD");

    expect(actual).toEqual(expected);
    expect(ecbFetchMock).toBeCalledWith("2022-03-28", "2022-03-30", "USD");
    expect(ecbFetchMock.mock.calls.length).toBe(1);
  });

  it("should return correct USD exchange rates for given period and days without rates", async () => {
    const expected = {
      "2022-03-25": {
        USD: 1.1002,
      },
      "2022-03-26": {
        USD: 1.1002,
      },
      "2022-03-27": {
        USD: 1.1002,
      },
    };
    ecbFetchMock.mockResolvedValue(usdResponse23March2022To27March2022);

    const actual = await ecbClient.getExchangeRatesForPeriod("2022-03-25", "2022-03-27", "USD");

    expect(actual).toEqual(expected);
    expect(ecbFetchMock).toBeCalledWith("2022-03-23", "2022-03-27", "USD");
    expect(ecbFetchMock.mock.calls.length).toBe(1);
  });

  it("should return correct exchange rates for all currencies for given period and only days with available rates", async () => {
    const expected = {
      "2022-03-31": {
        AUD: 1.4829,
        BGN: 1.9558,
        BRL: 5.3009,
        CAD: 1.3896,
        CHF: 1.0267,
        CNY: 7.0403,
        CZK: 24.375,
        DKK: 7.4379,
        GBP: 0.84595,
        HKD: 8.6918,
        HRK: 7.574,
        HUF: 369.77,
        IDR: 15947,
        ILS: 3.5243,
        INR: 84.134,
        ISK: 142,
        JPY: 135.17,
        KRW: 1347.37,
        MXN: 22.0903,
        MYR: 4.6677,
        NOK: 9.711,
        NZD: 1.6014,
        PHP: 57.514,
        PLN: 4.6531,
        RON: 4.9463,
        SEK: 10.337,
        SGD: 1.5028,
        THB: 36.911,
        TRY: 16.2823,
        USD: 1.1101,
        ZAR: 16.1727,
      },
    };

    ecbFetchMock.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(allResponse29Mrch2022To31March2022);
      });
    });

    const actual = await ecbClient.getExchangeRatesForPeriod("2022-03-31", "2022-03-31");

    expect(actual).toEqual(expected);
    expect(ecbFetchMock).toBeCalledWith("2022-03-29", "2022-03-31");
    expect(ecbFetchMock.mock.calls.length).toBe(1);
  });

  it("should throw Exception if startPeriod is not in valid format", async () => {
    const action = async () =>
      await ecbClient.getExchangeRatesForPeriod("31.01.2022", "2022-03-31");
    await expect(action()).rejects.toThrowError(BadRequestException);
    await expect(action()).rejects.toThrowError("Invalid date");
    expect(ecbFetchMock.mock.calls.length).toBe(0);
  });

  it("should throw Exception if startPeriod is not before today", async () => {
    const action = async () =>
      await ecbClient.getExchangeRatesForPeriod("12.01.2150", "2150-03-31");
    await expect(action()).rejects.toThrowError(BadRequestException);
    await expect(action()).rejects.toThrowError("Invalid date");
    expect(ecbFetchMock.mock.calls.length).toBe(0);
  });

  it("should throw Exception if endPeriod is not in valid format", async () => {
    const action = async () =>
      await ecbClient.getExchangeRatesForPeriod("2022-03-31", "10.04.2022");
    await expect(action()).rejects.toThrowError(BadRequestException);
    await expect(action()).rejects.toThrowError("Invalid date");
    expect(ecbFetchMock.mock.calls.length).toBe(0);
  });

  it("should throw Exception if endPeriod is not before today", async () => {
    const action = async () =>
      await ecbClient.getExchangeRatesForPeriod("2022-03-31", "2150-03-31");
    await expect(action()).rejects.toThrowError(BadRequestException);
    await expect(action()).rejects.toThrowError("Invalid date");
    expect(ecbFetchMock.mock.calls.length).toBe(0);
  });

  it("should throw Exception if endPeriod is before startPeriod", async () => {
    const action = async () =>
      await ecbClient.getExchangeRatesForPeriod("2021-03-31", "2021-03-30");
    await expect(action()).rejects.toThrowError(BadRequestException);
    await expect(action()).rejects.toThrowError("Invalid date");
    expect(ecbFetchMock.mock.calls.length).toBe(0);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
