import { makeStyles } from "@mui/styles";
import COLORS from "../../../constants/colors";

export default makeStyles({
    adminContainer: {
        padding: "20px 20px 20px 40px"
    },
    gridBoxContainer: {
        marginTop: 16,
    },
    menuCardContent: {
        padding: "0px !important",
    },
    leftMenuSection: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
        userSelect: "none",
        "& li": {
            padding: "8px 16px",
            borderBottom: "1px solid #e0e0e0",
            cursor: "pointer",
            color: "#746E97",
            fontSize: "14px",
            "&.active, &:hover": {
                backgroundColor: "#ECEBF1",
                color: "#261F5A"
            }
        }
    },
    menuContentHeader: {
        padding: "12px 12px",
        fontWeight: "bolder",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    filterContainer: {
        display: "flex",
        alignItems: "center",
        padding: "12px 12px",
        borderBottom: "1px solid #e0e0e0",
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
        border: "0px",
        // borderRadius: 4,
    },
    tableBodyCell: {
        "&.MuiTableCell-root": {
            padding: "12px 16px",
        },
    },
    tableFooterClass: {
        padding: "6px 12px",
        display: "flex",
        justifyContent: "space-between",
    },
    pagination: {
        "& ul": {
            "& li:first-child": {
                "& button": {
                    width: 32,
                    height: 32,
                    border: `1px solid ${COLORS.SECONDARY_FONT}`,
                },
            },
            "& li": {
                marginRight: 12,
                "& button": {
                    "&.Mui-selected": {
                        background: COLORS.PRIMARY_COLOR,
                    },
                    borderRadius: "50%",
                },
            },
            "& li:last-child": {
                "& button": {
                    width: 32,
                    height: 32,
                    border: `1px solid ${COLORS.SECONDARY_FONT}`,
                },
            },
        },
    },
    numberOfRows: {
        display: "flex",
        alignItems: "center",
    },
    dropDown: {
        marginLeft: 16,
    },

    columnView: {
        display: "flex",
        flexDirection: "column",
    },
    chip: {
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 700,
        "&.MuiChip-root": {
            borderRadius: 4,
        },
    },
    pendingChip: {
        "&.MuiChip-root": {
            color: COLORS.SECONDARY_FONT,
        },
    },
    cancelledChip: {
        "&.MuiChip-root": {
            background: "rgba(250, 87, 36, 0.1)",
        },
    },
    chargingChip: {
        "&.MuiChip-root": {
            background: "rgba(2, 51, 225, 0.1)",
        },
    },
    completedChip: {
        "&.MuiChip-root": {
            background: "rgba(52, 168, 83, 0.1)",
        },
    },
    interruptedChip: {
        "&.MuiChip-root": {
            background: "rgba(213, 74, 31, 0.1);",
        },
    },
    alignedContent: {
        display: "flex",
        alignItems: "center",
    },
    marginLeft_4: {
        marginLeft: 4,
    },
    actionMenu: {
        "& ul": {
            padding: 0,
        },
    },
    popover: {
        minWidth: 260,
    },
    popoverRoot: {
        padding: "12px 24px",
    },
    borderBottom: {
        borderBottom: `1px solid ${COLORS.BORDER_GREY}`,
    },
    centeredContent: {
        alignItems: "center",
    },
    popoverBody: {
        display: "flex",
        justifyContent: "space-between",
    },
    backgroundInfo: {
        background: "#FFF6E7",
    },
    noDataView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "150px"
    },
});
