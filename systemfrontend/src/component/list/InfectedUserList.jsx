import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Datatable from '../datatable/Datatable'
import { infectedDataColumns } from '../datatablesource'
import Navbar from '../navbar/Navbar.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import './List.scss'


const InfectedUserList = () => {
    const [data, setdata] = useState([]);
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/getAllInfectedUsers`, config)
            .then(res => {
                console.log(res)
                setdata(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable fcolumns={infectedDataColumns} fdata={data} routlink="" title="Infected User List" formCode="" isButton={false} isUserList={false} isGroupList={false} isCheckBox={false} isMemberList={false}/>
            </div>
        </div>
    )
}

export default InfectedUserList