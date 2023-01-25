import { makeStyles } from "@mui/styles";
import COLORS from "../../../../constants/colors";

export default makeStyles({
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
  numberOfRows: {
    display: "flex",
    alignItems: "center",
  },
  dropDown: {
    marginLeft: 16,
  },
  tableHeading: {
    "&.MuiTableCell-root": {
      padding: "12px 0 12px 16px",
    },
  },
  multiColumnTableHeading: {
    "&.MuiTableCell-root": {
      padding: "12px 0 12px 16px",
      borderRight: "1px solid #e0e0e0"
    },
  },
  multiColumnTableChildHeading: {
    "&.MuiTableCell-root": {
      padding: "8px 0px 8px 16px",
      whiteSpace: "nowrap",
      borderRight: "1px solid #e0e0e0"
    },
  }
});
