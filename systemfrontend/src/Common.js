import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { autoSignOutNotification } from './component/toast/Toast.jsx';
import axios from 'axios';

const Context = createContext()

export const Common = ({ children }) => {
    let timer;
    let timer2;

    const [ratState, setRatState] = useState(0);
    const [poclState, setPoclState] = useState(0);
    const [slState, setSlState] = useState(0);
    const [userState, setUserState] = useState(0);
    const [calState, setCalState] = useState(0);
    const [groupState, setGroupState] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("isLogin") !== null) {
            handleLogoutTimer()
        }
    }, [sessionStorage.getItem("isLogin")])


    const resetTimer1 = () => {
        if (timer) clearTimeout(timer);
    };

    const resetTimer2 = () => {
        if (timer2) clearTimeout(timer2);
    };

    const handleLogoutTimer = () => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }
        timer = setTimeout(() => {
            sessionStorage.clear()
            resetTimer1();
            axios.get('http://localhost:8080/api/auth/logout', config)
                .then(res => {
                    console.log(res)
                    navigate("/")
                })
                .catch(err => {
                    console.log(err)
                })
        }, parseInt(sessionStorage.getItem("loginExpired"), 10) - new Date().getTime());

        timer2 = setTimeout(() => {
            resetTimer2();
            autoSignOutNotification()
        }, parseInt(sessionStorage.getItem("remindTime"), 10) - new Date().getTime());
    };


    return (
        <Context.Provider value={{ ratState, setRatState, poclState, setPoclState, slState, setSlState, userState, setUserState, calState, setCalState, resetTimer1, resetTimer2, groupState, setGroupState }}>
            {children}
        </Context.Provider>
    )
}

export const CommonContext = () => useContext(Context);

export const logout = () => {
    sessionStorage.clear()
}