import {
  Alert,
  Snackbar,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
import {
  HeadCell,
  Order,
  TableFooter,
  TableHeaderTyre,
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
//Helper
import { typreData } from "./helper";

export default function Driver() {
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: driverList, isLoading } = useQuery(
    ["drivers", page, rowsPerPage, searchText],
    () => getDevices(page, rowsPerPage, searchText)
  );
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
  async function getDevices(
    pageNumber: number,
    pageSize: number,
    searchText?: string
  ) {
    let getApiUrl = `${transport}/drivers/?page=${pageNumber + 1
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
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function openDriverDetails(event: React.MouseEvent<HTMLElement>, id: string) {
    event.stopPropagation();
    navigate(`/${AppPaths.TYRE}/${id}`);
  }

  function editDriverDetails(event: React.MouseEvent<HTMLElement>, id: string) {
    event.stopPropagation();
    navigate(`/${AppPaths.TYRE}/${SubPaths.EDIT}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openDriverDetails,
      access: true,
    },
    // {
    //   label: "Edit",
    //   icon: <EditOutlinedIcon />,
    //   onClick: () => { },
    //   access: isEdit,
    // },
    // {
    //   label: "Delete",
    //   icon: <DeleteOutlineOutlinedIcon />,
    //   onClick: () => { },
    //   access: isDelete,
    // },
  ];

  const headCells: any = [
    {
      id: "customer_tyre_ref",
      numeric: false,
      disablePadding: true,
      alignment: "center",
      label: "CUSTOMER TYRE REF",
      colSpan: 1
    },
    {
      id: "mrf_tyre_ref",
      label: "MRF TYRE REF",
      numeric: false,
      disablePadding: false,
      rowSpan: 2
    },
    {
      id: "tyre",
      label: "Tyre",
      numeric: false,
      disablePadding: false,
      alignment: "center",
      colSpan: 5
    },
    {
      id: "tyre_serial_number",
      label: "TYRE Serial No",
      numeric: false,
      disablePadding: false,
      alignment: "center",
      rowSpan: 2,
    },
    {
      id: "status",
      label: "Status",
      numeric: false,
      disablePadding: false,
      rowSpan: 2
    }
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

  const verifyDriverMutation = useMutation(verifyDriver, {
    onSuccess: (data: any, context: any) => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Driver verified successfully.",
      });
      if (typeof (context) === "string") {
        setTimeout(() => {
          navigate(`/${AppPaths.DRIVERS}/${context}`);
        }, 1000);
      }
    },
    onError: () =>
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      }),
  });

  const { mutate: mutateDeleteUser } = deleteUserMutation;
  const { mutate: mutateVerifyDriver } = verifyDriverMutation;

  function deleteUser() {
    return client.delete(`${transport}/drivers/${deleteId}`);
  }

  function verifyDriver(driverId: any): any {
    return client.get(`${transport}/drivers/${driverId}/verify/`);
  }

  function handleDelete() {
    mutateDeleteUser();
  }

  function verifyDriverHndlr(driverId: any) {
    mutateVerifyDriver(driverId);
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
      {openDelete && (
        <DeleteModal
          open={openDelete}
          handleClose={handleClose}
          label="driver"
          handleDelete={handleDelete}
        />
      )}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Tyre Claims</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: isAdd ? 12 : 0 }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Typre Ref"
            />
          </Box>
          {isAdd ? (
            <Button
              variant="contained"
              style={{ background: COLORS.PRIMARY_COLOR, color: COLORS.WHITE }}
              onClick={addDriver}
            >
              <AddIcon />
              Add Claim
            </Button>
          ) : null}
        </Box>
      </Box>
      <Box className={classes.root}>
        <Table className={classes.table}>
          <TableHeaderTyre
            headings={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            shouldShowActionMenu={true}
          />
          <TableBody>
            {isLoading ? (
              <TableCell colSpan={8}>
                <LoadingScreen />
              </TableCell>
            ) : typreData.length ? (
              typreData.map((tyre: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="center">
                      <Box className={classes.columnView}>
                        <Span>{tyre.ucNo}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{tyre.refType}</Span>
                    </TableCell>
                    {/* <TableCell align="center">
                      <Span fontType="secondary">{tyre.passport_number}</Span>
                    </TableCell> */}

                    <TableCell align="center">
                      <Span fontType="secondary">
                        {tyre?.brand}
                      </Span>
                    </TableCell>
                    <TableCell align="center">
                      <Span fontType="secondary"> {tyre?.size}</Span>
                    </TableCell>
                    <TableCell align="center">
                      <Span fontType="secondary">
                        {tyre?.pr}
                      </Span>
                    </TableCell>
                    <TableCell align="center">
                      <Span fontType="secondary">
                        {tyre?.pattern}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {tyre?.setType}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {tyre?.tyreSerialNo}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {tyre?.status}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={tyre.id} />
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
          totalPages={1}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
