import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { InputLabel, MenuItem, Select } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import "yup-phone-lite";
import { classlevel, className, classRoleOption } from '../datatablesource';
import { RegistrationSuccess, userNameExist } from '../toast/Toast.jsx';

const Signup = () => {
    const theme = createTheme();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const schema = yup.object().shape({
        firstName: yup.string().min(1, 'This field is required'),
        lastName: yup.string().min(1, 'This field is required'),
        email: yup.string().email("Please check the format of the email").min(1, 'This field is required'),
        emergencyEmail:  yup.string().email("Please check the format of the email").min(1, 'This field is required'),
        mobile: yup.string().phone("HK", "Please check if the number is valid").min(1, 'This field is required'),
        username: yup.string().min(1, 'This field is required'),
        password: yup.string().min(1, 'This field is required'),
        classRole: yup.string().min(1, 'This field is required'),
        formNumber: yup.string().min(1, 'This field is required'),
        class: yup.string().min(1, 'This field is required'),
    })

    const { handleSubmit, formState, control } = useForm({ resolver: yupResolver(schema) })
    const { errors } = formState

    const onSubmit = (event, e) => {
        e.preventDefault();
        checkIfExist(event)
    };

    const checkIfExist = (param) => {
        axios.get(`http://localhost:8080/api/auth/checkIfExist?username=${param.username}`)
            .then(res => {
                console.log(res)
                if (res.data !== true) {
                    axios.post(`http://localhost:8080/api/auth/register`, formData(param))
                        .then(res => {
                            console.log(res)
                            RegistrationSuccess()
                            navigate("/")
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else{
                    userNameExist()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const showPasswords = () => {
        if (showPassword === true) {
            setShowPassword(false)
        }
        else {
            setShowPassword(true)
        }
    }

    const formData = (data) => {
        const rslt = {
            firstname: data.firstName,
            lastname: data.lastName,
            username: data.username,
            email: data.email,
            emergencyEmail: data.emergencyEmail,
            password: data.password,
            mobile: data.mobile,
            vaccinatedDose: 0,
            className: `${data.formNumber}${data.class}`,
            role: `USER`,
            classRole: data.classRole
        }
        return rslt
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    defaultValue={''}
                                    render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            {...field}
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                        />
                                    )}
                                    name="firstName"
                                    control={control}
                                />
                                <div style={{ color: "red" }}>{errors.firstName?.message}</div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    defaultValue={''}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                        />
                                    )}
                                    name="lastName"
                                    control={control}
                                />
                                <div style={{ color: "red" }}>{errors.lastName?.message}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    defaultValue={''}
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
                                    defaultValue={''}
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
                                    defaultValue={''}
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
                                <Controller
                                    defaultValue={''}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                        />
                                    )}
                                    name="username"
                                    control={control}
                                />
                                <div style={{ color: "red" }}>{errors.username?.message}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    defaultValue={''}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type={showPassword === true ? "text" : "password"}
                                        />
                                    )}
                                    name="password"
                                    control={control}
                                />
                                <div style={{ color: "red" }}>{errors.password?.message}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Controller
                                    defaultValue={''}
                                    render={({ field }) => (
                                        <Select
                                            id="role"
                                            {...field}
                                            fullWidth
                                            defaultValue=""
                                            name="classRole"
                                        >
                                            {classRoleOption.map((e) => {
                                                return <MenuItem value={e.value ?? " "} key={e.value ?? " "}>{e.label}</MenuItem>
                                            })}
                                        </Select>
                                    )}
                                    name="classRole"
                                    control={control}
                                />
                                <div style={{ color: "red" }}>{errors.classRole?.message}</div>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputLabel id="formNumber-label">Form</InputLabel>
                                <Controller
                                    defaultValue={''}
                                    render={({ field }) => (
                                        <Select
                                            id="formNumber"
                                            {...field}
                                            fullWidth
                                            name="formNumber"
                                            defaultValue=""
                                        >
                                            {classlevel.map((e) => {
                                                return <MenuItem value={e.value ?? " "} key={e.value ?? " "}>{e.label ?? " "}</MenuItem>
                                            })}
                                        </Select>
                                    )}
                                    name="formNumber"
                                    control={control}
                                />
                                <div style={{ color: "red" }}>{errors.formNumber?.message}</div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="className-label">Class Name</InputLabel>
                                <Controller
                                    defaultValue={''}
                                    render={({ field }) => (
                                        <Select
                                            id="class"
                                            name="class"
                                            {...field}
                                            fullWidth
                                            defaultValue=""
                                        >
                                            {className.map((e) => {
                                                return <MenuItem value={e.value ?? " "} key={e.value ?? " "}>{e.label ?? " "}</MenuItem>
                                            })}
                                        </Select>
                                    )}
                                    name="class"
                                    control={control}
                                />
                                <div style={{ color: "red" }}>{errors.class?.message}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="primary" onClick={showPasswords} />}
                                    label="Show Password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-start">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
export default Signup