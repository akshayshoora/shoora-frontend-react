import { Box, Button, IconButton, Typography } from "@mui/material";
import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth } from "constants/RouteMiddlePath";

export function OrganizationDetails() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: org, isLoading } = useQuery(["orgDetails", id], () =>
    getOrgDetails(String(id))
  );

  async function getOrgDetails(id: string) {
    return (await client.get(`${auth}/organizations/${id}/`)).data;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      <Box className={classes.headingWrapper}>
        <Box className={classes.headingContent}>
          <Typography fontSize={24} style={{ textTransform: "capitalize" }}>
            {org.name}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.bodyContent}>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Organization Name:</Box>
          <Box
            className={classes.bodyInfo}
            style={{ textTransform: "capitalize" }}
          >
            {org.name}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Organization ID:</Box>
          <Box className={classes.bodyInfo}>{org.id}</Box>
        </Box>

        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Email:</Box>
          <Box className={classes.bodyInfo}>{org.email ? org.email : "-"}</Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Contact Code:</Box>
          <Box className={classes.bodyInfo}>
            {org.contact_code ? org.contact_code : "-"}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Contact:</Box>
          <Box className={classes.bodyInfo}>
            {org.contact_number ? org.contact_number : "-"}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}> Address:</Box>
          <Box className={classes.bodyInfo}>
            {org.address ? org.address : "-"}
          </Box>
        </Box>

        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Registration No:</Box>
          <Box className={classes.bodyInfo}>
            {org.registration_number ? org.registration_number : "-"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
