import { useEffect } from "react";
import {
    Alert,
    Snackbar,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VerifiedIcon from '@mui/icons-material/Verified';

import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Download from "@mui/icons-material/Download";
import Span from "components/commonComponent/Span";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import COLORS from "../../constants/colors";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { stringCheckForTableCell } from "utils/StringCheck";
import { useAppContext } from "ContextAPIs/appContext";
import Table from "@mui/material/Table";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import {
    HeadCell,
    Order,
    TableFooter,
    TableHeader,
} from "components/commonComponent/Table";
import ActionMenu, {
    MenuType,
} from "components/commonComponent/Table/ActionMenu";
import { useMutation, useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths, Actions } from "../../constants/commonEnums";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess } from "utils/FeatureCheck";
import { auth, transport } from "constants/RouteMiddlePath";
import { deviceLocksData } from "./helper";
import {
    getDateTime,
} from "utils/calenderUtils";
import EnterCodeModal from "./EnterCodeModal";

export default function DeviceLocks() {
    const [deleteId, setDeleteId] = React.useState<string>("");
    const [searchText, setSearchText] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tripFilterModalState, setTripFilterModalState] = React.useState(false);
    // const { data: inspectionRespOld, isLoading } = useQuery(
    //     ["inspections"], getInspectionApiCallOld
    // );
    const [snackbar, setSnackbar] = React.useState<{
        open: boolean;
        variant: "success" | "error" | "info";
        message: string;
    }>({ open: false, variant: "info", message: "" });
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<string>("drivers");
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const { user } = useAppContext();

    const isAdd = actionAccess(AppPaths.DRIVERS, Actions.ADD);
    const isEdit = actionAccess(AppPaths.DRIVERS, Actions.EDIT);
    const isDelete = actionAccess(AppPaths.DRIVERS, Actions.DELETE);

    const navigate = useNavigate();

    const classes = useStyles();

    useEffect(() => {
        mutateDeviceLockInfo({ pageNo: page + 1, pageSize: rowsPerPage });
    }, []);

    // async function getInspectionApiCallOld() {
    //     let getApiUrl = `${transport}/vehicle-inspections/`;
    //     const response = await client.get(getApiUrl);
    //     return response.data;
    // }

    const handleOpenDelete = (
        event: React.MouseEvent<HTMLElement>,
        id: string
    ) => {
        setDeleteId(id);
        setOpenDelete(true);
    };
    const handleClose = () => {
        setOpenDelete(false);
    };

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
        mutateDeviceLockInfo({ pageNo: newPage, pageSize: rowsPerPage });
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        mutateDeviceLockInfo({ pageNo: 1, pageSize: event.target.value });
    };

    function openInspectionDetails(event: React.MouseEvent<HTMLElement>, id: string) {
        event.stopPropagation();
        navigate(`/${AppPaths.INSPECTION}/${id}`);
    }

    function editDriverDetails(event: React.MouseEvent<HTMLElement>, id: string) {
        event.stopPropagation();
        navigate(`/${AppPaths.TYRE}/${SubPaths.EDIT}/${id}`);
    }

    const actionMenuItems: MenuType[] = [
        {
            label: "More Info",
            icon: <InfoOutlinedIcon />,
            onClick: openInspectionDetails,
            access: true,
        }
    ];

    //Api Call For Insepction Details
    const inspectionDetailsMutation = useMutation(getDeviceLockApiCall, {
        onError: () => {
            setSnackbar({
                open: true,
                variant: "error",
                message: "Something went wrong.",
            })
        }
    });
    async function getDeviceLockApiCall(filterInfo?: any) {
        const { pageNo, pageSize } = filterInfo;
        const params: any = {
            page: pageNo, page_size: pageSize
        }
        const response = await client.get(`${transport}/locks/`, { params });
        return response.data;
    }
    const { mutate: mutateDeviceLockInfo, isLoading: isInspectionLoading, data: inspectionResp } = inspectionDetailsMutation;
    const headCells: any = [
        {
            id: "vehicle_no",
            label: "Vehicle Number",
            numeric: false,
            disablePadding: true,
            // alignment: "center",
        },
        {
            id: "location",
            label: "Location",
            numeric: false,
            disablePadding: false,
        },
        {
            id: "status",
            label: "Lock Status",
            numeric: false,
            disablePadding: false,
            // alignment: "center",
        },
        {
            id: "trasnporter",
            label: "Keypad Unlock",
            numeric: false,
            disablePadding: false,
            // alignment: "center",
        },
    ];

    function addDriver() {
        navigate(`/${AppPaths.TYRE}/${SubPaths.ADD}`);
    }
    const handleSearchInput = (e: any) => {
        setSearchText(e);
    };

    const deleteUserMutation = useMutation(deleteUser, {
        onSuccess: () => {
            handleClose();
            setSnackbar({
                open: true,
                variant: "success",
                message: "Driver deleted.",
            });
            setTimeout(() => {
                navigate(`/${AppPaths.DRIVERS}`);
            }, 1000);
        },

        onError: () =>
            setSnackbar({
                open: true,
                variant: "error",
                message: "Something went wrong.",
            }),
    });

    const verifyDriverMutation = useMutation(vehicleDeviceLocks, {
        onSuccess: (data: any, context: any) => {
            setSnackbar({
                open: true,
                variant: "success",
                message: "Vehicle locked successfully.",
            });
        },
        onError: () =>
            setSnackbar({
                open: true,
                variant: "error",
                message: "Something went wrong.",
            }),
    });

    const { mutate: mutateDeleteUser } = deleteUserMutation;
    const { mutate: mutateUnlockDevice } = verifyDriverMutation;

    function deleteUser() {
        return client.delete(`${transport}/drivers/${deleteId}`);
    }

    function vehicleDeviceLocks(driverId: any): any {
        return client.get(`${transport}/drivers/${driverId}/verify/`);
    }

    function handleDelete() {
        mutateDeleteUser();
    }

    function verifyDriverHndlr(deviceId: any) {
        mutateUnlockDevice(deviceId);
    }

    function codeInputHnldr() {
        setTripFilterModalState(true);
    }

    function closeHndlr() {
        setTripFilterModalState(false);
    }

    console.log({ tripFilterModalState });
    return (
        <Box style={{ padding: "20px 20px 20px 40px" }}>
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
            {
                tripFilterModalState && <EnterCodeModal
                    isOpenFilterModal={tripFilterModalState}
                    closeHndlr={closeHndlr}
                />
            }
            {openDelete && (
                <DeleteModal
                    open={openDelete}
                    handleClose={handleClose}
                    label="driver"
                    handleDelete={handleDelete}
                />
            )}
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Heading>Lock Device</Heading>
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box style={{ marginRight: isAdd ? 12 : 0 }}>
                        <SearchBox
                            onChangeFunc={handleSearchInput}
                            placeholder="Search by Device"
                        />
                    </Box>
                    {/* <Button
                        variant="contained"
                        style={{ background: COLORS.PRIMARY_COLOR, color: COLORS.WHITE, marginLeft: "10px" }}
                        onClick={addDriver}
                    >
                        <AddIcon />
                        Add Claim
                    </Button> */}
                </Box>
            </Box>
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
                        {false ? (
                            <TableCell colSpan={8}>
                                <LoadingScreen />
                            </TableCell>
                        ) : (Array.isArray(deviceLocksData?.results) && (deviceLocksData?.results.length)) ? (
                            deviceLocksData?.results.map((info: any, index: number) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={0} key={index}>
                                        <TableCell className={classes.tableBodyCell}>
                                            <Box className={classes.columnView}>
                                                <Span>{info.vehicle}</Span>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button
                                                size="small"
                                                variant="text"
                                                style={{ fontWeight: "bold" }}
                                            >Show Address</Button>
                                        </TableCell>
                                        <TableCell>
                                            {(info?.lock_status === "locked") ? <Button
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                                // variant="contained"
                                                // style={{ background: "#2e7d32" }}
                                                onClick={() => verifyDriverHndlr(info)}
                                            >
                                                <LockOpenIcon sx={{ mr: 0.5 }} fontSize="small" />
                                                Unlock
                                            </Button> : <Span fontType="secondary">
                                                Unlocked
                                            </Span>}

                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Keypad Unlock">
                                                <IconButton onClick={codeInputHnldr}>
                                                    <KeyboardIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        {/* <TableCell>
                                            <Span fontType="secondary"> {info?.total_vehicle_score || "-"}</Span>
                                        </TableCell>
                                        <TableCell>
                                            <Span fontType="secondary">
                                                {info?.total_penalty_amount || "-"}
                                            </Span>
                                        </TableCell>
                                        <TableCell>
                                            <ActionMenu menu={actionMenuItems} id={info?.id} />
                                        </TableCell> */}
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
                    totalPages={Number(inspectionResp?.count) ? Math.ceil(inspectionResp?.count / rowsPerPage) : 1}
                    currentPage={page + 1}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}
