import { makeStyles } from "@mui/styles";
import { capitalize } from "lodash";

export default makeStyles({
    alertHead: {
        display: "flex",
        justifyContent: "space-between",

        backgroundColor: "#ECEBF1",
        alignItems: "center",
        color: "#261F5A",
        padding: "16px",
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
        fontWeight: "bold !important",
        "& .closeIcon": {
            cursor: "pointer",
            fontSize: "20px"
        },

    },
    reportContent: {
        padding: "16px",
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
    }
});
