import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth } from "constants/RouteMiddlePath";

export function UserDetails() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: user, isLoading } = useQuery(["user", id], () =>
    getUserDetails(String(id))
  );

  async function getUserDetails(id: string) {
    return (await client.get(`${auth}/users/${id}/`)).data;
  }

  function GoToBack() {
    navigate(-1);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      <Box className={classes.headingWrapper}>
        <Box className={classes.headingContent}>
          <IconButton
            className={classes.headingBackButton}
            size="small"
            onClick={GoToBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography fontSize={24} style={{ textTransform: "capitalize" }}>
            User Details
          </Typography>
        </Box>
      </Box>
      <Box className={classes.bodyContent}>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>User Name:</Box>
          <Box
            className={classes.bodyInfo}
            style={{ textTransform: "capitalize" }}
          >
            {user.name}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>User ID:</Box>
          <Box className={classes.bodyInfo}>{user.id}</Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Organisation ID:</Box>
          <Box className={classes.bodyInfo}>{user.organization_id}</Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Email:</Box>
          <Box className={classes.bodyInfo}>
            {user.email ? user.email : "-"}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Contact Code:</Box>
          <Box className={classes.bodyInfo}>
            {user.contact_code ? user.contact_code : "-"}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Contact:</Box>
          <Box className={classes.bodyInfo}>
            {user.contact_number ? user.contact_number : "-"}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}> Address:</Box>
          <Box className={classes.bodyInfo}>
            {user.address ? user.address : "-"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
