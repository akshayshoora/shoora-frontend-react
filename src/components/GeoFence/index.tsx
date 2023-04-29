import * as React from "react";
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
import { GeoFenceModal } from "./GeoFenceModal";

export default function GeoFence() {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: geofenceList, isLoading } = useQuery(
    ["geofences", page, rowsPerPage, searchText],
    () => getGeofences(page, rowsPerPage, searchText)
  );
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("geofence");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [selectedResult, setSelectedResult] = React.useState<any[]>([]);
  const [openGeofenceModal, setOpenGeofenceModal] =
    React.useState<boolean>(false);
  const { user } = useAppContext();

  const isAdd = actionAccess(AppPaths.GEOFENCE, Actions.ADD);
  const isEdit = actionAccess(AppPaths.GEOFENCE, Actions.EDIT);
  const isDelete = actionAccess(AppPaths.GEOFENCE, Actions.DELETE);

  const navigate = useNavigate();

  const classes = useStyles();
  async function getGeofences(
    pageNumber: number,
    pageSize: number,
    searchText?: string
  ) {
    let getApiUrl = `${transport}/geofences/?page=${pageNumber + 1
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
    getGeofences(page, rowsPerPage, searchText);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    geofence: string
  ) => {
    const isAsc = orderBy === geofence && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    //@ts-ignore
    setOrderBy(geofence);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function openGeofenceDetails(
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.GEOFENCE}/${id}`);
  }

  function editGeofenceDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.GEOFENCE}/${SubPaths.EDIT}/${id}`);
  }

  // const actionMenuItems: MenuType[] = [
  //   {
  //     label: "More Info",
  //     icon: <InfoOutlinedIcon />,
  //     onClick: openGeofenceDetails,
  //     access: true,
  //   },
  //   // { label: "Edit", icon: <EditOutlinedIcon />, onClick: editGeofenceDetails,access:isEdit },
  //   // {
  //   //   label: "Delete",
  //   //   icon: <DeleteOutlineOutlinedIcon />,
  //   //   onClick: handleOpenDelete,
  //   //   access:isDelete
  //   // },
  // ];

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Title",
    },
    {
      id: "geofence-type",
      numeric: false,
      disablePadding: true,
      label: "Geofence Type",
    },
    {
      id: "address",
      label: "Address",
      numeric: false,
      disablePadding: false,
    },

    // { id: "radius", label: "Radius", numeric: false, disablePadding: false },
    // {
    //   id: "created_at",
    //   label: "Created At",
    //   numeric: false,
    //   disablePadding: false,
    // },
    {
      id: "assignVehicle",
      label: "Assign Vehicle",
      numeric: false,
      disablePadding: false,
    },
  ];

  function addGeoFence() {
    navigate(`/${AppPaths.GEOFENCE}/${SubPaths.ADD}`);
  }
  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };

  const deleteGeofenceMutation = useMutation(deleteGeofence, {
    onSuccess: () => {
      handleClose();
      setSnackbar({
        open: true,
        variant: "success",
        message: "Geofence deleted.",
      });
      setTimeout(() => {
        navigate(`/${AppPaths.GEOFENCE}`);
      }, 1000);
    },

    onError: () =>
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      }),
  });

  const { mutate: mutateDeleteGeofence } = deleteGeofenceMutation;

  function deleteGeofence() {
    return client.delete(`${auth}/geofences/${deleteId}`);
  }

  function handleDelete() {
    mutateDeleteGeofence();
  }

  const handleGeofenceModal = (index: any) => {
    if (!geofenceList?.results) return;
    const selctedArray = [...geofenceList?.results];
    setSelectedResult(selctedArray[index]);
    setOpenGeofenceModal(true);
  };

  return (
    <Box style={{ padding: "80px 20px 20px 40px" }}>
      {openDelete && (
        <DeleteModal
          open={openDelete}
          handleClose={handleClose}
          handleDelete={handleDelete}
          label="geofence"
        />
      )}
      {openGeofenceModal && (
        <GeoFenceModal
          handleClose={() => setOpenGeofenceModal(false)}
          open={true}
          selectedItem={selectedResult}
        />
      )}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Geofence</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: 12 }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Geofence Name"
            />
          </Box>

          <Button
            variant="contained"
            style={{ color: COLORS.WHITE }}
            onClick={addGeoFence}
          >
            <AddIcon />
            add geofence
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
            shouldShowActionMenu={false}
          />
          <TableBody>
            {isLoading ? (
              <TableCell colSpan={8}>
                <LoadingScreen />
              </TableCell>
            ) : geofenceList?.results.length ? (
              geofenceList?.results.map((item: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{item.name}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{item.geofenceTypes}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{item.address}</Span>
                    </TableCell>

                    {/* <TableCell align="left">
                      <Span fontType="secondary">
                        {item.created_at ? item.created_at : "-"}
                      </Span>
                    </TableCell> */}
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        style={{ color: COLORS.WHITE }}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => openGeofenceDetails(event, item.id)}
                      >
                        Add Vehicle
                      </Button>
                    </TableCell>
                    {/* <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={item.id} />
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
          totalPages={Math.ceil(geofenceList?.count / rowsPerPage)}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
