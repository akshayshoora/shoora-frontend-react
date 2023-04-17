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
import Download from "@mui/icons-material/Download";
import COLORS from "../../../../constants/colors";
//Icons
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const InspectionChecklist: React.FC<any> = ({ inspectionId }) => {
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

    const { data: inspectionCheckList, isLoading } = useQuery(
        ["checkListDetails", inspectionId],
        () => getInspectionCheckList(String(inspectionId))
    );

    async function getInspectionCheckList(id: string) {
        if (id) {
            return (await client.get(`${transport}/vehicle-inspections/${id}/inspections/`)).data;
        }
    }

    const headCells: any = [
        {
            id: "name",
            numeric: false,
            disablePadding: true,
            label: "SR No.",
        },
        {
            id: "driving_hours",
            label: "Requirements / No Compliance",
            numeric: false,
            disablePadding: false,
        },
        {
            id: "duty_hours",
            label: "Score",
            numeric: false,
            disablePadding: false,
        },
        {
            id: "duty_hours",
            label: "Penalty Amount",
            numeric: false,
            disablePadding: false,
        }
        ,
        {
            id: "verified",
            label: "Verified",
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


    console.log({ inspectionCheckList });
    const { inspection_status } = inspectionCheckList || {};
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
                <Box sx={{ pt: 0, pb: 2.5 }} className={classes.fieldSetContainer} component="fieldset">
                    <Box sx={{ fontWeight: "bold" }} component="legend">Inspection Checklist</Box>
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
                                ) : (Array.isArray(inspection_status) && inspection_status.length > 0) ? (
                                    inspection_status.map((details: any, index: number) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={0} key={index}>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">{(index + 1)}</Span>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">{details?.inspection?.name || "-"}</Span>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">{details?.inspection?.score || "-"}</Span>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">{details?.inspection?.penalty_amount || "-"}</Span>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Span fontType="secondary">{details?.status ? <DoneIcon /> : <CloseIcon />}</Span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableCell colSpan={8}>
                                        <div className={classes.noDataView}>
                                            <Span fontType="secondary">No Data Found.</Span>
                                        </div>
                                    </TableCell>
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default InspectionChecklist;