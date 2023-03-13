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

interface IVehicleModal {
    closeModalHndlr: any;
    showSnackbarCallback: any;
}
const top100Films = [
    { test: 'The Shawshank Redemption', yeartest: 1994 },
    { test: 'The Godfather', yeartest: 1972 },
];

const CustomPaper = (props: any) => {
    console.log(props);
    const refData = useRef<any>(null);
    useEffect(() => {
        console.log({ refData });
        if (refData.current) {
            console.log("REf data mouted", refData);
            console.log(refData?.current?.height);
        }
    }, [refData.current]);
    return <div ref={refData} elevation={8} {...props}></div>;
};
const VehicleHaltModal = React.forwardRef((props: IVehicleModal, ref) => {
    const [vehicleReportState, setVehicleReportState] = useState({
        vehicle_id: "0",
        since: "",
        until: "",
        emails: "",
    });
    const classes = useStyles();
    const { data: vehicleList, isLoading } = useQuery(
        ["vehicle"],
        () => getVehicles(),
        { refetchOnWindowFocus: false }
    );

    async function getVehicles() {
        let getApiUrl = `${transport}/vehicles/?page=1&page_size=500`;
        const response = await client.get(getApiUrl);
        return response.data;
    }

    function onChangeHndlr(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setVehicleReportState(prevState => ({ ...prevState, [name]: value }));
    }

    const vehicleReportMutation = useMutation(generateVehicleReportApiCall, {
        onSuccess: (responseData) => {
            const { data } = responseData || {};
            props.showSnackbarCallback("success", data || "Vehicle report sended successfully.", true);
        },
        onError: () => {
            props.showSnackbarCallback("error", "Error while sending vehicle report.", false);
        }
    });
    async function generateVehicleReportApiCall() {
        const { since, until, vehicle_id, emails } = vehicleReportState,
            isoSinceDate = until ? new Date(since).toISOString() : "",
            untilDate = new Date(until);
        untilDate.setDate(untilDate.getDate() + 1);
        const isoUntilDate = until ? untilDate.toISOString() : "",
            params: any = {
                since: isoSinceDate, until: isoUntilDate, vehicle_id, emails
            }
        const response = await client.get(`${monitor}/trips/download-haults`, { params });
        return response.data;
    }
    const { mutate: mutateDrivingHistory, isLoading: generateReportLoading } = vehicleReportMutation;

    function generateReportHndlr() {
        mutateDrivingHistory();
    }

    function onSelectVehicleHndlr(event: any, selectedValue: any) {
        const { id: vehicle_id } = selectedValue || {};
        if (vehicle_id) {
            setVehicleReportState(prevState => ({ ...prevState, vehicle_id }));
        }
    }

    const { results = [] } = vehicleList || {};
    return (
        <Box sx={style}>
            <Typography
                id="modal-modal-title"
                className={classes.alertHead}
                variant="h6"
                component="h2"
            >
                Vehicle Halt Report
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
                    <Grid item xs={12} style={{ marginBottom: 16 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                        >
                            Vehicle
                        </Typography>
                        <Autocomplete
                            size="small"
                            id="vehicle_id"
                            options={results}
                            loading={isLoading}
                            onChange={onSelectVehicleHndlr}
                            getOptionLabel={(option) => option.vin}
                            placeholder="Select"
                            // onInputChange={autoCompleteHndlr}
                            fullWidth={true}
                            renderInput={(params) => <TextField name="vehicle_id" placeholder={"Search by vehicle"} {...params} />}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ marginBottom: 16 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                        >
                            Start Date
                        </Typography>
                        <TextField
                            id="since"
                            name="since"
                            type="date"
                            size="small"
                            sx={{ width: "100%" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={vehicleReportState.since}
                            onChange={onChangeHndlr}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ marginBottom: 16 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                        >
                            End Date
                        </Typography>
                        <TextField
                            id="until"
                            name="until"
                            type="date"
                            sx={{ width: "100%" }}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={vehicleReportState.until}
                            onChange={onChangeHndlr}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: 16 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                        >
                            Email Ids
                        </Typography>
                        <TextField
                            id="emails"
                            name="emails"
                            type="text"
                            sx={{ width: "100%" }}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={vehicleReportState.emails}
                            onChange={onChangeHndlr}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 8 }}>
                        <Box style={{ display: "flex", justifyContent: "end" }}>
                            <Button className="cBtn" onClick={props.closeModalHndlr}>
                                Cancel
                            </Button>
                            <Button
                                className="gbtn"
                                variant="contained"
                                style={{ color: COLORS.WHITE }}
                                onClick={generateReportHndlr}
                            >
                                Generate Report
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box >
    )
})

export default VehicleHaltModal;

