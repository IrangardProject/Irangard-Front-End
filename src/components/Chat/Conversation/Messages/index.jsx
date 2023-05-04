import { useEffect, useRef, useState, ElementRef, ImgHTMLAttributes, MouseEvent } from 'react';
import format from 'date-fns/format';

// import { scrollToBottom } from '../../../../../../utils/messages';
// import { MessageTypes, Link, CustomCompMessage, GlobalState } from '../../../../../../store/types';
// import { setBadgeCount, markAllMessagesRead } from '../../../../../../store/actions';
// import { MESSAGE_SENDER } from '../../../../../../constants';

import Loader from './components/Loader';
import Message from './components/Message';
import './styles.scss';
import serverAvatar from 'src/assets/images/profile1.jpeg';
import useAuth from 'src/context/AuthContext';
import avatar from 'src/assets/images/avatar.png';

export default function Messages(props) {
  const auth = useAuth();

  const isClient = type => {
    // console.log('type', type);
    // return type == 'CLIENT';
    // auth.user is sender and type is client then it is client and the recieve is server please give the correct
    if(auth.user){
      return type == 'CLIENT'
    }else{
      return type == 'SERVER'
    }
  };

  console.log('props in messages is :',props);
  // console.log('isClient' , isC)
  // log output of isclient function



  return (
    <div id="messages" className="rcw-messages-container" ref={props.messageRef} dir="ltr">
      {props.messages?.map((message, index) => (
        // console.log(message.sender_type,message.sender),
        <div
          id={`${isClient(message.sender_type) ? 'rcw-message-client-id' : 'rcw-message-server-id'}`}
          className={`rcw-message ${isClient(message.sender_type) ? 'rcw-message-client' : 'rcw-message-server'}`}
          // key={`${index}-${format(message.timestamp, 'hh:mm')}`}
          key={`${index}`}
        >
          {(!isClient(message.sender) || isClient(message.sender_type)) && true && (
            <img
              src={isClient(message.sender_type) ? auth.user.image || avatar : serverAvatar }
              className={`rcw-avatar ${isClient(message.sender_type) ? 'rcw-avatar-client' : ''}`}
              alt="profile"
            />
          )}
          <Message message={message} showTimeStamp={false} is_server={isClient(message.sender_type)}/>
        </div>
      ))}
      <Loader typing={props.messages.length === 0} />
    </div>
  );
}
