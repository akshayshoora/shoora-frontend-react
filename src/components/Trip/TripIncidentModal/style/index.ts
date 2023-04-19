import { makeStyles } from "@mui/styles";
import COLORS from "../../../../constants/colors";

export default makeStyles({
    rootTable: {
        maxHeight: "80vh",
        overflowY: "auto"
    },
    tableHeading: {
        "&.MuiTableCell-root": {
            padding: "12px 0 12px 16px",
        },
    },
    table: {
        "&.MuiTable-root": {
            borderCollapse: "unset",
            "& .MuiTableHead-root": {
                background: COLORS.BORDER_GREY,
            },
        },
        border: "1px solid #e0e0e0",
        borderRadius: 4,
    },
    tableBodyCell: {
        "&.MuiTableCell-root": {
            padding: "12px 16px",
        },
    },
    columnView: {
        display: "flex",
        flexDirection: "column",
    },
    noDataView: {
        display: "flex",
        justifyContent: "center",
    },
    alertHead: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#261F5A",
        alignContent: "center",
        color: "white",
        padding: "10px 15px",
        "& i": {
            cursor: "pointer",
        },
    },
    reportContent: {
        padding: "0px",
        position: "relative",
        "& .cBtn": {
            marginRight: "10px",
            border: "1px solid #eee",
        },
    },
    paddingTableFooter: {
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between"
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

});