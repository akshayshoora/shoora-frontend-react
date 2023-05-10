import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./style";
import TextInput from "components/commonComponent/TextInput";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import COLORS from "constants/colors";
import React, { useEffect, useRef, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from '@mui/material/Autocomplete';
import Modal from "@mui/material/Modal";

// API Call
import client from "serverCommunication/client";
import { useMutation, useQuery } from "react-query";
import { auth, monitor, transport } from "constants/RouteMiddlePath";


const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
};

const tripStatus = [
    {
        id: "progress",
        name: "Progress"
    }, {
        id: "completed",
        name: "Completed"
    }
]

interface ITripFilterModal {
    isOpenFilterModal: any;
    closeFilterModalHndlr: any;
    applyingFilterProgress: any;
    appliedFilterDetails: any;
    applyFilterCallback: any;
}

const EnterCodeModal = (props: any) => {
    const classes = useStyles();
    const [userCodeState, setUserCodeState] = useState("");

    const unlockDeviceWithCodeMutation = useMutation(unlockDeviceWithCodeApiCall, {
        onSuccess: (data: any) => {
            //Hanlder DEvice Error
            props.showSnackbarCallback("success", "Device unlocked successfully.", true, data?.passcode, props.deviceInfo);
        },
        onError: () => {
            props.showSnackbarCallback("error", "Error while unlocking device.", false, undefined, props.deviceInfo);
        }
    });
    async function unlockDeviceWithCodeApiCall(code: any) {
        const { id } = props.deviceInfo || {};
        if (id) {
            const codeArray = code.split("-");
            const payload = {
                day: codeArray[0],
                month: codeArray[1],
                hr: codeArray[2]
            };
            const response = await client.post(`${transport}/locks/${id}/passcode/`, payload);
            return response.data;
        }
    }
    const { mutate: mutateUnlockDeviceWithCode, isLoading: inProgressDeviceUnlock } = unlockDeviceWithCodeMutation;

    function submitHanlder() {
        mutateUnlockDeviceWithCode(userCodeState);
    }

    function onChangeCodeHndlr(event: any) {
        const { value } = event.target;
        let updatedValue = value;
        if (updatedValue.length === 2 || updatedValue.length === 5) {
            updatedValue = updatedValue + "-";
        }
        setUserCodeState(updatedValue);
    }

    return (
        <Modal
            open={props.isOpenFilterModal}
            onClose={props.closeHndlr}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    className={classes.alertHead}
                    variant="h6"
                    component="h2"
                >
                    Enter Code To Unlock
                    <i onClick={props.closeHndlr}>
                        <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g opacity="0.9" filter="url(#filter0_d_2762_100820)">
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="#fff"
                                    strokeLinecap="square"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_d_2762_100820"
                                    x="-4"
                                    y="-2"
                                    width="32"
                                    height="32"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dy="2" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_2762_100820"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_2762_100820"
                                        result="shape"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </i>
                </Typography>
                <Box className={classes.reportContent}>
                    {inProgressDeviceUnlock && <Box className={classes.loadingDiv}>
                        <CircularProgress />
                    </Box>}
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} style={{ marginBottom: 16 }}>

                            <Typography
                                fontSize={16}
                                style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                            >
                                Enter Code
                            </Typography>
                            <TextField
                                id="unlock-code"
                                name=""
                                type={"text"}
                                sx={{ width: "100%" }}
                                size="small"
                                helperText="Code format eg. 22-22-22"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{ maxLength: 8 }}
                                value={userCodeState}
                                onChange={onChangeCodeHndlr}
                            />
                        </Grid>
                        <Grid item style={{ marginTop: 0 }} xs={12}>
                            <Box style={{ display: "flex", justifyContent: "end" }}>
                                <Button
                                    className="gbtn"
                                    variant="contained"
                                    style={{ color: COLORS.WHITE }}
                                    onClick={submitHanlder}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Box >
        </Modal>
    )
}

export default EnterCodeModal;

