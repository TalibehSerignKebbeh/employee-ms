import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box } from '@mui/system';
import { Header } from '../../components/other';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { mockDataContacts } from '../../data/mockData'

const Contacts = () => {
    const colors = tokens(useTheme().palette.mode)
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "registrarId", headerName: "RegistrarId", flex: 0.5 },
        { field: "zipCode", headerName: "ZipCode", flex: 1 },
        { field: "city", headerName: "City", flex: 1 },
        { field: "address", headerName: "Address", flex: 1 },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "age", headerName: "Age", type: "Number", headerAlign: 'left', align: 'left' },
        { field: "phone", headerName: "Phone", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },

    ]
    return (
        <Box m="20px">
            <Header title={"CONTACTS"} subTitle="List of contacts for future reference" />
            <Box height={'75vh'} m="40px 0 0 0"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: 'none'
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none'
                        // backgroundColor: colors.greenAccent[400]
                    },
                    "& .MuiDataGrid-cell": {
                        border: 'none'
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: colors.grey[500],
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: colors.blueAccent[400],
                        borderTop: 'none'
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`
                    }
                }}>
                <DataGrid rows={mockDataContacts} columns={columns} components={{ toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
}

export default Contacts;
