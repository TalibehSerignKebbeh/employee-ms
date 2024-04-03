import { createApi, fetchBaseQuery,  } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    credentials: 'include',
    mode:'cors',
    prepareHeaders: (headers, {getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    },
})

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
    // console.log(args);
    // console.log(api);
    // console.log(extraOptions);
    let result = baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        console.log(result);
    }
    if (result?.error?.status === 403) {
        console.log('sending refresh token');
        const refreshTokenResult = baseQuery('/auth/refresh', api, extraOptions)

        if (refreshTokenResult?.data) {
            api.dispatch(setCredentials({...refreshTokenResult?.data}))
            result = baseQuery(args, api, extraOptions)
            
        } else {
            if (refreshTokenResult?.error?.status === 403) {
                refreshTokenResult.error.data.message = "Your login has expired"
            }
            return refreshTokenResult;
        }
    }
    return result;
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ["Employee", "Leave","Todo","Message"],
    endpoints: builder => ({}),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect:true,
})