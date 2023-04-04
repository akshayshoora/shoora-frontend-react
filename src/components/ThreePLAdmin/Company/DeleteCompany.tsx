import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import useStyles from "./deletemodalstyle";
import { COLORS } from "../../../constants/colors";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    zIndex: 200,
    borderRadius: "8px"
};

interface IDeleteModalProps {
    handleClose: () => void;
    handleDelete?: () => void;
    label: string;
}

const AddCompany = React.forwardRef((props: IDeleteModalProps, ref) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Box sx={{ ...style }}>
                <Box className={classes.alertHead}>
                    <Typography
                        style={{ fontSize: "16px", fontWeight: "bold" }}
                        component="h2">Delete</Typography>
                </Box>
                <Box className={classes.deleteBodyContainer}>
                    <Box className={classes.deleteText}>
                        <Typography variant="body1">
                            Are you sure want to delete this {props.label}?
                        </Typography>
                    </Box>
                    <Box className={classes.buttonContainer}>
                        <Box>
                            <Button sx={{ mr: 1 }} onClick={props.handleClose}>Cancel</Button>
                        </Box>
                        <Box>
                            <Button
                                // variant="contained"
                                // color="error"
                                style={{ color: COLORS.ERROR }}
                                onClick={props.handleDelete}
                            >
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </React.Fragment>
    );
})

export default AddCompany;
