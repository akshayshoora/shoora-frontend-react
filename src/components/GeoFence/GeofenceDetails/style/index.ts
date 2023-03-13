import { makeStyles } from "@mui/styles";
import COLORS from "../../../../constants/colors";

export default makeStyles({
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
  bodyContent: {
    padding: 24,
  },
  infoBodyWrapper: {
    display: "flex",
    marginBottom: 18,
  },
  bodyInfoTitle: {
    fontSize: 16,
    fontWeight: 500,
    minWidth: 172,
    color: COLORS.SECONDARY_FONT,
    marginRight: 18,
  },
  bodyInfo: {
    fontSize: 16,
    fontWeight: 500,
    color: COLORS.PRIMARY_FONT,
  },
  connectorsWrapper: {
    padding: "0 24px 24px",
  },
  connectorTitle: {
    "&.MuiTypography-root": {
      fontSize: 20,
      marginBottom: 12,
    },
  },
});
