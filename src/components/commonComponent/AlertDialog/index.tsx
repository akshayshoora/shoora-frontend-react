import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useStyles from "./style";

interface AlertProps {
  open: boolean;
  closeAlert: () => void;
  title: string;
  message: string;
  setFile: (file: string | null) => void;
}

export default function AlertDialog(props: AlertProps) {
  const [open, setOpen] = React.useState<boolean>(props.open);

  const handleClose = (res: boolean) => {
    setOpen(false);
    props.closeAlert();
    if (res) props.setFile(null);
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.alertDialog}
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => handleClose(true)}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
