import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent } from "@mui/material";
import Typography from "@mui/material/Typography";
import classnames from "classnames";
//Style
import useStyles from "../style";
import COLORS from "../../../constants/colors";
//Icon
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//Custom component
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import Span from "components/commonComponent/Span";
import { HeadCell, Order, TableFooter, TableHeader } from "components/commonComponent/Table";
import ActionMenu, { MenuType } from "components/commonComponent/Table/ActionMenu";
import HorizontalMenu, { IOptionsHrtl } from "components/commonComponent/Table/HorizontalMenu";
import LoadingScreen from "components/commonComponent/LoadingScreen";
//Modal Component
import AddCompany from "./AddCompany";
import DeleteCompany from "./DeleteCompany";
const headCells: readonly HeadCell[] = [
    {
        id: "companyName",
        numeric: false,
        disablePadding: true,
        label: "Company Name",
    },
];
export default function ThreePLAdmin() {
    const classes = useStyles();
    const companyList = { results: [{ id: 1, companyName: "Testing Company" }], count: 10 };
    const isLoading = false;
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<string>("user");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [companyModalState, setCompanyModalState] = useState({
        showModal: false,
        modalData: undefined,
        companyId: undefined
    });
    const [deleteModalState, setDeleteModalState] = useState({
        showModal: false,
        deleteCompanyId: undefined,
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage - 1);
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    function deleteModalHndlr() {
        setDeleteModalState(prevState => ({
            ...prevState, showModal: true, deleteCompanyId: undefined
        }))
    }

    const menuOptions = useMemo((): IOptionsHrtl[] => ([
        {
            id: "edit",
            actionIcon: <EditIcon sx={{ fontSize: "20px", color: COLORS.SECONDARY_FONT }} />,
            actionName: "Edit",
            onClickHndlr: () => { },
        },
        {
            id: "delete",
            actionIcon: <DeleteIcon sx={{ fontSize: "20px", color: COLORS.DANGER }} />,
            actionName: "Delete",
            onClickHndlr: deleteModalHndlr
        }]), []);

    function closeModalHndlr() {
        setCompanyModalState(prevState => ({
            ...prevState, showModal: false, modalData: undefined,
            companyId: undefined
        }))
    }
    function closeDelModalHndlr() {
        setDeleteModalState(prevState => ({
            ...prevState, showModal: false, deleteCompanyId: undefined,
        }))
    }

    function addCompanyHndlr() {
        setCompanyModalState(prevState => ({
            ...prevState, showModal: true, modalData: undefined,
            companyId: undefined
        }))
    }

    return (
        <>
            <Card>
                <CardContent className={classes.menuCardContent}>
                    <Box className={classes.menuContentHeader}>
                        <Typography component="h4" sx={{ fontWeight: "bold" }}>
                            Companies
                        </Typography>
                        {/* <Button
                        variant="contained"
                        style={{ color: COLORS.WHITE, whiteSpace: "nowrap" }}
                        onClick={() => { }}
                        size="small"
                    >
                        <AddIcon />
                    </Button> */}
                    </Box>
                    <Box className={classes.filterContainer}>
                        <Grid container>
                            <Grid item xs={3}>
                                <SearchBox
                                    onChangeFunc={() => { }}
                                    placeholder="Search"
                                />
                            </Grid>
                            <Grid item sx={{ textAlign: "end" }} xs={9}>
                                <Button
                                    variant="contained"
                                    style={{ color: COLORS.WHITE, whiteSpace: "nowrap" }}
                                    onClick={addCompanyHndlr}
                                    size="small"
                                >
                                    Add Company
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Table className={classes.table}>
                            <TableHeader
                                headings={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={() => { }}
                                shouldShowActionMenu={true}
                            />
                            <TableBody>
                                {isLoading ? (
                                    <TableCell colSpan={2}>
                                        <LoadingScreen />
                                    </TableCell>
                                ) : companyList?.results.length ? (
                                    companyList?.results.map((user: any, index: number) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={0} key={index}>
                                                <TableCell className={classes.tableBodyCell} align="left">
                                                    <Box className={classes.columnView}>
                                                        <Span>{user.companyName}</Span>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <HorizontalMenu actionOptions={menuOptions} rowId={user.id} />
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableCell colSpan={2}>
                                        <div className={classes.noDataView}>
                                            <Span fontType="secondary">No Data Found</Span>
                                        </div>
                                    </TableCell>
                                )}
                            </TableBody>
                        </Table>
                        <TableFooter
                            totalPages={Math.ceil(companyList?.count / rowsPerPage)}
                            currentPage={page + 1}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            footerContainerClassName={classes.tableFooterClass}
                        />
                    </Box>
                </CardContent>
            </Card>
            <Modal
                open={companyModalState.showModal}
                onClose={closeModalHndlr}
                aria-describedby="child-modal-description"
            >
                <AddCompany
                    closeModalHndlr={closeModalHndlr}
                    showSnackbarCallback={() => { }}
                />
            </Modal>
            <Modal
                open={deleteModalState.showModal}
                onClose={closeDelModalHndlr}
                aria-describedby="child-modal-description"
            >
                <DeleteCompany
                    handleClose={closeDelModalHndlr}
                    handleDelete={closeDelModalHndlr}
                    label="Delete Company"
                />
            </Modal>

        </>
    )
}