import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import './popup.scss';


const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup, maxWidth, fullWidth} = props;
    return (
        <Dialog open={openPopup} 
            maxWidth= {maxWidth} fullWidth={fullWidth}
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