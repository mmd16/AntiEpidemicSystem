import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CommonContext } from '../../Common';
import Datatable from "../datatable/Datatable";
import { memberscolumns } from '../datatablesource';
import { removeSuccess } from '../toast/Toast';

const MemberList = (props) => {
    const {setOpenPopup, selectedRow } = props;
    const { setGroupState } = CommonContext()
    const [data, setdata] = useState([]);
    const selected = useRef({})
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }

    const removeGroup = (e) => {
        e.preventDefault()
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }
        const data = new FormData();
        data.append("name", selectedRow.name)
        axios.post(`http://localhost:8080/api/group/removeGroup`, data, config)
            .then(res => {
                console.log(res)
                setGroupState(prev => prev + 1)
                setOpenPopup(false)
                removeSuccess()
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        console.log(selectedRow.name)
        axios.get(`http://localhost:8080/api/group/getJoinedLists?name=${selectedRow.name}`, config)
            .then(res => {
                console.log(res)
                setdata(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <div>
            <div className="groupBox">
                <Datatable fcolumns={memberscolumns} fdata={data} routlink="" title={`${selectedRow.name}'s Members`} formCode="" isButton={false} isUserList={false} isGroupList={false} isCheckBox={false} isMemberList={false} selected={selected} />
            </div>
            <div className="buttonClass">
                <button onClick={(e) => { removeGroup(e) }}>Remove Group</button>
            </div>
        </div>
    )
}

export default MemberList