import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://authapp-production-ba06.up.railway.app/",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const fetchBaseQueryWithReAuth = async (args, api, extraOptions) => {
  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
      console.log("Access token expired, refreshing...");

      const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
      if (refreshResult?.data) {
        const { accessToken } = refreshResult.data;
        Cookies.set("accessToken", accessToken);
        console.log("Access token refreshed");

        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("Failed to refresh token");
        if (refreshResult?.error?.status === 403) {
          refreshResult.error.data.message = "Your login has expired";
        }
        return refreshResult;
      }
    }

    return result;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return {
      error: { status: 500, data: { message: "An unexpected error occurred" } },
    };
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQueryWithReAuth,
  endpoints: () => ({}),
});
