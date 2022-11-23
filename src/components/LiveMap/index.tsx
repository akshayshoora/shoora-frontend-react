import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import GoogleMapReact from 'google-map-react';


export default function LiveMap() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4,2, 2),
    color: theme.palette.text.secondary,
    position: "relative",
    boxShadow:'0 0.75rem 1.5rem rgb(18 38 63 / 3%)',
  }));
  const classes = useStyles();

  return (
    <Box className="livemap">
      <GoogleMapReact 
      style={{ height: `600px` }}
      defaultZoom={10}
      resetBoundsOnResize={true}
      defaultCenter={{ lat: 47.36667, lng: 8.55 }}
    />
    </Box>
  );
}
