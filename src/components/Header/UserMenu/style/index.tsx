import { makeStyles } from "@mui/styles";
import { COLORS } from "../../../../constants/colors";

export default makeStyles({
  avatarButton: {
    margin: "0 12px !important",
    padding: "0 !important",
    "&:hover": {
      backgroundColor: "white !important",
    },
  },
  avatar: {
    "&.MuiAvatar-root": {
      width: 32,
      height: 32,
      fontSize: 14,
      margin: "0",
      border: "2px solid #ec6929",
      background: "white",
      color: COLORS.SECONDARY_FONT,
      transition: "0.3s",
    },
    "&.MuiAvatar-root:hover": {
      border: "2px solid" + COLORS.PRIMARY_COLOR,
    },
  },
  actionDropdown: {
    "& ul": {
      padding: "0px",
      borderRadius: "4px",
      "& li": {
        margin: "2px 3px !important",
        fontFamily: "Satoshi",
        fontSize: "13px",
        fontWeight: "400",
        lineHeight: "17.55px",
        color: COLORS.PRIMARY_FONT,
        "& svg": {
          width: "16px",
          height: "16px",
          color: COLORS.PRIMARY_FONT,
        },
        "& div": {
          minWidth: "25px !important",
        },
      },
      "& p": {
        margin: "0px",
        marginBottom: "3px",
        fontFamily: "Satoshi",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "16.2px",
        color: COLORS.SECONDARY_FONT,
      },
    },
    "&.MuiMenu-paper": {
      backgroundColor: "red",
    },
  },
  userWrapper: {
    margin: "15px 20px 8px 20px",
  },
  userName: {
    fontSize: "18px !important",
    fontFamily: "Satoshi !important",
    fontWeight: "700 !important",
    lineHeight: "24px !important",
    color: COLORS.PRIMARY_FONT + "!important",
    textTransform: "capitalize",
  },
});
