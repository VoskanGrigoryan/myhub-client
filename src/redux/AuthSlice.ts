import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { GoogleAuthRequest, GoogleAuthResponse } from "../types/auth";

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8080/auth",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = (state as any).session?.user?.backendToken || "";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    googleLoginRegister: builder.mutation<
      GoogleAuthResponse,
      GoogleAuthRequest
    >({
      query: (googleData) => ({
        url: "/auth/google", // Your specific backend endpoint for Google login/register
        method: "POST",
        body: googleData,
      }),
    }),
    getUserProfile: builder.query<any, void>({
      query: () => "/users/profile",
    }),
  }),
});

export const { useGoogleLoginRegisterMutation, useGetUserProfileQuery } =
  authSlice;
