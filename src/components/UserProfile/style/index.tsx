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
});
