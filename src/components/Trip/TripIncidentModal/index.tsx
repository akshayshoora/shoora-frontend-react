import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./style";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextInput from "components/commonComponent/TextInput";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import COLORS from "constants/colors";
import React, { useEffect, useRef, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBox from "components/commonComponent/SearchField";
import Autocomplete from '@mui/material/Autocomplete';
import Modal from "@mui/material/Modal";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import {
    HeadCell,
    Order,
    TableFooter,
    TableHeader,
} from "components/commonComponent/Table";
import Span from "components/commonComponent/Span";
import { getDateTime } from "utils/calenderUtils";

import {
    SelectChangeEvent
} from "@mui/material";

// API Call
import client from "serverCommunication/client";
import { useMutation, useQuery } from "react-query";
import { auth, monitor, transport } from "constants/RouteMiddlePath";


const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
};

interface ITripFilterModal {
    isOpenFilterModal: any;
    closeModalHndlr: any;
    tripInfo: any;
}

const TripIncidentModal = (props: ITripFilterModal) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<string>("alert");
    const [snackbar, setSnackbar] = React.useState<{
        open: boolean;
        variant: "success" | "error" | "info";
        message: string;
    }>({ open: false, variant: "info", message: "" });
    const [tripFilterState, setTripFilterState] = useState<any>({
        vehicle_id: "",
        since: "",
        until: ""
    });

    useEffect(() => {
        if (props.tripInfo) {
            const { trip_ended_at, trip_started_at, vehicle_vin, vehicle_id } = props.tripInfo,
                filterDetails = {
                    vehicle_id, since: trip_started_at,
                    until: trip_ended_at
                };
            setTripFilterState(filterDetails);
            mutateTripIncidentInfo({ ...filterDetails, pageNo: page + 1, pageSize: rowsPerPage });
        }
    }, [props.tripInfo]);

    const headCells: readonly HeadCell[] = [
        {
            id: "alert_name",
            numeric: false,
            disablePadding: true,
            label: "Alert",
        },

        {
            id: "vehicle",
            label: "Vehicle Numer",
            numeric: false,
            disablePadding: false,
        },
        {
            id: "driver",
            label: "Driver",
            numeric: false,
            disablePadding: false,
        },
        {
            id: "created_at",
            label: "Created at",
            numeric: false,
            disablePadding: false,
        }
    ];

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        alert: string
    ) => {
        const isAsc = orderBy === alert && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        //@ts-ignore
        setOrderBy(alert);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage - 1);
        mutateTripIncidentInfo({ pageNo: newPage, pageSize: rowsPerPage });
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        mutateTripIncidentInfo({ pageNo: 1, pageSize: event.target.value });
    };

    //Api Call For Insepction Details
    const tripIncidentMutation = useMutation(getTripIncidentApiCall, {
        onError: () => {
            setSnackbar({
                open: true,
                variant: "error",
                message: "Something went wrong.",
            })
        }
    });
    async function getTripIncidentApiCall(filterInfo?: any) {
        const { pageNo, pageSize, ...otherFilterInfo } = filterInfo;
        const params: any = {
            ...tripFilterState, ...otherFilterInfo, page: pageNo, page_size: pageSize
        }
        const response = await client.get(`${monitor}/alerts/`, { params });
        return response.data;
    }
    const { mutate: mutateTripIncidentInfo, isLoading, data: tripIncidentResp } = tripIncidentMutation;
    return (
        <Modal
            open={props.isOpenFilterModal}
            onClose={props.closeModalHndlr}
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
                    Trip Alerts
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
                    <Box sx={{ py: 2, px: 2.5 }}>
                        <SearchBox
                            onChangeFunc={() => { }}
                            placeholder="Search Alert By Name"
                        />
                    </Box>
                    <Box className={classes.rootTable}>
                        <Table className={classes.table}>
                            <TableHeader
                                headings={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                shouldShowActionMenu={false}
                            />
                            <TableBody>
                                {isLoading ? (
                                    <TableCell colSpan={8}>
                                        <LoadingScreen />
                                    </TableCell>
                                ) : ((Array.isArray(tripIncidentResp?.results)) && (tripIncidentResp?.results).length) > 0 ? (
                                    tripIncidentResp?.results.map((alert: any, index: number) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={0} key={index}>
                                                <TableCell className={classes.tableBodyCell} align="left">
                                                    <Box className={classes.columnView}>
                                                        <Span>{alert.alert_name}</Span>
                                                    </Box>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Span fontType="secondary">{alert.vehicle}</Span>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">
                                                        {alert.driver ? alert.driver.name : "-"}
                                                    </Span>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">
                                                        {getDateTime(alert.src_tm)}
                                                    </Span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableCell colSpan={8}>
                                        <div className={classes.noDataView}>
                                            <Span fontType="secondary">No Data Found</Span>
                                        </div>
                                    </TableCell>
                                )}
                            </TableBody>
                        </Table>
                        <TableFooter
                            totalPages={Math.ceil(tripIncidentResp?.count / rowsPerPage)}
                            currentPage={page + 1}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            footerContainerClassName={classes.paddingTableFooter}
                        />
                    </Box>

                </Box>
            </Box >
        </Modal>
    )
}

export default TripIncidentModal;

