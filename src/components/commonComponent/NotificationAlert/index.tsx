import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import Alert from "@mui/material/Alert";
import CloseIcon from '@mui/icons-material/Close';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
}
function TransitionRight(props: TransitionProps) {
    return <Slide {...props} direction="right" />;
}


export default function NoificationAlert(props: any): any {
    const { notificationInfo, handleCloseNotificaiton } = props || {};
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);

    const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
        setTransition(() => Transition);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => handleCloseNotificaiton(), 100);
    };

    React.useEffect(() => {
        if (notificationInfo?.openNotification) {
            setTransition(() => TransitionLeft);
            setOpen(true);
        }
    }, [notificationInfo?.openNotification]);

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={20000}
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            // message="I love snacks"
            key={notificationInfo?.notificaitonId ? notificationInfo?.notificaitonId : ''}
        >
            <Box style={{
                backgroundColor: "rgb(253, 237, 237)", color: "rgb(95, 33, 32)",
                padding: "6px 25px 6px 16px", borderRadius: "8px",
                position: "relative",
                fontSize: "14px",
                maxWidth: "30%"
            }}>

                <CloseIcon onClick={handleClose} style={{
                    position: "absolute",
                    top: "4px", right: "2px",
                    cursor: "pointer"
                }} />
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Alarm Name:</span>
                    </Grid>
                    <Grid item xs={9}>
                        <span>{notificationInfo?.alertName}</span>
                    </Grid>

                    <Grid item xs={3}>
                        <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Driver Name:</span>
                    </Grid>
                    <Grid item xs={9}>
                        <span>{notificationInfo?.driverName}</span>
                    </Grid>
                    <Grid item xs={3}>
                        <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Vehicle:</span>
                    </Grid>
                    <Grid item xs={9}>
                        <span>{notificationInfo?.vehicle}</span>
                    </Grid>
                    <Grid item xs={3}>
                        <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Address:</span>
                    </Grid>
                    <Grid item xs={9}>
                        <span>{notificationInfo?.address}</span>
                    </Grid>

                </Grid>
                {/*  <Box sx={{ display: "flex" }}>
                    <span style={{ fontWeight: "bold", marginRight: "4px", whiteSpace: "nowrap" }}>Alarm Name:</span>
                    <span>{notificationInfo?.alertName}</span>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <span style={{ fontWeight: "bold", marginRight: "4px", whiteSpace: "nowrap" }}>Driver Name:</span>
                    <span>{notificationInfo?.driverName}</span>
                </Box> <Box sx={{ display: "flex" }}>
                    <span style={{ fontWeight: "bold", marginRight: "4px", whiteSpace: "nowrap" }}>Vehicle:</span>
                    <span>{notificationInfo?.vehicle}</span>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <span style={{ fontWeight: "bold", marginRight: "4px", whiteSpace: "nowrap" }}>Address:</span>
                    <span>{notificationInfo?.address}</span>
                </Box> */}

            </Box>
            {/* <Alert action={
                <CloseIcon onClick={handleClose} />
            } icon={false} severity="error" style={{ maxWidth: "40%" }}>
                <Box>
                    Tesing
                </Box>
                <Box>
                    Tesing
                </Box>
                <Box>
                    Tesing
                </Box>
            </Alert> */}
        </Snackbar>
    );
}