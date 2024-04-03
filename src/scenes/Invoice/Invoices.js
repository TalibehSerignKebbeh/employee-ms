import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system';
import { Header } from '../../components/other';
import { tokens } from '../../theme';
import { IconButton, Typography, useTheme } from '@mui/material';
import { mockDataInvoices } from '../../data/mockData'
import { DeleteOutline } from '@mui/icons-material';
import Formik from 'formik'
import { useMediaQuery } from '@mui/material';

const Invoices = () => {
    const [selectIded, setselectedIds] = useState([]);
    const colors = tokens(useTheme().palette.mode)
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "phone", headerName: "Phone", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "cost", Cost: "Email", flex: 1, renderCell: (params) => {
                <Typography color={colors.greenAccent[500]}>${ params.row.cost}</Typography>
            }
        },
        { field: "date", headerName: "Date", flex: 1 },
     

        

    ]
    return (
        <Box m="20px">
            <Header title={"INVOICES"} subTitle="List of invoice balances" />
            <Box height={'75vh'} m="20px 0 0 0"
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
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`
                    }
                }}>
                <Box width="100%" height={"40px"} display={'flex'} justifyContent="flex-end">
                    {selectIded?.length > 0 ?
                        <IconButton
                            sx={{ color: colors.redAccent[700], scale: '2' }}><DeleteOutline /></IconButton> : null}
                </Box>
                <DataGrid checkboxSelection
                    rows={mockDataInvoices} columns={columns}
                    onSelectionModelChange={(ids) => setselectedIds(ids)}
                />
            </Box>
            
        </Box>
    );
}

export default Invoices;
