import React from "react";
import {
    Alert,
    Box,
    Modal,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Paper,
    styled,
    Typography
} from "@mui/material";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "components/commonComponent/TextInput";


import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth, monitor, transport } from "constants/RouteMiddlePath";
import { getDateTime, getDuration } from "utils/calenderUtils";
import { Player } from "video-react";
import { IonAvatar } from "@ionic/react";
import GoogleMapReact from "google-map-react";
import { latLongToPlace } from "utils/helpers";
import { useEffect, useState } from "react";
import Marker from "components/Map/Marker";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    borderRadius: "8px",
    // border: "2px solid #261F5A",
    boxShadow: 24,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4, 2, 2),
    color: theme.palette.text.secondary,
    position: "relative",
    boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",

    alertHead: {
        display: "flex",
        justifyContent: "center",
    },
}));

interface ITripModalProps {
    open: boolean;
    handleClose: (applyFilter: any) => void;
    id: string;
}

export function GeofenceTripModal(props: ITripModalProps) {
    const { open, handleClose, id } = props;
    const classes = useStyles();
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [startLoc, setStartLoc] = useState("");
    const [endLoc, setEndLoc] = useState("");
    const [geoFenceFilter, setGeoFenceFilter] = useState({
        startAddress: "",
        endAddresS: "",
        startDate: "",
        endDate: ""
    });

    const { data: geofenceList, isLoading } = useQuery(
        ["geofences", page, rowsPerPage],
        () => getGeofences(page, rowsPerPage)
    );

    async function getGeofences(
        pageNumber: number,
        pageSize: number,
        searchText?: string
    ) {
        let getApiUrl = `${transport}/geofences/?page=${pageNumber + 1
            }&page_size=${pageSize}&search=${searchText}`;

        const response = await client.get(getApiUrl);
        return response.data;
    }

    return (
        <Box>
            <Modal
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            className={classes.alertHead}
                            variant="h6"
                            component="h2"
                        >
                            Trip Between Geofence{" "}
                            <i onClick={() => handleClose(false)}>
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
                                            stroke-linecap="square"
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
                                            color-interpolation-filters="sRGB"
                                        >
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                        <Box sx={{ padding: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography
                                        fontSize={16}
                                        style={{ fontWeight: 200, marginBottom: 10, marginRight: 2 }}
                                    >
                                        Start Address
                                    </Typography>
                                    <Select
                                        fullWidth
                                        id="demo-simple-select"
                                        // value={drivers.vehicle}
                                        // onChange={(e: any) => handleFormDriver("vehicle", e.target.value)}
                                        size="medium"
                                        displayEmpty
                                    >
                                        {geofenceList?.results?.map((item: any, index: any) => {
                                            if (item.address) {
                                                return (<MenuItem key={item.id} style={{ fontSize: 14 }} value={item.id}>
                                                    {item.address}
                                                </MenuItem>)
                                            }
                                        })}

                                    </Select>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        fontSize={16}
                                        style={{ fontWeight: 200, marginBottom: 10, marginRight: 2 }}
                                    >
                                        End Address
                                    </Typography>
                                    <Select
                                        fullWidth
                                        id="demo-simple-select"
                                        // value={drivers.vehicle}
                                        // onChange={(e: any) => handleFormDriver("vehicle", e.target.value)}
                                        size="medium"
                                        displayEmpty
                                    >
                                        {geofenceList?.results?.map((item: any, index: any) => {
                                            if (item.address) {
                                                return (<MenuItem key={item.id} style={{ fontSize: 14 }} value={item.id}>
                                                    {item.address}
                                                </MenuItem>)
                                            }
                                        })}
                                    </Select>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        fontSize={16}
                                        style={{ fontWeight: 200, marginBottom: 8 }}
                                    >
                                        Start Date
                                    </Typography>
                                    <TextField
                                        id="date"
                                        type="date"
                                        sx={{ width: "100%" }}
                                        size="medium"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    // value={""}
                                    // onChange={() => { }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        fontSize={16}
                                        style={{ fontWeight: 200, marginBottom: 8 }}
                                    >
                                        End Date
                                    </Typography>
                                    <TextField
                                        id="date"
                                        type="date"
                                        sx={{ width: "100%" }}
                                        size="medium"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    // value={""}
                                    // onChange={() => { }}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <Box display="flex" sx={{ pt: 3 }} justifyContent="end">
                                        <Button
                                            variant="contained"
                                            style={{ color: "#fff" }}
                                            size="large"
                                            onClick={() => props.handleClose(true)}
                                        >
                                            Apply Filter
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>
                )}
            </Modal>
        </Box>
    );
}
