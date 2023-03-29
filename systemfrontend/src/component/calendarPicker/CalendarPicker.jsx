import { Button } from '@mui/material';
import axios from 'axios';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { CommonContext } from '../../Common';
import CreateEvent from '../event/CreateEvent';
import UpdateEvent from '../event/UpdateEvent';
import Navbar from '../navbar/Navbar';
import Popup from '../popup/Popup';
import Sidebar from '../sidebar/Sidebar';
import './CalendarPicker.scss';


const locales = {
    "zh-HK": require("date-fns/locale/zh-HK")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const CalendarPicker = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const {calState} = CommonContext()
    const [allEvent, setAllEvents] = useState([])
    const selected = useRef({})

    const dataConvert = (items) => {

        if (items) {
            const events = items.map(item => ({
                ...item,
                title: item.title,
                start: new Date(item.start),
                end: new Date(item.end)
            }))
            setAllEvents(events);
        }
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }
        axios.get(`http://localhost:8080/api/event/getAllEvent?username=${sessionStorage.getItem("username")}`, config)
            .then(res => {
                console.log(res)
                dataConvert(res.data)
                // window.location.reload(false)
            })
            .catch(err => {
                console.log(err)
            })
        console.log("invoked")
    }, [calState])


    const handleSelected = (event) => {
        selected.current = event
        setOpenUpdate(true)
        console.info('[handleSelected - event]', event)
    };



    return (
        <div className="calendarPicker">
            <Sidebar />
            <div className="calendarPickerContainer">
                <Navbar />
                <div className="top">
                    <h1>Calendar</h1>
                    <div className="add">
                        <Button onClick={() => { setOpenCreate(true) }}><div className="viewButton">Create new Event</div></Button>
                    </div>
                </div>
                <div className="bottom">

                    <Calendar localizer={localizer} events={allEvent}
                        startAccessor="start" endAccesor="end" style={{ height: 500, margin: "50px" }} onSelectEvent={handleSelected} />
                </div>
                <Popup openPopup={openCreate} setOpenPopup={setOpenCreate} title={"Create Event"}>
                    <CreateEvent setOpenPopup={setOpenCreate} />
                </Popup>
                <Popup openPopup={openUpdate} setOpenPopup={setOpenUpdate} title={"Update Event"}>
                    <UpdateEvent setOpenPopup={setOpenUpdate} selectedEvent={selected.current} />
                </Popup>
            </div>
        </div>
    )
}

export default CalendarPicker