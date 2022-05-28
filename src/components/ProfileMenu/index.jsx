import * as React from 'react';
import { useQuery } from 'react-query';
import {Box} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Logout from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';
import './style.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function AccountMenu() {

  const Pay = () => {
    const access_token = localStorage.getItem('access_token');
    const TK =
    axios.get(`${baseUrl}/accounts/pay/pay/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'JWT ' + access_token,
        },
      })
      .then((res) => {
        console.log(res.data);
        const myLink = res.data.link;
        console.log(myLink);
        window.location.replace(myLink);
      })
        return 'حساب با موفقیت ارتقا یافت.';
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
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
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          پروفایل کاربر
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOpen2}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          ارتقا حساب کاربری
        </MenuItem>
        <Divider />
        <MenuItem>
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
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            ارتقای حساب کاربری
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            شما با پرداخت هزینه تعیین شده، می توانید حساب کاربری خود را به حالت ویژه ارتقا دهید. اگر از انتخاب خود اطمینان دارید، دکمه پرداخت و ارتقا را بزنید تا به درگاه بانک هدایت شوید.
            </Typography>
            <br/>
            <Button style={{marginRight:'50%'}} 
            onClick={() => {
              useQuery(Pay());
            }}
            variant="outlined" > پرداخت و ارتقای حساب </Button>
        </Box>
        </Modal>
    </React.Fragment>
  );
}
