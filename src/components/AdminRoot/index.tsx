import { Box, Button, CircularProgress, Typography } from "@mui/material";
import classNames from "classnames";
import ErrorBoundary from "components/commonComponent/ErrorBoundry";
import LoadingScreen from "components/commonComponent/LoadingScreen";

import Header from "components/Header";
import SidePanel from "components/SidePanel";
import { AppProvider } from "ContextAPIs/appContext";
import { Users } from "Models/userModel";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "router";
import client from "serverCommunication/client";
import { getUserID } from "utils/localStorage";
import ThemeProviderWrapper from "ThemeProviderWrapper";
import useStyles from "./style";

function AdminRoot() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(
    Boolean(localStorage.getItem("token"))
  );
  const {
    data: user,
    refetch,
    isLoading,
    isError,
  } = useQuery("user", getUser, { refetchOnWindowFocus: false });

  const classes = useStyles();

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, [user]);

  async function getUser() {
    const userID = getUserID();
    if (userID) {
      return (await client.get(`/users/${userID}/`)).data;
    }
    return new Users();
  }

  function getAppBody() {
    return <AppRouter />;
  }

  function setUser() {
    refetch();
  }

  if (isLoading || (!Boolean(user.id) && getUserID())) {
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
                        classes.panelBody
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
              <ErrorBoundary>
                {getAppBody()}
              </ErrorBoundary>
            )}
          </BrowserRouter>
        </AppProvider>
      </ThemeProviderWrapper>
    </Box>
  );
}

export default AdminRoot;
