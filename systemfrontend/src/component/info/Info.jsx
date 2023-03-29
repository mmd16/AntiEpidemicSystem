import Grid from '@mui/material/Grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-loader-spinner'
import Datatable from '../datatable/Datatable'
import { collectPointColumns } from '../datatablesource'
import Navbar from '../navbar/Navbar.jsx'
import Sidebar from '../sidebar/Sidebar'
import Widget from '../widget/Widget'
import './Info.scss'
const Info = () => {
    const [hkdata, setHkData] = useState();
    const [collect, setCollet] = useState();

    useEffect(() => {
        if (sessionStorage.getItem('token') !== 'undefined') {
            setTimeout(() => {
                getCollectionPoints()
                getTestedPositive()
            }, 500);
        }
    }, [])

    const renderData = (data) => {
        const rslt = []
        if (data !== undefined) {
            var id = 1
            data.map((e) => {
                rslt.push({
                    id: id,
                    Region: e.Region,
                    Clinic: e.Clinic,
                    Address: e.Address,
                })
                id = id + 1
            })
        }
        return rslt
    }
    
    const getCollectionPoints = async () => {
        await axios.get("https://api.data.gov.hk/v2/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Flist_of_collection_points_eng.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D")
            .then(res => {
                console.log(res)
                setCollet(renderData(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getTestedPositive = async () => {
        await axios.get("https://api.data.gov.hk/v2/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Fmode_of_detection_eng.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D")
            .then(res => {
                console.log(res)
                setHkData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    if (hkdata === undefined || collect === undefined) {
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
        <div className="info">
            <Sidebar />
            {console.log(hkdata)}
            <div className="infoContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type={hkdata[0]["Category name"]} tdyNum={hkdata[0]["Number of cases in the past 4 weeks"]} isInfo={true} />
                    <Widget type={hkdata[1]["Category name"]} tdyNum={hkdata[1]["Number of cases in the past 4 weeks"]} isInfo={true} />
                    <Widget type={hkdata[2]["Category name"]} tdyNum={hkdata[2]["Number of cases in the past 4 weeks"]} isInfo={true} />
                    <Widget type={hkdata[3]["Category name"]} tdyNum={hkdata[3]["Number of cases in the past 4 weeks"]} isInfo={true} />
                </div>
                <div className="widgets">
                    <Widget type={hkdata[4]["Category name"]} tdyNum={hkdata[4]["Number of cases in the past 4 weeks"]} isInfo={true} />
                    <Widget type={hkdata[5]["Category name"]} tdyNum={hkdata[5]["Number of cases in the past 4 weeks"]} isInfo={true} />
                    <Widget type={hkdata[6]["Category name"]} tdyNum={hkdata[6]["Number of cases in the past 4 weeks"]} isInfo={true} />
                    <Widget type={hkdata[7]["Category name"]} tdyNum={hkdata[7]["Number of cases in the past 4 weeks"]} isInfo={true} />
                </div>
                <div className="widgets">
                    <Widget type={hkdata[8]["Category name"]} tdyNum={hkdata[8]["Number of cases in the past 4 weeks"]} isInfo={true} />
                    <Widget type={hkdata[9]["Category name"]} tdyNum={hkdata[9]["Number of cases in the past 4 weeks"]} isInfo={true} />
                    <Widget type={hkdata[10]["Category name"]} tdyNum={hkdata[10]["Number of cases in the past 4 weeks"]} isInfo={true} />
                    <Widget type={hkdata[11]["Category name"]} tdyNum={hkdata[11]["Number of cases in the past 4 weeks"]} isInfo={true} />
                </div>
                <div className="charts">
                    {/* <Formschart teacherNum={campusData.teacherInfectionNum} studentNum={campusData.studentInfectionNum} allUser={campusData.allUser} />
                    <div className="schoolcalendar"><SchoolCalendar /></div> */}
                    <div className="collectionPoints">
                        <Datatable fcolumns={collectPointColumns} fdata={collect} routlink="" title="Collection points for submission of specimens by patients of private doctors for COVID-19 testing" formCode="SL" isButton={false} isUserList={false} />
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Info