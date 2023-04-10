import Grid from '@mui/material/Grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { ProgressBar } from 'react-loader-spinner';
import { Link } from "react-router-dom";
import Datatable from "../datatable/Datatable";
import Navbar from '../navbar/Navbar.jsx';
import Sidebar from '../sidebar/Sidebar';
import "./Setting.scss";

const Setting = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const [data, setData] = useState();
    const setFormData = (data) => {
        const rslt = [
            {
                id: 1,
                formStatus: data.ratForm === true ? "COMPLETED" : "INCOMPLETED",
                formName: "Rapid Antigen Test Result Form",

            },
        ]
        return rslt
    }
    const formscolumns = [
        { field: 'formName', headerName: 'Form Title', width: 1200 },
        {
            field: 'formStatus', headerName: 'Status', width: 360,
            renderCell: (params) => {
                return (
                    <div className={`cellWithStatus ${params.row.formStatus}`}>{params.row.formStatus}</div>
                )
            }
        },
    ]
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }
    const getGroupsName = (groups) =>{
        const rslt = []
        groups.map((e)=>{
            rslt.push(e.name)
        })
        return rslt.join(", ")
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/api/form/gatherStatus?username=${sessionStorage.getItem("username")}`, config)
            .then(res => {
                console.log(res)
                setData(setFormData(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    if (data === undefined) {
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
        <div className="setting">
            <Sidebar />
            <div className="settingContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <Link to = "/user/changeProfile"><div className="editButton">Edit</div></Link>
                        <h1 className="title">Personal Profile</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{`${user.firstname} ${user.lastname}`}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Role:</span>
                                    <span className="itemValue">{user.role === "ADMIN" ? "Administrator" : "User"}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{user.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{user.mobile}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Class Role:</span>
                                    <span className="itemValue">
                                        {user.classRole === "TEACHER" ? "Teacher" : user.classRole === "STUDENT" ? "Student" : user.classRole === "WORKER" ? "Worker" : ""}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Class:</span>
                                    <span className="itemValue">
                                        {user.className}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Groups:</span>
                                    <span className="itemValue">
                                        {getGroupsName(user.groups)}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">VaccinatedDose:</span>
                                    <span className="itemValue">
                                        {user.vaccinatedDose}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <Datatable fcolumns={formscolumns} fdata={data} routlink="" title="To Do List" formCode="SL" isButton={false} isUserList={false} isGroupList={false} isCheckBox={false} isMemberList={false}/>
                </div>
            </div>
        </div>
    );
};


export default Setting