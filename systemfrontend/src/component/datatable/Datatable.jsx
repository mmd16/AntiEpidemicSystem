import { DataGrid } from '@mui/x-data-grid';
import React, { useRef, useState } from 'react';
import './Datatable.scss';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PoclApproveForm from '../approval/PoclApproveForm';
import RatApproveForm from '../approval/RatApproveForm';
import SlApproveForm from '../approval/SlApproveForm';
import CreateGroup from '../group/CreateGroup';
import JoinedList from '../group/JoinedList';
import MemberList from '../group/MemberList';
import NotJoinedList from '../group/NotJoinedList';
import Popup from '../popup/Popup';
import EditProfile from '../setting/EditProfile';

const Datatable = ({ fcolumns, fdata, routlink, title, formCode, isButton, isUserList, isGroupList, isCheckBox, isMemberList, selected}) => {
    const test = useRef({})
    const [openPopup, setOpenPopup] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUserPopup, setOpenUserPopup] = useState(false);
    const [openAddMemberPopup, setAddMemberPopup] = useState(false);
    const [openRemoveMemberPopup, setRemoveMemberPopup] = useState(false);
    const [openViewMemberPopup, setViewMemberPopup] = useState(false);
    const onRowsSelectionHandler = (ids) => {
        const selectedRow = (ids.map((id) => fdata.find((row) => row.id === id)));
        if (isMemberList) {
            selected.current = selectedRow;
            console.log(selected.current)
        }
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

    const groupColumn = [
        {
            field: "action", headerName: "Action", width: 500, renderCell: () => {
                return (
                    <div className="cellAction">
                        <Button onClick={() => { setAddMemberPopup(true) }}><div className="addButton">Add member</div></Button>
                        <Button onClick={() => { setRemoveMemberPopup(true) }}><div className="deleteButton">Remove member</div></Button>
                        <Button onClick={() => { setViewMemberPopup(true) }}><div className="viewButton">View member</div></Button>
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
                    : isGroupList === true ? <Button onClick={() => { setOpenCreate(true); console.log("clicked") }}><div className="viewButton">Create new Groups</div></Button> :
                        <>
                        </>
                }
            </div>
            <DataGrid
                rows={fdata}
                columns={isUserList === true ? fcolumns.concat(userActionColumn) : isButton === true ? fcolumns.concat(actionColumn) : isGroupList === true ? fcolumns.concat(groupColumn) : fcolumns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection={isCheckBox}
                onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title={title} maxWidth={"md"} fullWidth={false}>
                {formCode === "RAT" ? <RatApproveForm selectedRow={test.current[0]} setOpenPopup={setOpenPopup} /> :
                    formCode === "POCL" ? <PoclApproveForm selectedRow={test.current[0]} setOpenPopup={setOpenPopup} /> :
                        formCode === "SL" ? <SlApproveForm selectedRow={test.current[0]} setOpenPopup={setOpenPopup} /> : <></>}
            </Popup>

            <Popup openPopup={openUserPopup} setOpenPopup={setOpenUserPopup} title={title} maxWidth={"md"} fullWidth={false}>
                <EditProfile selectedRow={test.current[0]} setOpenPopup={setOpenUserPopup} />
            </Popup>

            <Popup openPopup={openCreate} setOpenPopup={setOpenCreate} title="Create Group" maxWidth={"md"} fullWidth={false}>
                <CreateGroup setOpenPopup={setOpenCreate} />
            </Popup>

            <Popup openPopup={openAddMemberPopup} setOpenPopup={setAddMemberPopup} title="Add Members" maxWidth={"xl"} fullWidth={true}>
                <NotJoinedList setOpenPopup={setAddMemberPopup} selectedRow={test.current[0]} />
            </Popup>

            <Popup openPopup={openRemoveMemberPopup} setOpenPopup={setRemoveMemberPopup} title="Remove Members" maxWidth={"xl"} fullWidth={true}>
                <JoinedList setOpenPopup={setRemoveMemberPopup} selectedRow={test.current[0]} />
            </Popup>

            <Popup openPopup={openViewMemberPopup} setOpenPopup={setViewMemberPopup} title="View Members" maxWidth={"xl"} fullWidth={true}>
                <MemberList setOpenPopup={setViewMemberPopup} selectedRow={test.current[0]} />
            </Popup>
        </div>
    )

}

export default Datatable