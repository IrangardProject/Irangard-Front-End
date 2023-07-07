import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState,useEffect} from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import UsersList from './data';
import './style.scss';
import { Button } from '@mui/material';
import { width } from '@mui/system';
import Statics from './statics';
import {SignupForm} from './AddUser';
import apiInstance from '../../config/axios';
import { baseUrl } from '../../utils/constants';
import axios from 'axios';


function removeUser(username){
    apiInstance
      .post(`${baseUrl}/accounts/admin/remove-user/`,
      {
        username:username,
      },)
}
function Generate(element) {
  if (element) {
    var myDate = new Date(element.date); 
    return (
      <ListItem className='bordering'
        sx={{ backgroundColor: 'white', marginBottom: '8px', borderRadius: '5px', padding: '6px' }}
      >
        {/*secondaryAction={*/}
        {/*} <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
            </IconButton>*/}
        <ListItemAvatar>
          <Avatar src={element.image} alt="recievedList" />
          {/*    <FolderIcon />
                  </Avatar>*/}
        </ListItemAvatar>
        <div className='doNotShow' style={{width:'155px',marginRight: '30px',textAlign:'right'}}>
        <ListItemText primary={element.full_name === null ? 'کاربر ایرانگرد' : element.full_name } sx={{margin:'auto',justifyContent:'center'}}/></div>
        <div style={{width:'130px',marginRight: '30px',marginLeft: '2px',textAlign:'center'}}>
        <ListItemText primary={element.username} sx={{margin:'auto',justifyContent:'center'}}/></div>
        
        <ListItemText className='doNotShow' sx={{ marginLeft: '40px'}} primary={`تعداد دنبال کننده : ${element.follower_number}`}/>
        <Button sx={{
            backgroundColor: 'white',
            border: '1px solid green',
            transition: 'background-color 0.3s ease-in-out',
            '&:hover': {
            backgroundColor: 'yellow',
            color: 'white',
          },
  }} onClick={() => {removeUser(element.username)}} >
            <DeleteOutlineIcon color="primary"/>
        </Button>
      </ListItem>
    );
  }
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function RecievedList() {
  //const [UsersList, setUsersList] = useState(null);
  const [diagramData, setDiagramData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [UsersList, setUsersList] = useState(null);

  useEffect(() => {

    const fetchData = async () =>{
      try {
        const res = await apiInstance.get(`${baseUrl}/accounts/users`);
        setUsersList(res.data);
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  /*useEffect(() => {
    axios
      .get(`${baseUrl}/accounts/instructors/orders/`)
      .then(res => {
        setUsersList(res.data);
        console.log('UsersList', res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);*/

  return (
    <div className='user-controller'>
      <Box sx={{ flexGrow:2, margin:'35px' }} >
        <Typography sx={{ mt: 4, mb: 2 ,color:'#011f1f'}} variant="h5" component="div">
            اضافه کردن کاربر جدید
        </Typography>
        
        <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px',paddingBottom:'20px'}} className='bordering'>
          <SignupForm/>
        </Box>
    </Box>
    <Box sx={{ flexGrow: 1, margin:'35px',backgroundColor: 'white'}}>
      <FormGroup row></FormGroup>
      <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h5" component="div">
          لیست کاربران
        </Typography>
        <Demo sx={{padding:'5px',borderRadius:'5px',backgroundColor: 'white',height:'300px',overflowY:'scroll'}}>
          <List>{UsersList && UsersList.map(item => Generate(item))}</List>
        </Demo>
      </Grid>
    </Box>
    </div>
  );
}
