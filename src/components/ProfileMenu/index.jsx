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
import { BsCalendarEvent } from 'react-icons/bs';
import { RiShipLine } from 'react-icons/ri';
import { RiAncientPavilionFill } from 'react-icons/ri';
import UpdateUserAccountModal from 'src/components/UpdateUserAccountModal';
import PaymentMethodsModal from 'src/components/UpdateUserAccountModal/PaymentMethodsModal';

export default function AccountMenu() {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open2, setOpen2] = React.useState(false);
  const [accountUpgradePaymentOpen, setAccountUpgradePaymentOpen] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);

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
              <img width={36} height={36} src={`${baseUrl}` + auth.user.image || defaultProfileImg} />
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
        <>
          <Divider />
          <MenuItem>
            <Link to={'/places/new'} className="drop-down__menu">
              <ListItemIcon>
                <RiAncientPavilionFill size={20} />
              </ListItemIcon>
              ثبت مکان جدید
            </Link>
          </MenuItem>
        </>
        {auth.isSpecial && (
          <>
            <Divider />
            <MenuItem>
              <Link to="/tours/new">
                <ListItemIcon>
                  <RiShipLine size={20} />
                </ListItemIcon>
                ثبت تور جدید
              </Link>
            </MenuItem>
          </>
        )}
        {auth.isSpecial && (
          <>
            <Divider />
            <MenuItem>
              <Link to="/events/new">
                <ListItemIcon>
                  <BsCalendarEvent size={20} />
                </ListItemIcon>
                ثبت رویداد جدید
              </Link>
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
            toast.error('شما از سایت خارج شدید!');
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          خروج
        </MenuItem>
      </Menu>
      <UpdateUserAccountModal open={open2} setOpen={setOpen2} setPaymentMethodsModal={setAccountUpgradePaymentOpen} />
      <PaymentMethodsModal open={accountUpgradePaymentOpen} setOpen={setAccountUpgradePaymentOpen} />
    </React.Fragment>
  );
}
