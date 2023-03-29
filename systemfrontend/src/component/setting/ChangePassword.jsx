import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel } from '@mui/material';
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
import password from '../../image/password.webp';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { changePasswordFail, ModifySuccess, passwordDuplicate } from '../toast/Toast.jsx';
import './account.scss';

const ChangePassword = () => {

  const theme = createTheme();
  const navigate = useNavigate();
  const onSubmit = (event, e) => {
    e.preventDefault();
    console.log(event)
    const config = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    }
    if (event.prev === event.latest) {
      passwordDuplicate()
    }
    else {
      const formData = new FormData();
      formData.append('prev', event.prev);
      formData.append('latest', event.latest);
      formData.append('username', sessionStorage.getItem("username"));
      axios.post(`http://localhost:8080/api/user/changePassword`, formData, config)
        .then(res => {
          console.log(res)
          navigate("/user/settings")
          ModifySuccess()
        })
        .catch(err => {
          console.log(err)
          changePasswordFail()
        })
    }
  }

  const schema = yup.object().shape({
    prev: yup.string().min(1, 'This field is required'),
    latest: yup.string().min(1, 'This field is required'),
  })

  const showPasswords = () => {
    if (showPassword === true) {
      setShowPassword(false)
    }
    else {
      setShowPassword(true)
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const { handleSubmit, formState, control } = useForm({ resolver: yupResolver(schema) })
  const { errors } = formState
  return (
    <div className="account">
      <Sidebar />
      <div className="accountContainer">
        <Navbar />
        <div className="top">
          <div className="title">
            <h1>Change Password</h1>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                password
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
                  }}
                >
                  <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Controller
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              id="prev"
                              label="Original Password"
                              name="prev"
                              type={showPassword === true ? "text" : "password"}
                            />
                          )}
                          name="prev"
                          control={control}
                        />
                        <div style={{ color: "red" }}>{errors.prev?.message}</div>
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              id="latest"
                              label="New Password"
                              name="latest"
                              type={showPassword === true ? "text" : "password"}
                            />
                          )}
                          name="latest"
                          control={control}
                        />
                        <div style={{ color: "red" }}>{errors.latest?.message}</div>
                      </Grid>
                    </Grid>
                    <FormControlLabel
                      control={<Checkbox color="primary" onClick={showPasswords} />}
                      label="Show Password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2}}
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
    </div>
  )
}

export default ChangePassword