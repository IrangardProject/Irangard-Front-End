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
  const [messages, setMessages] = useState([]);
  // console.log('initial messages:', messages);

  const updateMessages = (sendMessage, message) => {
    setMessageNumber(messageNumber + 1);
    setMessages(prevMessages => [...prevMessages, sendMessage(message)]);
    console.log('updated messages:',messages);
  };
  useEffect(() =>{
    console.log('calling useEffect');
  },[messages])
  
  const chatSocket = useRef(null);
  const auth = useAuth()
    
    const addUserToRoom = async(userId,roomId) =>{
      try {
        const response = await apiInstance.post(`${baseUrl}/message/add/user/${userId}/room/${roomId}`);
      } catch (error) {
        console.log('error',error);
      }
    }

    const connecttionwss = async(room_ID) =>{
      try {
          if (auth && auth.user && auth.user.id ) {
            const newChatSocket = new WebSocket(`wss://api.quilco.ir/ws/${room_ID}/`);
            newChatSocket.onclose = function (e) {
              toast.error( 'ارتباط با سرور قطع شد' )
              console.log(e);
            };
            const response = await apiInstance.get(`${baseUrl}/message/room/chats/${room_ID}`);
            setMessages(response.data);
            // console.log('messages after fetching:', messages);
            chatSocket.current = newChatSocket;
            chatSocket.current.onmessage = function (e) {
              const data = JSON.parse(e.data);
              console.log('received data message:', data);
              console.log("----------",data.userid !== auth.user.id , data.userid , auth.user.id);
              if ( data.userid !== auth.user.id ) {
                console.log('messgae updated ' );
                updateMessages(
                  message => ({
                    room: room_ID ,
                    message: message,
                    userid : auth.user.id,
                    // sender:auth.user.id
                  }),
                  // console.log('data.message',data.message),
                  // // log the result of updated messages
                  // console.log('messages after updating:', data),
                  data.message
                );
              }
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
    console.log('sending message:', message);
    let sendId = 0;
    if (props.roomId === 0) {
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
    const data = JSON.stringify({
      message: message,
      userid : auth.user.id,
      room : sendId, 
      // sender_type: 'CLIENT',
    })
    console.log('data:', data);
    chatSocket.current.send(
      data
    );
    console.log('sent message:', message);
  };


  return (
    <div id="rcw-conversation-container" className={cn('rcw-conversation-container')} aria-live="polite">
      <Header setConverstaion = {props.setConverstaion} setShowChat={props.setShowChat} conversation = {props.converstaion} showChat={props.showChat} title={props.title} subtitle={props.subtitle} />
      <Messages
        userid = {auth.user.id}
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