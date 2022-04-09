import { ecbClient } from "../../src/ECBClient/ECBClient";
import ecbFetch from "../../src/ecb-fetch";
import { NotFoundException } from "../../src/exceptions/NotFoundException";
import { usdResponse25March2022To27March2022, usdResponse30March2022 } from "./mockResponse";
import { BadRequestException } from "../../src/exceptions/BadRequestException";

jest.mock("../../src/ecb-fetch");
const ecbFetchMock = ecbFetch as jest.MockedFunction<typeof ecbFetch>;

describe("getExchangeRatesForDate", () => {
  it("should throw NotFoundException when status code is 200 and empty response", async () => {
    ecbFetchMock.mockRejectedValue(new NotFoundException("Exchange rates data not found"));

    const action = async () => await ecbClient.getExchangeRatesForDate("2022-04-02");
    
    await expect(action()).rejects.toThrowError(NotFoundException);
    expect(ecbFetchMock.mock.calls.length).toBe(1);
    expect(ecbFetchMock).toBeCalledWith("2022-03-31", "2022-04-02");
  });

  it("should return correct USD exchange rates for given date with available exchange rates", async () => {
    const expected = {
      USD: 1.1126,
    };

    ecbFetchMock.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(usdResponse30March2022);
      });
    });

    const response = await ecbClient.getExchangeRatesForDate("2022-03-30", "USD");

    expect(response).toEqual(expected);
    expect(ecbFetchMock).toBeCalledWith("2022-03-28", "2022-03-30", "USD");
  });

  it("should return correct USD exchange rates for given date without exchange rates", async () => {
    const expected = {
      USD: 1.1002,
    };

    ecbFetchMock.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(usdResponse25March2022To27March2022);
      });
    });

    const response = await ecbClient.getExchangeRatesForDate("2022-03-27", "USD");

    expect(response).toEqual(expected);
    expect(ecbFetchMock).toBeCalledWith("2022-03-25", "2022-03-27", "USD");
  });

  it("should throw Exception if date is not in valid format", async () => {
    const action = async () => await ecbClient.getExchangeRatesForDate("02.04.2022");
    await expect(action()).rejects.toThrowError(BadRequestException);
    await expect(action()).rejects.toThrowError("Invalid date");
    expect(ecbFetchMock.mock.calls.length).toBe(0);
  });

  it("should throw Exception if date is not before today", async () => {
    const action = async () => await ecbClient.getExchangeRatesForDate("2150-03-30");
    await expect(action()).rejects.toThrowError(BadRequestException);
    await expect(action()).rejects.toThrowError("Invalid date");
    expect(ecbFetchMock.mock.calls.length).toBe(0);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
