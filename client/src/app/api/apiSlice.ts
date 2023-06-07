import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import type { User } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as { auth: { accessToken: string } })
            .auth.accessToken;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if ((result.error as any)?.originalStatus === 403) {
        console.log("sending refresh token");

        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        console.log(refreshResult);
        if (refreshResult?.data) {
            const user: User = api.getState().auth.user;

            api.dispatch(setCredentials({ ...refreshResult.data, user }));

            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("refresh token failed");
            api.dispatch(logOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (_builder) => ({}),
});
