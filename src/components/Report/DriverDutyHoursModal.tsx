import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./style";
import TextInput from "components/commonComponent/TextInput";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import COLORS from "constants/colors";
import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
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

interface IDriverModal {
    closeModalHndlr: any;
    showSnackbarCallback: any;
}

const DriverDutyHoursModal = React.forwardRef((props: IDriverModal, ref) => {
    const [driverReportState, setDriverReportState] = useState({
        driver_id: "0",
        startDate: "",
        endDate: "",
        emails: "",
    });
    const classes = useStyles();
    const { data: driverList, isLoading } = useQuery(
        ["drivers"],
        () => getDrivers(),
        { refetchOnWindowFocus: false }
    );

    async function getDrivers() {
        let getApiUrl = `${transport}/drivers/`;
        const response = await client.get(getApiUrl);
        return response.data;
    }

    function closeModalHndlr() {

    }
    function onChangeHndlr(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setDriverReportState(prevState => ({ ...prevState, [name]: value }));
    }

    const drivingHistoryMutation = useMutation(generateDriverReportApiCall, {
        onSuccess: (responseData) => {
            const { data } = responseData || {};
            props.showSnackbarCallback("success", data || "Driver report sended successfully.", true);
        },
        onError: () => {
            props.showSnackbarCallback("error", "Error while sending driver report.", false);
        }
    });
    async function generateDriverReportApiCall() {
        const { startDate, endDate, driver_id, emails } = driverReportState,
            isoUntilDate = endDate ? new Date(endDate).toISOString() : "",
            isoSinceDate = startDate ? new Date(startDate).toISOString() : "",
            params: any = {
                startDate: isoSinceDate, endDate: isoUntilDate, driver_id, emails
            }
        const response = await client.get(`${monitor}/trips/download`, { params });
        return response.data;
    }
    const { mutate: mutateDrivingHistory, isLoading: generateReportLoading } = drivingHistoryMutation;

    function generateReportHndlr() {
        mutateDrivingHistory();
    }

    async function downloadBtnHndlr() {
        try {
            const { driver_id, startDate, endDate } = driverReportState;
            const driverCsvData = await client.get(`${transport}/drivers/${driver_id}/history-download/`);
            const currentDate = new Date().toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(driverCsvData.data);
            hiddenElement.target = '_blank';
            hiddenElement.download = `driver-history-${currentDate}.csv`;
            hiddenElement.click();
            props.showSnackbarCallback("success", "Driver duty hours report downloaded successfully.", true);
        } catch (e) {
            props.showSnackbarCallback("error", "Error while downloading report.", false);
        }
    }

    return (
        <Box sx={style}>
            <Typography
                id="modal-modal-title"
                className={classes.alertHead}
                variant="h6"
                component="h2"
            >
                Driver Duty Hours Report
                <i onClick={props.closeModalHndlr}>
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
                {generateReportLoading && <Box className={classes.loadingDiv}>
                    <CircularProgress />
                </Box>}
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} style={{ marginBottom: 24 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 10, marginRight: 2 }}
                        >
                            Driver
                        </Typography>
                        <TextField
                            sx={{ width: "100%" }}
                            select
                            id="driver_id"
                            name="driver_id"
                            value={driverReportState.driver_id}
                            onChange={onChangeHndlr}
                            size="small"
                        >
                            <MenuItem selected={true} style={{ fontSize: 14 }} value="0">
                                Select
                            </MenuItem>
                            {driverList?.results?.map((item: any, index: any) => {
                                return (<MenuItem key={item.id} style={{ fontSize: 14 }} value={item.id}>
                                    {item.name}
                                </MenuItem>)
                            })}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} style={{ marginBottom: 24 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 10, marginRight: 2 }}
                        >
                            Start Date
                        </Typography>
                        <TextField
                            id="startDate"
                            name="startDate"
                            type="date"
                            size="small"
                            sx={{ width: "100%" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={driverReportState.startDate}
                            onChange={onChangeHndlr}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ marginBottom: 24 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 10, marginRight: 2 }}
                        >
                            End Date
                        </Typography>
                        <TextField
                            id="endDate"
                            name="endDate"
                            type="date"
                            sx={{ width: "100%" }}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={driverReportState.endDate}
                            onChange={onChangeHndlr}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ mt: 1.5 }} style={{ display: "flex", justifyContent: "end" }}>
                            <Button className="cBtn" onClick={props.closeModalHndlr}>
                                Cancel
                            </Button>
                            <Button
                                className="gbtn"
                                variant="contained"
                                style={{ color: COLORS.WHITE }}
                                onClick={downloadBtnHndlr}
                            >
                                Download Now
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box >
    )
})

export default DriverDutyHoursModal;

