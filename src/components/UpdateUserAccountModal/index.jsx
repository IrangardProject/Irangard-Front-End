import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import './styles.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '8px',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '48px',
};

const UpdateUserAccountModal = ({ open, setOpen, setPaymentMethodsModal }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      classes={'become-premium-modal'}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ارتقای حساب کاربری
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          شما با پرداخت هزینه تعیین‌شده، می‌توانید حساب کاربری خود را به حالت ویژه ارتقا دهید. اگر از انتخاب خود اطمینان
          دارید، دکمه پرداخت و ارتقا را بزنید تا نحوه پرداخت هزینه را انتخاب کنید.
        </Typography>
        <br />
        <Button
          style={{ padding: '12px 16px' }}
          onClick={() => {
            setOpen(false);
            setPaymentMethodsModal(true);
          }}
          variant="outlined"
          aria-label="Close"
        >
          پرداخت و ارتقای حساب
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateUserAccountModal;
