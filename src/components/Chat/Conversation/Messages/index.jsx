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
    if(auth.user.id === type ){
      return type == 'CLIENT'
    }else{
      return type == 'SERVER'
    }
  };





  return (
    <div id="messages" className="rcw-messages-container" ref={props.messageRef} dir="ltr">
      {props.messages?.map((message, index) => (
        // console.log(message.userId,message.sender),
        <div
          id={`${isClient(message.userId) ? 'rcw-message-client-id' : 'rcw-message-server-id'}`}
          className={`rcw-message ${isClient(message.userid) ? 'rcw-message-client' : 'rcw-message-server'}`}
          // key={`${index}-${format(message.timestamp, 'hh:mm')}`}
          key={`${index}`}
        >
          {(!isClient(message.sender) || isClient(message.userId)) && true && (
            <img
              src={isClient(message.userId) ? auth.user.image || avatar : serverAvatar }
              className={`rcw-avatar ${isClient(message.userId) ? 'rcw-avatar-client' : ''}`}
              alt="profile"
            />
          )}
          <Message message={message} showTimeStamp={false} is_server={isClient(message.userId)}/>
        </div>
      ))}
      <Loader typing={props.messages.length === 0} />
    </div>
  );
}
