import { useEffect, useRef, useState, ElementRef, ImgHTMLAttributes, MouseEvent } from 'react';
import format from 'date-fns/format';

// import { scrollToBottom } from '../../../../../../utils/messages';
// import { MessageTypes, Link, CustomCompMessage, GlobalState } from '../../../../../../store/types';
// import { setBadgeCount, markAllMessagesRead } from '../../../../../../store/actions';
// import { MESSAGE_SENDER } from '../../../../../../constants';

import Loader from './components/Loader';
import Message from './components/Message';
import './styles.scss';
// import serverAvatar from 'src/assets/images/profile1.jpeg';
import useAuth from 'src/context/AuthContext';
import avatar from 'src/assets/images/avatar.png';

export default function Messages(props) {
  console.log('message property:', props);
  const auth = useAuth();

  const isClient = (type,sender_type='') => {
    console.log()
    if(auth.user.id === type || sender_type === 'CLIENT' ){
      return true
      
    }else{
      return false
    }
  };


  const serverAvatar = "https://img.freepik.com/free-icon/user_318-159711.jpg";


  return (
    <div id="messages" className="rcw-messages-container" ref={props.messageRef} dir="ltr">
      {props.messages?.map((message, index) => {
        // console.log(message.userId,message.sender),
        // console.log('isClient(props.userid',isClient(message.sender),message.sender,auth.user.id,message)

       return(<div
          id={`${isClient(message.sender,message.sender_type) ? 'rcw-message-client-id' : 'rcw-message-server-id'}`}
          className={`rcw-message ${isClient(props.userid) ? 'rcw-message-client' : 'rcw-message-server'}`}
          // key={`${index}-${format(message.timestamp, 'hh:mm')}`}
          key={`${index}`}
        >
          {(!isClient(message.sender) || isClient(props.userid)) && true && (
            <img
              src={serverAvatar }
              className={`rcw-avatar ${isClient(props.userid) ? 'rcw-avatar-client' : ''}`}
              alt="profile"
            />
          )}
          <Message message={message} showTimeStamp={false} is_server={(props.userid)}/>
        </div>)
})}
      <Loader typing={props.messages.length === 0} />
    </div>
  );
}
