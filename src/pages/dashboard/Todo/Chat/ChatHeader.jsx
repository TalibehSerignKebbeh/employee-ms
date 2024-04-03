import React, { useEffect } from 'react';
import { useGetSingleTodoQuery } from '../../../../features/Todo/todoApiSlice';
import { useParams } from 'react-router-dom';
import UseAuth from '../../../../hooks/UseAuth';
// import { useTheme } from '@mui/material/styles';

const ChatHeader = ({socket}) => {
    const { id } = useParams()
    // console.log(id);
    // const [todoChatData, settodoChatData] = useState(null);
    const { user, username } = UseAuth()
    // const theme = useTheme()
    // const isDark = theme.palette.mode === 'dark';
    const { data: todoChat, isLoading, error, refetch } = useGetSingleTodoQuery(id)

    useEffect(() => {
       
        // console.log(todoChat);
            // console.log(todoChat?.active_users?.includes(user?._id));
       
        if (!todoChat?.active_users?.includes(user?._id)) {
             socket.volatile.emit('enter_chat', ({ userId: user?._id,chatId: id}))
        }
        socket.on(`leave_chat_${id}`, username => {
             console.log(username, 'leaving chat');
            refetch()
        })  
        // socket.on(`enter_chat_${id}`, () => {
        //     refetch()
        // })
        // return () => {
        //     socket.emit('leave_chat',({ userId: user?._id,chatId: id}))
        // };
    }, [id, refetch, socket, todoChat?.active_users, user?._id]);
    
    const isPersonActive = (person) => {
       return todoChat?.active_users?.includes(person?._id)
    }


    return (
        <div className=''>
            {isLoading ? <p className='text-white'>Loading...</p> :
                <section className='md:px-2 py-1'>
                    <section className='flex flex-col gap-0 '>
                        
                        <h3 className={`text-xl text-start 
                         capitalize -mb-[5px] font-medium
                         text-white`}>
                            {todoChat?.name}
                        </h3>
                        <small className='text-lg text-white'>
                            <strong>{user?.username}</strong>
                        </small>
                </section>
                    <section className='md:max-w-[400px] max-w-[300px] text-ellipsis
                    flex gap-1 '>     
                        {todoChat?.collabs?.map((person, id) => (
                            <small key={id}
                                className={`text-lg ${isPersonActive(person) ? 'text-green-500' : 'text-white'}`}
                            >
                                {person?.username + `${id === todoChat?.collabs?.length-1? '':','}`}
                            </small>
                        ))}
                </section>
                 </section>}
            {error &&
                <section>
                
                    <p>{error?.data?.message || error?.message}</p>
                </section>}
        </div>
    );
}

export default ChatHeader;
