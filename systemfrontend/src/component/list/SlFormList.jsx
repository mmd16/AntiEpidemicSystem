import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CommonContext } from '../../Common'
import Datatable from '../datatable/Datatable'
import { formscolumns } from '../datatablesource'
import Navbar from '../navbar/Navbar.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import './List.scss'

const SlFormList = () => {
    const {slState} = CommonContext()
    const [data, setdata] = useState([]);
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/form/getFormList?username=${sessionStorage.getItem("username")}&formCode=${"SL"}`, config)
            .then(res => {
                console.log(res)
                setdata(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [slState]);
    
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable fcolumns={formscolumns} fdata={data} routlink="/forms/createSlForm" title="Sick Leave Application Form" formCode="SL" isButton={true} isUserList={false}/>
            </div>
        </div>
    )
}


export default SlFormList