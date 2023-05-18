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

const ShareModal = ({open,handleClose}) => {
    const auth = useAuth();
    const [users, setUsers] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [inputText, setInputText] = useState("");
    const params = useParams();
    const eventId = params.id;
    // console.log(params);
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
    console.log(eventId);
    const suggestEvent = () =>{
        apiInstance.post('/suggestion/event/',{
            receiver : selectedUser.id,
            event:eventId,
            text: inputText
        })
        .then(() => {
            setInputText(""); 
            setOpenDialog(false); 
            toast.success('رویداد با موفقیت  ارسال شد.')
        })
        .catch((err) =>{
            toast.error('این رویداد قبلا به این کاربر ارسال شده است.')
        })
    }


    const  handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const defaultImg = 'https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg' 
    return (
       <>
        <Dialog className="share-eventTour" open={open} >
            <div className="share-eventTour__container">
                <div className="share-event__container__header">
                    <span className="share-event-title">اشتراک گذاری</span>
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
                    {users && users.map((user,index) =>{
                        return(
                            <div onClick={() => handleUserClick(user)} className="user" key={index}>
                                <img className="user_img" src={user.image !== '' ? user.image : defaultImg} alt="user image" />
                                <span className="user_username">{user.username}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
       </Dialog>
       <Dialog className="suggestion-dialog" open={openDialog}>
       <div className="suggestion-dialog__container">
           <div className="suggestion-dialog__header">
               <span className="suggestion-dialog-title">پیشنهاد رویداد</span>
               <button className="suggestion-dialog-close" onClick={() => setOpenDialog(false)}>
                   <MdClose />
               </button>
           </div>
           <div className="suggestion-dialog__body">
               <input
                   type="text"
                   placeholder="متن پیشنهاد"
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   className="suggestion-input"
               />
               <button className="suggestion-button" onClick={suggestEvent}>ارسال</button>
           </div>
       </div>
   </Dialog>
       </>
    );
}
 
export default ShareModal;