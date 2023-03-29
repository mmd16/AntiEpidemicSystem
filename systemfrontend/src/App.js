import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CalendarPicker from "./component/calendarPicker/CalendarPicker";
import CreateEvent from "./component/event/CreateEvent";
import FaceMask from "./component/faceMask/FaceMask";
import PoclForm from "./component/form/PoclForm";
import RatForm from "./component/form/RatForm";
import SlForm from "./component/form/SlForm";
import Home from "./component/home/Home";
import Info from "./component/info/Info";
import PoclFormList from "./component/list/PoclFormList";
import RatFormList from "./component/list/RatFormList";
import SlFormList from "./component/list/SlFormList";
import UserList from "./component/list/UserList";
import Login from "./component/login/Login";
import Signup from "./component/login/Signup";
import ChangePassword from "./component/setting/ChangePassword";
import ChangeProfile from "./component/setting/ChangeProfile";
import EditProfile from "./component/setting/EditProfile";
import Setting from "./component/setting/Setting";
import ProtectedRoutes from "./ProtectedRoutes";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<Signup />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<Home />} />
        <Route path="forms">
          <Route path="rat" element={<RatFormList />} />
          <Route path="pocl" element={<PoclFormList />} />
          <Route path="sl" element={<SlFormList />} />
          <Route path="createRatForm" element={<RatForm />} />
          <Route path="createPoclForm" element={<PoclForm />} />
          <Route path="createSlForm" element={<SlForm />} />
        </Route>
        <Route path="tools">
          <Route path="calendar" element={<CalendarPicker />} />
          <Route path="createEvent" element={<CreateEvent />} />
          <Route path="faceMask" element={<FaceMask />} />
        </Route>
        <Route path="info">
          <Route path="general" element={<Info />} />
        </Route>
        <Route path="admin">
          <Route path="userList" element={<UserList />} />
        </Route>
        <Route path="user">
          <Route path="settings" element={<Setting />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="changeProfile" element={<ChangeProfile />} />
          <Route path="changePassword" element={<ChangePassword />} />
        </Route>
      </Route>
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </div>
)

export default App;