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
    <Modal className="wallet-wrapper" open={open} onClose={userWalletCloseButtonHandler}>
      <div className="wallet-wrapper__container">
        <div className="wallet-wrapper__container__header">
        <span className="user-wallet-title">کیف پول ایران‌گرد</span>
          <button className="user-wallet-close" onClick={() => setOpen(false)}>
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className="current-credit">
          <span className="current-credit__title">موجودی شما</span>
          <span className="current-credit__amount">{formatPrice(convertNumberToPersian(userCredit))} تومان</span>
        </div>
        <hr className="user-wallet-hr"/>
        <div className="increase-credit">
          <span className="increase-credit__title">افزایش موجودی</span>
          <div className="increase-credit__amount">
            <div className="increase-credit__amount__suggestions">
              <button
                className="increase-credit__amount__suggestions__button"
                onClick={() => {
                  setUserCredit(userCredit + 100000);
                }}
              >
                {formatPrice(convertNumberToPersian(100000))} تومان
              </button>
              <button
                className="increase-credit__amount__suggestions__button"
                onClick={() => {
                  setUserCredit(userCredit + 200000);
                }}
              >
                {formatPrice(convertNumberToPersian(200000))} تومان
              </button>
              <button
                className="increase-credit__amount__suggestions__button"
                onClick={() => {
                  setUserCredit(userCredit + 500000);
                }}
              >
                {formatPrice(convertNumberToPersian(500000))} تومان
              </button>
            </div>
            {/* <input type="number" placeholder="مبلغ مورد نظر را وارد کنید" /> */}
            <div className="credit-input">
              <button className="credit-input__plus" onClick={plusButtonHandler}>
                <AiOutlinePlus />
              </button>
              <Input
                type="number"
                placeholder="مبلغ مورد نظر را وارد کنید"
                value={userCredit}
                onChange={userCreditHandler}
              />
              <button className="credit-input__minus" onClick={minusButtonHandler}>
                <AiOutlineMinus />
              </button>
            </div>
          </div>
          <Button className="pay-button">پرداخت</Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserWallet;
