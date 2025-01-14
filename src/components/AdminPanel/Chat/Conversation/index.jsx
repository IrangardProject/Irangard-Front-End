import { useRef, useState, useEffect } from 'react';
import cn from 'classnames';

import Header from './Header';
import Messages from './Messages';
import Sender from './Sender';

import './style.scss';

export default function Conversation(props) {
  const [messageNumber, setMessageNumber] = useState(0);
  const [messages, setMessages] = useState(props.messages);

  const updateMessages = (sendMessage, message) => {
    setMessageNumber(messageNumber + 1);
    setMessages([...messages, sendMessage(message)]);
  };

  props.chatSocket.onmessage = function (e) {
    console.log('onmessage');
    const data = JSON.parse(e.data);
    // console.log(data);
    if (data.message) {
      console.log(data);
      if (data.sender_type === 'CLIENT') {
        setMessages([...messages, { message: data.message, sender: 'emad',sender_type: 'CLIENT',showTimeStamp:false}]);
      }
    } else {
      alert('The message is empty!');
    }
  };

  return (
    <div id="rcw-conversation-container-admin" className={cn('rcw-conversation-container-admin')} aria-live="polite">
      <Header title={props.title} subtitle={props.subtitle} />
      <Messages
        messages={messages}
        messageNumber={messageNumber}
        profileAvatar={props.profileAvatar}
        profileClientAvatar={props.profileClientAvatar}
        showTimeStamp={props.showTimeStamp}
      />

      <Sender
        updateMessages={updateMessages}
        handleNewUserMessage={props.handleNewUserMessage}
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
