import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FilterListIcon from '@mui/icons-material/FilterList';

import TableRow from "@mui/material/TableRow";
import {
  SelectChangeEvent,
  Button,
  Modal,
  Typography,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Span from "components/commonComponent/Span";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import COLORS from "../../constants/colors";
import client from "serverCommunication/client";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { stringCheckForTableCell } from "utils/StringCheck";
import { useAppContext } from "ContextAPIs/appContext";
import GoogleMapReact from "google-map-react";
import { IonAvatar } from "@ionic/react";
import { Player } from "video-react";

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
import { auth, monitor, transport } from "constants/RouteMiddlePath";
import { getDateTime } from "utils/calenderUtils";
import { AlertModal } from "./AlertModal";
import AlertFilterModal from "./AlertFilterModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #261F5A",
  boxShadow: 24,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4, 2, 2),
  color: theme.palette.text.secondary,
  position: "relative",
  boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
  alertHead: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Alerts() {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const alertFilterRef = React.useRef<any>(undefined);
  // const { data: alertList, isLoading } = useQuery(
  //   ["alerts", page, rowsPerPage, searchText],
  //   () => getAlerts(page, rowsPerPage, searchText)
  // );
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("alert");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [alertId, setAlertId] = React.useState<string>("false");
  const [alertFilterModalState, setAlertFilterModalState] = React.useState(false);
  const { user } = useAppContext();

  const isAdd = actionAccess(AppPaths.ALERTS, Actions.ADD);
  const isEdit = actionAccess(AppPaths.ALERTS, Actions.EDIT);
  const isDelete = actionAccess(AppPaths.ALERTS, Actions.DELETE);

  const navigate = useNavigate();

  const classes = useStyles();

  useEffect(() => {
    mutateAlertInfo({ ...alertFilterRef.current, pageNo: page + 1, pageSize: rowsPerPage });
  }, []);
  async function getAlerts(
    pageNumber: number,
    pageSize: number,
    searchText?: string
  ) {
    let getApiUrl = `${monitor}/alerts/?page=${pageNumber + 1
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
    getAlerts(page, rowsPerPage, searchText);
  };

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
    mutateAlertInfo({ ...alertFilterRef.current, pageNo: newPage, pageSize: rowsPerPage });
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    mutateAlertInfo({ ...alertFilterRef.current, pageNo: 1, pageSize: event.target.value });
  };

  function openAlertDetails(event: React.MouseEvent<HTMLElement>, id: string) {
    event.stopPropagation();
    navigate(`/${AppPaths.ALERTS}/${id}`);
  }

  function editAlertDetails(event: React.MouseEvent<HTMLElement>, id: string) {
    event.stopPropagation();
    navigate(`/${AppPaths.ALERTS}/${SubPaths.EDIT}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openAlertDetails,
      access: true,
    },
    {
      label: "Edit",
      icon: <EditOutlinedIcon />,
      onClick: editAlertDetails,
      access: isEdit,
    },
    {
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon />,
      onClick: handleOpenDelete,
      access: isDelete,
    },
  ];

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
    },
    {
      id: "action",
      label: "Action",
      numeric: false,
      disablePadding: false,
    },
  ];

  function addAlerts() {
    navigate(`/${AppPaths.ALERTS}/${SubPaths.ADD}`);
  }
  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };

  const deleteAlertMutation = useMutation(deleteAlert, {
    onSuccess: () => {
      handleClose();
      setSnackbar({
        open: true,
        variant: "success",
        message: "Alert deleted.",
      });
      setTimeout(() => {
        navigate(`/${AppPaths.ALERTS}`);
      }, 1000);
    },

    onError: () =>
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      }),
  });

  const { mutate: mutateDeleteAlert } = deleteAlertMutation;

  function deleteAlert() {
    return client.delete(`${monitor}/alerts/${deleteId}`);
  }

  function handleDelete() {
    mutateDeleteAlert();
  }

  const handleCloseAlert = () => setOpenAlert(false);
  const handleOpenAlert = (id: string) => {
    setAlertId(id);
    setOpenAlert(true);
  };

  //Get Alert API call

  const alertMutationCallbck = useMutation(generateAlertApiCall, {
    onSuccess: (responseData) => {
      setAlertFilterModalState(false);
    },
    onError: () => {
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      })
    }
  });

  async function generateAlertApiCall(tripInfo: any) {
    const { since, until, vehicle_details, driver_details, pageNo = 1, pageSize = 10, ...otherFilter } = tripInfo || {};
    const isoSinceDate = since ? new Date(since).toISOString() : "",
      isoUntilDate = until ? new Date(until).toISOString() : "";
    const params: any = {
      since: isoSinceDate, until: isoUntilDate, ...otherFilter,
      page: pageNo, page_size: pageSize,
    }
    const response = await client.get(`${monitor}/alerts/`, { params });
    return response.data;
  }

  function applyTripFilterHndlr(filterDetails: any) {
    alertFilterRef.current = filterDetails;
    mutateAlertInfo({ ...filterDetails, pageNo: 1, pageSize: rowsPerPage });
  }

  function applyFilterHndlr() {
    setAlertFilterModalState(!alertFilterModalState);
  }
  function closeFilterModalHndlr(event: any, reason: any) {
    if (reason === "backdropClick") {
      return;
    }
    setAlertFilterModalState(false);
  }

  const { mutate: mutateAlertInfo, isLoading: isAlertInfoLoading, data: alertInfoResp } = alertMutationCallbck;
  return (
    <React.Fragment>
      {alertFilterModalState && (
        <AlertFilterModal
          isOpenFilterModal={alertFilterModalState}
          closeFilterModalHndlr={closeFilterModalHndlr}
          applyingFilterProgress={isAlertInfoLoading}
          appliedFilterDetails={alertFilterRef.current}
          applyFilterCallback={applyTripFilterHndlr}
        />
      )}
      <Box style={{ padding: "20px 20px 20px 40px" }}>
        {openDelete && (
          <DeleteModal
            open={openDelete}
            handleClose={handleClose}
            handleDelete={handleDelete}
            label="alert"
          />
        )}

        {openAlert && (
          <AlertModal
            open={openAlert}
            handleClose={handleCloseAlert}
            id={alertId}
          />
        )}
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Heading>Alerts</Heading>

          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box style={{ marginRight: isAdd ? 12 : 0 }}>
              <SearchBox
                onChangeFunc={handleSearchInput}
                placeholder="Search Alerts by Name or Id"
              />
            </Box>
            {isAdd ? (
              <Button
                variant="contained"
                style={{ background: COLORS.GRADIENT, color: COLORS.WHITE }}
                onClick={addAlerts}
              >
                <AddIcon />
                add alert
              </Button>
            ) : null}
            <Tooltip title="Apply Filter">
              <IconButton onClick={applyFilterHndlr}>
                <Badge color="success" variant="dot" invisible={!alertFilterRef.current}>
                  <FilterListIcon />
                </Badge>
              </IconButton>
            </Tooltip>
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
              {isAlertInfoLoading ? (
                <TableCell colSpan={8}>
                  <LoadingScreen />
                </TableCell>
              ) : alertInfoResp?.results.length ? (
                alertInfoResp?.results.map((alert: any, index: number) => {
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
                          {getDateTime(alert.created_at)}
                        </Span>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          style={{ color: COLORS.WHITE }}
                          onClick={() => {
                            handleOpenAlert(alert.id);
                          }}
                        >
                          Details
                        </Button>
                      </TableCell>

                      {/*                    
                    <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={alert.id} />
                    </TableCell> */}
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
            totalPages={Math.ceil(alertInfoResp?.count / rowsPerPage)}
            currentPage={page + 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}
