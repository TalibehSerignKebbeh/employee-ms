// import {createEntityAdapter} from '@reduxjs/toolkit'
import {  createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const todoAdapter = createEntityAdapter({});

const initialState = todoAdapter.getInitialState();

export const todoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: (page, pageSize) => ({
                url: `/todo?page=${page}&pageSize=${pageSize}`,
                method: "GET",
                // params: {
                //     page,
                //     pageSize
                // },
                 validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
           
            providesTags: (result, error, arg) => {
                if (result?.data) {
                    const ids = result?.data?.map(todo=>todo?._id)
                    return [
                         { type: 'Todo', id: 'LIST' },
                        ...ids?.map(id => ({ type: 'Todo', id }))
                    ]
                } else return [{ type: 'Todo', id: 'LIST' }]
            }
        }),
        addTodo: builder.mutation({
            query: todoData => ({
            url: '/todo',
                method: "POST",
            body: {...todoData}
            }),
            invalidatesTags: [
                {type: 'Todo', id: "LIST"}
            ]
        }),
         getSingleTodo: builder.query({
            query: (id) => ({
            url: `/todo/${id}`,
                method: "GET",
            // body: {...todoData}
                 validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
             }),
            //  transformResponse: (response) => response.data,
     // `result` is the server response
             providesTags: (result, error, id) => [{ type: 'Todo', id }] 
            // invalidatesTags: [
            //     {type: 'Todo', id: "LIST"}
            // ]
        }),
        updateTodo: builder.mutation({
            query: updatedTodo => ({
                url: `/todo/${updatedTodo?._id}`,
                method: "put",
                body: { ...updatedTodo },
                
            }),
            invalidatesTags:(result, error, arg)=> [
                {type: 'Todo', id:arg.id }
            ]
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todo/${id}`,
                method: "Delete",
                body: { id: id },
                params: {
                    id
                }
            }),
            invalidatesTags:(result, error, arg)=> [
                {type: 'Todo', id:arg.id }
            ]
        })
    })
})

export const { useGetTodosQuery, useAddTodoMutation,
    useDeleteTodoMutation, useUpdateTodoMutation,
useGetSingleTodoQuery} = todoApiSlice;