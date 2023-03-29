import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import React from 'react';
import './Widget.scss';


const Widget = ({ type, tdyNum, isInfo }) => {

  let data;

  //tem
  const amount = tdyNum;
  const  link = "Data will be updated daily";
  const icon = <CoronavirusOutlinedIcon className="icon" style={{ color: "#552586", backgroundColor: "#DDD5F3" }} />;

  switch (type) {
    case "campusInfect":
      data = {
        title: "CAMPUS INFECTION NUMBERS",
      };
      break;
    case "hkDeath":
      data = {
        title: "HK COVID-19 DEATH NUMBERS",
      };
      break;
    case "hkInfect":
      data = {
        title: "HK COVID-19 INFECTION NUMBERS",
      };
      break;
    case "campusAbsent":
      data = {
        title: "CAMPUS ABSENT NUMBERS",
      };
      break;
    default:
      break;
  }


  return (
    <div className="widget">
      <div className="left">
        <span className="title">{isInfo === true ? `${type} in the past 4 weeks` : data.title}</span>
        <span className="counter">{amount}</span>
        <span className="link">{link}</span>
      </div>
      <div className="right">
        <div className="percentage neg">
        </div>
        {icon}
      </div>
    </div>
  )
}

export default Widget