import { useEffect, useState } from 'react';
import cn from 'classnames';
import Launcher from '../Launcher';
import FullScreenPreview from '../FullScreenPreview';
import Conversation from '../Conversation';
import './style.scss';
import profileAvatar from '../assets/avatar.png';
import { baseUrl } from 'src/utils/constants';
import apiInstance from '../../../config/axios'
import useAuth from 'src/context/AuthContext';
// import {defaultImg} from '../../../../public/images/img/defaultImg.jpg'
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState(false);
  const [idRoom , setIdRoom] = useState(0);
  const [hasRoomId,setHasRoomId] = useState(0)
  const [showUserList, setShowUserList] = useState(true);

  const auth = useAuth();


  const toggleShowChat= () =>{
    setShowChat(!showChat);
  };
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


  
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setShowUserList(false);
    setShowChat(true);
     
    const {data} =await apiInstance.post(`${baseUrl}/message/has/room`,{
      user_one: user.id ,
      user_two: auth.user.id
    })
    console.log(data);
    if (data.room_id ==='null') {
      const res = await apiInstance.post(`${baseUrl}/message/room/` , {
        name  : `${user.username + auth.user.username}`,
      }
      )
      setIdRoom(res.data.id);
    }else{
      setHasRoomId(data.room_id)
    }
    setConversation(true);
    try {
      
      
  } catch (error) {
      console.log(error);
    }
  };
  const defaultImg = 'https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg' 
  
  return (
    <div
      className={cn('rcw-widget-container', {
        'rcw-full-screen': fullScreenMode,
        'rcw-previewer': imagePreview,
        'rcw-close-widget-container ': true || !showChat,
      })}
    >
        
      {showChat && (
        <>
        {conversation ? <Conversation 
          setConverstaion={setConversation}
          showChat={showChat}
          title={title}
          subtitle={subtitle}
          senderPlaceHolder={senderPlaceHolder}
          profileAvatar={profileAvatar}
          contact_id = {selectedUser.id}
          roomId = {idRoom}
          hasRoomId = {hasRoomId}
          setShowChat={setShowChat}
        /> : null}

          
          {
            conversation === false ? 
              <div>
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
              
              {users.map((user,index) => {
                if(user.username === 'admin' && user.is_admin === true && user.username !== auth.user.username ){
                  return (
                    <div key={index} onClick={() => handleUserClick(user)} className='user'>
                      <img className='user_img' src={user.image !== '' ? user.image : defaultImg} alt="userIamge" />
                      <p>{user.username}</p>
                    </div>
                  )
                }
              })}
            </div>
          ) : (
            <div className=''>
              {
                filteredUsers.map((user,index) => {
                  
                  if (user.username !== auth.user.username) {
                    return (
                      <div key={index} onClick={() => handleUserClick(user)} className='user'>
                        <img className='user_img' src={user.image !== '' ? user.image : defaultImg}  alt="userIamge" />
                        <p>{user.username}</p>
                      </div>
                    )
                  }
                })
              }
            </div>
          )}
          
        </div>
              </div> 
            :
            null
          }

       
        </>)}
      
      <Launcher toggleShowChat={toggleShowChat} showChat={showChat} />
      {imagePreview && <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />}
    </div>
  );
}