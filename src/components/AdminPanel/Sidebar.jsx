import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: true,
    right: false,
  });

  const toggleDrawer =
    (anchor = 'top', open) =>
    event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor = 'top') => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="sidebar">
        {['حذف یا اضافه کاربر', 'آمارهای سایت', 'پیامهای ادمین','صفحه اصلی'].map((text, index) => (
          <>
            <ListItem key={text} disablePadding style={{ textAlign: 'right', height: '6vh' }}>
              <ListItemButton className="drawer-button" dir="rtl" style={{ textAlign: 'right', height: '6vh' }}>
                {index === 0 && (
                  <Link to="/panel/addremove" style={{ height: '4vh' }}>
                    <>
                      <ListItemText primary={text} style={{ marginRight: '60px' }} />
                      {/*<ListItemIcon>
            <ListItem key={text} disablePadding style={{ textAlign: 'right', height: '6vh' }}>
              <ListItemButton className="drawer-button" dir="rtl" style={{ textAlign: 'right', height: '6vh' }}>
                <Link to={index % 2 === 0 ? '/panel/statics' : '/panel/addremove'} style={{ height: '4vh' }}>
                  <>
                    <ListItemText primary={text} style={{ marginRight: '60px' }} />
                    {/*<ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
               </ListItemIcon>*/}
                    </>
                  </Link>
                )}
                {index === 1 && (
                  <Link to="/panel/statics" style={{ height: '4vh' }}>
                    <>
                      <ListItemText primary={text} style={{ marginRight: '60px' }} />
                      {/*<ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
               </ListItemIcon>*/}
                    </>
                  </Link>
                )}
                {index === 2 && (
                  <Link to="/panel/chat" style={{ height: '4vh' }}>
                    <>
                      <ListItemText primary={text} style={{ marginRight: '60px' }} />
                      {/*<ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
               </ListItemIcon>*/}
                    </>
                  </Link>
                )}
                {index === 3 && (
                  <Link to="/" style={{ height: '4vh' }}>
                    <>
                      <ListItemText primary={text} style={{ marginRight: '60px' }} />
                    </>
                  </Link>
                )}
              </ListItemButton>
            </ListItem>
            {index !== 3 ? <Divider /> : ''}
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['top'].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon color="primary" />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
