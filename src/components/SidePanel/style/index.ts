import { makeStyles } from "@mui/styles";
import COLORS from "../../../constants/colors";

export default makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    margin: "0px 0 24px",
    width: "100%",
    padding: "10px 0 0px 0px",
    textAlign: "center",
  },
  menuItem: {
    padding: "10px 8px",
    display: "flex",
    alignItems: "center",
    paddingLeft: 18,
    marginBottom: 16,
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    borderRadius: "11px",
    transition: "0.3s",
    marginLeft: "15px",
    marginRight: "15px",
  },
  menuLabel: {
    marginLeft: 18,
    textTransform: "capitalize",
    // opacity:0,
    transition: "0.3s",
    overflow: "hidden",
    display: "flex",
    whiteSpace: "nowrap",
    "& .MuiTypography-root": {
      color: "white",
    },
  },
  selectedMenuItem: {
    background: "#fff",
    color: "white",
    transition: "0.3s",
    "& span": {
      "& span": {
        color: "#000 !important",
      },
    },
  },
  menu: {
    width: "100%",
    overflowY: "scroll",
    height: "calc(100vh - 90px)",
  },
  supportWrapper: {
    background: COLORS.WHITE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 0",
    borderTop: `1px solid ${COLORS.BORDER_GREY}`,
    cursor: "pointer",
    position: "fixed",
    bottom: 0,
    width: "20%",
    minWidth: 200,
  },
});
