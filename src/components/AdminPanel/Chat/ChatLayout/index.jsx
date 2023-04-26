import { useEffect, useState } from 'react';
import cn from 'classnames';
import FullScreenPreview from '../FullScreenPreview';
import Conversation from '../Conversation';
import './style.scss';
import profileAvatar from '../assets/avatar.png';

export default function ChatLayout({
  title,
  titleAvatar,
  subtitle,
  handleNewUserMessage,
  onSendMessage,
  messages,
  chatSocket,
  onToggleConversation,
  senderPlaceHolder,
  onQuickButtonClicked,
  profileAvatar,
  profileClientAvatar,
  showCloseButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  onTextInputChange,
  chatId,
  launcherOpenLabel,
  launcherCloseLabel,
  launcherCloseImg,
  launcherOpenImg,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  showBadge,
  resizable,
  emojis,
}) {


  const [showChat, setShowChat] = useState(false);

  const toggleShowChat= () =>{
    setShowChat(!showChat);
    console.log("showchat",showChat);
  };

  return (
    <div
      className={cn('rcw-widget-container-admin', {
        'rcw-full-screen': fullScreenMode,
        'rcw-previewer': imagePreview,
        'rcw-close-widget-container-admin ': true || !showChat,
      })}
    >
        
      {true && (
        <Conversation
          title={title}
          subtitle={subtitle}
          senderPlaceHolder={senderPlaceHolder}
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={profileAvatar}
          chatSocket={chatSocket}
          messages={messages}
          
        />
      )}
      
      {imagePreview && <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />}
    </div>
  );
}
