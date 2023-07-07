import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { TabsUnstyled, TabsListUnstyled, TabPanelUnstyled, TabUnstyled } from '@mui/base';
import { Button, Dialog, DialogContent } from '@mui/material';
import { Modal, Fade, Backdrop } from '@mui/material';
import { styled } from '@mui/system';
import { LoginForm, SignupForm } from './Forms';
import FooterImg from '../../assets/images/LoginBottom.png';
import './style.scss';

const Tabs = styled(TabsUnstyled)``;
const TabsList = styled(TabsListUnstyled)``;
const TabPanel = styled(TabPanelUnstyled)``;
const Tab = styled(TabUnstyled)``;

const ConfirmModal = ({ onDiscardChanges, open, onClose }) => {  
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="confirm-modal">
          <h4 className="confirm-modal__title">از تغییراتی که انجام دادید صرف‌نظر شود؟</h4>

          <div className="confirm-modal__buttons">
            <Button variant="contained" sx={{ ml: '8px' }} onClick={onClose}>
              ادامه ویرایش
            </Button>
            <Button variant="outlined" onClick={onDiscardChanges}>
              صرف‌نظر
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
export default function LoginModal({ open, handleClose }) {
  const [formIsDirty, setFormIsDirty] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleCloseLoginModal = (discardChanges = false) => {
    if (formIsDirty && !discardChanges) setShowWarning(true);
    if (!formIsDirty || discardChanges) handleClose();
  };

  // const handleActiveTab = (e, activeTab) => {
  //   console.log("handling navigation to the page ", activeTab);
  //   setActiveTab(activeTab); // set the active tab to the login TabPanel
  // };

  return (
    <div>
      <Toaster />
      <Dialog open={open} onClose={() => handleCloseLoginModal()} >
        <DialogContent sx={{ overflowY: 'hidden', padding: '0px' }} data-testid="login-modal">
          <ConfirmModal
            open={showWarning}
            onClose={() => setShowWarning(false)}
            onDiscardChanges={() => {
              setShowWarning(false);
              handleCloseLoginModal(true);
            }}
          />
          <Tabs 
          defaultValue={activeTab}
          // value={activeTab} 
          // onChange={handleActiveTab} 
          >
            <TabsList className="login-modal__TabsList">
              <Tab className="login-modal__Tab">ورود اعضا</Tab>
              <Tab className="login-modal__Tab">ثبت نام</Tab>
            </TabsList>
            <TabPanel value={0}>
              <LoginForm />
            </TabPanel>
            <TabPanel value={1}>
              <SignupForm 
              handleFormIsDirty={setFormIsDirty} 
              />
            </TabPanel>
            <img src={FooterImg} alt="Goodbye" className="login-modal__FooterImg" />
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
