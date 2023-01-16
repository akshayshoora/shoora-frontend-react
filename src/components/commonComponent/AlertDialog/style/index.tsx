import { makeStyles } from "@mui/styles";
import { COLORS } from "../../../../constants/colors";

export default makeStyles({
  root: {
    marginTop: 16,
  },
  uploadedImage: {
    "& img": {
      maxWidth: "100%",
      maxHeight: "369px",
      display: "block",
      margin: "0 auto",
    },
  },
  alertDialog: {
    "& .MuiDialogTitle-root": {
      fontFamily: "Satoshi",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "24px",
      lineHeight: "32px",
      color: COLORS.PRIMARY_FONT,
    },
    "& .MuiButtonBase-root": {
      width: "32px",
      height: "32px",
      background: COLORS.PRIMARY_COLOR,
      color: "#ffffff",
    },
    "& .MuiButtonBase-root:first-child": {
      width: "32px",
      height: "32px",
      background: "#F8F8FB",
      color: COLORS.PRIMARY_COLOR,
    },
    "& .MuiButtonBase-root:hover": {
      background: COLORS.PRIMARY_COLOR,
      color: "#ffffff",
    },
  },
});
