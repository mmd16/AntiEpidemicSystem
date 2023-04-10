import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CommonContext } from '../../Common'
import Datatable from '../datatable/Datatable'
import { groupColumns } from '../datatablesource'
import Navbar from '../navbar/Navbar.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import './List.scss'

const GroupList = () => {
  const {groupState} = CommonContext()
  const [data, setdata] = useState([]);
  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  }
  useEffect(() => {
    axios.get(`http://localhost:8080/api/group/getLists`, config)
      .then(res => {
        console.log(res)
        setdata(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [groupState]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable fcolumns={groupColumns} fdata={data} routlink="/forms/createPoclForm" title="Groups" formCode="" isButton={false} isUserList={false} isGroupList={true} isCheckBox={false} isMemberList={false}/>
      </div>
    </div>
  )
}

export default GroupList
