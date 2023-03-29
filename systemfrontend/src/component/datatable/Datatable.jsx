import { DataGrid } from '@mui/x-data-grid';
import React, { useRef, useState } from 'react';
import './Datatable.scss';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PoclApproveForm from '../approval/PoclApproveForm';
import RatApproveForm from '../approval/RatApproveForm';
import SlApproveForm from '../approval/SlApproveForm';
import Popup from '../popup/Popup';
import EditProfile from '../setting/EditProfile';

const Datatable = ({ fcolumns, fdata, routlink, title, formCode, isButton, isUserList }) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [openUserPopup, setOpenUserPopup] = useState(false);
    const test = useRef({})
    const onRowsSelectionHandler = (ids) => {
        const selectedRow = (ids.map((id) => fdata.find((row) => row.id === id)));
        test.current = selectedRow;
    };

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 130, renderCell: () => {
                return (
                    <div className="cellAction">
                        <Button onClick={() => { setOpenPopup(true) }}><div className="viewButton">View</div></Button>
                    </div>
                )
            }
        }
    ];


    const userActionColumn = [
        {
            field: "action", headerName: "Action", width: 130, renderCell: () => {
                return (
                    <div className="cellAction">
                        <Button onClick={() => { setOpenUserPopup(true) }}><div className="viewButton">View</div></Button>
                    </div>
                )
            }
        }
    ];

    return (
        <div className="datatable">
            <div className="datatableTitle">
                {title}
                {isButton === true
                    ?
                    <Link to={routlink} style={{ textDecoration: "none" }} className="link">
                        Add New
                    </Link>
                    :
                    <>
                    </>
                }
            </div>
            <DataGrid
                rows={fdata}
                columns={isUserList === true ? fcolumns.concat(userActionColumn) : isButton === true ? fcolumns.concat(actionColumn): fcolumns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection={false}
                onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title={title}>
                {formCode === "RAT" ? <RatApproveForm selectedRow={test.current[0]} setOpenPopup={setOpenPopup} /> :
                    formCode === "POCL" ? <PoclApproveForm selectedRow={test.current[0]} setOpenPopup={setOpenPopup} /> :
                        formCode === "SL" ? <SlApproveForm selectedRow={test.current[0]} setOpenPopup={setOpenPopup} /> : <></>}
            </Popup>

            <Popup openPopup={openUserPopup} setOpenPopup={setOpenUserPopup} title={title}>
                <EditProfile selectedRow={test.current[0]} setOpenPopup={setOpenUserPopup} />
            </Popup>
        </div>
    )

}

export default Datatable