import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../store/store'
import {setAppErrorAC} from '../store/app-reducer'
import {Snackbar} from '@material-ui/core'
import MuiAlert, {AlertProps} from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error} 😠
            </Alert>
        </Snackbar>
    );
}
