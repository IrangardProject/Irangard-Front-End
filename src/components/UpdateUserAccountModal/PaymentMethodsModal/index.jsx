import React, { useState } from 'react';
import './styles.scss';
import useAuth from '../../../context/AuthContext';
import Modal from '@mui/material/Modal';
import { Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@mui/material';
import Button from '../../Button';
import apiInstance from '../../../config/axios';
import { IoWalletOutline } from 'react-icons/io5';
import { BsCreditCard2Back } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { formatPrice, convertNumberToPersian } from '../../../utils/formatters';
import toast from 'react-hot-toast';

const PaymentMethodsModal = ({ open, setOpen }) => {
  const auth = useAuth();
  const [accountUpgradePrice, setAccountUpgradePrice] = useState(1000);
  const [paymentMethod, setPaymentMethod] = useState('درگاه پرداخت اینترنتی');

  const Pay = () => {
    apiInstance.get(`/accounts/pay/pay/`).then(res => {
      console.log(res.data);
      const myLink = res.data.link;
      console.log(myLink);
      window.location.replace(myLink);
    });
    return 'حساب با موفقیت ارتقا یافت.';
  };

  const upgradeAccountSubmitHandler = () => {
    if (paymentMethod === 'درگاه پرداخت اینترنتی') {
      Pay();
    } else if (paymentMethod === 'کیف پول ایران‌گرد') {
      apiInstance.post(`/accounts/wallet/user/upgrade/`).then(res => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          // alert('حساب با موفقیت ارتقا یافت.');
          toast.success('حساب با موفقیت ارتقا یافت.');
          setOpen(false);
        } else {
          // alert('موجودی کیف پول شما کافی نیست.');
          toast.error('موجودی کیف پول شما کافی نیست.');
        }
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div className="payment-methods-modal">
        <div className="payment-methods-modal__close-btn">
          <button className="user-upgrade-close-btn" onClick={() => setOpen(false)}>
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className="payment-methods-modal__header">
          <span className="payment-methods-modal__header__title">ارتقای حساب کاربری</span>
        </div>

        <div className="payment-methods-modal__account-upgrade-price">
          <p className="account-upgrade-price__price">
            مبلغ پرداختی: {formatPrice(convertNumberToPersian(accountUpgradePrice))} تومان
          </p>
        </div>

        <hr className="payment-methods-modal__hr" />

        <div className="payment-methods-modal__payment-way-container">
          <FormControl>
            <FormLabel className="form-label-title">روش پرداخت</FormLabel>
            <RadioGroup value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
              <FormControlLabel
                style={{
                  marginTop: '15px',
                  border: '1px solid #000',
                  borderRadius: '4px',
                  padding: '8px',
                }}
                className="form-control-label-box"
                value="درگاه پرداخت اینترنتی"
                control={<Radio />}
                label={
                  <div className="online-payment">
                    <IoWalletOutline fontSize={20} />
                    <p className="online-payment__text">درگاه پرداخت اینترنتی</p>
                  </div>
                }
              />
              <FormControlLabel
                style={{
                  marginBottom: '15px',
                  border: '1px solid #000',
                  borderRadius: '4px',
                  padding: '8px',
                  marginTop: '5px',
                }}
                className="form-control-label-box"
                value="کیف پول ایران‌گرد"
                control={<Radio />}
                label={
                  <div className="user-wallet-payment">
                    <div className="user-wallet-payment__icon">
                      <BsCreditCard2Back fontSize={20} />
                    </div>
                    <div className="user-wallet-payment__text">
                      <p className="user-wallet-payment__text__title">کیف پول ایران‌گرد</p>
                      <p className="user-wallet-payment__text__description">
                        {auth.user?.wallet_credit >= accountUpgradePrice ? (
                          <p className="user-wallet-payment__text__description__enough-credit">موجودی کافی</p>
                        ) : (
                          <p className="user-wallet-payment__text__description__no-credit">موجودی ناکافی</p>
                        )}
                      </p>
                    </div>
                  </div>
                }
                // disabled={userWalletButtonDisabled}
                disabled={auth.user?.wallet_credit < accountUpgradePrice}
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="submit-upgrade-payment">
          <Button type="button" className="submit-upgrade-payment__btn" onClick={upgradeAccountSubmitHandler}>
            پرداخت{' '}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentMethodsModal;
