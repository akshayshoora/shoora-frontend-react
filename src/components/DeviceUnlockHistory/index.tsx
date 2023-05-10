import React from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
    FormHelperText
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchBox from "components/commonComponent/SearchField";
import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import TextInput from "components/commonComponent/TextInput";
import Avatar from '@mui/material/Avatar';
import client from "serverCommunication/client";
import Span from "components/commonComponent/Span";
import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths } from "../../constants/commonEnums";
import PageLoading from "components/commonComponent/PageLoading";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { useAppContext } from "ContextAPIs/appContext";
import SelectField from "components/commonComponent/SelectField";
import { transport } from "constants/RouteMiddlePath";
import CustomRadioGroup from "components/commonComponent/CustomRadioGroup.tsx";
import DriverImage from "../../../assets/driver-img.png";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Download from "@mui/icons-material/Download";
import COLORS from "../../constants/colors";

import {
    HeadCell,
    Order,
    TableFooter,
    TableHeader,
} from "components/commonComponent/Table";
import ActionMenu, {
    MenuType,
} from "components/commonComponent/Table/ActionMenu";
import { SelectChangeEvent } from "@mui/material";

export default function DeviceUnlockHistory() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<string>("drivers");
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        variant: "success" | "error" | "info";
        message: string;
    }>({ open: false, variant: "info", message: "" });
    const { id } = useParams();
    const { data: deviceUnlockHistoryResp, isLoading } = useQuery(
        ["device-unlock-history", id, page, rowsPerPage],
        () => getDeviceUnlockHistoryApiCall(String(id), page, rowsPerPage)
    );

    async function getDeviceUnlockHistoryApiCall(
        deviceId: string,
        pageNumber: number,
        pageSize: number,
    ) {
        let getApiUrl = `${transport}/unlock-history/?lock_id=${deviceId}&page=${pageNumber + 1}&page_size=${pageSize}`;
        const response = await client.get(getApiUrl);
        return response.data;
    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage - 1);
        // mutateDeviceLockInfo({ pageNo: newPage, pageSize: rowsPerPage });
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        // mutateDeviceLockInfo({ pageNo: 1, pageSize: event.target.value });
    };

    const headCells: any = [
        {
            id: "location",
            label: "Location",
            numeric: false,
            disablePadding: true,
            // alignment: "center",
        },
        {
            id: "unlock-date",
            label: "Unlock Date",
            numeric: false,
            disablePadding: false,
        },
        // {
        //     id: "unlock-place",
        //     label: "Unlock Place",
        //     numeric: false,
        //     disablePadding: false,
        //     // alignment: "center",
        // },
        {
            id: "unlock-by",
            label: "Unlock By",
            numeric: false,
            disablePadding: false,
            // alignment: "center",
        },
    ];
    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        drivers: string
    ) => {
        const isAsc = orderBy === drivers && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        //@ts-ignore
        setOrderBy(drivers);
    };

    const handleSearchInput = (e: any) => {
        setSearchText(e);
    };


    function GoToBack() {
        navigate(-1);
    }
    return (
        <Box className={classes.positionRelative}>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.variant}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Box className={classes.headingWrapper}>
                <Box className={classes.headingContent}>
                    <IconButton
                        className={classes.headingBackButton}
                        size="small"
                        onClick={GoToBack}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography fontSize={24}>
                        Device Unlock History
                    </Typography>
                </Box>
            </Box>

            <Box className={classes.padding_24}>
                <Box>
                    <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                            <SearchBox
                                onChangeFunc={handleSearchInput}
                                placeholder="Search"
                            />
                        </Box>
                        <Button
                            // variant="outlined"
                            // color="success"
                            variant="contained"
                            sx={{ ml: 1 }}
                            style={{ background: "#1d6f42", color: COLORS.WHITE }}
                            onClick={() => { }}
                        >
                            <Download />
                        </Button>
                    </Box>
                </Box>
                <Box className={classes.tableRootContainer}>
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
                            ) : (Array.isArray(deviceUnlockHistoryResp?.results) && (deviceUnlockHistoryResp?.results.length)) ? (
                                deviceUnlockHistoryResp?.results.map((info: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={0} key={index}>
                                            <TableCell className={classes.tableBodyCell}>
                                                <Box className={classes.columnView}>
                                                    <Span>{info?.vehicle}</Span>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Span>{info?.vehicle}</Span>
                                            </TableCell>
                                            <TableCell>
                                                <Span>{info?.vehicle}</Span>

                                            </TableCell>
                                            <TableCell>
                                                <Span>{info?.vehicle}</Span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableCell colSpan={7}>
                                    <div className={classes.noDataView}>
                                        <Span fontType="secondary">No Data Found</Span>
                                    </div>
                                </TableCell>
                            )}
                        </TableBody>
                    </Table>
                    <TableFooter
                        totalPages={Number(deviceUnlockHistoryResp?.count) ? Math.ceil(deviceUnlockHistoryResp?.count / rowsPerPage) : 1}
                        // totalPages={1}
                        currentPage={page + 1}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box>
            </Box>
        </Box >
    );
}
