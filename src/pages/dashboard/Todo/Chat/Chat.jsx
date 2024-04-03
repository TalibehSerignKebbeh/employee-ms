import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
// import Refresh from '@mui/icons-material/Refresh';
// import CircularProgress from '@mui/material/CircularProgress';
import ChatInput from './ChatInput';
import UseAuth from '../../../../hooks/UseAuth';
import ArrowDownwardOutlined from '@mui/icons-material/ArrowDownwardOutlined'
// import { useGetTodoMessagesQuery, useAddMessageMutation } from '../../../../features/Message/messageApiSlice';
import Message from './Message/Message';
import ChatHeader from './ChatHeader';


const Chat = ({ socket }) => {

    const {  username } = UseAuth()
    const { id } = useParams()
    const navigate = useNavigate()
    const message_wrapper_ref = useRef(null)
    const [messages, setmessages] = useState([]);

    // const { data, isLoading, isSuccess, refetch, isFetching } = useGetTodoMessagesQuery(id)
    // const [AddMessage, {
    //     isError: sendMessageError,
    //     isLoading: sendMesageLoading,
    //     isSuccess: sendMessageSuccess
    // }] = useAddMessageMutation()
    const [open, setOpen] = useState(localStorage.getItem('open') || true);
    const [currentTypeMessage, setcurrentTypeMessage] = useState('');
    const [reply_to_chart, setreply_to_chart] = useState(null);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);


    const handleClose = () => {
        // console.log('leaving chat');
        socket.emit('leave_chat', ({ username: username, chatId: id }))
        socket.off('connect')
        socket.off('message_send')
        socket.off('read_message')
        socket.off('enter_chat')
        // socket.off('leave_chat')
        socket.off('user_typing')
        socket.off('user_stop_typing')
        localStorage.removeItem('open')
        setOpen(false);
        navigate(-1)
    };




    useEffect(() => {
        localStorage.setItem('open', open)
        return () => {
            localStorage.removeItem('open')
        };
    }, [open]);
    // useEffect(() => {
    //     if (isSuccess) {
    //         setmessages([...data])
    //     }
    // }, [data, isSuccess])



    const scrollToBottom = () => {
        const divElement = message_wrapper_ref.current;
        // divElement.scrollTop = divElement.scrollHeight;
        divElement.scrollTo({
            top: divElement.scrollHeight,
            behavior: 'smooth', // Smooth scrolling behavior
        });
        setShouldScrollToBottom(false);
    };

    // scroll event effect
    useEffect(() => {
        const divElement = message_wrapper_ref.current;
        divElement?.addEventListener('scroll', () => {
            const divElement = message_wrapper_ref.current;
            const windowHeight = window.innerHeight;
            const divHeight = divElement.scrollHeight;
            const scrollThreshold = divHeight - windowHeight + 80;
            // console.log(divElement?.scrollTop);
            if (divElement.scrollTop >= scrollThreshold) {
                setShouldScrollToBottom(false);
            } else {
                setShouldScrollToBottom(true);
            }

        });
        return () => {
            //   divElement?.removeEventListener('scroll')
        };
    }, []);

    useEffect(() => {
        //  username, chatId

        socket.emit('enter_chat', ({ username: username, chatId: id }))
        socket.on(`enter_chat_${id}`, (messages) => {
            // console.log(messages);
            setmessages([...messages])
        })
        return () => {
            console.log('unmounting the chat page');
            
            socket.emit('leave_chat', ({ username: username, chatId: id }))
        };
    }, [id, socket, username]);

    useEffect(() => {
        socket.on(`message_receive_${id}`, (message_data) => {
            // console.log(message_data);
            //  console.log("message receive");
            //  const msg_id = message_data?._id;
            //  const all_ids = messages?.map(msg => msg?._id);
            //  if (all_ids?.includes(msg_id)) {
            //      return;
            //  } else {
            //      refetch()
            //  }
            setmessages([...messages, message_data])
            // refetch()
        })
    }, [id, messages, socket]);

    const handleSendMessage = async () => {
        // console.log("sending");
        const messageObj = {
            text: currentTypeMessage, sender: username,
            todo: id, reply_to: reply_to_chart?._id || null,
            delivered: false,
        }
        // await AddMessage(messageObj).unwrap()
        //     .then((res) => {
        //         console.log(res);
        //         socket.emit(`message_send`, ({ ...messageObj }))
        //         setmessages([...messages, { ...messageObj, sender: user }])
        //     })
            
         socket.emit(`message_send`, ({ ...messageObj }))
                setmessages([...messages, { ...messageObj, sender: username }])
      

        setcurrentTypeMessage('')
        setreply_to_chart(null)
    }

    const MessageEvent = async () => {
        console.log('emitting');
        
        socket.emit('message', 'some mesage')
    }

    return (

        <Dialog
            fullScreen
            fullWidth
            onClose={handleClose}
            open={open}
            disableEscapeKeyDown
        // disableScrollLock={true}
        >
            <div className={`flex flex-col  max-h-screen h-full w-screen `}>
                <div className={`flex-grow -order-1 flex-shrink-0 bg-slate-600
                    flex flex-row justify-between items-center overflow-x-hidden
                    self-stretch justify-self-start h-fit max-h-32`}>
                    <ChatHeader socket={socket} />
                    <div>
                        {/* <IconButton
                            disabled={isFetching || isLoading}
                            onClick={() => refetch()}>{
                                isFetching ? <CircularProgress
                                    sx={{ transform: 'scale(1.3)' }}
                                /> : <Refresh sx={{ transform: 'scale(1.3)' }} />
                            }</IconButton> */}
                        <IconButton onClick={handleClose}>
                            <CloseOutlined sx={{ transform: 'scale(1.3)' }} />
                        </IconButton>
                    </div>
                </div>
                <div ref={message_wrapper_ref} className={`flex-grow order-[0] overflow-y-auto bg-slate-700 overflow-x-hidden
                py-4 relative`}>

                    {shouldScrollToBottom &&
                        <button onClick={scrollToBottom}
                            id='scroll_top_btn'
                            className='fixed z-10 bottom-20 right-2 bg-slate-200
                            w-fit h-fit
                             '>
                            <ArrowDownwardOutlined color='action' sx={{
                                color: '#333',
                            }} />
                        </button>}

                    {/* {(!messages?.length && isLoading) ?
                        <div>
                            <p className='px-10  text-2xl text-white'>Loading...</p>
                        </div> : */}
                        <div className='flex flex-col md:px-10 sm:px-6 px-1 gap-y-2'>
                            {/* <h3 className='px-10 py-3 text-white'>Messages</h3> */}
                            {messages?.map((msg, id) => (
                                <Message key={id}
                                    msg={msg}
                                    socket={socket}
                                    setreply_to_chart={setreply_to_chart}
                                    reply_to_chart={reply_to_chart}
                                />
                            ))}
                        </div>
                    {/* } */}


                    {/* <!-- Add more content here to make it overflow --> */}

                </div>
                <div className={`flex-shrink-0 order-1 flex-grow-0 bg-slate-600
                    w-full md:mx-0 sm:mx-0 mx-0 ml-[2px] overflow-x-hidden
                    h-fit overflow-y-auto justify-self-end `}>
                    <button className='w-14 h-6 rounded-sm
                    bg-orange-600 text-white
                    relative ml-auto mr-0'
                        onClick={MessageEvent}>
                        send</button>
                    <ChatInput
                        message={currentTypeMessage}
                        setmessage={setcurrentTypeMessage}
                        socket={socket}
                        handleSendMessage={handleSendMessage}
                        setcurrentTypeMessage={setcurrentTypeMessage}
                        setreply_to_chart={setreply_to_chart}
                        reply_to_chart={reply_to_chart}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default Chat;
