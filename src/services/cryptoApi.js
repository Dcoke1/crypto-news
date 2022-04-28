import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = process.env.REACT_APP_RAPID_API_KEY;

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
  "X-RapidAPI-Key": key,
};

const base_URL = "https://coingecko.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ base_URL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`${base_URL}/global`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`${base_URL}/exchanges/list`),
    }),
    getDetails: builder.query({
      query: (coinId) => createRequest(`${base_URL}/coins/${coinId}`),
    }),
    getHistory: builder.query({
      query: ({ coinId, timePeriod }) =>  {
        return {
          url: `${base_URL}/coins/${coinId}/history`,
          headers: cryptoApiHeaders,
          params: {
            date: timePeriod,
          },
        };
      }
    }),
    getCoins: builder.query({
      query: (count) => {
        return {
          url: `${base_URL}/coins/markets`,
          headers: cryptoApiHeaders,
          params: {
            vs_currency: "usd",
            page: "1",
            per_page: `${count}`,
            order: "market_cap_desc"
          },
        };
      },
    }),
  }),
});

export const { useGetCryptosQuery, useGetExchangesQuery, useGetCoinsQuery, useGetDetailsQuery, useGetHistoryQuery } =
  cryptoApi;
