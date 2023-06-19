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
    borderRadius: "8px"
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

const TripFilterModal = (props: ITripFilterModal) => {
    const [tripFilterModalState, setTripFilterModalState] = useState({
        vehicle_id: "",
        vehicle_details: null,
        driver_id: "",
        driver_details: null,
        since: "",
        until: ""
    });
    useEffect(() => {
        const { isOpenFilterModal, appliedFilterDetails } = props;
        if (isOpenFilterModal && appliedFilterDetails) {
            setTripFilterModalState(appliedFilterDetails);
        }
    }, [props.isOpenFilterModal, props.appliedFilterDetails]);

    const classes = useStyles();
    const { data: vehicleList, isLoading: vehicleListLoading } = useQuery(
        ["vehicle"],
        () => getVehicles(),
        { refetchOnWindowFocus: false }
    );

    async function getVehicles() {
        let getApiUrl = `${transport}/vehicles/?page=1&page_size=500`;
        const response = await client.get(getApiUrl);
        return response.data;
    }

    const { data: driverList, isLoading: driverListLoading } = useQuery(
        ["drivers"],
        () => getDrivers(),
        { refetchOnWindowFocus: false }
    );

    async function getDrivers() {
        let getApiUrl = `${transport}/drivers/?page=1&page_size=500`;
        const response = await client.get(getApiUrl);
        return response.data;
    }


    function onChangeHndlr(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setTripFilterModalState(prevState => ({ ...prevState, [name]: value }));
    }

    function onSelectVehicleHndlr(event: any, selectedValue: any) {
        const { id: vehicle_id } = selectedValue || {};
        if (vehicle_id) {
            setTripFilterModalState(prevState => ({
                ...prevState, vehicle_id,
                vehicle_details: selectedValue
            }));
        }
    }

    function onSelectDriverHandler(event: any, selectedValue: any) {
        const { id: driver_id } = selectedValue || {};
        if (driver_id) {
            setTripFilterModalState(prevState => ({
                ...prevState, driver_id,
                driver_details: selectedValue
            }));
        }
    }

    function resetFilterHndlr() {
        setTripFilterModalState((prevState: any) => ({
            ...prevState,
            vehicle_id: "",
            vehicle_details: null,
            driver_id: "",
            driver_details: null,
            since: "",
            until: ""
        }))
        props.applyFilterCallback(null);
    }
    function applyFilterHndlr() {
        props.applyFilterCallback(tripFilterModalState);
    }

    return (
        <Modal
            open={props.isOpenFilterModal}
            onClose={props.closeFilterModalHndlr}
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
                    Trip Filters
                    <i onClick={props.closeFilterModalHndlr}>
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
                    {props.applyingFilterProgress && <Box className={classes.loadingDiv}>
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
                                options={vehicleList?.results || []}
                                loading={vehicleListLoading}
                                value={tripFilterModalState.vehicle_details}
                                onChange={onSelectVehicleHndlr}
                                getOptionLabel={(option:any) => option?.vin}
                                placeholder="Select"
                                // onInputChange={autoCompleteHndlr}
                                fullWidth={true}
                                renderInput={(params) => <TextField name="vehicle_id" placeholder={"Search by vehicle"} {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 16 }}>
                            <Typography
                                fontSize={16}
                                style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                            >
                                Driver
                            </Typography>
                            <Autocomplete
                                size="small"
                                id="driver_id"
                                options={driverList?.results || []}
                                loading={driverListLoading}
                                value={tripFilterModalState.driver_details}
                                onChange={onSelectDriverHandler}
                                getOptionLabel={(option:any) => option?.name}
                                fullWidth={true}
                                renderOption={(props, option:any) => (
                                    <Box component="li" {...props} key={option.id}>
                                        {option.name} - {option.vin}
                                    </Box>
                                )}
                                renderInput={(params) => <TextField name="driver_id" placeholder={"Search by driver name"} {...params} />}
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
                                type="datetime-local"
                                size="small"
                                sx={{ width: "100%" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={tripFilterModalState.since}
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
                                type="datetime-local"
                                sx={{ width: "100%" }}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={tripFilterModalState.until}
                                onChange={onChangeHndlr}
                            />
                        </Grid>
                        <Grid item style={{ marginTop: 12 }} xs={12}>
                            <Box style={{ display: "flex", justifyContent: "end" }}>
                                <Button color="secondary" className="cBtn" onClick={resetFilterHndlr}>
                                    Reset Filter And Close
                                </Button>
                                <Button
                                    className="gbtn"
                                    variant="contained"
                                    style={{ color: COLORS.WHITE }}
                                    onClick={applyFilterHndlr}
                                >
                                    Apply Filter
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Box >
        </Modal>
    )
}

export default TripFilterModal;

