import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import school from '../../image/school.jpg';
import { resetPasswordEmail } from '../toast/Toast';

const theme = createTheme();

const ForgetPassword = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().min(1, 'This field is required'),
  })

  const { handleSubmit, formState, control } = useForm({ resolver: yupResolver(schema) })
  const { errors } = formState

  const onSubmit = (event, e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', event.username);
    axios.post(`http://localhost:8080/api/auth/forgetPassword`, data)
      .then(res => {
        console.log(res)
        resetPasswordEmail()
        navigate("/")
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* <CssBaseline /> */}
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${school})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 7,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forget Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: "400px", gap: "50px" }}>
              <Grid container spacing={2}>
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Link href="/" variant="body2">
                    Return to Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ForgetPassword