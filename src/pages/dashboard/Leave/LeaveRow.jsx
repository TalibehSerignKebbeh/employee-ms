import React, {  } from 'react'
import format from 'date-fns/format'
import toDate from 'date-fns/toDate'
import parseISO from 'date-fns/parseISO'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
// import Tooltip from '@mui/material/Tooltip'
import {
    useUpdateLeaveMutation,
    useAcceptOrLeaveMutation,
} from '../../../features/Leaves/leaveApiSice'
import UseAuth from '../../../hooks/UseAuth'
// import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import isToday from 'date-fns/isToday'
// import isYesterday from 'date-fns/isYesterday'
// import ConfrimDeleteModal from './ActionModals/ConfrimDeleteModal'



export default function LeaveRow({ leave }) {
   const currenDate = new Date()
 
    const { isAdmin } = UseAuth()
    // const [confirmDelete, setconfirmDelete] = useState(false);
    // const [showDelete, setshowDelete] = useState(false);
    const [UpdateLeave, { isLoading: updatingLeave,
        // isError: updateLeaveError, error: leaveUpdaeError
    }] = useUpdateLeaveMutation()
    const [acceptOrRejectMethod, {isLoading:statusChanging}] = useAcceptOrLeaveMutation()

    const Accept = async () => {        
        let newLeave = {
            ...leave,
            accepted: !leave?.accepted,
            rejected:false,
        };
        await acceptOrRejectMethod(newLeave).unwrap()
            .then(res => {
                console.log(res);
                // alert('successs')
            })
            .catch(err => {
                console.log(err);
            })

    }

    const Reject = async () => {
        
        let newLeave = {
            ...leave,
            accepted: false,
            rejected:!leave?.rejected,
        };
        await acceptOrRejectMethod(newLeave).unwrap()
            .then(res => {
                console.log(res);
                // alert('successs')
            })
            .catch(err => {
                console.log(err);
            })

    }
    const MarkLeaveComplete = async () => {

        let newLeave = { ...leave, isComplete: !leave?.isComplete }
        // setisCompleting(true)
        await UpdateLeave(newLeave).unwrap()
            .then(res => {
            // console.log(res);
                // setcompleteMsg(res?.message)
            }).catch(err => {
            console.log(err);
            }).finally(() => {
                // setisCompleting(false)
            })
    }

    
    const formatDate = (date) => {
        if(isToday(parseISO(date))) return 'today'
        return format(toDate(parseISO(date)), 'MMM do, yyyy')
    }
    const leaveDoneStatus = (endDate) => {
        if (isBefore(new Date(endDate),new Date(currenDate))) {
           return 'done'
        }
        return 'active'

    }
    // console.log(isBefore(new Date(leave?.endDate), new Date()), formatDate(leave?.endDate));
    const leaveExpired = () => {
        
        if (isBefore(new Date(leave?.endDate), new Date()))
        { return true }
        return false;
        
    }

    return (
        <TableRow
            sx={{
                position: 'relative',
                // border: leaveExpired() ? '2px solid crimson' : 'inherit',
                ':before': {
                  position:'absolute',  
                }
            }}
        >
            <TableCell sx={{
                fontSize:'1rem',
            }}>{leave?.owner?.username}</TableCell>
            <TableCell sx={{
                fontSize:'1rem',
            }}>{formatDate(leave?.beginDate)}</TableCell>
            <TableCell sx={{
                fontSize:'1rem',
            }}>{formatDate(leave?.endDate)}</TableCell>
            <TableCell sx={{
                fontSize:'1rem',
            }} >{leave?.category}</TableCell>
            <TableCell sx={{
                fontSize:'1rem',
            }}>{leave?.createdby?.username}</TableCell>
            <TableCell sx={{
                fontSize:'1rem',
            }}>
                <span
                    className={`p-[5px] text-[15px] rounded-md text-white
                    ${leave?.isComplete ? 'bg-green-500' :
                            leave?.accepted ? 'bg-blue-400' :
                               leave?.rejected? 'bg-red-400': 'bg-inherit'}`}
                >
                {leave?.isComplete ? 'completed' :
                        leave?.accepted ? "accepted" :
                        leave?.rejected? 'rejected':"pending"}
                </span>
                    
            </TableCell>
           
           <TableCell>
                <Stack
                    direction={'row'} gap={'10px'}
                >
                    {(!leave?.isComplete && !leave.accepted &&  isAdmin)?
                        <Button onClick={() => Accept()}
                            color={leave?.accepted ? 'success' : 'success'}
                            variant='contained'
                        sx={{
                            fontSize: '.6rem', fontWeight: '700', color: '#fff',
                            padding: 1,paddingX:'2px',
                        }} >
                        {statusChanging? 'loading ...' : 'Accept'}
                        </Button> : null}
                    
                    {(!leave?.isComplete && !leave?.rejected && isAdmin) ?
                        <Button onClick={() => Reject()}
                            color={leave?.rejected ? 'error' : 'primary'}
                            variant='contained'
                        sx={{
                            fontSize: '.6rem', fontWeight: '700', color: '#fff',
                            padding: 1,paddingX:'2px',
                        }} >
                         {statusChanging?'loading ..' :'Reject'}
                        </Button> : null}
                    
                    {(!leave?.isComplete && !leave?.rejected &&
                        leave?.accepted && isAdmin) ?
                        <Button disabled={updatingLeave}
                            onClick={() => MarkLeaveComplete()}
                         variant='contained'
                        sx={{ml:2,
                            fontSize: '.6rem', fontWeight: '700',
                            color: '#fff', padding: 1,
                            bgcolor: '#166534',
                             ':hover':{bgcolor:'#15803D'}
                            }}
                            >
                         {updatingLeave? 'loading ...' :'Done'}
                    </Button> : null}
                    {/* {(!leave?.isComplete && 
                        (user?._id === leave?.owner?._id ||
                            user?._id === leave?.createdby?._id
                            || isAdmin))
                        ?
                        <Tooltip title="Delete permantly">
                            <Button
                            sx={{
                                bgcolor: '#B91C1C',
                                ':hover': { bgcolor: '#EF4444' },
                                color:"white"
                           }}
                        onClick={()=>setshowDelete(true)}>
                        Delete
                        </Button> 
                        </Tooltip>
                        : null} */}
                </Stack>
                {/* <ConfrimDeleteModal 
                    leave={leave}
                    showModal={showDelete}
                    handleCloseDeleteModal={() => {
                        setshowDelete(false)
                    }}
                /> */}
            </TableCell> 
        </TableRow>
    )
}
