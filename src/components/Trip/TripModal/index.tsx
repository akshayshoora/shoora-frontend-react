import { Box, Button, Grid, IconButton, Modal, Paper, styled, Typography } from "@mui/material";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth, monitor, transport } from "constants/RouteMiddlePath";
import { getDateTime } from "utils/calenderUtils";
import { Player } from "video-react";
import { IonAvatar } from "@ionic/react";
import GoogleMapReact from "google-map-react";

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

  interface IAlertModalProps {
   open:boolean;
   handleClose: () => void;
   id:string
  }
  
  

export function TripModal(props:IAlertModalProps) {
    const {open ,handleClose,id}=props
    const classes = useStyles();
    const navigate = useNavigate();
   
    const { data: alert, isLoading } = useQuery(["trip_modal_details", id], () =>
        getTripDetails(String(id))
    );

    async function getTripDetails(id: string) {
        return (await client.get(`${monitor}/trip/${id}/`)).data;
    }

    const renderMarkers = (map :any, maps:any) => {
        let marker = new maps.Marker({
         position: { lat: Number(alert.latitude), lng: Number(alert.longitude) },
         map,
         title: 'Hello World!'
         });
         return marker;
       };
    


    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Box>
            <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" className={classes.alertHead} variant="h6" component="h2">
               Alert Details <i onClick={handleClose}>
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
                  src={alert.video_url}
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
              defaultCenter={{ lat: Number(alert.latitude), lng: Number(alert.longitude) }}
              onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}

            />
            </Box>
            </Item>
          </Grid>
        </Grid>
          </Box>
        </Modal>
        </Box>
    );
}
