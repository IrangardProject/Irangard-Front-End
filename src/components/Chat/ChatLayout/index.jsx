import { useEffect, useState } from 'react';
import cn from 'classnames';
import Launcher from '../Launcher';
import FullScreenPreview from '../FullScreenPreview';
import Conversation from '../Conversation';
import './style.scss';
import profileAvatar from '../assets/avatar.png';
import { baseUrl } from 'src/utils/constants';
import apiInstance from '../../../config/axios'
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
  const [users,setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const []

  const toggleShowChat= () =>{
    setShowChat(!showChat);
    console.log("showchat",showChat);
  };
  console.log(users);
  useEffect(() => {
    apiInstance.get(`${baseUrl}/accounts/users`)
    .then((res) =>{
      setUsers(res.data)
      
    })
    .catch((err) => {
      console.log(err);
    })
  },[])
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = users.filter((user) =>{
    return user.username.toLowerCase().includes(searchTerm.toLowerCase());
  })

  return (
    <div
      className={cn('rcw-widget-container', {
        'rcw-full-screen': fullScreenMode,
        'rcw-previewer': imagePreview,
        'rcw-close-widget-container ': true || !showChat,
      })}
    >
        
      {showChat && (
        // instead of showing converstion I want to show a list of users and when I click on a user it should show the conversation with that user
        // <Conversation
        //   title={title}
        //   subtitle={subtitle}
        //   senderPlaceHolder={senderPlaceHolder}
        //   handleNewUserMessage={handleNewUserMessage}
        //   profileAvatar={profileAvatar}
        //   chatSocket={chatSocket}
        //   messages={messages}
        // />
        <div className='usersList' >
          <input
            type="text"
            placeholder="جستجو کنید"
            value={searchTerm}
            onChange={handleSearchInputChange}
            className='searchInput'
          />
          <p className='chatwithUser'>چت با کاربر</p>

          {searchTerm === '' ? (
            <div className=''>
              
              {users.map((user) => {
                if(user.username === 'admin' && user.is_admin === true){
                  return (
                    <div className='user'>
                      <img className='user_img' src={user.image} alt="userIamge" />
                      <p>{user.username}</p>
                    </div>
                  )
                }
              })}
            </div>
          ) : (
            <div className=''>
              {
                filteredUsers.map((user) => {
                  
                  return (
                    <div className='user'>
                      {/* show the admin username and profile */}
                      {user.username === 'admin' && user.is_admin === true ? () => {
                        return (
                          <div className='user'>
                            <img className='user_img' src={user.image} alt="userIamge" />
                            <p>{user.username}</p>
                          </div>
                        )
                      } : () => {

                      }}
                      <img className='user_img' src={user.image} alt="userImage" />
                      <p>{user.username}</p>
                    </div>
                  )
                })
              }
            </div>
          )}
          
        </div>
      )}
      <Launcher toggleShowChat={toggleShowChat} showChat={showChat} />
      {imagePreview && <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />}
    </div>
  );
}
