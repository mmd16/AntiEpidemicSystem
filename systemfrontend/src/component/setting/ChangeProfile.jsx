import { yupResolver } from "@hookform/resolvers/yup";
import { InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import "yup-phone-lite";
import { CommonContext } from '../../Common';
import eLearning from '../../image/eLearning.png';
import { classlevel, className, classRoleOption, doseNum } from '../datatablesource';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './account.scss';
import { ModifySuccess } from '../toast/Toast.jsx';

const ChangeProfile = () => {
    const { setUserState } = CommonContext()
    const theme = createTheme();
    const user = JSON.parse(sessionStorage.getItem("user"))
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }
    const navigate = useNavigate();
    
    const onSubmit = (event, e) => {
        e.preventDefault();
        console.log(event)
        const formData = new FormData();
        formData.append('multipartFile', event.refDocument[0]);
        formData.append('email', event.email);
        formData.append('emergencyEmail', event.emergencyEmail);
        formData.append('mobile', event.mobile);
        formData.append('vaccinatedDose', event.vaccinatedNum);
        formData.append('username', sessionStorage.getItem("username"));
        axios.post(`http://localhost:8080/api/user/changeUserProfile`, formData, config)
            .then(res => {
                user.email = event.email
                user.emergencyEmail = event.emergencyEmail
                user.mobile = event.mobile
                user.vaccinatedDose = event.vaccinatedNum
                sessionStorage.setItem("user", JSON.stringify(user))
                console.log(res)
                setUserState(prev => prev + 1)
                navigate("/user/settings")
                ModifySuccess()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const schema = yup.object().shape({
        email: yup.string().email("Please check the format of the email").min(1, 'This field is required'),
        emergencyEmail: yup.string().email("Please check the format of the email").min(1, 'This field is required'),
        mobile: yup.string().phone("HK", "Please check if the number is valid").min(1, 'This field is required'),
        vaccinatedNum: yup.number().typeError('This field is required'),
        refDocument: yup.mixed()
            .test('required', "This field is required", (ref) => {
                return ref?.[0] != null
            })
            .test("type", "Only image can be uploaded", function (ref) {
                return ref?.[0] && ACCEPTED_IMAGE_TYPES.includes(ref?.[0]?.type);
            })
            .test("fileSize", "Only accepted files below 2MB", (ref) => {
                return ref && ref?.[0]?.size <= 2000000;
            }),
    })
    const { handleSubmit, formState, control, register } = useForm({ resolver: yupResolver(schema) })
    const { errors } = formState
    return (
        <div className="account">
            <Sidebar />
            <div className="accountContainer">
                <Navbar />
                <div className="top">
                    <div className="title">
                        <h1>Edit Personal Profile</h1>
                    </div>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                eLearning
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <ThemeProvider theme={theme}>
                            <Container component="main" maxWidth="xs">
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    defaultValue={user.firstname}
                                                    fullWidth
                                                    id="firstName"
                                                    label="First Name"
                                                    InputProps={{
                                                        disabled: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    defaultValue={user.lastname}
                                                    fullWidth
                                                    id="lastName"
                                                    label="Last Name"
                                                    name="lastName"
                                                    InputProps={{
                                                        disabled: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Controller
                                                    defaultValue={user.email}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            fullWidth
                                                            id="email"
                                                            label="Email Address"
                                                            name="email"
                                                        />
                                                    )}
                                                    name="email"
                                                    control={control}
                                                />
                                                <div style={{ color: "red" }}>{errors.email?.message}</div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Controller
                                                    defaultValue={user.emergencyEmail}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            fullWidth
                                                            id="emergencyEmail"
                                                            label="Emergency Contact's Email"
                                                            name="emergencyEmail"
                                                        />
                                                    )}
                                                    name="emergencyEmail"
                                                    control={control}
                                                />
                                                <div style={{ color: "red" }}>{errors.emergencyEmail?.message}</div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Controller
                                                    defaultValue={user.mobile}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            fullWidth
                                                            id="mobile"
                                                            label="Phone Number"
                                                            name="mobile"
                                                        />
                                                    )}
                                                    name="mobile"
                                                    control={control}
                                                />
                                                <div style={{ color: "red" }}>{errors.mobile?.message}</div>
                                            </Grid>


                                            <Grid item xs={12}>
                                                <InputLabel id="role-label">Role</InputLabel>
                                                <Select
                                                    id="role"
                                                    fullWidth
                                                    defaultValue={user.classRole}
                                                    name="classRole"
                                                    disabled
                                                >
                                                    {classRoleOption.map((e) => {
                                                        return <MenuItem value={e.value ?? " "} key={e.value ?? " "}>{e.label}</MenuItem>
                                                    })}
                                                </Select>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <InputLabel id="formNumber-label">Form</InputLabel>
                                                <Select
                                                    id="formNumber"
                                                    fullWidth
                                                    name="formNumber"
                                                    defaultValue={user.className.substring(0, 1)}
                                                    disabled
                                                >
                                                    {classlevel.map((e) => {
                                                        return <MenuItem value={e.value ?? " "} key={e.value ?? " "}>{e.label ?? " "}</MenuItem>
                                                    })}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputLabel id="className-label">Class Name</InputLabel>
                                                <Select
                                                    id="class"
                                                    name="class"
                                                    fullWidth
                                                    defaultValue={user.className.substring(1, 2)}
                                                    disabled
                                                >
                                                    {className.map((e) => {
                                                        return <MenuItem value={e.value ?? " "} key={e.value ?? " "}>{e.label ?? " "}</MenuItem>
                                                    })}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel id="className-label">Number of Vaccinated doses</InputLabel>
                                                <Controller
                                                    defaultValue={user.vaccinatedDose}
                                                    render={({ field }) => (
                                                        <Select
                                                            id="vaccinatedNum"
                                                            name="vaccinatedNum"
                                                            {...field}
                                                            fullWidth
                                                            defaultValue=""
                                                        >
                                                            {doseNum.map((e) => {
                                                                return <MenuItem value={e.value ?? " "} key={e.value ?? " "}>{e.label ?? " "}</MenuItem>
                                                            })}
                                                        </Select>
                                                    )}
                                                    name="vaccinatedNum"
                                                    control={control}
                                                />
                                                <div style={{ color: "red" }}>{errors.vaccinatedNum?.message}</div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel id="className-label">Reference Document</InputLabel>
                                                <input type="file" {...register("refDocument", { required: true })} />
                                                <div style={{ color: "red" }}>{errors.refDocument?.message}</div>
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Confirm Modify
                                        </Button>
                                    </Box>
                                </Box>
                            </Container>
                        </ThemeProvider >
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ChangeProfile