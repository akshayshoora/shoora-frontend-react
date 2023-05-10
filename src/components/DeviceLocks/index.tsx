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
import PasswordModal from "./PasswordModal";
import { latLongToPlace, sanitizeURL } from "utils/helpers";


export default function DeviceLocks() {
    const [deleteId, setDeleteId] = React.useState<string>("");
    const [searchText, setSearchText] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tripFilterModalState, setTripFilterModalState] = React.useState({
        showModal: false,
        deviceInfo: undefined
    });
    const [showCopyAlertState, setShowCopyAlertState] = React.useState({
        showAlert: false,
        vehicle: undefined,
        unlockCode: undefined
    })
    const [passwordModalState, setPasswordModalState] = React.useState({
        showModal: false,
        deviceInfo: undefined
    });
    const [deviceLocksListState, setDeviceLocksListState] = React.useState<any>([]);
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

    function unlockHistoryDetails(event: React.MouseEvent<HTMLElement>, id: string) {
        event.stopPropagation();
        navigate(`/${AppPaths.LOCKDEVICE}/${id}`);
    }

    function editDriverDetails(event: React.MouseEvent<HTMLElement>, id: string) {
        event.stopPropagation();
        navigate(`/${AppPaths.TYRE}/${id}`);
    }

    const actionMenuItems: MenuType[] = [
        {
            label: "Unlock history",
            icon: <LockOpenIcon />,
            onClick: unlockHistoryDetails,
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

    function unlockDeviceModalHndlr(info: any) {
        const { id } = info;
        if (id) {
            // mutateUnlockDevice(id);
            setPasswordModalState({
                showModal: true,
                deviceInfo: info
            })
        }
    }
    function unlockDeviceWithCodeBtnHnldr(info: any) {
        const { id } = info;
        if (id) {
            setTripFilterModalState({
                showModal: true,
                deviceInfo: info,
            });
        }
    }

    function closeEnterCodeModalHndlr() {
        setTripFilterModalState({
            showModal: false,
            deviceInfo: undefined,
        });
    }
    function closePasswordModalHndlr() {
        setPasswordModalState({
            showModal: false,
            deviceInfo: undefined
        });
    }

    useEffect(() => {
        const { results } = inspectionResp || {};
        if (Array.isArray(results)) {
            setDeviceLocksListState(results);
        }
    }, [inspectionResp]);

    const showPasswordSnackbarCallback = React.useCallback((type: any, message: string, closeModal: boolean, selectedDeviceId: string) => {
        setSnackbar({
            open: true,
            variant: type,
            message,
        });
        if (closeModal) {
            closePasswordModalHndlr();
            if (selectedDeviceId) {
                const updatedDeviceLocksListState = [...deviceLocksListState],
                    indexOfDevice = deviceLocksListState.findIndex((item: any) => item.id == selectedDeviceId);
                if (indexOfDevice > -1) {
                    const deviceInfo = { ...deviceLocksListState[indexOfDevice] };
                    deviceInfo.lock_status = "Operation in progress.";
                    updatedDeviceLocksListState.splice(indexOfDevice, 1, deviceInfo);
                    setDeviceLocksListState(updatedDeviceLocksListState);
                    setTimeout(() => {
                        setPage(0);
                        setRowsPerPage(10);
                        mutateDeviceLockInfo({ pageNo: 1, pageSize: 10 });
                    }, 1500);
                }

            }
        }
    }, [deviceLocksListState]);

    const showEnterCodeSnackbarCallback = React.useCallback((type: any, message: string, closeModal: boolean, unlockCode: any, deviceInfo: any) => {
        setSnackbar({
            open: true,
            variant: type,
            message,
        });
        if (closeModal) {
            const { id: selectedDeviceId, vehicle }: any = deviceInfo || {};
            if (selectedDeviceId) {
                const updatedDeviceLocksListState = [...deviceLocksListState],
                    indexOfDevice = deviceLocksListState.findIndex((item: any) => item.id == selectedDeviceId);
                if (indexOfDevice > -1) {
                    const deviceInfo = { ...deviceLocksListState[indexOfDevice] };
                    deviceInfo.lock_status = "Operation in progress.";
                    updatedDeviceLocksListState.splice(indexOfDevice, 1, deviceInfo);
                    setDeviceLocksListState(updatedDeviceLocksListState);
                    setTimeout(() => {
                        setPage(0);
                        setRowsPerPage(10);
                        mutateDeviceLockInfo({ pageNo: 1, pageSize: 10 });
                    }, 2000);
                }
            }
            closeEnterCodeModalHndlr();
            setShowCopyAlertState({
                showAlert: true,
                vehicle,
                unlockCode: unlockCode
            });
        }
    }, [deviceLocksListState]);

    //Show Address Mutation
    const showAddressMutation = useMutation(showAddressApiCall, {
        onSuccess: async (data: any, context: any) => {
            const { data: addressResponse } = data;
            if (data) {
                let address = await latLongToPlace(
                    addressResponse?.latitude,
                    addressResponse?.longitude,
                    false
                );
                const updatedDeviceLocksListState = [...deviceLocksListState],
                    indexOfDevice = deviceLocksListState.findIndex((item: any) => item.id == context);
                if (indexOfDevice > -1) {
                    const deviceInfo = { ...deviceLocksListState[indexOfDevice] };
                    deviceInfo.addressDetails = address;
                    updatedDeviceLocksListState.splice(indexOfDevice, 1, deviceInfo);
                    setDeviceLocksListState(updatedDeviceLocksListState);
                }
            }
        },
        onError: () =>
            setSnackbar({
                open: true,
                variant: "error",
                message: "Something went wrong.",
            }),
    });

    const { mutate: mutateShowAddress, isLoading: isLoadingShowAddress } = showAddressMutation;

    function showAddressApiCall(deviceId: any): any {
        const response = client.get(`${transport}/locks/${deviceId}/address/`);
        return response;
    }

    function showAddressHndlr(deviceId: any) {
        mutateShowAddress(deviceId);
    }

    function closeCopyAlertHndlr() {
        setShowCopyAlertState({
            showAlert: false,
            unlockCode: undefined,
            vehicle: undefined
        })
    }

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
                tripFilterModalState.showModal && <EnterCodeModal
                    isOpenFilterModal={tripFilterModalState.showModal}
                    closeHndlr={closeEnterCodeModalHndlr}
                    showSnackbarCallback={showEnterCodeSnackbarCallback}
                    deviceInfo={tripFilterModalState.deviceInfo}
                />
            }
            {
                passwordModalState.showModal && <PasswordModal
                    isOpenFilterModal={passwordModalState.showModal}
                    closeHndlr={closePasswordModalHndlr}
                    showSnackbarCallback={showPasswordSnackbarCallback}
                    deviceInfo={passwordModalState.deviceInfo}
                />
            }
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Heading>Lock Device</Heading>
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box>
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
            {showCopyAlertState.showAlert && <Box style={{ marginTop: 12 }}>
                <Alert severity="success" onClose={closeCopyAlertHndlr}>
                    <span style={{ fontSize: "16px" }}>Use code to {showCopyAlertState?.unlockCode} to unlock the device on Vehicle {showCopyAlertState?.vehicle}.
                    </span>
                </Alert>
            </Box>}
            <Box className={classes.root}>
                <Table className={classes.table}>
                    <TableHeader
                        headings={headCells}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        shouldShowActionMenu={true}
                    />
                    <TableBody>
                        {(isInspectionLoading || isLoadingShowAddress) ? (
                            <TableCell colSpan={8}>
                                <LoadingScreen />
                            </TableCell>
                        ) : (Array.isArray(deviceLocksListState) && (deviceLocksListState.length)) ? (
                            deviceLocksListState.map((info: any, index: number) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={0} key={index}>
                                        <TableCell className={classes.tableBodyCell}>
                                            <Box className={classes.columnView}>
                                                <Span>{info.vehicle}</Span>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">
                                            {
                                                info?.addressDetails ? <Span>{info.addressDetails}</Span> :
                                                    <Button
                                                        size="small"
                                                        variant="text"
                                                        style={{ fontWeight: "bold" }}
                                                        onClick={() => showAddressHndlr(info?.id)}
                                                    >Show Address</Button>
                                            }

                                        </TableCell>
                                        <TableCell>
                                            {(info?.lock_status === "Unlocked") ? <Button
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                                // variant="contained"
                                                // style={{ background: "#2e7d32" }}
                                                onClick={() => unlockDeviceModalHndlr(info)}
                                            >
                                                <LockOpenIcon sx={{ mr: 0.5 }} fontSize="small" />
                                                Unlock
                                            </Button> : <Span fontType="secondary">
                                                {info?.lock_status}
                                            </Span>}

                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Keypad Unlock">
                                                <IconButton onClick={() => unlockDeviceWithCodeBtnHnldr(info)}>
                                                    <KeyboardIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <ActionMenu menu={actionMenuItems} id={info?.id} />
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
