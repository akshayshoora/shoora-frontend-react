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
import { useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths,Actions } from "../../constants/commonEnums";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess} from "utils/FeatureCheck";
import { transport } from "constants/RouteMiddlePath";

export default function Driver() {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: driverList, isLoading } = useQuery(
    ["drivers", page, rowsPerPage, searchText],
    () => getDevices(page, rowsPerPage, searchText)
  );

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("drivers");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const { user } = useAppContext();

  const isAdd=actionAccess(AppPaths.DRIVERS,Actions.ADD)
  const isEdit=actionAccess(AppPaths.DRIVERS,Actions.EDIT)
  const isDelete=actionAccess(AppPaths.DRIVERS,Actions.DELETE)
  
  
  const navigate = useNavigate();

  
  const classes = useStyles();
  async function getDevices(pageNumber: number, pageSize: number, searchText?: string) {
    let getApiUrl = `${transport}/drivers/?page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;

   
    const response = await client.get(getApiUrl);

    return response.data;
  }

  const handleOpenDelete = () => {
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

  function openDriverDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.DRIVERS}/${id}`);
  }

  function editDriverDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.DRIVERS}/${SubPaths.EDIT}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openDriverDetails,
      access:true
    },
    { label: "Edit", icon: <EditOutlinedIcon />, onClick: editDriverDetails,access:isEdit },
    {
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon />,
      onClick: handleOpenDelete,
      access:isDelete
    },
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Driver Name",
    },
    {
      id: "phone_number",
      label: "Phone Number",
      numeric: false,
      disablePadding: false,
    },
    { 
    id: "passport_number", 
    label: "Passport Number", 
    numeric: false,
     disablePadding: false 
    },
    {
      id: "driving_license_number",
      label: "Driving Lincence",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "driver_score",
      label: "Driver Score",
      numeric: false,
      disablePadding: false,
    },
  ];

  function addDriver() {
    navigate(`/${AppPaths.DRIVERS}/${SubPaths.ADD}`);
  }
  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };
  return (
    <Box style={{ padding: "20px 20px 20px 40px" }}>
      {openDelete && <DeleteModal open={openDelete} handleClose={handleClose} label="device"/>}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Devices</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: isAdd ? 12 : 0
             }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Driver by Name or Id"
            />
          </Box>
          {isAdd ? (
            <Button
              variant="contained"
              style={{ background: COLORS.PRIMARY_COLOR, color:COLORS.WHITE }}
              onClick={addDriver}
            >
              <AddIcon />
              add driver
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
            ) : driverList?.results.length ? (
              driverList?.results.map((driver: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{driver.name}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {driver.phone_number}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{driver.passport_number}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{driver.driving_license_number}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{driver.driver_score}</Span>
                    </TableCell>
                   
                    <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={driver.id} />
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
          totalPages={Math.ceil(driverList?.count / rowsPerPage)}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
