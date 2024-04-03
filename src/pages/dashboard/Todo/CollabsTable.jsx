import React from 'react'
// import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
// import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import CollabsRow from './CollabsRow'

export default function CollabsTable({collaborators}) {

     const theme = useTheme()
    const isDark = theme.palette.mode === 'dark';
  return (
    <div>
       <TableContainer component={Paper} variant="elevation" sx={{ fontWeight:"bold",marginBottom:3, fontSize:"",
                        color: (isDark) ? '#fff':'black', backgroundColor: (isDark) ? "" : ""
                    }} className={`${(isDark) ? "#1F2937": "bg-white"}shadow `}
      >
                        <Typography component={'h3'}
                                    sx={{
                                        marginY: 2,px:2, textAlign: 'start',
                                        fontSize: '1.1rem', textTransform: 'capitalize',
                                        fontStyle: 'italic'
                                    }}
                                >Collaborators</Typography>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell >Name</TableCell>
                                    <TableCell >Username</TableCell>
                                    <TableCell >Telephone</TableCell>
                                    <TableCell >Email</TableCell>
                                    {/* <TableCell sx={{color: colors.grey[100]}}>Address</TableCell> */}
                                    <TableCell >JobTitle</TableCell>
                                    <TableCell >Roles</TableCell>
                                    {/* <TableCell >Active</TableCell> */}
                                     </TableRow>
                            </TableHead>
                            <TableBody>
                                {collaborators?.map((emp, id) => (
                                    <CollabsRow key={id} 
                                  person={emp}  />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
    </div>
  )
}
