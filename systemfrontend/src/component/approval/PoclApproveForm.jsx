import axios from 'axios';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CommonContext } from '../../Common';
import { approveSuccess, cancelSuccess, rejectSuccess } from '../toast/Toast.jsx';
import './Preview.scss';

const PoclApproveForm = (props) => {
    const { setPoclState } = CommonContext()
    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    }
    const { selectedRow, setOpenPopup } = props;
    const approveRequest = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/form/approveForm`, formData(selectedRow), config)
            .then(res => {
                console.log(res)
                setPoclState(prev => prev + 1)
                setOpenPopup(false)
                approveSuccess()
            })
            .catch(err => {
                console.log(err)
            })

        console.log('The link was clicked.');
    }

    const rejectRequest = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/form/rejectForm`, formData(selectedRow), config)
            .then(res => {
                console.log(res)
                setPoclState(prev => prev + 1)
                setOpenPopup(false)
                rejectSuccess()
            })
            .catch(err => {
                console.log(err)
            })

        console.log('The link was clicked.');

    }

    const cancelRequest = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/form/cancelForm`, formCancelData(selectedRow.id, selectedRow.formCode), config)
            .then(res => {
                console.log(res)
                setPoclState(prev => prev + 1)
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
                    <h1>Do you obtained a Preliminary Positive Result from PCR Test?</h1>
                    <label htmlFor="field-positive" > <input type="radio" id="field-PCRYes" name="pcrResult" value="Positive" checked={selectedRow.pcrResult === "Positive"} disabled />Yes</label>
                    <label htmlFor="field-negative" > <input type="radio" id="field-PCRNo" name="pcrResult" value="Negative" checked={selectedRow.pcrResult === "Negative"} disabled />No</label>
                </div>

                <div className="formInput">
                    <h1>Have you contacted with people that were infected, suspected or diagnosed with COVID-19?</h1>
                    <label htmlFor="field-positive" > <input type="radio" id="field-CloseYes" name="closeResult" value="Positive" checked={selectedRow.closeResult === "Positive"} disabled />Yes</label>
                    <label htmlFor="field-negative" > <input type="radio" id="field-CloseNo" name="closeResult" value="Negative" checked={selectedRow.closeResult === "Negative"} disabled />No</label>
                </div>

                <div className="formInput">
                    <h1>Please input the date that you are tested positive or the date that you contact with people that were tested positive</h1>
                    <input
                        type="date"
                        value={getDate(selectedRow.caseDate)}
                        disabled
                    />
                </div>

                <div className="formInput">
                    <h1>Please provide your Supporting Document</h1>
                    <img
                        style={{ width: "auto", height: 250 }}
                        src={`${process.env.PUBLIC_URL}/${selectedRow.photos}`}
                        alt="new"
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

export default PoclApproveForm