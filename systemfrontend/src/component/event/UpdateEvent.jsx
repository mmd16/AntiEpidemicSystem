import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import moment from 'moment/moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { CommonContext } from '../../Common';
import { removeSuccess, updateSuccess, updateForbidden } from '../toast/Toast.jsx';
import './Event.scss';

const UpdateEvent = (props) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { setCalState } = CommonContext()
    const { setOpenPopup, selectedEvent } = props;
    const onSubmit = (event) => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }
        console.log(event)
        const data = new FormData();
        data.append('start', event.start);
        data.append('end', event.end);
        data.append('title', event.title);
        data.append('id', selectedEvent.id);
        axios.get(`http://localhost:8080/api/event/checkIsEditable?id=${selectedEvent.id}`, config)
            .then(res => {
                console.log(res)
                if (res.data === true) {
                    axios.post('http://localhost:8080/api/event/updateEvent', data, config)
                        .then(res => {
                            console.log(res)
                            setCalState(prev => prev + 1)
                            setOpenPopup(false)
                            updateSuccess()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else {
                    setOpenPopup(false)
                    updateForbidden()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const remove = () => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }
        const data = new FormData();
        data.append('id', selectedEvent.id);
        axios.get(`http://localhost:8080/api/event/checkIsEditable?id=${selectedEvent.id}`, config)
            .then(res => {
                console.log(res)
                if (res.data === true) {
                    axios.post('http://localhost:8080/api/event/removeEvent', data, config)
                        .then(res => {
                            console.log(res)
                            setCalState(prev => prev + 1)
                            setOpenPopup(false)
                            removeSuccess()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else {
                    setOpenPopup(false)
                    updateForbidden()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const formatDate = (date) => {
        const formatted = moment(date).format('yyyy-MM-DDThh:mm')
        return formatted
    }
    const schema = yup.object({
        title: yup.string().min(1, 'This field is required'),
        start: yup.date()
            .typeError("This field is required")
            .min(today, 'Please choose future time')
            .max(yup.ref('end'),
                "Event start date can't be after end date"),
        end: yup
            .date()
            .typeError("This field is required").min(
                yup.ref('start'),
                "Event end date can't be before start date"
            ),
    })

    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) })
    const { errors } = formState

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formInput">
                    <h1>Current Event Title</h1>
                    <input
                        type="text"
                        value={selectedEvent.title} disabled
                    />
                </div>

                <div className="formInput">
                    <h1>Current Event Start Time</h1>
                    <input
                        type="datetime-local"
                        value={formatDate(selectedEvent.start)}
                        disabled
                    />

                </div>

                <div className="formInput">
                    <h1>Current Event End Time</h1>
                    <input
                        type="datetime-local"
                        value={formatDate(selectedEvent.end)}
                        disabled
                    />
                </div>

                <div className="formInput">
                    <h1>New Event Title</h1>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                    />
                    <div style={{ color: "red" }}>{errors.title?.message}</div>
                </div>

                <div className="formInput">
                    <h1>New Event Start Time</h1>
                    <input
                        type="datetime-local"
                        {...register("start", { required: true })}
                    />
                    <div style={{ color: "red" }}>{errors.start?.message}</div>
                </div>

                <div className="formInput">
                    <h1>New Event End Time</h1>
                    <input
                        type="datetime-local"
                        {...register("end", { required: true })}
                    />
                    <div style={{ color: "red" }}>{errors.end?.message}</div>
                </div>
                <div>
                    <button style={{ marginRight: "15px" }}>Update</button>
                    <button onClick={remove}>Remove</button>
                </div>
            </form>
        </div>

    )
}

export default UpdateEvent