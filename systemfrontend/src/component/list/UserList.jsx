import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CommonContext } from '../../Common'
import Datatable from '../datatable/Datatable'
import { userscolumns } from '../datatablesource'
import Navbar from '../navbar/Navbar.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import './List.scss'


const UserList = () => {
    const [data, setdata] = useState([]);
    const {userState} = CommonContext()
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/getAllUsers`, config)
            .then(res => {
                console.log(res)
                setdata(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [userState]);
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable fcolumns={userscolumns} fdata={data} routlink="/admin/userList" title="Edit User Profile" formCode="SL" isButton={false} isUserList={true}/>
            </div>
        </div>
    )
}

export default UserList