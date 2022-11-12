import { makeStyles } from "@mui/styles";
import COLORS from "../../../../constants/colors";

export default makeStyles({
  root: {
    textTransform: "capitalize",
  },
  font_12: {
    fontSize: "12px !important",
    lineHeight: "18px !important",
  },
  font_14: {
    fontSize: "14px !important",
    lineHeight: "20px !important",
  },
  font_16: {
    fontSize: "16px !important",
    lineHeight: "22px !important",
  },
  font_18: {
    fontSize: "18px !important",
    lineHeight: "24px !important",
  },
  primaryFont: {
    color: COLORS.PRIMARY_FONT,
  },
  secondaryFont: {
    color: COLORS.WHITE,
  },
});
