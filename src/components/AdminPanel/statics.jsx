import React from "react";
import ReactDOM from "react-dom";
import Chart2 from './chart2';
import "./style.scss";
import { useState, useEffect, useRef } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {userData} from './userData.js';
import Chart3 from './chart3';
import { baseUrl } from '../../utils/constants';
import apiInstance from '../../config/axios';


function Statics() {
  const [DailyDataList, setDailyData] = useState(null);
  useEffect(() => {
    console.log('------------data');
    apiInstance
      .post(`${baseUrl}/accounts/admin/daily-statistics/`,
      {
        start_date:'2021-06-10',end_date:'2024-07-10',
      },)
      .then(res =>  res.data)
      .then(data => {
        let result = Object.keys(data['added_daily_place']).map((key) => [key, data['added_daily_place'][key]]);
        let styledData = result.map((item) => {
          return {name:item[0], 'added_daily_place':item[1]}
        })
        setDailyData(styledData);
      })
      .catch(error => {
        console.log('------------Error');
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(DailyDataList)
  }, [DailyDataList])
  

  return (
    <div className='user-controller2'>
      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار سال
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px'}} className='bordering'>
        <Chart2 data={DailyDataList} grid dataKey="added_daily_place" title="User Analytics"/>
      </Box>
      </Box>
      <Chart3/>

    </div>
  );
}

export default Statics;
