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
import { useQuery,useMutation } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths,Actions } from "../../constants/commonEnums";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess} from "utils/FeatureCheck";
import { auth,transport } from "constants/RouteMiddlePath";

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
  const { user } = useAppContext();

  const isAdd=actionAccess(AppPaths.USERS,Actions.ADD)
  const isEdit=actionAccess(AppPaths.USERS,Actions.EDIT)
  const isDelete=actionAccess(AppPaths.USERS,Actions.DELETE)
  
  
  const navigate = useNavigate();

  
  const classes = useStyles();
  async function getVehicles(pageNumber: number, pageSize: number, searchText?: string) {
    let getApiUrl = `${transport}/vehicles/?page=${
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
    getVehicles(page, rowsPerPage, searchText)
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
      access:true
    },
    { label: "Edit", icon: <EditOutlinedIcon />, onClick: editVehicleDetails,access:isEdit },
    {
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon />,
      onClick: handleOpenDelete,
      access:isDelete
    },
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "vehicle_type",
      numeric: false,
      disablePadding: true,
      label: "Vehicle Type",
    },
    {
      id: "make",
      label: "Made By",
      numeric: false,
      disablePadding: false,
    },
    { id: "model", label: "Model", numeric: false, disablePadding: false },
    {
      id: "vin",
      label: "VIN Code",
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
    onSuccess: () =>{
       handleClose()
        setSnackbar({
            open: true,
            variant: "success",
            message: "vehicle deleted.",
        })
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

const { mutate: mutateDeleteVehicle } =deleteVehicleMutation;

function deleteVehicle() {
  return client.delete(`${auth}/users/${deleteId}`)
}


     function handleDelete() {
      mutateDeleteVehicle()
       
    }
   



  return (
    <Box style={{ padding: "20px 20px 20px 40px" }}>
      {openDelete && <DeleteModal open={openDelete} handleClose={handleClose}   handleDelete={handleDelete} label="vehicle"/>}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Vehicles</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: isAdd ? 12 : 0
             }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Vehicle Name"
            />
          </Box>
          {isAdd ? (
            <Button
              variant="contained"
              style={{ background: COLORS.GRADIENT, color:COLORS.WHITE }}
              onClick={addVehicle}
            >
              <AddIcon />
              add vehicle
            </Button>
          ) : null} 
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
            ) : vehicleList?.results.length ? (
              vehicleList?.results.map((vehicle: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{vehicle.vehicle_type}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {vehicle.make}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{vehicle.model}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{vehicle.vin}</Span>
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
    </Box>
  );
}
