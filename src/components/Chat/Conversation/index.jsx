import { useRef, useState, useEffect } from 'react';
import cn from 'classnames';

import Header from './Header';
import Messages from './Messages';
import Sender from './Sender';
import useAuth from 'src/context/AuthContext';
import { baseUrl } from '../../../utils/constants';
import './style.scss';
import apiInstance from '../../../config/axios';
import toast from 'react-hot-toast';

export default function Conversation(props) {
  const [messageNumber, setMessageNumber] = useState(0);
  // const [messages, setMessages] = useState(props.messages);
  const [messages, setMessages] = useState([]);
  console.log('message ',messages);

  const updateMessages = (sendMessage, message) => {
    setMessageNumber(messageNumber + 1);
    setMessages([...messages, sendMessage(message)]);
  };
  const chatSocket = useRef(null);
  const auth = useAuth()
    
    const addUserToRoom = async(userId,roomId) =>{
      // checkHasRoom()
      // console.log('addUserToRoom',userId,roomId);
      try {
        const response = await apiInstance.post(`${baseUrl}/message/add/user/${userId}/room/${roomId}`);
        // console.log('response',response);
      } catch (error) {
        console.log('error',error);
      }
    }

    const connecttionwss = async(room_ID) =>{
      try {
          if (auth && auth.user && auth.user.id ) {
            const newChatSocket = new WebSocket(`wss://api.quilco.ir/ws/${room_ID}/`);
            console.log('newChatSocket',newChatSocket);
            newChatSocket.onclose = function (e) {
              toast.error( 'ارتباط با سرور قطع شد' )
              console.log(e);
            };
            const response = await apiInstance.get(`${baseUrl}/message/room/chats/${room_ID}`);
            // console.log('responseget',response);
            setMessages(response.data);
            // console.log('messages', messages);
            chatSocket.current = newChatSocket;
            // chatSocket.current.on
            console.log('chatSocket.current : ',chatSocket.current);
            chatSocket.current.onmessage = function (e) {
              console.log('onmessage',e);
              const data = JSON.parse(e.data);
              console.log('data message',data.message);
              updateMessages(
                message => ({
                  room: room_ID ,
                  message: message,
                  userid : auth.user.id,
                }),
                data.message
              );
            };
          }
      } catch (error) {
        console.log('error',error);
      }
    }
    

    
    
    
    useEffect(() => {
      if (props.roomId === 0){
        connecttionwss(props.hasRoomId);
      }
      else{
        connecttionwss(props.roomId);
        addUserToRoom(auth.user.id,props.roomId);
        addUserToRoom(props.contact_id,props.roomId);
      }
    },[ props.roomId,auth.user.id,props.contact_id ]);
  
  
  const handleNewUserMessage = message => {
    console.log('sent',message,chatSocket.current);
    let sendId = 0;
    if (props.roomId ===0) {
      sendId = props.hasRoomId
    }
    else{
      sendId = props.roomId ;
    }
    // const data = JSON.stringify({
    //   message: message,
    //   userid : auth.user.id,
    //   room : sendId, 
    //   // sender_type: 'CLIENT',
    // })
    chatSocket.current.send(
      JSON.stringify({
        message: message,
        userid : auth.user.id,
        room : sendId, 
        // sender_type: 'CLIENT',
      })
    );
    // console.log("sent data : ",data);
  };


  return (
    <div id="rcw-conversation-container" className={cn('rcw-conversation-container')} aria-live="polite">
      <Header title={props.title} subtitle={props.subtitle} />
      <Messages
        messages={messages}
        messageNumber={messageNumber}
        profileAvatar={props.profileAvatar}
        profileClientAvatar={props.profileClientAvatar}
        showTimeStamp={props.showTimeStamp}
        // sender_type={'CLIENT'}
      />

      <Sender
        updateMessages={updateMessages}
        handleNewUserMessage={handleNewUserMessage}
        sendMessage={props.handlerSendMsn}
        placeholder={props.senderPlaceHolder}
        disabledInput={props.disabledInput}
        autofocus={props.autofocus}
        onTextInputChange={props.onTextInputChange}
        buttonAlt={props.sendButtonAlt}
        onPressEmoji={props.togglePicker}
      />
    </div>
  );
}