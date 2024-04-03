// import {createEntityAdapter} from '@reduxjs/toolkit'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const leaveAdapter = createEntityAdapter({});

const initialState = leaveAdapter.getInitialState();

export const leaveApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLeaves: builder.query({
            query: (page, pageSize) => ({
                url: `/leave?page=${page}&pageSize=${pageSize}`,
                method: "GET",
                 validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
          
            providesTags: (result, error, arg) => {
                if (result?.data) {
                    const ids = result?.data?.map(leave=>leave?._id)
                    return [
                         { type: 'Leaves', id: 'LIST' },
                        ...ids?.map(id => ({ type: 'Leave', id }))
                    ]
                } else return [{ type: 'Leave', id: 'LIST' }]
            }
        }),
        addLeave: builder.mutation({
            query: leaveData => ({
            url: '/leave',
                method: "POST",
            body: {...leaveData}
            }),
            invalidatesTags: [
                {type: 'Leave', id: "LIST"}
            ]
        }),
        updateLeave: builder.mutation({
            query: updatedLeave => ({
                url: `/leave/${updatedLeave?._id}`,
                method: "put",
                params:{id:updatedLeave?._id},
                body: {...updatedLeave}
            }),
            invalidatesTags:(result, error, arg)=> [
                {type: 'Leave', id:arg.id }
            ]
        }),
        acceptOrLeave: builder.mutation({
            query: newLeave=> ({
                url: `/leave/${newLeave?._id?.toString()}`,
                method: "post",
                body:{...newLeave},
                params:{id:newLeave?._id}?.toString(),
                // body: {...updatedLeave}
            }),
            invalidatesTags:(result, error, arg)=> [
                {type: 'Leave', id:arg.id }
            ]
        }),
        
        deleteLEave: builder.mutation({
            query: leave => ({
                url: `/leave/${leave?._id?.toString()}`,
                method: "Delete",
                params:{id:leave?._id?.toString()},
                // query:{id:leave?._id?.toString()},
            }),
            invalidatesTags:(result, error, arg)=> [
                {type: 'Leave', id:arg.id }
            ]
        })
    })
})

export const { useAddLeaveMutation, useDeleteLEaveMutation,
    useGetLeavesQuery, useUpdateLeaveMutation,
useAcceptOrLeaveMutation} = leaveApiSlice;