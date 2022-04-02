import { ecbClient } from "../../src/ECBClient/ECBClient";
import ecbFetch from "../../src/ecb-fetch";
import { NotFoundException } from "../../src/exceptions/NotFoundException";
import { usdRateResponse } from "./mockResponse";

jest.mock("../../src/ecb-fetch");
const ecbFetchMock = ecbFetch as jest.MockedFunction<typeof ecbFetch>;

describe("getExchangeRatesForDate", () => {
  it("should throw NotFoundException when status code is 200 and empty response", async () => {
    ecbFetchMock.mockImplementation((startPeriod, endPeriod) => {
      if (startPeriod !== "2022-04-02" && endPeriod !== "2022-04-02") {
        throw new Error();
      }

      throw new NotFoundException("Exchange rates data not found");
    });

    const action = async () => await ecbClient.getExchangeRatesForDate("2022-04-02");
    await expect(action()).rejects.toThrowError(NotFoundException);
    await expect(action()).rejects.toThrowError("Exchange rates data not found");
    expect(ecbFetchMock.mock.calls.length).toBe(2);
    expect(ecbFetchMock).toBeCalledWith("2022-04-02", "2022-04-02");
  });

  it("should return correct USD exchange rates for given date", async () => {
    const expected = {
      USD: 1.1126,
    };

    ecbFetchMock.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(usdRateResponse);
      });
    });

    const response = await ecbClient.getExchangeRatesForDate("2022-03-30", "USD");

    expect(response).toEqual(expected);
  });
});
