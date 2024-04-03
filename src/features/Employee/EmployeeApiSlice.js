// import {createEntityAdapter} from '@reduxjs/toolkit'
import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const employeeAdapter = createEntityAdapter({});

const initialState = employeeAdapter.getInitialState();

export const EmployeeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEmployees: builder.query({
      query: () => ({
        url: `/employee`,
        method: "GET",
       
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),

      providesTags: (result, error, arg) => {
        if (result?.data) {
          const ids = result?.data?.map(employee => employee._id);
          return [
            { type: 'Employee', id: 'LIST' },
            ...ids.map(id => ({ type: 'Employee', id }))
          ];
        } else {
          return [{ type: 'Employee', id: 'LIST' }];
        }
      }
    }),

    addEmployee: builder.mutation({
      query: employeeData => ({
        url: '/employee',
        method: "POST",
        body: { ...employeeData }
      }),
      invalidatesTags: [
        { type: 'Employee', id: "LIST" }
      ]
    }),
    updateEmployee: builder.mutation({
      query: updatedEmployee => ({
        url: "/employee",
        method: "Put",
        body: { ...updatedEmployee }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Employee', id: arg.id }
      ]
    }),
    updateEmployeeProfile: builder.mutation({
      query: updatedEmployee => ({
        url: `/employee/${updatedEmployee?._id}`,
        method: "Put",
        body: { ...updatedEmployee }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Employee', id: arg.id }
      ]
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employee/${id}`,
        method: "Delete",
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Employee', id: arg.id }
      ]
    }),
     getEmployeeProfile: builder.query({
      query: () => ({
        url: `employee/profile`,
        method: "get",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Employee', id: arg.id }
      ]
    })
  })
})

export const { useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeesQuery, 
  useUpdateEmployeeMutation,
  useUpdateEmployeeProfileMutation, 
  useGetEmployeeProfileQuery,
} = EmployeeApiSlice;