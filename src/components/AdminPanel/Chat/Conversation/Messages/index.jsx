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

  const isServer = type => {
    console.log('type', type);
    return type == 'SERVER';
  };

  console.log(props.messages);

  return (
    <div id="messages" className="rcw-messages-container-admin" ref={props.messageRef} dir="ltr">
      {props.messages?.map((message, index) => (
        <div
          className={`rcw-message ${isServer(message.sender_type) ? 'rcw-message-client' : 'rcw-message-server'}`}
          // key={`${index}-${format(message.timestamp, 'hh:mm')}`}
          key={`${index}`}
        >
          {(!isServer(message.sender) || isServer(message.sender_type)) && true && (
            <img
              src={isServer(message.sender_type) ? auth.user?.image || avatar : serverAvatar }
              className={`rcw-avatar ${isServer(message.sender_type) ? 'rcw-avatar-client' : ''}`}
              alt="profile"
              
            />
          )}
          <Message message={message} showTimeStamp={false} is_server={isServer(message.sender_type)}/>
        </div>
      ))}
      <Loader typing={props.messages.length === 0} />
    </div>
  );
}
