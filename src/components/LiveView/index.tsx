import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Snackbar, Alert } from "@mui/material";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import GoogleMap from "components/Map/GoogleMap";
import mapIcon from '../../assets/location.png';
import { monitor, transport } from "constants/RouteMiddlePath";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import { Button, List, ListItemText } from "@mui/material";
import SerachIcon from "../../assets/search-icon.png";
import notFound from "../../assets/404.jpg";
import Iframe from "react-iframe";



export default function () {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4,2, 2),
    color: theme.palette.text.secondary,
    position: "relative",
    boxShadow:'0 0.75rem 1.5rem rgb(18 38 63 / 3%)',
  }));
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
}>({ open: false, variant: "info", message: "" });
  
  const [searchText, setSearchText] =useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const [deviceId, setDeviceId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedDevice, setSelectedDevice] = useState <string[]>([])


  const { data: vehicleList, isLoading:isVehicleLoading } = useQuery(
    ["vehiclelist", page, rowsPerPage, searchText,deviceId],
    () => getVehicles(page, rowsPerPage, searchText)
  );


 async function getVehicles(pageNumber: number, pageSize: number, searchText?: string) {
    let getApiUrl = `${transport}/vehicles/?page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;

   
    const response = await client.get(getApiUrl);

    return response.data;
  }
   
  
  const handleVehicleView =(id:string)=>{
   let arr = [...selectedDevice];
  
   if(arr.includes(id)) {
     arr.splice(selectedDevice.indexOf(id), 1);
   } else {
    if(arr.length<8){

     arr = [...selectedDevice, id];
    }
    else{
      setSnackbar({
        open: true,
        variant: "error",
        message: "You can not select more than 8 device",
    });
  }
   }
   setSelectedDevice(arr);
    getLiveUrl(arr)
 
  }

  const getLiveUrl=(arr:string[])=>{
   let url="?device="
   for(let i=0;i<arr.length;i++){
     if(i== arr.length-1){
       url= url.concat(`${arr[i]}`)
     }
     else{
       url= url.concat(`${arr[i]}&device=`)
     }
    }
   setVideoUrl(url)
  }


  return (
    <Box style={{ padding: "20px 0 0 25px" }}>
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
      <Box>
        <Heading>Live View</Heading>
        <Box className={classes.live}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 6, sm: 8, md: 12 }} style={{ marginTop: 24 }}
        >
          <Grid xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
            <Item elevation={1}>
            <Box className="contentMain">
        <Box className="searchbar" style={{ padding: "20px 15px" }}>
          <input
            className="searchField"
            placeholder="Search Asset ID"
            type="search"
          />
          <Button className="searchBtn">
            <img src={SerachIcon} height={24} width={24} alt="" />
          </Button>
        </Box>
        <List component="nav" aria-label="search user">
          
          <ListItemText primary="All" />
          <ListItemText primary="Active assets" />
          <ListItemText primary="Unreachable Assets" />
          <ListItemText primary="Inactive assets" />
        </List>
          <Box className="notfound">
            
            <div className="contendata">
              
                {!isVehicleLoading && vehicleList?.results.map((item:any,index:number) =>(
            <div className="loaddata" style={selectedDevice.includes(item.device) ? {background:'#fef8f0'} : {}}> 
          
              <i className="circle"></i><span className="trackid">{item.vin}</span><span className="arrowright" onClick={()=>{handleVehicleView(item.device)}}><svg width="17" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 7.726h-15M9.7 1.701l6.05 6.024L9.7 13.75" stroke="#3BB3C3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
             
               </div>
               
                ))}
                {!isVehicleLoading && !vehicleList?.results.length && 
                  <div className="notfoundimg"> <img src={notFound} width={200} alt="" /></div>
                 }
  
            </div>
          </Box>
      </Box>
            </Item>
          </Grid>
          <Grid xs={2} sm={9} md={9} style={{ paddingLeft: 24 }}>
            <Item elevation={0}>
            <Box style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
        width:"100%"
			}}
      >
        <Iframe
				url={`http://livefeed.shoora.com/videofeed/${videoUrl == "" ? "?device=" : videoUrl}&email=its@its.com&password=123456`}
				position="relative"
				width="100%"
				id="myId"
				className="myClassname"
				height="100%"
			/>
      </Box>
            </Item>
          </Grid>
        </Grid>
        </Box>
      </Box>
    </Box>
  );
}
