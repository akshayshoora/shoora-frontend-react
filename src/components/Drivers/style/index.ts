import { makeStyles } from "@mui/styles";
import COLORS from "../../../constants/colors";

export default makeStyles({
  root: {
    marginTop: 16,
  },
  tableHeading: {
    "&.MuiTableCell-root": {
      padding: "12px 0 12px 16px",
    },
  },
  table: {
    "&.MuiTable-root": {
      borderCollapse: "unset",
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
  },
  verifiedBtn: {
    background: "#2e7d32",
  
  },
});
