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
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import "yup-phone-lite";
import { CommonContext } from '../../Common';
import { classlevel, className, classRoleOption, roleOption } from '../datatablesource';
import { ModifySuccess } from '../toast/Toast.jsx';

const EditProfile = (props) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  }
  const { selectedRow, setOpenPopup } = props;
  const { setUserState } = CommonContext()
  const theme = createTheme();
  const schema = yup.object().shape({
    firstName: yup.string().min(1, 'This field is required'),
    lastName: yup.string().min(1, 'This field is required'),
    email: yup.string().email("Please check the format of the email").min(1, 'This field is required'),
    emergencyEmail: yup.string().email("Please check the format of the email").min(1, 'This field is required'),
    mobile: yup.string().phone("HK", "Please check if the number is valid").min(1, 'This field is required'),
    role: yup.string().min(1, 'This field is required'),
    classRole: yup.string().min(1, 'This field is required'),
    formNumber: yup.string().min(1, 'This field is required'),
    class: yup.string().min(1, 'This field is required'),
  })
  const { handleSubmit, formState, control } = useForm({ resolver: yupResolver(schema) })
  const { errors } = formState

  const onSubmit = (event, e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/user/editUserProfile`, formData(event), config)
      .then(res => {
        console.log(res)
        ModifySuccess()
        setUserState(prev => prev + 1)
        setOpenPopup(false)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const formData = (data) => {
    const rslt = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      emergencyEmail: data.emergencyEmail,
      mobile: data.mobile,
      className: `${data.formNumber}${data.class}`,
      username: selectedRow.username,
      role: data.role,
      classRole: data.classRole
    }
    return rslt
  }

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    defaultValue={selectedRow.firstname}
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
                    defaultValue={selectedRow.lastname}
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
                    defaultValue={selectedRow.email}
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
                    defaultValue={selectedRow.emergencyEmail}
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
                    defaultValue={selectedRow.mobile}
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
                  <InputLabel id="role-label">Authority</InputLabel>
                  <Controller
                    defaultValue={selectedRow.role}
                    render={({ field }) => (
                      <Select
                        id="role"
                        {...field}
                        fullWidth
                        defaultValue=""
                        name="role"
                      >
                        {roleOption.map((e) => {
                          return <MenuItem value={e.value ?? " "} key={e.value ?? " "}>{e.label}</MenuItem>
                        })}
                      </Select>
                    )}
                    name="role"
                    control={control}
                  />
                  <div style={{ color: "red" }}>{errors.role?.message}</div>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Controller
                    defaultValue={selectedRow.classRole}
                    render={({ field }) => (
                      <Select
                        id="classRole"
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
                    defaultValue={selectedRow.className.substring(0, 1)}
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
                    defaultValue={selectedRow.className.substring(1, 2)}
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
              </Grid>
              {console.log(selectedRow)}
              {sessionStorage.getItem("username") === selectedRow.username
                ?
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled
                >
                  Confirm Modify
                </Button>
                :
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Confirm Modify
                </Button>}
            </Box>
          </Box>
        </Container>
     </ThemeProvider >
  )
}

export default EditProfile