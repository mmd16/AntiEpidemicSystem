import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import './popup.scss';

const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup } = props;
    return (
        // <Dialog open={openPopup} maxWidth="md" className="dialogWrapper">
        <Dialog open={openPopup} maxWidth="md"
            sx={{
                "& .MuiDialog-container": {
                    justifyContent: "center",
                    alignItems: "flex-start",
                }
            }}
            PaperProps={{
                sx: {
                    m: 0,
                    top: 50,
                    left: 10
                }
            }}
        >
            <div className="qqq">
                <DialogTitle className="dialogTitle">
                    {title}
                </DialogTitle>
                <button className='buttonStyle' onClick={() => setOpenPopup(false)}><CloseIcon /></button>
            </div>
            <DialogContent dividers>
                {children}
            </DialogContent>

        </Dialog>
    )
}

export default Popup