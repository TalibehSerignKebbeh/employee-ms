import React, { useEffect, useState } from 'react';

const SampleChat = ({ socket }) => {
        const [message, setmessage] = useState('');
    
    function SendMessage(params){
        console.log("message");
        socket.emit('sample message',message)
    }
    function DisConnectSocket(params) {
            socket.off('sample message')
            socket.disconnect() 
    }
    useEffect(() => {
        
        return () => {
            socket.off('sample message')
       socket.disconnect()

        };
    }, [socket]);
    return (
        <div className='h-screen w-screen bg-slate-400
        flex items-start overflow-x-hidden'>
            {/* <div className='h-screen overflow-y-auto flex-shrink-0
            w-56 bg-purple-400'>

            </div> */}

            <div className='my-8 mx-5 '>
                <input type="text" name="text" id="text"
                    value={message}
                    onChange={e=>setmessage(e.target.value)}
                />
                <button className='ml-2 px-3
                py-2 rounded bg-orange-400'
                    onClick={SendMessage}>
                    Send
                </button>
                <button
                    className='ml-2 px-3
                py-2 rounded bg-red-500
                text-white'
                onClick={DisConnectSocket}>
                   Close
                </button>
            </div>
        </div>
    );
}

export default SampleChat;
