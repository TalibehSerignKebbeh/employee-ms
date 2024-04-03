import React from 'react';
import {DataGrid} from '@mui/x-data-grid'
import { Box } from '@mui/system';
import { Header } from '../../components/other';
import { tokens } from '../../theme';
import { Typography, useTheme } from '@mui/material';
import {mockDataTeam} from '../../data/mockData'
import { AdminPanelSettingsOutlined, LockOpenOutlined, SecurityOutlined } from '@mui/icons-material';

const Teams = () => {
    const colors = tokens(useTheme().palette.mode)
    const columns = [{ field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        {field: "age", headerName: "Age",type: "Number", headerAlign: 'left', align: 'left' },
        {field: "phone", headerName: "Phone", flex: 1 },
        {field: "email", headerName: "Email", flex: 1 },
        {
            field: "access", headerName: "Access Level", flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box width={'60%'} m="0 auto" p="5px"
                        display="flex" justifyContent={"center"}
                        backgroundColor={access === "admin" ?
                            colors.greenAccent[600] : colors.greenAccent[700]
                        }
                        borderRadius= "14px"
                    >
                     {access === "admin" && <AdminPanelSettingsOutlined />}
                     {access === "manager" && <SecurityOutlined />}
                        {access === "user" && <LockOpenOutlined />}
                        <Typography color={colors.grey[100]} sx={{ml: '5px'}}>{ access}</Typography>
                    </Box>
                )
                
            }
        }
    ]
    return (
        <Box m="20px">
            <Header title={"TEAM"} subTitle="Welcome to the teams" />
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
                        color: "#fff",
                        borderTop: 'none'
                    }
                }}>
                <DataGrid rows={mockDataTeam} columns={columns} />
            </Box>
        </Box>
    );
}

export default Teams;
