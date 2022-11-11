import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

interface IPageLoadingProps {
  open: boolean;
  loadingMessage?: string;
}

export default function PageLoading(props: IPageLoadingProps) {
  const { open, loadingMessage } = props;

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Stack gap={1} justifyContent="center" alignItems="center">
          <CircularProgress color="inherit" />
          <Typography>
            {loadingMessage ? loadingMessage : "Loading..."}
          </Typography>
        </Stack>
      </Backdrop>
    </div>
  );
}
