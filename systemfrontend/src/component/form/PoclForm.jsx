import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { CommonContext } from '../../Common';
import pcr from '../../image/rat.webp';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { createSuccess } from '../toast/Toast.jsx';
import './form.scss';

const PoclForm = () => {
    const { setPoclState } = CommonContext()
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }
    const ACCEPTED_IMAGE_TYPES = ["image/png", "image/webp", "image/jpeg", "image/jpg"];
    const navigate = useNavigate();
    const onSubmit = (event, e) => {
        e.preventDefault();
        console.log(event)
        const imageData = new FormData();
        imageData.append('image', event.PosClosRef[0]);
        imageData.append('pcrResult', event.pcrResult);
        imageData.append('closeResult', event.closeResult);
        imageData.append('caseDate', event.caseDate);
        imageData.append('username', sessionStorage.getItem("username"));
        axios.post(`http://localhost:8080/api/form/savePocl`, imageData, config)
            .then(res => {
                console.log(res)
                setPoclState(prev => prev + 1)
                navigate("/forms/pocl")
                createSuccess()
            })
            .catch(err => {
                console.log(err)
            })
    }
    const schema = yup.object({
        pcrResult: yup.string().min(1).required('This field is required'),
        closeResult: yup.string().min(1).required('This field is required'),
        PosClosRef: yup.mixed()
            .test('required', "This field is required", (ref) => {
                return ref?.[0] != null
            })
            .test("type", "Only image is supported", function (ref) {
                return ref?.[0] && ACCEPTED_IMAGE_TYPES.includes(ref?.[0]?.type);
            })
            .test("fileSize", "Only accepted files below 1MB", (ref) => {
                return ref && ref?.[0]?.size <= 1000000;
            }),
        caseDate: yup.date().nullable().default(undefined)
            .transform((curr, orig) => orig === '' ? null : curr)
            .typeError("Wrong format")
            .required('This field is required'),
    })
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) })
    const { errors } = formState
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Positive/ Close Contact Case Report Form</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="formInput">
                                <h1>Do you obtained a Preliminary Positive Result from PCR Test?</h1>
                                <label htmlFor="field-positive" > <input type="radio" id="field-PCRYes" style={{ marginRight: "10px" }} value="Positive"{...register("pcrResult", { required: true })} />Yes</label>
                                <label htmlFor="field-negative" > <input type="radio" id="field-PCRNo" style={{ marginRight: "10px" }} value="Negative"{...register("pcrResult", { required: true })} />No</label>
                                <div style={{ color: "red" }}>{errors.pcrResult?.message}</div>
                            </div>

                            <div className="formInput">
                                <h1>Have you contacted with people that were infected, suspected or diagnosed with COVID-19?</h1>
                                <label htmlFor="field-positive" > <input type="radio" id="field-CloseYes" style={{ marginRight: "10px" }} value="Positive" {...register("closeResult", { required: true })} />Yes</label>
                                <label htmlFor="field-negative" > <input type="radio" id="field-CloseNo" style={{ marginRight: "10px" }} value="Negative"{...register("closeResult", { required: true })} />No</label>
                                <div style={{ color: "red" }}>{errors.closeResult?.message}</div>
                            </div>

                            <div className="formInput">
                                <h1>Please input the date that you are tested positive or the date that you contact with people that were tested positive</h1>
                                <input
                                    type="date"
                                    {...register("caseDate", { required: true })}
                                />
                                <div style={{ color: "red" }}>{errors.caseDate?.message}</div>
                            </div>

                            <div className="formInput">
                                <h1>Please provide your Supporting Document</h1>
                                <input type="file" {...register("PosClosRef", { required: true })} />
                                <div style={{ color: "red" }}>{errors.PosClosRef?.message}</div>
                            </div>

                            <div><button style={{ marginTop: "25px" }}>Submit</button></div>
                        </form>
                    </div>
                    <div className="left">
                        <img
                            src={
                                pcr
                            }
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PoclForm