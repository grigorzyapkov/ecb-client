export const usdRateResponse = {
  header: {
    id: "6d8436a5-1c7c-4009-9629-dca95b9b503d",
    test: false,
    prepared: "2022-04-01T23:18:36.167+02:00",
    sender: {
      id: "ECB",
    },
  },
  dataSets: [
    {
      action: "Replace",
      validFrom: "2022-04-01T23:18:36.167+02:00",
      series: {
        "0:0:0:0:0": {
          observations: {
            "0": [1.1126],
          },
        },
      },
    },
  ],
  structure: {
    links: [
      {
        title: "Exchange Rates",
        rel: "dataflow",
        href: "https://sdw-wsrest.ecb.europa.eu:443/service/dataflow/ECB/EXR/1.0",
      },
    ],
    name: "Exchange Rates",
    dimensions: {
      series: [
        {
          id: "FREQ",
          name: "Frequency",
          values: [
            {
              id: "D",
              name: "Daily",
            },
          ],
        },
        {
          id: "CURRENCY",
          name: "Currency",
          values: [
            {
              id: "USD",
              name: "US dollar",
            },
          ],
        },
        {
          id: "CURRENCY_DENOM",
          name: "Currency denominator",
          values: [
            {
              id: "EUR",
              name: "Euro",
            },
          ],
        },
        {
          id: "EXR_TYPE",
          name: "Exchange rate type",
          values: [
            {
              id: "SP00",
              name: "Spot",
            },
          ],
        },
        {
          id: "EXR_SUFFIX",
          name: "Series variation - EXR context",
          values: [
            {
              id: "A",
              name: "Average",
            },
          ],
        },
      ],
      observation: [
        {
          id: "TIME_PERIOD",
          name: "Time period or range",
          role: "time",
          values: [
            {
              id: "2022-03-30",
              name: "2022-03-30",
              start: "2022-03-30T00:00:00.000+02:00",
              end: "2022-03-30T23:59:59.999+02:00",
            },
          ],
        },
      ],
    },
  },
};

export const allRatesResponse = {
  header: {
    id: "f2e509ee-e8b2-4518-beb0-41f8a310811a",
    test: false,
    prepared: "2022-04-01T23:19:52.498+02:00",
    sender: {
      id: "ECB",
    },
  },
  dataSets: [
    {
      action: "Replace",
      validFrom: "2022-04-01T23:19:52.498+02:00",
      series: {
        "0:0:0:0:0": {
          observations: {
            "0": [1.4809],
          },
        },
        "0:1:0:0:0": {
          observations: {
            "0": [1.9558],
          },
        },
        "0:2:0:0:0": {
          observations: {
            "0": [5.2808],
          },
        },
        "0:3:0:0:0": {
          observations: {
            "0": [1.3891],
          },
        },
        "0:4:0:0:0": {
          observations: {
            "0": [1.0309],
          },
        },
        "0:5:0:0:0": {
          observations: {
            "0": [7.0666],
          },
        },
        "0:6:0:0:0": {
          observations: {
            "0": [24.45],
          },
        },
        "0:7:0:0:0": {
          observations: {
            "0": [7.4391],
          },
        },
        "0:8:0:0:0": {
          observations: {
            "0": [0.84563],
          },
        },
        "0:9:0:0:0": {
          observations: {
            "0": [8.7081],
          },
        },
        "0:10:0:0:0": {
          observations: {
            "0": [7.572],
          },
        },
        "0:11:0:0:0": {
          observations: {
            "0": [368.13],
          },
        },
        "0:12:0:0:0": {
          observations: {
            "0": [15957.24],
          },
        },
        "0:13:0:0:0": {
          observations: {
            "0": [3.5399],
          },
        },
        "0:14:0:0:0": {
          observations: {
            "0": [84.38],
          },
        },
        "0:15:0:0:0": {
          observations: {
            "0": [142.2],
          },
        },
        "0:16:0:0:0": {
          observations: {
            "0": [135.47],
          },
        },
        "0:17:0:0:0": {
          observations: {
            "0": [1346.97],
          },
        },
        "0:18:0:0:0": {
          observations: {
            "0": [22.1557],
          },
        },
        "0:19:0:0:0": {
          observations: {
            "0": [4.6779],
          },
        },
        "0:20:0:0:0": {
          observations: {
            "0": [9.6398],
          },
        },
        "0:21:0:0:0": {
          observations: {
            "0": [1.5947],
          },
        },
        "0:22:0:0:0": {
          observations: {
            "0": [57.906],
          },
        },
        "0:23:0:0:0": {
          observations: {
            "0": [4.6679],
          },
        },
        "0:24:0:0:0": {
          observations: {
            "0": [4.9477],
          },
        },
        "0:25:0:0:0": {
          observations: {
            "0": [10.3498],
          },
        },
        "0:26:0:0:0": {
          observations: {
            "0": [1.5064],
          },
        },
        "0:27:0:0:0": {
          observations: {
            "0": [37.144],
          },
        },
        "0:28:0:0:0": {
          observations: {
            "0": [16.3296],
          },
        },
        "0:29:0:0:0": {
          observations: {
            "0": [1.1126],
          },
        },
        "0:30:0:0:0": {
          observations: {
            "0": [16.1288],
          },
        },
      },
    },
  ],
  structure: {
    links: [
      {
        title: "Exchange Rates",
        rel: "dataflow",
        href: "https://sdw-wsrest.ecb.europa.eu:443/service/dataflow/ECB/EXR/1.0",
      },
    ],
    name: "Exchange Rates",
    dimensions: {
      series: [
        {
          id: "FREQ",
          name: "Frequency",
          values: [
            {
              id: "D",
              name: "Daily",
            },
          ],
        },
        {
          id: "CURRENCY",
          name: "Currency",
          values: [
            {
              id: "AUD",
              name: "Australian dollar",
            },
            {
              id: "BGN",
              name: "Bulgarian lev",
            },
            {
              id: "BRL",
              name: "Brazilian real",
            },
            {
              id: "CAD",
              name: "Canadian dollar",
            },
            {
              id: "CHF",
              name: "Swiss franc",
            },
            {
              id: "CNY",
              name: "Chinese yuan renminbi",
            },
            {
              id: "CZK",
              name: "Czech koruna",
            },
            {
              id: "DKK",
              name: "Danish krone",
            },
            {
              id: "GBP",
              name: "UK pound sterling",
            },
            {
              id: "HKD",
              name: "Hong Kong dollar",
            },
            {
              id: "HRK",
              name: "Croatian kuna",
            },
            {
              id: "HUF",
              name: "Hungarian forint",
            },
            {
              id: "IDR",
              name: "Indonesian rupiah",
            },
            {
              id: "ILS",
              name: "Israeli shekel",
            },
            {
              id: "INR",
              name: "Indian rupee",
            },
            {
              id: "ISK",
              name: "Iceland krona",
            },
            {
              id: "JPY",
              name: "Japanese yen",
            },
            {
              id: "KRW",
              name: "Korean won (Republic)",
            },
            {
              id: "MXN",
              name: "Mexican peso",
            },
            {
              id: "MYR",
              name: "Malaysian ringgit",
            },
            {
              id: "NOK",
              name: "Norwegian krone",
            },
            {
              id: "NZD",
              name: "New Zealand dollar",
            },
            {
              id: "PHP",
              name: "Philippine peso",
            },
            {
              id: "PLN",
              name: "Polish zloty",
            },
            {
              id: "RON",
              name: "Romanian leu",
            },
            {
              id: "SEK",
              name: "Swedish krona",
            },
            {
              id: "SGD",
              name: "Singapore dollar",
            },
            {
              id: "THB",
              name: "Thai baht",
            },
            {
              id: "TRY",
              name: "Turkish lira",
            },
            {
              id: "USD",
              name: "US dollar",
            },
            {
              id: "ZAR",
              name: "South African rand",
            },
          ],
        },
        {
          id: "CURRENCY_DENOM",
          name: "Currency denominator",
          values: [
            {
              id: "EUR",
              name: "Euro",
            },
          ],
        },
        {
          id: "EXR_TYPE",
          name: "Exchange rate type",
          values: [
            {
              id: "SP00",
              name: "Spot",
            },
          ],
        },
        {
          id: "EXR_SUFFIX",
          name: "Series variation - EXR context",
          values: [
            {
              id: "A",
              name: "Average",
            },
          ],
        },
      ],
      observation: [
        {
          id: "TIME_PERIOD",
          name: "Time period or range",
          role: "time",
          values: [
            {
              id: "2022-03-30",
              name: "2022-03-30",
              start: "2022-03-30T00:00:00.000+02:00",
              end: "2022-03-30T23:59:59.999+02:00",
            },
          ],
        },
      ],
    },
  },
};
