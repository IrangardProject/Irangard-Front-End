import React from 'react';
import Sidebar from './Sidebar';
import ChatUsersList from './ChatUsersList';
import UsersList from './UsersList';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Statics from './statics';
import Typography from '@mui/material/Typography';
import './style.scss';
import { baseUrl } from 'src/utils/constants';

function AdminPanel() {
  const name = 'this is a test'
  return (
    <div className="bg" style={{ backgroundColor: '#white' }}>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main" style={{ backgroundColor: '#white', width: '100%', minHeight: '100vh' }}>
        <div className="panel-header"></div>
        <div className="body">
          {/* <UsersList /> */}
          <ChatUsersList name={name} />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
