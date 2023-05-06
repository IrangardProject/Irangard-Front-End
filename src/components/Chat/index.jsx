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
      <ChatLayout
          title="گفتگوی شما "
          subtitle="لطفاً سوال خود را مطرح کنید"
          senderPlaceHolder="پیام خود را وارد کنید"
      />

    </div>
  );
}

export default Chat;
