import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { autoSignOutNotification } from './component/toast/Toast.jsx';

const Context = createContext()

export const Common = ({ children }) => {
    let timer;
    let timer2;

    const [ratState, setRatState] = useState(0);
    const [poclState, setPoclState] = useState(0);
    const [slState, setSlState] = useState(0);
    const [userState, setUserState] = useState(0);
    const [calState, setCalState] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("isLogin")!==null){
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
        timer = setTimeout(() => {
            resetTimer1();
            navigate("/")
            sessionStorage.clear()
        }, parseInt(sessionStorage.getItem("loginExpired"), 10) - new Date().getTime());

        timer2 = setTimeout(() => {
            resetTimer2();
            autoSignOutNotification()
        }, parseInt(sessionStorage.getItem("remindTime"), 10) - new Date().getTime());
    };


    return (
        <Context.Provider value={{ ratState, setRatState, poclState, setPoclState, slState, setSlState, userState, setUserState, calState, setCalState, resetTimer1, resetTimer2 }}>
            {children}
        </Context.Provider>
    )
}

export const CommonContext = () => useContext(Context);

export const logout = () => {
    sessionStorage.clear()
}