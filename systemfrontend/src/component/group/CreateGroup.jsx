
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { CommonContext } from '../../Common';
import { createSuccess , groupAlreadyExisted} from '../toast/Toast.jsx';
import './Group.scss';



const CreateGroup = (props) => {
    const { setGroupState } = CommonContext()
    const { setOpenPopup} = props;
    const onSubmit = (event) => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }
        console.log(event)
        const data = new FormData();
        data.append('name', event.name);
        axios.get(`http://localhost:8080/api/group/checkIfExist?name=${event.name}`, config)
            .then(res => {
                if(res.data === true){
                    setOpenPopup(false)
                    groupAlreadyExisted()
                }else{
                    axios.post('http://localhost:8080/api/group/createGroup', data, config)
                    .then(res => {
                        console.log(res)
                        setGroupState(prev => prev + 1)
                        setOpenPopup(false)
                        createSuccess()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    const schema = yup.object({
        name: yup.string().min(1, 'This field is required'),
    })

    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) })
    const { errors } = formState

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formInput">
                    <h1>Group Name</h1>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                    />
                    <div style={{ color: "red" }}>{errors.name?.message}</div>
                </div>
                <div style={{ margin: "auto" }}><button>Create</button></div>
            </form>
        </div>
    )
}
export default CreateGroup