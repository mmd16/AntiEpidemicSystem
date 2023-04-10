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

const RatForm = () => {
  const { setRatState } = CommonContext()
  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  }
  const navigate = useNavigate();
  const onSubmit = (event, e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append('image', event.ratResultRef[0]);
    imageData.append('ratResult', event.ratResult);
    imageData.append('ratTestDate', event.ratTestDate);
    imageData.append('username', sessionStorage.getItem("username"));
    navigate("/forms/rat")
    axios.post(`http://localhost:8080/api/form/saveRat`, imageData, config)
      .then(res => {
        console.log(res)
        createSuccess()
        setRatState(prev => prev + 1)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const ACCEPTED_IMAGE_TYPES = ["image/png", "image/webp", "image/jpeg", "image/jpg"];
  const schema = yup.object().shape({
    ratResult: yup.string().min(1).required('This field is required'),
    ratResultRef: yup.mixed()
      .test('required', "This field is required", (ref) => {
        return ref?.[0] != null
      })
      .test("type", "Only image can be uploaded", function (ref) {
        return ref?.[0] && ACCEPTED_IMAGE_TYPES.includes(ref?.[0]?.type);
      })
      .test("fileSize", "Only accepted files below 2MB", (ref) => {
        return ref && ref?.[0]?.size <= 2000000;
      }),
    ratTestDate: yup.date()
      .typeError('This field is required')
  })

  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) })
  const { errors } = formState

  return (

    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Rapid Antigen Test Result Form</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="formInput">
                <h1>What is your RAT result ?</h1>

                <label htmlFor="field-positive" > <input type="radio" id="field-positive" {...register("ratResult")} value="Positive" />Positive</label>

                <label htmlFor="field-negative" > <input type="radio" id="field-negative" {...register("ratResult")} value="Negative" />Negative</label>

                <div style={{ color: "red" }}>{errors.ratResult?.message}</div>
              </div>

              <div className="formInput">
                <h1>Please upload your RAT result</h1>
                <input type="file" {...register("ratResultRef", { required: true })} />
                <div style={{ color: "red" }}>{errors.ratResultRef?.message}</div>
              </div>

              <div className="formInput">
                <h1>Please input your RAT test date</h1>
                <input
                  type="date"
                  {...register("ratTestDate", { required: true })}
                />
                <div style={{ color: "red" }}>{errors.ratTestDate?.message}</div>
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

export default RatForm