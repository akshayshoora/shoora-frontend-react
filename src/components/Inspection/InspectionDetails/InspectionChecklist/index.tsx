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
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import client from "serverCommunication/client";
import TableRow from "@mui/material/TableRow";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import useStyles from "./style";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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

    async function downloadBtnHndlr(event: any) {
        try {
            const vehicleCsvData: any = await client.get(`${transport}/vehicle-inspections/${inspectionId}/inspection-download/`,
                { responseType: 'blob' });
            const currentDate = new Date().toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            const url = window.URL.createObjectURL(new Blob([(vehicleCsvData.data)]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `inspection-report-${currentDate}.pdf`);
            document.body.appendChild(link);
            link.click();
        }
        catch (e) {
            setSnackbar({
                open: true,
                variant: "error",
                message: "Something went wrong.",
            })
        }
    }
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
                    <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                        <Tooltip title="Download Pdf">
                            <IconButton
                                // variant="contained"
                                size="small"
                                sx={{ ml: 1 }}
                                style={{ background: "#1d6f42", color: COLORS.WHITE }}
                                onClick={downloadBtnHndlr}
                            >
                                <PictureAsPdfIcon />
                            </IconButton>
                            {/* <IconButton size="small" aria-label="download">
                                <ArrowDownwardIcon />
                            </IconButton> */}
                        </Tooltip>

                    </Box>
                    <Box sx={{ mt: 1 }}>
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