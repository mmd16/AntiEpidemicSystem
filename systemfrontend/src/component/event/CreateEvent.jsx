import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { CommonContext } from '../../Common';
import { createSuccess } from '../toast/Toast.jsx';
import './Event.scss';



const CreateEvent = (props) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { setCalState } = CommonContext()
    const { setOpenPopup } = props;
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
        axios.post('http://localhost:8080/api/event/addEvent', data, config)
            .then(res => {
                console.log(res)
                setCalState(prev => prev + 1)
                setOpenPopup(false)
                createSuccess()
            })
            .catch(err => {
                console.log(err)
            })
    }


    const schema = yup.object({
        title: yup.string().min(1, 'This field is required'),
        start: yup.date()
            .typeError("This field is required")
            .min(today, 'Please choose future time')
            .max(yup.ref('leaveEndDate'),
                "Event start date can't be after end date"),
        end: yup
            .date()
            .typeError("This field is required").min(
                yup.ref('leaveStartDate'),
                "Event end date can't be before start date"
            ),
    })

    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) })
    const { errors } = formState

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formInput">
                    <h1>Event Title</h1>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                    />
                    <div style={{ color: "red" }}>{errors.title?.message}</div>
                </div>

                <div className="formInput">
                    <h1>Event Start Time</h1>
                    <input
                        type="datetime-local"
                        {...register("start", { required: true })}
                    />
                    <div style={{ color: "red" }}>{errors.start?.message}</div>
                </div>

                <div className="formInput">
                    <h1>Event End Time</h1>
                    <input
                        type="datetime-local"
                        {...register("end", { required: true })}
                    />
                    <div style={{ color: "red" }}>{errors.end?.message}</div>
                </div>
                <div style={{ margin: "auto" }}><button>Create</button></div>
            </form>
        </div>

    )
}

export default CreateEvent