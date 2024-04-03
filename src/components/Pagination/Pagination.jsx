import  Pagination  from '@mui/material/Pagination'
import React from 'react'

export default function PaginateComp({
    page, setpage, total,pageSize
}) {
  return (
    <Pagination
                                        hidden={Math.ceil(total / pageSize) === 1}
                                        page={page + 1} defaultPage={page + 1}
                                        count={Math.ceil(total / pageSize)}
                                        siblingCount={4}
                                        onChange={(e, num) => {
                                            setpage(num - 1)
                                        }}
                                    />
  )
}
