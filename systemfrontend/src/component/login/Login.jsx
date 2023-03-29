import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import school from '../../image/school.jpg';
import { signInFailed, signInMissingInput, signInSuccess } from '../toast/Toast.jsx';

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('username') === '' || data.get('password') === '') {
      signInMissingInput()
    }
    else {
      axios.post('http://localhost:8080/api/auth/authenticate', formData(data.get('username'), data.get('password')))
        .then(res => {
          console.log(res)
          setLoginData(res)
          navigate("/dashboard")
          signInSuccess()
        })
        .catch(err => {
          console.log(err)
          signInFailed()
        })
    }
  };
  
  const setLoginData = (res) =>{
    sessionStorage.setItem("loginExpired", new Date().getTime() + 7200000)
    sessionStorage.setItem("remindTime", new Date().getTime() + 6600000)
    sessionStorage.setItem("token", res.data.token)
    sessionStorage.setItem("isLogin", true)
    sessionStorage.setItem("user", JSON.stringify(res.data.user))
    sessionStorage.setItem("username", res.data.user.username)
    sessionStorage.setItem("className", res.data.user.className)
    sessionStorage.setItem("role", res.data.user.role)
  }

  const showPasswords = () => {
    if (showPassword === true) {
      setShowPassword(false)
    }
    else {
      setShowPassword(true)
    }
  }

  function formData(username, password) {
    const data = {
      username: username,
      password: password
    }
    return data
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
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
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: "400px", gap: "50px" }}>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="current-username"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword === true ? "text" : "password"}
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox color="primary" onClick={showPasswords} />}
                label="Show Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Login