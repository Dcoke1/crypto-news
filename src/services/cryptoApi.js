import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = process.env.REACT_APP_COINGECKO_API_KEY;

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

export const { useGetCryptosQuery, useGetExchangesQuery, useGetCoinsQuery } =
  cryptoApi;