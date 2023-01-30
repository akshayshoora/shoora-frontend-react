import React, { useState, useEffect } from "react";
import {
    Box, TextField, Grid,
    Typography, Button,
    SelectChangeEvent, Snackbar, Alert
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Span from "components/commonComponent/Span";

import client from "serverCommunication/client";
import TableRow from "@mui/material/TableRow";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import useStyles from "./style";
import {
    HeadCell,
    Order,
    TableFooter,
    TableHeader,
} from "components/commonComponent/Table";
import { getDatesInRange } from "../helper";
import { getDateDisplayFormat } from "../../../../utils/calenderUtils";
import { auth, transport } from "constants/RouteMiddlePath";

const DrivingHistory: React.FC<any> = ({ driverId }) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<string>("drivers");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filterState, setFilterState] = useState<any>({
        startDate: "",
        endDate: ""
    });
    const [snackbar, setSnackbar] = React.useState<{
        open: boolean;
        variant: "success" | "error" | "info";
        message: string;
    }>({ open: false, variant: "info", message: "" });

    const headCells: any = [
        {
            id: "name",
            numeric: false,
            disablePadding: true,
            label: "Date",
        },
        {
            id: "driving_hours",
            label: "Driving Hours",
            numeric: false,
            disablePadding: false,
        },
        {
            id: "duty_hours",
            label: "Duty Hours",
            numeric: false,
            disablePadding: false,
        }
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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage - 1);
        mutateDrivingHistory({ pageNo: newPage, pageSize: rowsPerPage });
    };
    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        mutateDrivingHistory({ pageNo: 0, pageSize: parseInt(event.target.value, 10) });
    };

    function onChangeFilterHndlr(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFilterState((prevState: any) => ({ ...prevState, [name]: value }))
    }
    const drivingHistoryMutation = useMutation(getHistoryApiCall, {
        onError: () =>
            setSnackbar({
                open: true,
                variant: "error",
                message: "Something went wrong.",
            }),
    });
    const { mutate: mutateDrivingHistory, isLoading, data: historyDetails } = drivingHistoryMutation;

    async function getHistoryApiCall(filterProps: any) {
        const { startDate, endDate } = filterState;
        // let historyList: any = [];
        // if (startDate && endDate) {
        //     const dateList = getDatesInRange(new Date(startDate), new Date(endDate)),
        //         min = 10;
        //     historyList = dateList.map((item: any) => {
        //         const randDutyHours = Math.floor(Math.random() * (24 - 10 + 1)) + 10;
        //         const drivingHours = Math.floor(Math.random() * (randDutyHours - min + 1)) + min;
        //         return ({ date: getDateDisplayFormat(item), driving_hours: `${drivingHours} h`, duty_hours: `${randDutyHours} h` })
        //     })
        // }
        // return Promise.resolve(historyList);
        // return setTimeout(() => { return Promise.resolve(40) }, 2000);
        const { pageNo = 0, pageSize = 10 } = filterProps;
        const response = await client.get(`${transport}/driver-history/?driver_id=${driverId}&history_since=${startDate}&history_until=${endDate}&page=${pageNo}&page_size=${pageSize}`);
        return response.data;
    }


    function applyFilterHndlr(event: React.MouseEvent<HTMLButtonElement>) {
        mutateDrivingHistory({ pageNo: 1, pageSize: 10 });
    }

    const { results: historyList } = historyDetails || {};
    return (
        <>   <Snackbar
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
            <Box component="form" >
                <Box sx={{ pt: 2, pb: 2.5 }} className={classes.fieldSetContainer} component="fieldset">
                    <Box sx={{ fontWeight: "bold" }} component="legend">Driving History Details</Box>
                    <Box>
                        <Grid container alignItems="end" columnSpacing={3}>
                            <Grid item xs={4}>
                                <Box>
                                    <Typography
                                        fontSize={16}
                                        style={{ fontWeight: 200, marginBottom: 8 }}
                                    >
                                        Start Date
                                    </Typography>
                                    <TextField
                                        id="startDate"
                                        name="startDate"
                                        type="date"
                                        sx={{ width: "100%" }}
                                        size="medium"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={filterState.startDate}
                                        onChange={onChangeFilterHndlr}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box>
                                    <Typography
                                        fontSize={16}
                                        style={{ fontWeight: 200, marginBottom: 8 }}
                                    >
                                        End Date
                                    </Typography>
                                    <TextField
                                        id="endDate"
                                        name="endDate"
                                        type="date"
                                        size="medium"
                                        sx={{ width: "100%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={filterState.endDate}
                                        onChange={onChangeFilterHndlr}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box display="flex" alignItems="center" justifyContent="end">
                                    <Button
                                        variant="contained"
                                        style={{ color: "#fff" }}
                                        size="large"
                                        onClick={applyFilterHndlr}
                                    >
                                        Apply Filter
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 2 }}>
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
                                ) : Array.isArray(historyList) ? (
                                    historyList.map((details: any, index: number) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={0} key={index}>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">{getDateDisplayFormat(details?.created_date)}</Span>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">{details?.drive_hour || "-"}</Span>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">{details?.duty_hour || "-"}</Span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableCell colSpan={8}>
                                        <div className={classes.noDataView}>
                                            <Span fontType="secondary">Select date range and then apply filter.</Span>
                                        </div>
                                    </TableCell>
                                )}
                            </TableBody>
                        </Table>
                        <TableFooter
                            totalPages={historyDetails && Math.ceil(historyDetails?.count / rowsPerPage)}
                            currentPage={page + 1}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default DrivingHistory;