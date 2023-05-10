import { makeStyles } from "@mui/styles";
import COLORS from "../../../constants/colors";

export default makeStyles({
    positionRelative: {
        position: "relative",
    },
    headingWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${COLORS.BORDER_GREY}`,
        padding: 24,
    },
    headingContent: {
        display: "flex",
        alignItems: "center",
    },
    headingBackButton: {
        border: `1px solid ${COLORS.BORDER_GREY} !important`,
        marginRight: "16px !important",
    },
    padding_24: {
        padding: 24,
    },
    marginBottom_24: {
        marginBottom: 24,
    },
    label: {
        fontWeight: 200,
        marginBottom: 8,
        fontSize: 16,
    },
    footerWrapper: {
        padding: "16px 24px",
        background: "#F8F8FB",
        display: "flex",
        justifyContent: "flex-end",
        position: "fixed",
        bottom: "0",
        right: "0",
    },
    tableRootContainer: {
        marginTop: 16,
    },
    columnView: {
        display: "flex",
        flexDirection: "column",
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
    footer: {
        marginTop: 24,
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
    noDataView: {
        display: "flex",
        justifyContent: "center",
    },
});
