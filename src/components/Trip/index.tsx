import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent, Button } from "@mui/material";
import Span from "components/commonComponent/Span";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
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
import { useQuery,useMutation } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths,Actions } from "../../constants/commonEnums";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess} from "utils/FeatureCheck";
import { auth,transport } from "constants/RouteMiddlePath";

export default function Trip() {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: tripList, isLoading } = useQuery(
    ["trips", page, rowsPerPage, searchText],
    () => getTrips(page, rowsPerPage, searchText)
  );
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
}>({ open: false, variant: "info", message: "" });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("trip");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const { user } = useAppContext();  
  const navigate = useNavigate();

  
  const classes = useStyles();
  async function getTrips(pageNumber: number, pageSize: number, searchText?: string) {
    let getApiUrl = `${transport}/trips/?page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;

   
    const response = await client.get(getApiUrl);

    return response.data;
  }

  const handleOpenDelete = ( 
    event: React.MouseEvent<HTMLElement>,
    id: string) => {
      setDeleteId(id)
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenDelete(false);
    getTrips(page, rowsPerPage, searchText)
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

  function openTripDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.TRIP}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openTripDetails,
      access:true
    },
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "start_date_time",
      numeric: false,
      disablePadding: true,
      label: "Start Date/Time",
    },
    {
      id: "start_location",
      label: "Start Location",
      numeric: false,
      disablePadding: false,
    },
    { id: "end_location", label: "End Location", numeric: false, disablePadding: false },
    {
      id: "driver",
      label: "Driver",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "incidents",
      label: "Incidents",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "distance",
      label: "Distance (km)",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "duration",
      label: "Duration",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "asset_id",
      label: "Asset ID",
      numeric: false,
      disablePadding: false,
    }
  ];

  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };

  const deleteTripMutation = useMutation(deleteTrip, {
    onSuccess: () =>{
       handleClose()
        setSnackbar({
            open: true,
            variant: "success",
            message: "Trip deleted.",
        })
        setTimeout(() => {
            navigate(`/${AppPaths.TRIP}`);
        }, 1000);
    },
        
    onError: () =>
        setSnackbar({
            open: true,
            variant: "error",
            message: "Something went wrong.",
        }),
});

const { mutate: mutateDeleteTrip } =deleteTripMutation;

function deleteTrip() {
  return client.delete(`${auth}/users/${deleteId}`)
}


function handleDelete() {
  mutateDeleteTrip()
}
   

  return (
    <Box style={{ padding: "20px 20px 20px 40px" }}>
      {openDelete && <DeleteModal open={openDelete} handleClose={handleClose}   handleDelete={handleDelete} label="trip"/>}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Trips</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: 12
             }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Trips"
            />
          </Box>
          
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
            {isLoading ? (
              <TableCell colSpan={8}>
                <LoadingScreen />
              </TableCell>
            ) : tripList?.results.length ? (
              tripList?.results.map((trip: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{trip.vehicle_type}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {trip.make}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{trip.model}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{trip.vin}</Span>
                    </TableCell>
                    
                   
                    <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={trip.id} />
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
          totalPages={Math.ceil(tripList?.count / rowsPerPage)}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
