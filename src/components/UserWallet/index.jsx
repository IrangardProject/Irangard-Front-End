import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { formatPrice, convertNumberToPersian } from 'src/utils/formatters.js';
import './styles.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';

const UserWallet = ({ open, setOpen }) => {
  const [userCredit, setUserCredit] = useState(0);
  const userCreditHandler = e => {
    setUserCredit(e.target.value);
  };
  const userWalletCloseButtonHandler = () => {
    setOpen(false);
  };
  const plusButtonHandler = () => {
    setUserCredit(userCredit + 100000);
  };
  const minusButtonHandler = () => {
    if (userCredit >= 100000) {
      setUserCredit(userCredit - 100000);
    }
  };
  return (
    <Modal className="wrapper" open={open} onClose={userWalletCloseButtonHandler}>
      <div className="wrapper__container">
        <div className="current-credit">
          <span className="current-credit__title">موجودی شما</span>
          <span className="current-credit__amount">{formatPrice(convertNumberToPersian(userCredit))} تومان</span>
          <button className="current-credit__close" onClick={() => setOpen(false)}>
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className="increase-credit">
          <span className="increase-credit__title">افزایش موجودی</span>
          <div className="increase-credit__amount">
            <div className="increase-credit__amount__suggestions">
              <Button
                onClick={() => {
                  setUserCredit(userCredit + 100000);
                }}
              >
                {formatPrice(convertNumberToPersian(100000))} تومان
              </Button>
              <Button
                onClick={() => {
                  setUserCredit(userCredit + 200000);
                }}
              >
                {formatPrice(convertNumberToPersian(200000))} تومان
              </Button>
              <Button
                onClick={() => {
                  setUserCredit(userCredit + 500000);
                }}
              >
                {formatPrice(convertNumberToPersian(500000))} تومان
              </Button>
            </div>
            {/* <input type="number" placeholder="مبلغ مورد نظر را وارد کنید" /> */}
            <Button onClick={plusButtonHandler}>
              <AiOutlinePlus />
            </Button>
            <Input
              type="number"
              placeholder="مبلغ مورد نظر را وارد کنید"
              value={userCredit}
              onChange={userCreditHandler}
            />
            <Button onClick={minusButtonHandler}>
              <AiOutlineMinus />
            </Button>
          </div>
          <Button>پرداخت</Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserWallet;
