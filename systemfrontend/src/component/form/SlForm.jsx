import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { CommonContext } from '../../Common';
import rat from '../../image/rat.webp';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { createSuccess } from '../toast/Toast.jsx';
import './form.scss';

const SlForm = () => {
    const { setSlState } = CommonContext()
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ACCEPTED_IMAGE_TYPES = ["image/png", "image/webp", "image/jpeg", "image/jpg"];
    const navigate = useNavigate();
    const onSubmit = (event) => {
        const imageData = new FormData();
        imageData.append('image', event.leaveRef[0]);
        imageData.append('leaveReason', event.leaveReason);
        imageData.append('leaveStartDate', event.leaveStartDate);
        imageData.append('leaveEndDate', event.leaveEndDate);
        imageData.append('username', sessionStorage.getItem("username"));
        navigate("/forms/sl")
        axios.post(`http://localhost:8080/api/form/saveSl`, imageData, config)
            .then(res => {
                console.log(res)
                createSuccess()
                setSlState(prev => prev + 1)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const schema = yup.object({
        leaveReason: yup.string().min(1).required('This field is required'),
        leaveRef: yup.mixed()
            .test('required', "This field is required", (ref) => {
                return ref?.[0] != null
            })
            .test("type", "Only image is supported", function (ref) {
                return ref?.[0] && ACCEPTED_IMAGE_TYPES.includes(ref?.[0]?.type);
            })
            .test("fileSize", "Only accepted files below 1MB", (ref) => {
                return ref && ref?.[0]?.size <= 1000000;
            }),
        leaveStartDate: yup.date().nullable().default(undefined)
            .transform((curr, orig) => orig === '' ? null : curr)
            .typeError("Wrong format")
            .min(today, 'Please choose the day after today')
            .required('This field is required'),
        leaveEndDate: yup
            .date().nullable().default(undefined)
            .transform((curr, orig) => orig === '' ? null : curr)
            .typeError("Wrong format").min(
                yup.ref('leaveStartDate'),
                "Leave ending date can't be before start date"
            ).required('This field is required'),
    })

    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) })
    const { errors } = formState

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Sick Leave Application Form</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="formInput">
                                <h1>Request Leave due to</h1>

                                <label htmlFor="field-confirmed" > <input type="radio" id="field-confirmed" style={{ marginRight: "10px" }} {...register("leaveReason")} value="confirmed" /> Confirmed case for COVID-19</label>

                                <label htmlFor="field-suspected" > <input type="radio" id="field-suspected" style={{ marginRight: "10px" }} {...register("leaveReason")} value="suspected" /> Suspected case for COVID-19</label>

                                <label htmlFor="field-close" > <input type="radio" id="field-close" style={{ marginRight: "10px" }} {...register("leaveReason")} value="close" /> Close contact case for COVID-19</label>

                                <div style={{ color: "red" }}>{errors.leaveReason?.message}</div>
                                <div style={{ color: "red" }}>{errors.ratResult?.message}</div>
                            </div>

                            <div className="formInput">
                                <h1>Please provide the Supporting Document</h1>
                                <input type="file" {...register("leaveRef", { required: true })} />
                                <div style={{ color: "red" }}>{errors.leaveRef?.message}</div>
                            </div>

                            <div className="formInput">
                                <h1>Please provide your Leave Starting Date</h1>
                                <input
                                    type="date"
                                    {...register("leaveStartDate", { required: true })}
                                />

                                <div style={{ color: "red" }}>{errors.leaveStartDate?.message}</div>
                            </div>

                            <div className="formInput">
                                <h1>Please provide your Leave Ending Date</h1>
                                <input
                                    type="date"
                                    {...register("leaveEndDate", { required: true })}
                                />

                                <div style={{ color: "red" }}>{errors.leaveEndDate?.message}</div>
                            </div>
                            <div><button style={{ marginTop: "25px" }}>Submit</button></div>
                        </form>
                    </div>
                    <div className="left">
                        <img
                            src={
                                rat
                            }
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlForm