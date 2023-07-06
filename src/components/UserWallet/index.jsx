import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';
import Input from '../Input';
import Button from '../Button';
import { formatPrice, convertNumberToPersian, convertNumberToEnglish } from '../../utils/formatters.js';
import './styles.scss';
import useAuth from '../../context/AuthContext';
import apiInstance from '../../config/axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { TextField } from '@mui/material';

const UserWallet = ({ open, setOpen }) => {
  const [userCredit, setUserCredit] = useState(0);
  const [updatedCredit, setUpdatedCredit] = useState('');
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      if (auth.user?.wallet_credit !== null) {
        setUserCredit(auth.user.wallet_credit);
      } else {
        setUserCredit(0);
      }
    }
  }, [auth.user]);

  const userCreditHandler = e => {
    setUpdatedCredit(e.target.value);
  };
  const userWalletCloseButtonHandler = () => {
    setOpen(false);
  };
  const plusButtonHandler = () => {
    setUpdatedCredit(Number(updatedCredit) + 100000);
  };
  const minusButtonHandler = () => {
    if (updatedCredit >= 100000) {
      setUpdatedCredit(Number(updatedCredit) - 100000);
    } else {
      setUpdatedCredit(0);
    }
  };

  const userWalletPaymentHandler = e => {
    e.preventDefault();
    if (updatedCredit > 0) {
      apiInstance
        .post(`/accounts/wallet/increase/`, {
          amount: Number(updatedCredit),
        })
        .then(res => res.data)
        .then(data => {
          console.log('the response of the server for the wallet update: ', data);
          window.location.href = data.link;
          toast.success('موجودی کیف پول شما با موفقیت افزایش یافت.', { className: 'centered-toast-message' });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      toast.error('مبلغ وارد شده باید بیشتر از صفر باشد.', { className: 'centered-toast-message' });
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
        <hr className="user-wallet-hr" />
        <div className="increase-credit">
          <span className="increase-credit__title">افزایش موجودی</span>
          <div className="increase-credit__amount">
            <div className="increase-credit__amount__suggestions">
              <button
                className="increase-credit__amount__suggestions__button"
                onClick={() => {
                  setUpdatedCredit(100000);
                }}
              >
                {formatPrice(convertNumberToPersian(100000))} تومان
              </button>
              <button
                className="increase-credit__amount__suggestions__button"
                onClick={() => {
                  setUpdatedCredit(200000);
                }}
              >
                {formatPrice(convertNumberToPersian(200000))} تومان
              </button>
              <button
                className="increase-credit__amount__suggestions__button"
                onClick={() => {
                  setUpdatedCredit(500000);
                }}
              >
                {formatPrice(convertNumberToPersian(500000))} تومان
              </button>
            </div>
            <div className="credit-input">
              <button className="credit-input__plus" onClick={plusButtonHandler}>
                <AiOutlinePlus />
              </button>
              <div className="credit-input__input">
                {/* <div className="credit-input__input__currency">تومان</div> */}
                <Input
                  // type="text"
                  type="number"
                  placeholder="مبالغ دیگر"
                  // value={formatPrice(convertNumberToPersian(updatedCredit))}
                  // value={convertNumberToPersian(updatedCredit)}
                  value={updatedCredit}
                  onChange={userCreditHandler}
                  className="credit-input__input__field"
                />
                {/* <TextField
                    dir="rtl"
                      type="number"
                    // value={formatPrice(convertNumberToPersian(tourCostRange[1]))}
                    value={updatedCredit}
                    onChange={userCreditHandler}
                  /> */}
              </div>
              <button className="credit-input__minus" onClick={minusButtonHandler}>
                <AiOutlineMinus />
              </button>
            </div>
          </div>
          <Button className="pay-button" onClick={userWalletPaymentHandler}>
            پرداخت
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserWallet;
