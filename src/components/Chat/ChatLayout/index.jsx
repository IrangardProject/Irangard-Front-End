import { useEffect, useState } from 'react';
import cn from 'classnames';
import Launcher from '../Launcher';
import FullScreenPreview from '../FullScreenPreview';
import Conversation from '../Conversation';
import './style.scss';
import profileAvatar from '../assets/avatar.png';
import { baseUrl } from 'src/utils/constants';
import apiInstance from '../../../config/axios'
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
  // console.log(selectedUser);
  // console.log('idRoom',idRoom);
  
  // const []

  const toggleShowChat= () =>{
    setShowChat(!showChat);
    // console.log("showchat",showChat);
  };
  console.log('users',users)
  console.log(users);
  useEffect(() => {
    apiInstance.get(`${baseUrl}/accounts/users`)
    .then((res) =>{
      setUsers(res.data)
      // console.log('res.data',res.data);
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

  const makeRoom = async() =>{
    console.log('make room called');
    await apiInstance.post(`${baseUrl}/message/room`,{
      name : " "
    })
    .then((res) =>{
      console.log(res.data);
      setIdRoom('id',res.data[0].id);
      // setIdRoom(res.data[0].id);
    })
    .catch((err) => {
      console.log('err',err);
    })
  }
  console.log('idRoom',idRoom);
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    try {
      const res = await apiInstance.post(`${baseUrl}/message/room/` , {
          name  : "test "
      }
    )
      setIdRoom(res.data.id);
      setConversation(true);
  } catch (error) {
      console.log(error);
    }
    // makeRoom();
    console.log('user clicked' , user.id);
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
        // <Conversation
        //   title={title}
        //   subtitle={subtitle}
        //   senderPlaceHolder={senderPlaceHolder}
        //   handleNewUserMessage={handleNewUserMessage}
        //   profileAvatar={profileAvatar}
        //   chatSocket={chatSocket}
        //   messages={messages}
        // />
        <>
        
        {conversation ? <Conversation 
          title={title}
          subtitle={subtitle}
          senderPlaceHolder={senderPlaceHolder}
          // handleNewUserMessage={handleNewUserMessage}
          profileAvatar={profileAvatar}
          // chatSocket={chatSocket}
          // messages={messages}
          contact_id = {selectedUser.id}
          roomId = {idRoom}
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
              
              {users.map((user) => {
                if(user.username === 'admin' && user.is_admin === true){
                  return (
                    <div onClick={() => handleUserClick(user)} className='user'>
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
                filteredUsers.map((user) => {
                  
                  return (
                    <div onClick={() => handleUserClick(user)} className='user'>
                      <img className='user_img' src={user.image !== '' ? user.image : defaultImg}  alt="userIamge" />
                      <p>{user.username}</p>
                    </div>
                  )
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
