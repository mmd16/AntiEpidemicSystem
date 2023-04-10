import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonContext } from '../../Common';
import './Navbar.scss';

const Navbar = () => {
  const { resetTimer1, resetTimer2 } = CommonContext()
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  }
  const logout = () => {
    sessionStorage.clear()
    resetTimer1()
    resetTimer2()
    axios.get('http://localhost:8080/api/auth/logout', config)
      .then(res => {
        console.log(res)
        navigate("/")
      })
      .catch(err => {
        console.log(err)
      })
  }

  const setting = () => {
    navigate("/user/settings")
  }

  const changePassword = () => {
    navigate("/user/changePassword")
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}><Avatar /></Avatar>
            </IconButton>
          </Tooltip>
          <Box sx={{ ml: "10px", mr: "10px", fontSize: 15, fontWeight: 600, color: "#888" }}> {sessionStorage.getItem("username")} </Box >
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => { handleClose(); setting() }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Account Overview
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); changePassword() }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); logout() }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Navbar