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







import React from 'react';
import { useState, useEffect , useRef} from 'react';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import ChatLayout from './ChatLayout';
import axios from 'axios';
import { baseUrl } from 'src/utils/constants';
import useAuth from 'src/context/AuthContext';
function Chat(props) {
  const auth = useAuth();
  console.log('props',props);
  const chatSocket = useRef(null);
  

  

  

  return (
    <div>
      {/* chatSocket.current && messages.length > 0 && */}
      {  <ChatLayout
        
        title="پشتیبانی ایرانگرد"
        subtitle="هر سوالی داری بپرس"
        senderPlaceHolder="سوالت رو بپرس !!!"
        // handleNewUserMessage={handleNewUserMessage}
      />}
    </div>
  );
}

export default Chat;
