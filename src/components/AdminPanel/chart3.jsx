import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./style.scss";
// ref: https://www.pluralsight.com/guides/drawing-charts-in-react-with-d3
// 數據顯示: https://openbase.io/js/recharts
// ref: https://livecodestream.dev/post/2020-08-08-7-react-chart-libraries-for-your-web-projects/
// lib source: https://recharts.org/
import { data1, CustomizedDot } from "./option1";
import data2 from "./option2";
import data3 from "./option3";
import data4 from "./option4";
import { data5, renderActiveShape } from "./option5";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  ComposedChart,
  PieChart,
  Pie,
  Sector
} from "recharts";
import { baseUrl } from '../../utils/constants';
import apiInstance from '../../config/axios';

export default function App() {
  const [DailyDataList, setDailyData] = useState(null);
  const [MonthlyDataList, setMonthlyData] = useState(null);
  var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
  const body = {
      "start_date": "2023-03-20",
      "end_date": "2023-03-27"
    }
  useEffect(() => {
    console.log('body' ,body);
    apiInstance
      .post(`${baseUrl}/accounts/admin/daily-statistics/`,
        body
      )
      .then(res => res.data)
      .then(data => {
        console.log('------------ data')
        console.log(data)
        let result_place = data['added_daily_place']
        let result_user = data['added_daily_user']
        let result_tour = data['added_daily_tour']
        let result_exprience = data['added_daily_experience']
        let result_special = data['added_daily_special_user']
        var daylist = getDaysArray(new Date('2023-03-20'),new Date('2023-03-27'));
        var arrDate =  daylist.map((v)=>v.toISOString().slice(0,10))
        console.log(arrDate) 
        let styledData = arrDate.map((month)=>{
          
            return {
              name:month,
              'added_daily_place':result_place[month] === undefined ? 0 : result_place[month],
              'added_daily_user':result_user[month] === undefined ? 0 : result_user[month],
              'added_daily_tour':result_tour[month] === undefined ? 0 : result_tour[month],
              'added_daily_experience':result_exprience[month] === undefined ? 0 : result_exprience[month],
              'added_daily_special_user':result_special[month] === undefined ? 0 : result_special[month],
            }
          
        })
        setDailyData(styledData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    apiInstance
      .post(`${baseUrl}/accounts/admin/monthly-statistics/`,
      {
        start_date:'2021-04-24',end_date:'2024-07-10',
      },)
      .then(res => res.data)
      .then(data => {
        let result_place = data['added_monthly_place']
        let result_user = data['added_monthly_user']
        let result_tour = data['added_monthly_tour']
        let result_exprience = data['added_monthly_experience']
        let result_special = data['added_monthly_special_user']
        let styledData = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month)=>{
          
            return {
              name:month,
              'added_monthly_place':result_place[month] === undefined ? 0 : result_place[month],
              'added_monthly_user':result_user[month] === undefined ? 0 : result_user[month],
              'added_monthly_tour':result_tour[month] === undefined ? 0 : result_tour[month],
              'added_monthly_experience':result_exprience[month] === undefined ? 0 : result_exprience[month],
              'added_monthly_special_user':result_special[month] === undefined ? 0 : result_special[month],
            }
          
        })
        setMonthlyData(styledData);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  console.log(DailyDataList);
  useEffect(() => {
    console.log(' ----------- MonthlyDataList')
    console.log(MonthlyDataList)
  }, [MonthlyDataList])
  useEffect(() => {
    console.log(' ----------- DailyDataList')
    console.log(DailyDataList)
  }, [DailyDataList])
  useEffect(() => {
    console.log(' ----------- MonthlyDataList Expre')
    console.log(MonthlyDataList)
  }, [])
  const [activeIndexState, setState] = useState(0);
  return (
    <div className="App do-not-show">
      <div className="user-controller">
      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار ماهانه تجارب و مکانها
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px',justifyContent:'center'}} className='make-center bordering'>
        <br/>
      <LineChart className="be-center"
        width={500}
        height={300}
        data={MonthlyDataList}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="added_monthly_experience"
          stroke="#8884d8"
          //dot={<CustomizedDot />}
        />
        <Line type="monotone" dataKey="added_monthly_place" stroke="#82ca9d" />
      </LineChart>
      </Box>
      </Box>

      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار ماهانه کاربران و تورها
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px'}} className='make-center bordering'>
        <br/>
      <BarChart className="be-center"
        width={500}
        height={300}
        data={MonthlyDataList}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="added_monthly_tour" stackId="a" fill="#8884d8" />
        <Bar dataKey="added_monthly_user" stackId="a" fill="#82ca9d" />
      </BarChart>
      </Box>
      </Box>
      
      
      
      
      </div>
      


      <div className="user-controller">
      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار روزانه کاربران و تورها
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px'}} className='make-center bordering'>
        <br/>
      <AreaChart className="be-center"
        width={500}
        height={400}
        data={DailyDataList}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="added_daily_user"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="added_daily_tour"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="added_daily_special_user"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
      </Box>
      </Box>
      
      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
         آمار روزانه تجارب و مکانها
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px'}} className='make-center bordering'>
        <br/>
      <ComposedChart className="be-center"
        width={500}
        height={400}
        data={DailyDataList}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="added_daily_place" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="added_daily_experience" stroke="#ff7300" />
      </ComposedChart>
      </Box>
      </Box>

      
      
      </div>
        {/*
      <br />
      <div className="user-controller">
      <Box sx={{ flexGrow:2, margin:'35px',width:'420px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار سال
      </Typography>

      <Box sx={{ backgroundColor: '#dbd0ee', marginBottom: '15px', borderRadius: '5px', padding: '6px',width:'400px'}} >
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndexState}
          activeShape={renderActiveShape}
          data={data5}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(data, index) => {
            console.log("data", index);
            setState(index);
          }}
        />
      </PieChart>
      </Box>
      </Box>
        </div>*/}
    </div>
  );
}
