import { Dialog, Modal } from "@mui/material";
import React, { useState, useRef } from 'react';
import useAuth from 'src/context/AuthContext';
import './shareModal.scss'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import apiInstance from 'src/config/axios';
import { useEffect } from "react";
import { baseUrl } from "../../utils/constants";
import { MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const ShareModal = ({open,handleClose,shareType}) => {
    const auth = useAuth();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [inputText, setInputText] = useState("");
    const [showAllResults, setShowAllResults] = useState(false); 
    const params = useParams();
    // const eventId = params.id;
    console.log(params);
    const handleUserClick = (user) => {
        setSelectedUser(user);
        handleClose(false);
        setOpenDialog(true);
    }

    const getAllUsers= async() =>{
        await apiInstance.get(`${baseUrl}/accounts/users`)
        .then((res) => {
            setUsers(res.data)
        })
        .catch((err) => {
            console.log(err);
        } )
    }
    useEffect(() =>{
        getAllUsers()
    },[])
    

    const handleBackfropClick = () =>{
        handleClose(false);
    }

    const suggestEvent = (shareType) =>{
        if (inputText.trim() === "") {
            toast.error('متن پیشنهادی نمیتواند خالی باشد')
            return;
        }
        console.log(shareType);
        let suggestionType;
        let suggestionUrl;
        let Id;

        if (shareType === "مکان") {
            suggestionType = "place";
            suggestionUrl = "/suggestion/place/";
            Id = params.placeId;
        } else if (shareType === "تور") {
            suggestionType = "tour";
            suggestionUrl = "/suggestion/tour/";
            Id = params.id;
        } else if (shareType === "رویداد") {
            suggestionType = "event";
            suggestionUrl = "/suggestion/event/";
            Id = params.id
        }

        apiInstance
          .post(suggestionUrl, {
            receiver: selectedUser.id,
            [suggestionType]: Id,
            text: inputText,
          })
          .then(() => {
            setInputText("");
            setOpenDialog(false);
            toast.success("رویداد با موفقیت ارسال شد.");
          })
          .catch((err) => {
            toast.error("این رویداد قبلا به این کاربر ارسال شده است.");
          });
    }


    const  handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value.trim());
    };

    const filteredUsers = users.filter((user) =>{
        return user.username.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const limitedUsers = filteredUsers.slice(0,5);
    const remainingUsers = filteredUsers.slice(5);
    const handleShowAllResults = () =>{
        setShowAllResults(true);
        setSearchTerm('');
    }
    const defaultImg = 'https://img.freepik.com/free-icon/user_318-159711.jpg' 
    return (
       <>
        <Dialog onClose={handleBackfropClick} className="share-eventTour" open={open} >
            <div className="share-eventTour__container">
                <div className="share-event__container__header">
                    <span className="share-event-title">اشتراک گذاری با کاربر ...</span>
                    <button className="share-event-close" onClick={() => handleClose(false)}>
                      {/* <MdClose /> */}
                    </button>
                </div>
                <div className="share-event__container__body userList ">
                    {/* show users with their image and its name */}
                    <input
                        type="text"
                        placeholder="جستجوی کاربران"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        className="search-input"
                    />
                    {/*  */}
                    {limitedUsers.length === 0 ?(
                        <p className="no-user-found">کاربری یافت نشد</p>
                    ):(
                        limitedUsers.map((user,index) =>{
                            if (user.username !== auth.user?.username) {
                                return(
                                <div onClick={() => handleUserClick(user)} className="user" key={index}>
                                    <img className="user_img" src={user.image !== '' ? user.image : defaultImg} alt="user image" />
                                    <span className="user_username">{user.username}</span>
                                </div>
                                )
                            }
                        })
                    )}
                    {remainingUsers.length> 0 && !showAllResults &&(
                        <p className="showAllResults" onClick={handleShowAllResults}>نتایج بیشتر: {remainingUsers.length} کاربر</p>
                    )}
                    {showAllResults && 
                         remainingUsers.map((user, index) => {
                            if (user.username !== auth.user.username) {
                              return (
                                <div
                                  onClick={() => handleUserClick(user)}
                                  className="user"
                                  key={index}
                                >
                                    <img className="user_img" src={user.image !== '' ? user.image : defaultImg} alt="user image" />
                                    <span className="user_username">{user.username}</span>
                                </div>
                              );
                            }
                          })
                    }
                </div>
            </div>
       </Dialog>
       <Dialog className="suggestion-dialog" open={openDialog}>
       <div className="suggestion-dialog__container">
           <div className="suggestion-dialog__header">
               <span className="suggestion-dialog-title">پیشنهاد {shareType}</span>
               <button className="suggestion-dialog-close" onClick={() => setOpenDialog(false)}>
                   <MdClose  />
               </button>
           </div>
           <div className="suggestion-dialog__body">
               <textarea
                   type="text"
                   placeholder="متن پیشنهادی..."
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   className="suggestion-input"
               />
               <button className="suggestion-button" onClick={() =>suggestEvent(shareType)}>ارسال</button>
           </div>
       </div>
   </Dialog>
       </>
    );
}
 
export default ShareModal;