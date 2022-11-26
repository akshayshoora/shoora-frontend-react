import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import LiveuserMenu from "components/LiveuserMenu";
import LiveMap from "components/LiveMap";


export default function LiveView() {
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
    <Box style={{ padding: "20px 0 0 25px" }}>
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
            <LiveuserMenu />
            </Item>
          </Grid>
          <Grid xs={2} sm={9} md={9} style={{ paddingLeft: 24 }}>
            <Item elevation={0}>
            <LiveMap />
            </Item>
          </Grid>
        </Grid>
        </Box>
      </Box>
    </Box>
  );
}
