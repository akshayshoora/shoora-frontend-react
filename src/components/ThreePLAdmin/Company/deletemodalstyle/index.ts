import { makeStyles } from "@mui/styles";
import { COLORS } from "../../../../constants/colors";

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
    deleteBodyContainer: {
        padding:"16px"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "end",
    },
    deleteButton: {
        color: "red",
    },
    deleteText: {
        marginBottom: "24px",
    },
});
