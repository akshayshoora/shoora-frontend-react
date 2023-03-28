import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import {
    HeadCell,
    Order,
    TableFooter,
    TableHeader,
} from "components/commonComponent/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Span from "components/commonComponent/Span";
import useStyles from "./style";

const tableData = [{
    sNo: "1",
    date: "23-Jan-23",
    time: "13:00",
    location: "Al Quoz yd",
    odometerKms: "5,08,000",
    nsd: "14.5",
    nsdUsed: "1.50",
    psi: "130",
    kmsCovered: "8,000",
    kmsMM: "5,333.33",
    projectKms: "69,333.3 ",
},
{
    sNo: "2",
    date: "23-Feb-23",
    time: "15:00",
    location: "Al Quoz yd",
    odometerKms: "5,08,000",
    nsd: "14.5",
    nsdUsed: "1.50",
    psi: "130",
    kmsCovered: "8,000",
    kmsMM: "5,333.33",
    projectKms: "69,333.3 ",
}, {
    sNo: "3",
    date: "23-Mar-23",
    time: "15:00",
    location: "Al Quoz yd",
    odometerKms: "5,08,000",
    nsd: "14.5",
    nsdUsed: "1.50",
    psi: "130",
    kmsCovered: "8,000",
    kmsMM: "5,333.33",
    projectKms: "69,333.3 ",
}];
export default function PerformanceTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<string>("drivers");
    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        drivers: string
    ) => {
        const isAsc = orderBy === drivers && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        //@ts-ignore
        setOrderBy(drivers);
    };
    const headCells: any = [
        {
            id: "sNo",
            numeric: false,
            disablePadding: true,
            alignment: "center",
            label: "S No",
        },
        {
            id: "date",
            label: "Date",
            numeric: false,
            disablePadding: false,
        },
        {
            id: "time",
            label: "Time",
            numeric: false,
            disablePadding: false,
            alignment: "center",
        },
        {
            id: "location",
            label: "Location",
            numeric: false,
            disablePadding: false,
            alignment: "center",
        },
        {
            id: "odometerKms",
            label: "Odometer Kms",
            numeric: false,
            disablePadding: false,
        },
        {
            id: "nsd",
            label: "NSD",
            numeric: false,
            disablePadding: false,
        },
        {
            id: "nsdUsed",
            label: "NSD Used",
            numeric: false,
            disablePadding: false,
        }, {
            id: "psi",
            label: "PSI",
            numeric: false,
            disablePadding: false,
        }
        , {
            id: "kmsCovered",
            label: "Kms Covered",
            numeric: false,
            disablePadding: false,
        }, {
            id: "kmsMM",
            label: "Kms/mm",
            numeric: false,
            disablePadding: false,
        }, {
            id: "projectKms",
            label: "Projected Kms",
            numeric: false,
            disablePadding: false,
        }
    ];
    return (
        <Box className={classes.root}>
            <Table className={classes.table}>
                <TableHeader
                    headings={headCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    shouldShowActionMenu={false}
                />
                <TableBody>
                    {
                        tableData.map((tyre: any, index: number) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={0} key={index}>
                                    <TableCell className={classes.tableBodyCell} align="center">
                                        <Box className={classes.columnView}>
                                            <Span>{tyre.sNo}</Span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Span fontType="secondary">{tyre.date}</Span>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Span fontType="secondary">
                                            {tyre?.time}
                                        </Span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Span fontType="secondary"> {tyre?.location}</Span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Span fontType="secondary">
                                            {tyre?.odometerKms}
                                        </Span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Span fontType="secondary">
                                            {tyre?.nsd}
                                        </Span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Span fontType="secondary">
                                            {tyre?.nsdUsed}
                                        </Span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Span fontType="secondary">
                                            {tyre?.psi}
                                        </Span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Span fontType="secondary">
                                            {tyre?.kmsCovered}
                                        </Span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Span fontType="secondary">
                                            {tyre?.kmsMM}
                                        </Span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Span fontType="secondary">
                                            {tyre?.projectKms}
                                        </Span>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }

                </TableBody>
            </Table>
        </Box>
    )
}