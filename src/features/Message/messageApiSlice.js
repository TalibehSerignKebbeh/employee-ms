// import {createEntityAdapter} from '@reduxjs/toolkit'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const messageAdapter = createEntityAdapter({});

const initialState = messageAdapter.getInitialState();

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessages: builder.query({
            query: (page, pageSize) => ({
                url: `/message?page=${page}&pageSize=${pageSize}`,
                method: "GET",
                 validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
          
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                         { type: 'Messages', id: 'LIST' },
                        ...result?.ids?.map(id => ({ type: 'Message', id }))
                    ]
                } else return [{ type: 'Message', id: 'LIST' }]
            }
        }),
         getTodoMessages: builder.query({
            query: (id) => ({
                url: `/message/${id}`,
                method: "GET",
                 validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
          
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                         { type: 'Messages', id: 'LIST' },
                        ...result?.ids?.map(id => ({ type: 'Message', id }))
                    ]
                } else return [{ type: 'Message', id: 'LIST' }]
            }
        }),
        addMessage: builder.mutation({
            query: leaveData => ({
            url: '/message',
                method: "POST",
            body: {...leaveData}
            }),
            invalidatesTags: [
                {type: 'Message', id: "LIST"}
            ]
        }),
        updateMessage: builder.mutation({
            query: updatedMessage => ({
                url: `/message/${updatedMessage?._id}`,
                method: "put",
                params:{id:updatedMessage?._id},
                body: {...updatedMessage}
            }),
            invalidatesTags:(result, error, arg)=> [
                {type: 'Message', id:arg.id }
            ]
        }),
       
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/message/${id}`,
                method: "Delete",
                params:{id:id},
                body: {id}
            }),
            invalidatesTags:(result, error, arg)=> [
                {type: 'Message', id:arg.id }
            ]
        })
    })
})

export const { useGetMessagesQuery, useAddMessageMutation,
    useDeleteMessageMutation,useGetTodoMessagesQuery }
    = messageApiSlice;