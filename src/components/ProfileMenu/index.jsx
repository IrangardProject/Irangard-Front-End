import * as React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Logout from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import apiInstance from '../../config/axios';
import useAuth from 'src/context/AuthContext';
import defaultProfileImg from '../../assets/images/profile.jpeg';
import './style.scss';
import { baseUrl } from '../../utils/constants';
import toast from 'react-hot-toast';

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

export default function AccountMenu() {
  const auth = useAuth();
  const Pay = () => {
    apiInstance.get(`/accounts/pay/pay/`).then(res => {
      console.log(res.data);
      const myLink = res.data.link;
      console.log(myLink);
      window.location.replace(myLink);
    });
    return 'حساب با موفقیت ارتقا یافت.';
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="تنظیمات حساب کاربری">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar className={auth.isSpecial ? 'special-avatar' : ''} sx={{ width: 36, height: 36 }}>
              <img width={36} height={36} src={(`${baseUrl}` + auth.user.image) || defaultProfileImg} />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Link to={`/profile/${auth.user.username}`} className="drop-down__menu">
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            پروفایل من
          </Link>
        </MenuItem>
        <>
          <Divider />
          <MenuItem>
            <Link to={'/feed'} className="drop-down__menu">
              <ListItemIcon>
                <DashboardCustomizeIcon fontSize="small" />
              </ListItemIcon>
              تجربه‌های پیشنهادی
            </Link>
          </MenuItem>
        </>
        {!auth.isSpecial && (
          <>
            <Divider />
            <MenuItem onClick={handleOpen2}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              ارتقا حساب کاربری
            </MenuItem>
          </>
        )}
        {auth.isAdmin && (
          <>
            <Divider />
            <MenuItem>
              <Link to="/panel">
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                پنل ادمین
              </Link>
            </MenuItem>
          </>
        )}
        <Divider />
        <MenuItem
          onClick={() => {
            auth.logout();
            window.location.reload(false);
            toast.error('شما از سایت خارج شدید!')
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          خروج
        </MenuItem>
      </Menu>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        classes={'become-premium-modal'}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ارتقای حساب کاربری
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            شما با پرداخت هزینه تعیین‌شده، می‌توانید حساب کاربری خود را به حالت ویژه ارتقا دهید. اگر از انتخاب خود
            اطمینان دارید، دکمه پرداخت و ارتقا را بزنید تا به درگاه بانک هدایت شوید.
          </Typography>
          <br />
          <Button
            style={{ padding: '12px 16px' }}
            onClick={() => {
              useQuery(Pay());
            }}
            variant="outlined"
          >
            پرداخت و ارتقای حساب
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
