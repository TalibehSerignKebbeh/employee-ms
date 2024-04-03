import React from 'react';
import SendOutlined from '@mui/icons-material/SendOutlined'
// import UseAuth from '../../../../hooks/UseAuth';
// import { useParams } from 'react-router-dom';

const ChatInput = ({ socket,
    message, setmessage, setreply_to_chart,
    handleSendMessage,
    reply_to_chart,setcurrentTypeMessage,currentTypeMessage }) => {
    // const { user } = UseAuth()
    // const {id} = useParams()
    const handleMessageChange = (e) => {
        const { value } = e.target;
        setmessage(prev => {
            return value;
        })
    }



    
    return (
        <div className={`md:min-w-[600px] md:max-w-[700px] 
        w-full flex flex-col gap-x-0
         items-center justify-start relative
         p-1 md:mb-0 sm:mb-1 mb-0`}>
            {reply_to_chart ? <section
                className='self-start ml-0 mb-0 bg-slate-500 px-[2px] 
                relative'>
                <button className='absolute right-0 top-0'
                    onClick={() => setreply_to_chart(null)}>
                    x</button>
                <small className='text-xs font-thin mr-1'>
                    {reply_to_chart?.sender?.username}
                </small>
                <p>{reply_to_chart?.text}</p>
            </section> : null}
            <textarea value={message}
                onChange={handleMessageChange}
                className={` w-full min-h-[40px]  border-1 border-gray-700
                text-lg px-[2px] text-black pr-9 pl-4 `}
            />
            <div className='absolute w-auto flex items-center justify-evenly right-0 bottom-0'>

                <button className='bg-slate-700 
            absolute right-[1px] bottom-0 p-[3px] rounded-sm'
                    onClick={handleSendMessage}>
                    <SendOutlined sx={{
                        transform: 'scale(1.4)', color: 'white'
                        , ':hover': {
                            color: 'lightblue'
                        }
                    }} />
                </button>
            </div>


        </div>
    );
}

export default ChatInput;
