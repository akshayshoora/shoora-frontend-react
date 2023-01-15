import * as React from 'react';

import {
  Autocomplete,
  Box,
  Grid,
  TextField,
  Modal,
  Button,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import useStyles from "./style";
import { auth,transport } from "constants/RouteMiddlePath";
import LoadingScreen from 'components/commonComponent/LoadingScreen';
import client from "serverCommunication/client";
import { useQuery } from 'react-query';



interface IGeofenceProps {
  handleClose: () => void;
  selectedItem: any[];
  open: boolean;
}

export function GeoFenceModal(props: IGeofenceProps) {
  const [selelectedName, setSelelectedName] = React.useState<any>();

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #FFFFFF',
    boxShadow: 24,
    pt: 1,
    px: 2,
    pb: 2,
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [geoVehicleList,setGeoVehicleList]=React.useState<any[]>([]);


  const [rqstBody,setRqstBody]=React.useState<any>({
    alertType:"",
    vehicle:[]
  })

  const { data: vehicleList, isLoading } = useQuery(
    ["vehicle", page, rowsPerPage, searchText],
    () => getVehicles(page, rowsPerPage, searchText)
  );

  async function getVehicles(pageNumber: number, pageSize: number, searchText?: string) {
    let getApiUrl = `${transport}/vehicles/?page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;

   
    const response = await client.get(getApiUrl);

    return response.data;
  }

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
  const classes = useStyles()
  //   const { data: alert, isLoading } = useQuery(["alert_modal_details", id], () =>
  //   getAlertDetails(String(id))
  // );
  console.log(props.selectedItem, 'selected item');
  // const options = [
  //   { label: 'The Godfather', id: 1 },
  //   { label: 'Pulp Fiction', id: 2 },
  // ];
  React.useEffect(() => {
    if(!props.selectedItem) return;
    setSelelectedName(props.selectedItem)
  }, [props.selectedItem]);

  const options = [
    {
        "id": "1",
        "url": "http://admin.shoora.com/transport/api/v1/vehicles/1e/",
        "label": "EICHER",
        "model": "2517",
        "vin": "HR55AM1495",
        "vehicle_type": "Truck",
        "organization": "Instant Transport",
        "branch": null,
        "device": "784087664163",
        "status": "stopped",
        "last_device_status_timestamp": "2023-01-14T15:18:48Z",
        "driver": "Test Driver"
    },
    {
        "id": "86726808-78a5-43e9-807d-0345b7e76586",
        "url": "http://admin.shoora.com/transport/api/v1/vehicles/86726808-78a5-43e9-807d-0345b7e76586/",
        "label": "EICHER",
        "model": "2517",
        "vin": "HR55AM4655",
        "vehicle_type": "Truck",
        "organization": "Instant Transport",
        "branch": null,
        "device": "784087664056",
        "status": "stopped",
        "last_device_status_timestamp": "2023-01-14T15:38:59Z",
        "driver": null
    },
    {
      "id": "86",
      "url": "http://admin.shoora.com/transport/api/v1/vehicles/86726808-78a5-43e9-807d-0345b7e76586/",
      "label": "volvo",
      "model": "2517",
      "vin": "HR55AM4655",
      "vehicle_type": "Truck",
      "organization": "Instant Transport",
      "branch": null,
      "device": "784087664056",
      "status": "stopped",
      "last_device_status_timestamp": "2023-01-14T15:38:59Z",
      "driver": null
  },
   
]
const alertOptions =[{
  id:1,
  label: "IN_ALERT"
},{
  id:2,
  label: "OUT_ALERT"
},{
  id:3,
  label: "OUT_ALERT"
}]

React.useEffect(()=>{
  if(!vehicleList) return;
  let filterArr : any[] =[];
  const arrVehicle= vehicleList.results;
  for(let i in arrVehicle){
    console.log(arrVehicle[i])
    filterArr.push({label:arrVehicle[i]?.make,id:arrVehicle[i]?.id})
    setGeoVehicleList(filterArr)
  }
},[vehicleList]);

React.useEffect(()=>{console.log(rqstBody)},[rqstBody])

  return (

    <Box>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              className={classes.alertHead}
              variant="h6"
              component="h2"
            >
             Assign Vehicle{" "}
              <i onClick={props.handleClose}>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.9" filter="url(#filter0_d_2762_100820)">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#fff"
                      stroke-linecap="square"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2762_100820"
                      x="-4"
                      y="-2"
                      width="32"
                      height="32"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2762_100820"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2762_100820"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </i>
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 6, sm: 8, md: 12 }}
              style={{ marginTop: -20 }}
            >
              <Grid xs={12} sm={12} md={12} style={{ paddingLeft: 24 }}>
                <Item elevation={1}>
                  <Box >
                    <Typography
                    >Geofence name : {selelectedName?.name}</Typography>
                    <Autocomplete
                    multiple
                     id="combo-box-demo"
                      options={geoVehicleList}
                      style={{
                        marginTop:"20px",
                        marginBottom:"10px"

                      }}
                      //onChange={(event, value) => setRqstBody((prev :any)=>({...prev,vehicle :value }) )}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="select vehicle" />}
                    />
                  </Box>
                  <Box >
                    <Autocomplete
                    
                     id="combo-box-demo"
                      options={alertOptions}
                      style={{
                        marginTop:"20x",
                        marginBottom:"10px"
                      }}
                     onChange={(event, value) => setRqstBody((prev :any)=>({...prev,alertType :value?.label }) )}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Alert type" />}
                    />
                  </Box>
                  <Button
                        variant="contained"
                        style={{ color: "#fff" ,marginTop:"5px"}}
                        
                      >
                        Save
                      </Button>
                </Item>
            
              </Grid>
            </Grid>
          </Box>
        )}
      </Modal>
    </Box>
  );
}

