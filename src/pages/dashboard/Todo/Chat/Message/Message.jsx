import React, { useEffect, useState } from 'react'
import UseAuth from '../../../../../hooks/UseAuth'
// import { } from '@mui/icons-material/MarkChatRead'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';

export default function Message({ msg, socket, setreply_to_chart,
  reply_to_chart, }) {

  const {  username } = UseAuth()
  const [message, setmessage] = useState({ ...msg });
  const [showReads, setshowReads] = useState(false);
  const reader_usernames = message?.readers?.map(reader => reader?.user?.username)
  const me_read = reader_usernames?.includes(username)
  const ids = message?.readers?.map(read => read?.username);
  const [iRead, setIread] = useState(ids?.includes(username))
  const me_send = msg?.sender?._id === username;

  const handleChangeReplyMsg = () => {
    setreply_to_chart(message)
  }

  useEffect(() => {
    // console.log(ids);
    if (!iRead && (message?.sender?._id !== username)) {
      // console.log(message?.sender?._id === username);
      socket.emit(`read_message`, ({ id: message?._id, userId: username, date: new Date() }))
    }
    socket.on(`read_message_${message?._id}`, (data) => {
      setmessage({ ...data })
      console.log(data);
      setIread(data?.readers?.map(read => read?.username)?.includes(username))
    })
    return () => {

    };
  }, [message?.readers?.length, message?._id, message?.sender?._id, setIread, socket, username]);

  const handleToggleReadShow = () => {
    setshowReads(prev=>!prev)
  }
  return (
    <section
      className={`relative text-white text-lg bg-slate-500 rounded-[3px]
          w-fit lg:max-w-lg md:max-w-md sm:max-w-sm  text-start py-[1px] px-[4px] 
          ${me_send ? 'self-end md:ml-10 sm:ml-6 ml-3'
          : 'self-start md:mr-10 sm:mr-6 mr-3'}`}>
      {!me_send ?
        <>
          <section className='mt-0 w-full ml-auto mr-0
           flex flex-row flex-wrap items-center mb-0
           justify-between'>
            <strong className='text-sm mr-1
             font-medium'>
            {message?.sender?.username}
            </strong>
            
            <button className='text-[.7rem] mr-[2px] ml-auto'
              onClick={handleChangeReplyMsg}>
              {/* <ArrowLeftOutlined /> */}
              reply
            </button>
            {/* <button className=''>...</button> */}
          </section>
         
        </> : null}
      {message?.reply_to &&
        <section className='flex flex-col bg-gray-400 px-[1px] rounded-[1px]
        mb-3'>
          <small className='font-thin text-xs'>{message?.reply_to?.sender?.username }</small>
          <small className='font-extralight text-xs'>{message?.reply_to?.text }</small>
      </section>}
      <p>{message?.text}</p>
      {message?.readers?.length ?
        <button onClick={handleToggleReadShow}
          className='text-xs bg-blue-100 -mt-3
         float-right'>
          <DoneAllIcon color={me_read ? 'success' : 'disabled'} />
        </button> :
        null}
      {/* success */}
      {showReads &&
        <section className={`flex flex-wrap gap-[3px] 
        w-fit bg-slate-100 p-[2px] rounded`}>
          {message?.readers?.map((read, id) => (
            <section key={id} className='border border-black
          grid grid-cols-1 grid-rows-2 px-[2px] '>
              
          <small 
            className='text-black '>
            {read?.user?.username}
              </small>
              <small className='text-green-600 -mt-[2px]'>
                {
                  isValid(parseISO(read?.date)) ?
                 "@"+ format(parseISO(read?.date), 'MMM do, yyyy, HH:MM') :'invalid date'}
          </small>
          </section>
              
        ))}
        </section>}
      {!message?.delivered? <span>!</span> : null}
    </section>
  )
}
