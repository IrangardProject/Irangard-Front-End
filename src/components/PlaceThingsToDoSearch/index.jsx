import React, { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const PlaceThingsToDoSearch = ({ open, setOpen }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchHandler = e => {
    e.preventDefault();
    console.log("submiting result of where to go, naigating to: ", `/things-to-do&where=${query}`)
    if (query.length < 3) {
      toast.error('حداقل سه حرف وارد کنید');
      return;
    }
    navigate(`/things-to-do?where=${query}`);
    setOpen(false);
  };

  const modalCloseHandler = () => {
    setOpen(false);
  };
  return (
    <Modal
      className="wrapper"
      open={open}
      onClose={modalCloseHandler}
    >
      <div className="wrapper__container">
        <form onSubmit={searchHandler} className="wrapper__container__search-bar">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="wrapper__container__search-bar__search-box"
            placeholder="جست‌وجو برای مقصد..."
          />
        </form>
      </div>
    </Modal>
  );
};

export default PlaceThingsToDoSearch;
