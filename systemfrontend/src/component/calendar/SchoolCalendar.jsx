import axios from "axios";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { CommonContext } from "../../Common";
import './SchoolCalendar.scss';

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

const SchoolCalendar = () => {
    const [allEvent, setAllEvents] = useState([])
    const {calState}= CommonContext()

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
            })
            .catch(err => {
                console.log(err)
            })
        console.log("invoked")
    }, [calState])


    return (
        <Calendar localizer={localizer} events={allEvent}
            startAccessor="start" endAccesor="end" style={{ height: 500, margin: "50px" }} />
    )
}

export default SchoolCalendar