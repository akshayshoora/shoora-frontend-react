import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import useStyles from "./style";
import { COLORS } from "../../../constants/colors";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #FFFFFF',
  boxShadow: 24,
  pt: 1,
  px: 2,
  pb: 2,
};

interface IDeleteModalProps {
    handleClose: () => void;
    label: string;
    open: boolean; 
  }

 export function DeleteModal(props:IDeleteModalProps) {
    const classes=useStyles()

  return (
    <React.Fragment>
      <Modal
         
        hideBackdrop
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style}}>
          <Typography variant='h2' >Delete</Typography>
          <Box className={classes.deleteText} >
          <Typography variant='body1'  align='center' >
          Are you sure want to delete this user?
          </Typography>
          </Box>
          <Box className={classes.buttonContainer}>
            
            <Box>
            <Button onClick={props.handleClose}>Cancel</Button>
            </Box>
            <Box >
            <Button style={{ color:COLORS.ERROR }} onClick={props.handleClose}>Delete</Button>
            </Box>
          </Box>
         
        </Box>
      </Modal>
    </React.Fragment>
  );
}

