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
    // border: "1px solid #000",
    boxShadow: 24,
    zIndex: 200,
    borderRadius: "8px"
};

interface IGeofenceModal {
    open: boolean,
    closeModalHndlr: any;
    showSnackbarCallback?: any;
    isLoadingGeofenceData: any;
    applyFilterCallback: any;
    appliedFilterInfo: any;
}

const initalSelectedAddressDetails: any = {
    id: "",
    name: ""
}

export const GeofenceTripModal = React.forwardRef((props: IGeofenceModal, ref) => {
    const [geofenceBetweenTripState, setGeofenceBetweenTripState] = useState({
        startAddress: "",
        startAddressDetails: null,
        startDate: "",
        endDate: "",
        endAddress: "",
        endAddressDetails: null
    });
    const classes = useStyles();

    useEffect(() => {
        const { open, appliedFilterInfo } = props;
        if (open && appliedFilterInfo) {
            setGeofenceBetweenTripState(appliedFilterInfo);
        }
    }, [props.open, props.appliedFilterInfo]);


    const { data: loadGeofenceList, isLoading: isLoadGeofenceLoading } = useQuery(
        ["loadingGeofences"], () => getLoadGeofencesApiCall()
    );
    async function getLoadGeofencesApiCall() {
        let getApiUrl = `${transport}/geofences/?page=1&page_size=200&geofence_type=loading`;
        const response = await client.get(getApiUrl);
        return response.data;
    }

    const { data: unLoadGeofenceList, isLoading: isUnloadGeofenceLoading } = useQuery(
        ["unloadingGeofences"], () => getUnloadGeofencesApiCall()
    );
    async function getUnloadGeofencesApiCall() {
        let getApiUrl = `${transport}/geofences/?page=1&page_size=200&geofence_type=unloading`;
        const response = await client.get(getApiUrl);
        return response.data;
    }

    function onChangeAddressHndlr(event: React.ChangeEvent<HTMLInputElement>) {
        // const { name, value } = event.target;
        // const { id, address, name: geofenceName } = Array.isArray(geofenceList?.results) && geofenceList?.results?.find((item: any) => {
        //     return item?.id === value;
        // }) || {};
        // if (name === "startAddress") {
        // setGeofenceBetweenTripState((prevState: any) => ({
        //     ...prevState, [name]: value,
        //     startAddressDetails: { id, address, name: geofenceName }
        // }));
        // } else if (name === "endAddress") {
        //     setGeofenceBetweenTripState((prevState: any) => ({
        //         ...prevState, [name]: value,
        //         endAddressDetails: { id, address, name: geofenceName }
        //     }));
        // }
    }
    function onSelectStartGeofenceHandler(event: any, selectedValue: any) {
        const { id: startAddressId } = selectedValue || {};
        console.log(selectedValue);
        if (startAddressId) {
            setGeofenceBetweenTripState((prevState: any) => ({
                ...prevState, startAddress: startAddressId,
                startAddressDetails: selectedValue
            }));
        }
    }
    function onSelectEndGeofenceHandler(event: any, selectedValue: any) {
        const { id: endAddressId } = selectedValue || {};
        if (endAddressId) {
            setGeofenceBetweenTripState((prevState: any) => ({
                ...prevState, endAddress: endAddressId,
                endAddressDetails: selectedValue
            }));
        }
    }
    function onChangeDateHndlr(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        // console.log({ value });
        setGeofenceBetweenTripState(prevState => ({ ...prevState, [name]: value }));
    }

    function applyFilterHndlr() {
        props.applyFilterCallback(geofenceBetweenTripState);
    }

    function resetFilterHndlr() {
        setGeofenceBetweenTripState((prevState: any) => ({
            ...prevState, startAddress: "",
            startAddressDetails: null,
            startDate: "",
            endDate: "",
            endAddress: "",
            endAddressDetails: null
        }))
        props.applyFilterCallback(null);
    }

    return (
        <Box sx={style}>
            <Typography
                id="modal-modal-title"
                className={classes.alertHead}
                variant="h6"
                component="h2"
            >
                Filter
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
                {!!props.isLoadingGeofenceData && <Box className={classes.loadingDiv}>
                    <CircularProgress />
                </Box>}
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} style={{ marginBottom: 16 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                        >
                            Start Address
                        </Typography>
                        <Autocomplete
                            size="small"
                            id="startAddress"
                            options={loadGeofenceList?.results || []}
                            loading={isLoadGeofenceLoading}
                            value={geofenceBetweenTripState.startAddressDetails}
                            onChange={onSelectStartGeofenceHandler}
                            getOptionLabel={(option: any) => option.name}
                            placeholder="Select"
                            // onInputChange={autoCompleteHndlr}
                            fullWidth={true}
                            renderInput={(params) => <TextField name="startAddress" placeholder={"Search..."} {...params} />}
                        />
                        {/* <TextField
                            sx={{ width: "100%" }}
                            select
                            id="startAddress"
                            name="startAddress"
                            value={geofenceBetweenTripState.startAddress}
                            onChange={onChangeAddressHndlr}
                            size="small"
                        >
                            <MenuItem selected={true} style={{ fontSize: 14 }} value="0">
                                Select
                            </MenuItem>
                            {geofenceList?.results?.map((item: any, index: any) => {
                                return (<MenuItem key={item.id} style={{ fontSize: 14 }} value={item.id}>
                                    {item.name}
                                </MenuItem>)
                            })}
                        </TextField> */}
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: 16 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                        >
                            End Address
                        </Typography>
                        {/* <TextField
                            sx={{ width: "100%" }}
                            select
                            id="endAddress"
                            name="endAddress"
                            value={geofenceBetweenTripState.endAddress}
                            onChange={onChangeAddressHndlr}
                            size="small"
                        >
                            <MenuItem selected={true} style={{ fontSize: 14 }} value="0">
                                Select
                            </MenuItem>
                            {geofenceList?.results?.map((item: any, index: any) => {
                                return (<MenuItem key={item.id} style={{ fontSize: 14 }} value={item.id}>
                                    {item.name}
                                </MenuItem>)
                            })}
                        </TextField> */}
                        <Autocomplete
                            size="small"
                            id="endAddress"
                            options={unLoadGeofenceList?.results || []}
                            loading={isUnloadGeofenceLoading}
                            value={geofenceBetweenTripState.endAddressDetails}
                            onChange={onSelectEndGeofenceHandler}
                            getOptionLabel={(option: any) => option.name}
                            placeholder="Select"
                            // onInputChange={autoCompleteHndlr}
                            fullWidth={true}
                            renderInput={(params) => <TextField name="endAddress" placeholder={"Search..."} {...params} />}
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
                            id="startDate"
                            name="startDate"
                            type="datetime-local"
                            size="small"
                            sx={{ width: "100%" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={geofenceBetweenTripState.startDate}
                            onChange={onChangeDateHndlr}
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
                            id="endDate"
                            name="endDate"
                            type="datetime-local"
                            sx={{ width: "100%" }}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={geofenceBetweenTripState.endDate}
                            onChange={onChangeDateHndlr}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 8 }}>
                        <Box sx={{ mt: 1.5 }} style={{ display: "flex", justifyContent: "end" }}>
                            {/* <Button className="cBtn" onClick={props.closeModalHndlr}>
                                Cancel
                            </Button> */}
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
    )
})

