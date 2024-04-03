import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

const UserTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell>LastName</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>JobTitle</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Active</TableCell>
            </TableRow>
            
        </TableHead>
    );
}

export default UserTableHead;
