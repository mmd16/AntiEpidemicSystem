import Grid from '@mui/material/Grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-loader-spinner'
import SchoolCalendar from '../calendar/SchoolCalendar'
import Formschart from '../formsChart/FormsChart'
import Navbar from '../navbar/Navbar.jsx'
import Sidebar from '../sidebar/Sidebar'
import Widget from '../widget/Widget'
import './Home.scss'
const Home = () => {
  const [hkdata, setHkData] = useState();
  const [campusData, setCampusData] = useState();
  const [absNum, setAbsNum] = useState();

  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('token') !== 'undefined') {
      setTimeout(() => {
        getHkList();
        getCampusInfectionNum();
        getCampusAbsNum();
      }, 500);
    }
  }, [])

  const getCampusInfectionNum = async () => {
    await axios.get("http://localhost:8080/api/user/getInfectionNum", config)
      .then(res => {
        console.log(res)
        setCampusData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getCampusAbsNum = async () => {
    await axios.get("http://localhost:8080/api/user/getAbsNum", config)
      .then(res => {
        console.log(res)
        setAbsNum(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getHkList = async () => {
    await axios.get(`https://api.data.gov.hk/v2/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Flatest_situation_of_reported_cases_covid_19_eng.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D`)
      .then(res => {
        console.log(res)
        setHkData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  if (hkdata === undefined || campusData === undefined || absNum === undefined) {
    return <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor='#F4442E'
        barColor='#51E5FF'
      />
    </Grid>
  }
  return (
    <div className="home">
      {console.log(campusData)}
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="campusInfect" tdyNum={campusData.studentInfectionNum + campusData.teacherInfectionNum} isInfo={false} />
          <Widget type="campusAbsent" tdyNum={absNum} isInfo={false} />
          <Widget type="hkInfect" tdyNum={hkdata[hkdata.length - 1]["Number of positive nucleic acid test laboratory detections"]} isInfo={false} />
          <Widget type="hkDeath" tdyNum={hkdata[hkdata.length - 1]["Number of death cases related to COVID-19"]} isInfo={false} />
        </div>
        <div className="charts">
          <Formschart teacherNum={campusData.teacherInfectionNum} studentNum={campusData.studentInfectionNum} allUser={campusData.allUser} />
          <div className="schoolcalendar"><SchoolCalendar /></div>
        </div>
      </div>
    </div>
  )

}


export default Home