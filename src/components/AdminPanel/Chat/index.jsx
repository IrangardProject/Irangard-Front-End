// import React from 'react'
// import {useState, useEffect} from 'react'
// import { Widget } from 'react-chat-widget';
// import 'react-chat-widget/lib/styles.css';
// import ChatLayout from './ChatLayout'
// import axios from 'axios';
// import {baseUrl} from '../../utils/constants';
// import useAuth from 'src/context/AuthContext';
// function Chat(props){

//     // const auth = useAuth()

//     const chatSocket = new WebSocket(
//     'wss://'
//     // + '127.0.0.1:8000'
//     + 'api.quilco.ir'
//     + '/chat/room/'
//     + 'admin'
//     + '/'
//     );

//     chatSocket.onclose = function(e) {
//         console.log('The socket close unexpectadly',e);
//     };

//     const handleNewUserMessage = (message) =>{
//       // console.log(message);
//       chatSocket.send(JSON.stringify({
//         'message': message,
//         'username': 'admin',
//         'room_name': 'admin',
//         'sender_type':"CLIENT"
//     }));
//     // console.log("sent");
//     }

//     return(

//       <div>
//         <ChatLayout
//             chatSocket={chatSocket}
//             title="پشتیبانی ایرانگرد"
//             subtitle="هر سوالی داری بپرس"
//             senderPlaceHolder="سوالت رو بپرس !!!"
//             handleNewUserMessage={handleNewUserMessage}
//         />
//       </div>

//     )

// }

// export default Chat;

import React, { useState, useEffect, useRef } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import ChatLayout from './ChatLayout';
import axios from 'axios';
import { baseUrl } from 'src/utils/constants';

function Chat(props) {
  const chatSocket = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('log');
    const chatUrl = `wss://api.quilco.ir/chat/room/${props.username}/`;
    const newChatSocket = new WebSocket(chatUrl);

    // const newChatSocket = new WebSocket(
    //   'wss://' +
    //     // '127.0.0.1:8000' +
    //     'api.quilco.ir' +
    //     '/chat/room/' +
    //     // auth.user.username +
    //     props.username +
    //     '/'
    // );

    newChatSocket.onclose = function (e) {
      console.log('The socket close unexpectadly', e);
    };

    chatSocket.current = newChatSocket;

    axios.get(`${baseUrl}/chat/room/messages/${props.username}`).then(response => {
      // setMessages(response.data);
      console.log('messages', messages);
    });
  }, []);

  const handleNewUserMessage = message => {
    console.log('sent', message, chatSocket.current);
    chatSocket.current.send(
      JSON.stringify({
        message: message,
        username: props.username,
        room_name: props.username,
        sender_type: 'SERVER',
      })
    );
    // console.log("sent");
  };

  return (
    <div>
      {chatSocket.current && messages.length > 0 && (
        <ChatLayout
          chatSocket={chatSocket.current}
          messages={messages}
          title="پشتیبانی ایرانگرد"
          subtitle={`کاربر  ${props.username}`}
          senderPlaceHolder="سوالت رو بپرس !!!"
          handleNewUserMessage={handleNewUserMessage}
        />
      )}

      {/* ویجت چت */}
      {/* <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="پشتیبانی ایرانگرد"
        subtitle={`${props.username}`}
        senderPlaceHolder="سوالت رو بپرس !!!"
      /> */}
    </div>
  );
}

export default Chat;

