import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CommonContext } from '../../Common';
import Datatable from "../datatable/Datatable";
import { membersSimplifycolumns } from '../datatablesource';
import { updateSuccess } from "../toast/Toast";

const NotJoinedList = (props) => {
    const { setGroupState } = CommonContext()
    const { setOpenPopup, selectedRow } = props;
    const [data, setdata] = useState([]);
    const selected = useRef({})
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }
        console.log(selected.current)
        console.log(selectedRow.name)
        axios.post(`http://localhost:8080/api/group/addToGroup?name=${selectedRow.name}`, getList(selected.current), config)
            .then(res => {
                console.log(res)
                setGroupState(prev => prev + 1)
                setOpenPopup(false)
                updateSuccess()
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        console.log(selectedRow.name)
        axios.get(`http://localhost:8080/api/group/getNotJoinedLists?name=${selectedRow.name}`, config)
            .then(res => {
                console.log(res)
                setdata(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const getList = (data) => {
        const rslt = []
        data.map((s) => {
            rslt.push(s.username)
        })
        return rslt
    }

    return (
        <div>
            <div className="groupBox">
                <Datatable fcolumns={membersSimplifycolumns} fdata={data} routlink="" title="Available Users" formCode="" isButton={false} isUserList={false} isGroupList={false} isCheckBox={true} isMemberList={true} selected={selected} />
            </div>
            <div className="buttonClass">
                <button onClick={(e) => { onSubmit(e) }}>Add Members</button>
            </div>
        </div>

    )
}

export default NotJoinedList