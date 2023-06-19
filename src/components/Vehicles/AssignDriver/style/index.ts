import { makeStyles } from "@mui/styles";
import { capitalize } from "lodash";

export default makeStyles({
    alertHead: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#261F5A",
        alignContent: "center",
        color: "white",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        padding: "10px 15px",
        "& i": {
            cursor: "pointer",
        },
    },
    paddingZero: {
        padding: "0 !important"
    },
    reportContent: {
        padding: "16px 20px",
        position: "relative",
        "& .cBtn": {
            marginRight: "10px",
            border: "1px solid #eee",
        },
    },
    loadingDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 1000
    },
    reportDate: {
        display: "flex",
        justifyContent: "space-between",
        "& .MuiOutlinedInput-root": {
            width: "100%",
        },
        "& input": {
            height: "38px",
            boxSizing: "border-box",
        },
    }
});
