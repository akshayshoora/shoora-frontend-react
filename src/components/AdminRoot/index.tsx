import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import classNames from "classnames";
import ErrorBoundary from "components/commonComponent/ErrorBoundry";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import NotificationAlert from "components/commonComponent/NotificationAlert";


import Header from "components/Header";
import SidePanel from "components/SidePanel";
import { AppProvider } from "ContextAPIs/appContext";
import { Users } from "Models/userModel";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "router";
import client from "serverCommunication/client";
import { getUserID, getCanPollNotification } from "utils/localStorage";
import ThemeProviderWrapper from "ThemeProviderWrapper";
import useStyles from "./style";
import { auth, monitor } from "constants/RouteMiddlePath";

function AdminRoot() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(
    Boolean(localStorage.getItem("token"))
  );
  const canPollNotification: any = getCanPollNotification();
  const {
    data: user,
    refetch,
    isLoading,
    isError,
  } = useQuery("user", getUser, { refetchOnWindowFocus: false });
  const [alertDetails, setAlertDetails] = useState<any>({
    notificaitonId: "",
    openNotification: false,
    driverName: "",
    alertName: "",
    vehicle: "",
    address: ""
  });

  const timeOutInfo = React.useRef<any>(undefined);
  useEffect(() => {
    async function getAlerts() {
      let getApiUrl = `${monitor}/alerts/?notification=true`;

      const response = await client.get(getApiUrl);
      if (Array.isArray(response?.data?.results)) {
        const { id, alert_name, vehicle, driver, alert_address } = response?.data?.results[0] || {};
        if (alert_name) {
          setAlertDetails((prevState: any) => ({
            openNotification: true,
            notificaitonId: id || "",
            alertName: alert_name,
            driverName: driver?.name || "-",
            vehicle: vehicle || "-",
            address: alert_address || ""
          }));
        }
      }
    }
    if (canPollNotification === "true") {
      getAlerts();
      timeOutInfo.current = setInterval(() => {
        getAlerts();
      }, 600000);
    }
    return () => {
      clearInterval(timeOutInfo.current);
    };
  }, [canPollNotification]);

  const classes = useStyles();

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, [user]);

  async function getUser() {
    const userID = getUserID();
    if (userID) {
      return (await client.get(`${auth}/users/${userID}/`)).data;
    }
    return new Users();
  }

  function getAppBody() {
    return <AppRouter />;
  }

  function handleCloseNotificaiton() {
    setAlertDetails((prevState: any) => ({
      openNotification: false,
      notificaitonId: "",
      alertName: "",
      driverName: "",
      vehicle: "",
      address: ""
    }));
  }

  function setUser() {
    refetch();
  }

  if (isLoading || (!isError && !Boolean(user.id) && getUserID())) {
    return (
      <Box className={classes.loadingScreen}>
        <LoadingScreen />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography style={{ marginBottom: 8 }}>
          Something went wrong!
        </Typography>
        <Button onClick={() => window.location.reload()} variant="outlined">
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component={"div"}
      className={classNames(
        { [classes.displayFlex]: isAuthenticated },
        classes.root
      )}
    >
      <NotificationAlert
        notificationInfo={alertDetails}
        handleCloseNotificaiton={handleCloseNotificaiton} />
      <ThemeProviderWrapper>
        <AppProvider state={{ setUser, user }}>
          <BrowserRouter>
            {Boolean(user.id) ? (
              <>
                <ErrorBoundary>
                  <Box className={classes.sidePanel}>
                    <SidePanel />
                  </Box>
                  <ErrorBoundary>
                    <Box
                      className={classNames(
                        classes.displayFlex,
                        classes.flexColumn,
                        classes.panelBody,
                        classes.mainContent
                      )}
                    >
                      <Box className={classes.header}>
                        <Header />
                      </Box>
                      <ErrorBoundary>
                        <Box>{getAppBody()}</Box>
                      </ErrorBoundary>
                    </Box>
                  </ErrorBoundary>
                </ErrorBoundary>
              </>
            ) : (
              <ErrorBoundary>{getAppBody()}</ErrorBoundary>
            )}
          </BrowserRouter>
        </AppProvider>
      </ThemeProviderWrapper>
    </Box>
  );
}

export default AdminRoot;
