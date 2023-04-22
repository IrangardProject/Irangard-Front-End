import { useRef, useState, useEffect } from 'react';
import cn from 'classnames';

import Header from './Header';
import Messages from './Messages';
import Sender from './Sender';
import useAuth from 'src/context/AuthContext';
import { baseUrl } from '../../../utils/constants';
import './style.scss';
import apiInstance from '../../../config/axios';

export default function Conversation(props) {
  const [messageNumber, setMessageNumber] = useState(0);
  // const [messages, setMessages] = useState(props.messages);
  const [messages, setMessages] = useState([]);
  const updateMessages = (sendMessage, message) => {
    setMessageNumber(messageNumber + 1);
    setMessages([...messages, sendMessage(message)]);
  };
  const chatSocket = useRef(null);
  const auth = useAuth()
  const fetchMessages = async () => {
    try {
      if (auth && auth.user && auth.user.username && !chatSocket.current) {
        const newChatSocket = new WebSocket(
          'wss://' +
          'api.quilco.ir'+
          '/chat/room/' +
          auth.user.username + '_'+ props.contact_username +
          '/'
          );
          
          console.log('newChatSocket',newChatSocket);
          
          newChatSocket.onclose = function (e) {
            console.log('The socket close unexpectadly', e);
          };
          
          chatSocket.current = newChatSocket;
          
          const response = await apiInstance.get(`${baseUrl}/chat/room/messages/${auth.user.username + '_'+ props.contact_username }`);
          setMessages(response.data);
          console.log('messages', messages);
        }
      } catch (error) {
        console.log('error',error);
      }
      // auth, chatSocket, props.contact_username
    };
    
    fetchMessages();
    
    
    console.log('converstaion.js');
    useEffect(() => {
      console.log('useEffect');
    });
  
  
  const handleNewUserMessage = message => {
    console.log('sent',message,chatSocket.current);
    chatSocket.current.send(
      JSON.stringify({
        message: message,
        username: auth.user.username,
        room_name: auth.user.username,
        sender_type: 'CLIENT',
      })
    );
    // console.log("sent");
  };
  // chatSocket=chatSocket.current
  // messages=messages

  props.chatSocket.onmessage = function (e) {
    console.log('onmessage');
    const data = JSON.parse(e.data);
    // console.log(data);
    if (data.message) {
      console.log(data);
      if (data.sender_type === 'SERVER') {
        setMessages([...messages, { message: data.message ,sender_type: 'SERVER',showTimeStamp:false}]);
      }
    } else {
      alert('The message is empty!');
    }
  };

  return (
    <div id="rcw-conversation-container" className={cn('rcw-conversation-container')} aria-live="polite">
      <Header title={props.title} subtitle={props.subtitle} />
      {/* <Messages
        messages={messages}
        messageNumber={messageNumber}
        profileAvatar={props.profileAvatar}
        profileClientAvatar={props.profileClientAvatar}
        showTimeStamp={props.showTimeStamp}
      /> */}

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
