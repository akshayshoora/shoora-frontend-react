import {
    Alert,
    Snackbar,
  } from "@mui/material";
  import * as React from "react";
  import Box from "@mui/material/Box";
  import { Typography } from '@mui/material';
  import Table from "@mui/material/Table"; 
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
  import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
  import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
  import VerifiedIcon from '@mui/icons-material/Verified';
  import TableRow from "@mui/material/TableRow";
  import useStyles from "components/Trip/style";
  import { SelectChangeEvent, Button } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";
  import { AppPaths, SubPaths, Actions } from "constants/commonEnums";
  import Download from "@mui/icons-material/Download";
  import Span from "components/commonComponent/Span";
  import Heading from "components/commonComponent/Heading";
  import SearchBox from "components/commonComponent/SearchField";
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
  import { useMutation, useQuery } from "react-query";
  import { useSearchParams, useNavigate } from "react-router-dom";
  import { DeleteModal } from "components/commonComponent/DeleteModal";
  import { actionAccess } from "utils/FeatureCheck";
  import { auth, transport } from "constants/RouteMiddlePath";
  
  import { typreData } from "components/Tyre/helper";
import AllocationDetails from "../AllocationDetails";
  
  export default function Configuration (){
    const [searchText, setSearchText] = React.useState("");
    const [snackbar, setSnackbar] = React.useState<{
        open: boolean;
        variant: "success" | "error" | "info";
        message: string;
      }>({ open: false, variant: "info", message: "" });
    const [order, setOrder] = React.useState<Order>("asc");
    const navigate = useNavigate();
    const [orderBy, setOrderBy] = React.useState<string>("tyre");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const isAdd = actionAccess(AppPaths.TYRE, Actions.ADD);
  
    const { data: driverList, isLoading } = useQuery(
        ["drivers", page, rowsPerPage, searchText],
        () => getDevices(page, rowsPerPage, searchText)
      );
    const classes = useStyles();
    function openDriverDetails(event: React.MouseEvent<HTMLElement>, id: string) {
    event.stopPropagation();
    navigate(`/${AppPaths.TYRE}/${id}`);
  }
  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };
    async function getDevices(
        pageNumber: number,
        pageSize: number,
        searchText?: string
      ) {
        let getApiUrl = `https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json`;
    
        const response = await client.get(getApiUrl);
    
        return response.data;
      }
    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        drivers: string
      ) => {
        const isAsc = orderBy === drivers && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        //@ts-ignore
        setOrderBy(drivers);
      };
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
      const headCell: readonly HeadCell[] = [
        {
          id: "No.of wheels",
          label: "No.of wheels",
          numeric: false,
          disablePadding: false,
        },
        
      ];
  
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
           <Box style={{ display: "flex", justifyContent: "space-between" }}>
           <Heading>Add tyre configuration</Heading>
            <Box style={{ display: "flex", alignItems: "center" }}>
            </Box>
            </Box>
            <Box className={classes.root}>
        <Table className={classes.table}>
          <TableHeader
            headings={headCell}
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
                    return(
                        <TableRow hover role="checkbox" tabIndex={0} key={index}>
                          <TableCell className={classes.tableBodyCell} align="left">
                            <Box>
                                <span>
                                    {tyre.brand}
                                </span>
                            </Box>
                          </TableCell>
                          <TableCell className={classes.tableBodyCell} align="left">
                          <ActionMenu menu={actionMenuItems} id={tyre.id} />
                            </TableCell>
                        </TableRow>
                    );
                }
            )
            ) : (
                <TableCell colSpan={8}>
                <div className={classes.noDataView}>
                  <Span fontType="secondary">No Data Found</Span>
                </div>
              </TableCell>
            )}
          </TableBody>
            </Table>
            </Box>
            <Box>
                <AllocationDetails/>
            </Box>
        </Box>
      )
    
      
    }