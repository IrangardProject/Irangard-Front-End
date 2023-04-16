import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TelegramIcon from '@mui/icons-material/Telegram';
import CommentIcon from '@mui/icons-material/Comment';
import { useState, useEffect } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import tansferHistory from './data';
import apiInstance from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { Button } from '@mui/material';
import { width } from '@mui/system';
import Statics from './statics';
import { SignupForm } from './AddUser';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from 'src/utils/constants';

function Generate(element, navigate) {
  if (element) {
    var myDate = new Date(element.date);
    return (
      <ListItem
        className="bordering"
        sx={{ backgroundColor: 'white', marginBottom: '8px', borderRadius: '5px', padding: '6px' }}
      >
        {/*secondaryAction={*/}
        {/*} <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
            </IconButton>*/}
        <ListItemAvatar>
          <Avatar src={element.userImgSrc} alt="recievedList" />
          {/*    <FolderIcon />
                  </Avatar>*/}
        </ListItemAvatar>

        <ListItemText primary={element.username} sx={{ margin: 'auto', justifyContent: 'center', color: 'black' }} />

        <ListItemText primary={element.email} sx={{ margin: 'auto', justifyContent: 'center', color: 'black' }} />

        {/* <ListItemText sx={{ marginLeft: '40px' }} primary={element.friendsNum} /> */}
        <ListItemButton sx={{ justifyContent: 'left' }}>
          {/* <Button sx={{ marginLeft: '40px' }}> */}
          <CommentIcon
            color="primary"
            onClick={() => {
              navigate(`/panel/chatPage/${element.username}`);
            }}
          />
          {/* </Button> */}
        </ListItemButton>
      </ListItem>
    );
  }
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function RecievedList(props) {
  console.log('props' , props);
  //const [tansferHistory, setTansferHistory] = useState(null);
  const [diagramData, setDiagramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState(null);
  const [users, setUsers] = useState(null);
  const [nextLoading, setNextLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiInstance
      .get(`${baseUrl}/accounts/chat-users`)
      .then(res => {
        setUsers(res.data);
        console.log('UsersList', res.data);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);

  return (
    <div className="user-controller">
      <Box sx={{ flexGrow: 1, margin: '35px', backgroundColor: 'white' }}>
        <FormGroup row></FormGroup>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2, color: 'green' }} variant="h6" component="div">
            لیست چت‌ها
          </Typography>
          <Demo
            sx={{
              padding: '5px',
              borderRadius: '5px',
              backgroundColor: 'white',
              height: '300px',
              overflowY: 'scroll',
            }}
          >
            <List>{users && users.map(item => Generate(item, navigate))}</List>
          </Demo>
        </Grid>
      </Box>
    </div>
  );
}
