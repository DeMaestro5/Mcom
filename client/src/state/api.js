import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4001' }),
  reducerPath: 'adminApi',
  tagTypes: [
    'Users',
    'Products',
    'Customers',
    'Transactions',
    'Geography',
    'Sales',
    'Admins',
    'Performance',
    'Dashboard',
  ],
  endpoints: (builds) => ({
    getUser: builds.query({
      query: (id) => `general/user/${id}`,
      provideTags: ['Users'],
    }),
    getProducts: builds.query({
      query: () => 'client/products',
      provideTags: ['Products'],
    }),
    getCustomers: builds.query({
      query: () => 'client/customers',
      provideTags: ['Customers'],
    }),
    getTransactions: builds.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/transactions',
        method: 'GET',
        params: { page, pageSize, sort, search },
      }),
      provideTags: ['Transactions'],
    }),
    getGeography: builds.query({
      query: () => 'client/geography',
      provideTags: ['Geography'],
    }),
    getSales: builds.query({
      query: () => 'sales/sales',
      providesTags: ['Sales'],
    }),
    getAdmins: builds.query({
      query: () => 'management/admins',
      providesTags: ['Admins'],
    }),
    getPerformance: builds.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ['Performance'],
    }),
    getDashboard: builds.query({
      query: () => '/general/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetPerformanceQuery,
  useGetDashboardQuery,
} = api;
