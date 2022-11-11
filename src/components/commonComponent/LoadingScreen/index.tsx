import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import useStyles from "./style";

interface ILoadingScreenProps {
  message?: string;
}
function LoadingScreen(props: ILoadingScreenProps) {
  const { message } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress />

      {message ? (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      ) : null}
    </Box>
  );
}

export default LoadingScreen;
