import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

export default function CollabsRow({person}) {
  return (
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell >{`${person?.firstName} ${person?.middleName} ${person?.lastName}`}</TableCell>
            <TableCell >{person?.username}</TableCell>
            <TableCell >{person?.telephone}</TableCell>
            <TableCell >{person?.email}</TableCell>
            {/* <TableCell sx={{color: colors.grey[100]}}>{person?.address}</TableCell> */}
            <TableCell >{person?.jobTitle}</TableCell>
          <TableCell >{person?.roles?.toString()}</TableCell>
          </TableRow>
  )
}
