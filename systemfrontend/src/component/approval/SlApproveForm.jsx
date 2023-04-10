import axios from 'axios';
import React, { useState } from 'react';
import { CommonContext } from '../../Common';
import { approveSuccess, cancelSuccess, rejectSuccess } from '../toast/Toast.jsx';
import './Preview.scss';

const SlApproveForm = (props) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }
    const [sendComplete, setComplete] = useState(true);
    const { setSlState } = CommonContext()
    const { selectedRow, setOpenPopup } = props;
    const approveRequest = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/form/approveForm`, formData(selectedRow), config)
            .then(res => {
                console.log(res)
                setSlState(prev => prev + 1)
                setOpenPopup(false)
                approveSuccess()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const rejectRequest = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/form/rejectForm`, formData(selectedRow), config)
            .then(res => {
                console.log(res)
                setSlState(prev => prev + 1)
                setOpenPopup(false)
                rejectSuccess()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const cancelRequest = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/form/cancelForm`, formCancelData(selectedRow.id, selectedRow.formCode), config)
            .then(res => {
                console.log(res)
                setSlState(prev => prev + 1)
                setOpenPopup(false)
                cancelSuccess()
            })
            .catch(err => {
                console.log(err)
            })

        console.log('The link was clicked.');
    }

    function formData(selectedRow) {
        var data = new FormData();
        data.append('id', selectedRow.id);
        data.append('formCode', selectedRow.formCode);
        data.append('username', sessionStorage.getItem("username"));
        return data
    }

    function formCancelData(id, formCode) {
        var data = new FormData();
        data.append('id', id);
        data.append('formCode', formCode);
        return data
    }
    return (
        <div>
            <form>
                <div className="formInput">
                    <h3>{formName(selectedRow.submittedByUsername)}</h3>
                    <h3>{formDate(selectedRow.submittedTime)}</h3>
                </div>

                <div className="formInput">
                    <h1>Request Leave due to</h1>

                    <label htmlFor="field-confirmed" > <input type="radio" id="field-confirmed" name="leaveReason" value="confirmed" checked={selectedRow.leaveReason === "confirmed"} disabled /> Confirmed case for COVID-19</label>

                    <label htmlFor="field-suspected" > <input type="radio" id="field-suspected" name="leaveReason" value="suspected" checked={selectedRow.leaveReason === "suspected"} disabled /> Suspected case for COVID-19</label>

                    <label htmlFor="field-close" > <input type="radio" id="field-close" name="leaveReason" value="close" checked={selectedRow.leaveReason === "close"} disabled /> Close contact case for COVID-19</label>

                </div>

                <div className="formInput">
                    <h1>Please provide the Supporting Document</h1>
                    <img
                        style={{ width: "auto", height: 250 }}
                        src={`${process.env.PUBLIC_URL}/${selectedRow.photos}`}
                        alt="new"
                    />
                </div>

                <div className="formInput">
                    <h1>Please provide your Leave Starting Date</h1>
                    <input
                        type="date"
                        value={getDate(selectedRow.leaveStartDate)}
                        disabled
                    />
                </div>
                <div className="formInput">
                    <h1>Please provide your Leave Ending Date</h1>
                    <input
                        type="date"
                        value={getDate(selectedRow.leaveEndDate)}
                        disabled
                    />
                </div>

            </form>
            <div className="action">
                {sessionStorage.getItem("role") === "ADMIN" && selectedRow.formStatus === 'PENDING' && selectedRow.submittedByUsername !== sessionStorage.getItem("username") ? <label><button onClick={approveRequest}>Approve</button></label> : <label><button disabled>Approve</button></label>}
                {sessionStorage.getItem("role") === "ADMIN" && selectedRow.formStatus === 'PENDING' && selectedRow.submittedByUsername !== sessionStorage.getItem("username") ? <label><button onClick={rejectRequest}>Reject</button></label> : <label><button disabled>Reject</button></label>}
                {selectedRow.submittedByUsername === sessionStorage.getItem("username") && selectedRow.formStatus === 'PENDING' ?
                    <label><button onClick={cancelRequest}>Cancel</button></label> : <label><button disabled>Cancel</button></label>}
            </div>
        </div>

    )
}
function formName(username) {
    return `Submitted By User: ${username}`
}

function formDate(date) {
    return `Submitted at: ${date}`
}

function getDate(dateStr) {
    const [day, month, year] = dateStr.split('-');
    const date = `${year}-${month}-${day}`;
    return date
}
export default SlApproveForm