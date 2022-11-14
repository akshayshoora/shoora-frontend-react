import * as React from "react";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";

import {
  getRoleBasedFilteredSummary,
} from "../.../../../constants/commonConstants";

import client from "serverCommunication/client";
import { useAppContext } from "ContextAPIs/appContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F8F8FB",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  position: "relative",
}));

const StatsIcon = styled("div")(({ theme }) => ({
  float: "right",
  position: "absolute",
  top: 16,
  right: 16,
}));


export default function Summary() {
  // const { data: summary, isLoading } = useQuery(["summary"], () => getStats());
  const { user } = useAppContext();

  const ROLE_BASED_FILTERED_SUMMARY = getRoleBasedFilteredSummary();

  // async function getStats() {
  //   let getApiUrl = "/summary/";

  //   return (await client.get(getApiUrl)).data;
  // }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {ROLE_BASED_FILTERED_SUMMARY.map((item) => {
          return (
            <Grid item xs={2} sm={3} md={3} key={item.dataIndex}>
              <Item elevation={0}>
                <Typography variant="subtitle1" fontSize={12} component="div">
                  {item.label}
                </Typography>
                <Typography variant="h1" mt={1} component="div">
                  
                  {item.value}
                  {item.unit ? (
                    <Typography
                      variant="body1"
                      mt={1}
                      ml={1}
                      color="text.secondary"
                      component="span"
                    >
                      {item.unit}
                    </Typography>
                  ) : (
                    ""
                  )}
                  
                </Typography>
                <StatsIcon><img src={item.icon} alt="" height={32} width={32}/></StatsIcon>
              </Item>
            </Grid>
          );
        
      })}
    </Grid>
  );
}
