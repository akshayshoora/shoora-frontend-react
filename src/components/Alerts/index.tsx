import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent, Button, Modal, Typography, Grid } from "@mui/material";
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
import GoogleMapReact from 'google-map-react';
import { IonAvatar } from '@ionic/react';
import { Player } from 'video-react';


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
import { auth, monitor, transport } from "constants/RouteMiddlePath";
import { getDateTime } from "utils/calenderUtils";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #261F5A',
  boxShadow: 24,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4,2, 2),
  color: theme.palette.text.secondary,
  position: "relative",
  boxShadow:'0 0.75rem 1.5rem rgb(18 38 63 / 3%)',
  alertHead:{
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Alerts() {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: alertList, isLoading } = useQuery(
    ["alerts", page, rowsPerPage, searchText],
    () => getAlerts(page, rowsPerPage, searchText)
  );
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
}>({ open: false, variant: "info", message: "" });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("alert");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const { user } = useAppContext();

  const isAdd=actionAccess(AppPaths.ALERTS,Actions.ADD)
  const isEdit=actionAccess(AppPaths.ALERTS,Actions.EDIT)
  const isDelete=actionAccess(AppPaths.ALERTS,Actions.DELETE)
  
  
  const navigate = useNavigate();

  
  const classes = useStyles();
  async function getAlerts(pageNumber: number, pageSize: number, searchText?: string) {
    let getApiUrl = `${monitor}/alerts/?page=${
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
    getAlerts(page, rowsPerPage, searchText)
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
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function openAlertDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.ALERTS}/${id}`);
  }

  function editAlertDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.ALERTS}/${SubPaths.EDIT}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openAlertDetails,
      access:true
    },
    { label: "Edit", icon: <EditOutlinedIcon />, onClick: editAlertDetails,access:isEdit },
    {
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon />,
      onClick: handleOpenDelete,
      access:isDelete
    },
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "alert_name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "device_imei",
      label: "Device",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "vehicle",
      label: "vehicle",
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
      id: "address",
      label: "Address",
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
    onSuccess: () =>{
       handleClose()
        setSnackbar({
            open: true,
            variant: "success",
            message: "Alert deleted.",
        })
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

const { mutate: mutateDeleteAlert } =deleteAlertMutation;

function deleteAlert() {
  return client.delete(`${monitor}/alerts/${deleteId}`)
}

  function handleDelete() {
    mutateDeleteAlert()
      
  }
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false); 

  const renderMarkers = (map :any, maps:any) => {
    let marker = new maps.Marker({
     position: { lat: 25.28, lng: 81.54 },
     map,
     title: 'Hello World!'
     });
     return marker;
   };

  return (
    <Box style={{ padding: "20px 20px 20px 40px" }}>
      {openDelete && <DeleteModal open={openDelete} handleClose={handleClose}   handleDelete={handleDelete} label="alert"/>}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Alerts</Heading>
       
        <Button onClick={handleOpenModal}>Active Safety Query</Button>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" className={classes.alertHead} variant="h6" component="h2">
               Active Safety Query <i onClick={handleCloseModal}>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.9" filter="url(#filter0_d_2762_100820)">
              <path d="M18 6L6 18M6 6L18 18" stroke="#fff" stroke-linecap="square"/>
              </g>
              <defs>
              <filter id="filter0_d_2762_100820" x="-4" y="-2" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2762_100820"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2762_100820" result="shape"/>
              </filter>
              </defs>
              </svg></i>
            </Typography>
            <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 6, sm: 8, md: 12 }} style={{ marginTop: 24 }}
        >
          <Grid xs={2} sm={6} md={6} style={{ paddingLeft: 24 }}>
            <Item elevation={1}>
              <ul className={classes.alertList}>
                <li><span>HR74B0776</span></li>
                <li><span>Physiological Fatigue alarmLevel Two</span></li>
                <li><span>69(KM/H)</span></li>
                <li><span>2022-12-14 22:17:02</span></li>
                <li><span>KDGPL</span></li>
                <li><span>24.415401, 73.632181</span></li>
                <li><span>24.415401, 73.632181</span></li>
              </ul>
              <Box className={classes.videoAlert}>
              <Player
                  autoPlay
                  poster="/assets/poster.png"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
              </Box>
            </Item>
          </Grid>
          <Grid xs={2} sm={6} md={6} style={{ paddingLeft: 24 }}>
            <Item elevation={0}>
              <Box className={classes.avtarDriveInfo}>
              <IonAvatar className={classes.avtarIcon}>
               <img alt="avtar icon" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <ul className={classes.alertListInfo}>
                <li><span>Driver Name:</span></li>
                <li><span>Contact Details: </span></li>
                <li><span>Licence No:</span></li>
              </ul>
              </Box>
            <Box className="livemap">
              <GoogleMapReact 
              // bootstrapURLKeys={{ key: 'YOUR KEY' }}
              style={{ height: `300px` }}
              defaultZoom={10}
              resetBoundsOnResize={true}
              defaultCenter={{ lat: 25.28, lng: 81.54 }}
              onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}

            />
            </Box>
            </Item>
          </Grid>
        </Grid>
          </Box>
        </Modal>


        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: isAdd ? 12 : 0
             }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Alerts by Name or Id"
            />
          </Box>
          {isAdd ? (
            <Button
              variant="contained"
              style={{ background: COLORS.GRADIENT, color:COLORS.WHITE }}
              onClick={addAlerts}
            >
              <AddIcon />
              add alert
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
            ) : alertList?.results.length ? (
              alertList?.results.map((alert: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{alert.alert_name}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {alert.device_imei}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{alert.vehicle}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{getDateTime(alert.created_at)}</Span>
                    </TableCell>
                    <TableCell align="left">
                    <Button
                    variant="contained"
                    style={{ color:COLORS.WHITE }}
                    >
                      Get Address
                    </Button>
                    </TableCell>
                    
                   
                    <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={alert.id} />
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
          totalPages={Math.ceil(alertList?.count / rowsPerPage)}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
