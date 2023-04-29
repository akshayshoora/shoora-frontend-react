import * as React from "react";
import {
  Alert,
  Snackbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Span from "components/commonComponent/Span";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import COLORS from "../../constants/colors";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { stringCheckForTableCell } from "utils/StringCheck";
import { useAppContext } from "ContextAPIs/appContext";
import VerifiedIcon from '@mui/icons-material/Verified';
import Download from "@mui/icons-material/Download";
import { getDateDisplayFormat } from "../../utils/calenderUtils";

import {
  HeadCell,
  Order,
  TableFooter,
  TableHeader,
} from "components/commonComponent/Table";
import ActionMenu, {
  MenuType,
} from "components/commonComponent/Table/ActionMenu";
import { useQuery, useMutation } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths, Actions } from "../../constants/commonEnums";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess } from "utils/FeatureCheck";
import { auth, transport } from "constants/RouteMiddlePath";
import { getDateTime } from "utils/calenderUtils";

export default function Vehicles() {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: vehicleList, isLoading } = useQuery(
    ["vehicle", page, rowsPerPage, searchText],
    () => getVehicles(page, rowsPerPage, searchText)
  );
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("vehicle");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [verifyVehicleId, setVerifyVehicleId] = React.useState<string>("");
  const { user } = useAppContext();

  const isAdd = actionAccess(AppPaths.VEHICLES, Actions.ADD);
  const isEdit = actionAccess(AppPaths.VEHICLES, Actions.EDIT);
  const isDelete = actionAccess(AppPaths.VEHICLES, Actions.DELETE);

  const navigate = useNavigate();

  const classes = useStyles();
  async function getVehicles(
    pageNumber: number,
    pageSize: number,
    searchText?: string
  ) {
    let getApiUrl = `${transport}/vehicles/?page=${pageNumber + 1
      }&page_size=${pageSize}&search=${searchText}`;

    const response = await client.get(getApiUrl);

    return response.data;
  }

  const handleOpenDelete = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setDeleteId(id);
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenDelete(false);
    getVehicles(page, rowsPerPage, searchText);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    vehicle: string
  ) => {
    const isAsc = orderBy === vehicle && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    //@ts-ignore
    setOrderBy(vehicle);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function openVehicleDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.VEHICLES}/${id}`);
  }

  function editVehicleDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.VEHICLES}/${SubPaths.EDIT}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openVehicleDetails,
      access: true,
    },
    // { label: "Edit", icon: <EditOutlinedIcon />, onClick: editVehicleDetails,access:isEdit },
    // {
    //   label: "Delete",
    //   icon: <DeleteOutlineOutlinedIcon />,
    //   onClick: handleOpenDelete,
    //   access:isDelete
    // },
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "vin",
      label: "Vehicle Number",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "make",
      label: "Make By",
      numeric: false,
      disablePadding: false,
    },
    { id: "model", label: "Model", numeric: false, disablePadding: false },
    {
      id: "last_data_received",
      label: "Last Data Recieved",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "verify_vehicle",
      label: "Verify Vehicle",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "status",
      label: "Status",
      numeric: false,
      disablePadding: false,
    },
  ];

  function addVehicle() {
    navigate(`/${AppPaths.VEHICLES}/${SubPaths.ADD}`);
  }
  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };

  const deleteVehicleMutation = useMutation(deleteVehicle, {
    onSuccess: () => {
      handleClose();
      setSnackbar({
        open: true,
        variant: "success",
        message: "vehicle deleted.",
      });
      setTimeout(() => {
        navigate(`/${AppPaths.VEHICLES}`);
      }, 1000);
    },

    onError: () =>
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      }),
  });
  const verifyVehicleMutation = useMutation(verifyVehicleApiCall, {
    onSuccess: (data: any, context: any) => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Vehicle verified successfully.",
      });
      if (typeof (context) === "string") {
        setTimeout(() => {
          navigate(`/${AppPaths.VEHICLES}/${context}`);
        }, 1000);
      }
    },
    onError: () => {
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      })
    }
  });

  const { mutate: mutateDeleteVehicle, isLoading: inProgressVerifyVehicle } = deleteVehicleMutation;
  const { mutate: mutateVehicle } = verifyVehicleMutation;


  function deleteVehicle() {
    return client.delete(`${auth}/users/${deleteId}`);
  }

  function verifyVehicleApiCall(vehicleId: (string | undefined)): any {
    return client.get(`${transport}/vehicles/${vehicleId}/verify/`);
  }

  function verifyVehicleHndlr(vehicleId: (string | undefined)) {
    setVerifyVehicleId(vehicleId || "");
    mutateVehicle(vehicleId);
  }

  function handleDelete() {
    mutateDeleteVehicle();
  }


  async function downloadBtnHndlr() {
    try {
      const vehicleCsvData = await client.get(`${transport}/vehicles/download/`);
      const currentDate = new Date().toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(vehicleCsvData.data);
      hiddenElement.target = '_blank';
      hiddenElement.download = `vehicle-report-${currentDate}.csv`;
      hiddenElement.click();
    }
    catch (e) {
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      })
    }
  }

  return (
    <Box style={{ padding: "80px 20px 20px 40px" }}>
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
      {openDelete && (
        <DeleteModal
          open={openDelete}
          handleClose={handleClose}
          handleDelete={handleDelete}
          label="vehicle"
        />
      )}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Vehicles</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: isAdd ? 12 : 0 }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Vehicle Name"
            />
          </Box>
          {/* {isAdd ? (
            <Button
              variant="contained"
              style={{ color:COLORS.WHITE }}
              onClick={addVehicle}
            >
              <AddIcon />
              add vehicle
            </Button>
          ) : null}  */}
          <Button
            variant="contained"
            sx={{ ml: 1 }}
            style={{ background: "#1d6f42", color: COLORS.WHITE }}
            onClick={downloadBtnHndlr}
          >
            <Download />
          </Button>
        </Box>
      </Box>
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
            {(isLoading || inProgressVerifyVehicle) ? (
              <TableCell colSpan={8}>
                <LoadingScreen />
              </TableCell>
            ) : vehicleList?.results.length ? (
              vehicleList?.results.map((vehicle: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{vehicle.vin}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{vehicle.make}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{vehicle.model}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{getDateTime(vehicle.last_device_status_timestamp)}</Span>
                    </TableCell>
                    <TableCell align="left">
                      {vehicle.can_verify && <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        // variant="contained"
                        // style={{ background: "#2e7d32" }}
                        onClick={() => verifyVehicleHndlr(vehicle?.id)}
                      >
                        <VerifiedIcon sx={{ mr: 0.5 }} fontSize="small" />
                        Verify
                      </Button>}
                      {
                        !vehicle?.can_verify && <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          // style={{ borderColor: "#ed6c02" }}
                          onClick={() => { }}
                        >
                          <VerifiedIcon sx={{ mr: 0.5 }} fontSize="small" />
                          Verified
                        </Button>
                      }
                    </TableCell>
                    <TableCell align="left">
                      <Box component="span" className={vehicle.status === 'moving' ? classes.successLabel : classes.errorLabel}>{vehicle.status}</Box>
                      {/* <Span fontType="secondary">{
                        vehicle.status
                      }</Span> */}
                    </TableCell>

                    <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={vehicle.id} />
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
          totalPages={Math.ceil(vehicleList?.count / rowsPerPage)}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box >
  );
}
