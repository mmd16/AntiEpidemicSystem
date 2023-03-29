import MasksIcon from '@mui/icons-material/Masks';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import './FormsChart.scss';

const FormsChart = (props) => {

  const { teacherNum, studentNum, allUser } = props;
  const percentage = (((teacherNum + studentNum) / allUser) * 100).toFixed(0)
  const totalNum = (teacherNum + studentNum)

  return (
    <div className="formsChart">
      {console.log(percentage)}
      <div className="top">
        <h1 className="title">Campus Infection</h1>
        <MasksIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="chart">
          <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={6} />
        </div>
        <p className="title">Total Infection Number Today</p>
        <p className="acount">{totalNum}</p>
        <p className="desc">Amount will be updated daily</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Teachers</div>
            <div className="itemResult">
              <PersonOutlinedIcon fontSize='small' />
              <div className="resultAmount">
                {teacherNum}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Students</div>
            <div className="itemResult">
              <PersonOutlinedIcon fontSize='small' />
              <div className="resultAmount">
                {studentNum}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormsChart