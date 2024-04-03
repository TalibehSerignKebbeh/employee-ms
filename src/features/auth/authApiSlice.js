import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, logout } from './authSlice'

const authApilice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: '/auth',
                method: 'Post',
                body: { ...data }
            }),

        }),
        postLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'Post'
            }),
           async onQueryStarted (arg, { dispatch, queryFulfilled }) {
                try {
                    // const { data } = await queryFulfilled
                    await queryFulfilled
                    // console.log(data);
                    dispatch(logout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000);
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: 'auth/refresh',
                method: "GET"
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled
                    // console.log(data);

                    // const { accessToken } = data
                    dispatch(setCredentials(data))
                    
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})

export const {useLoginMutation, usePostLogoutMutation, useRefreshTokenMutation} = authApilice