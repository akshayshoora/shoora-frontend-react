import { makeStyles } from "@mui/styles";
import COLORS from "../../../../constants/colors";

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
  geoFenceContainer: {
    margin: "10px 0 0 0",
    "& input": {
      height: "38px",
      boxSizing: "border-box",
      border: "1px solid #0000003b",
      borderRadius: "4px",
      color: COLORS.BLACK,
      padding: "8px 10px",
    },
    "& fieldset": {
      border: "none",
    },
    "& button[disabled]": {
      color: "#0000003b",
    },
  },
  geoFenceLeft: {
    margin: "8px 0 0 0",
    background: "white",
    padding: "15px",
    borderRadius: "4px",
  },
  geoFenceForm: {
    marginTop: "15px",
    "& h2": {
      marginTop: "0px",
      textTransform: "capitalize",
    },
  },
});
