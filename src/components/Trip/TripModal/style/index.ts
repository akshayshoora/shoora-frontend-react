import { makeStyles } from "@mui/styles";

export default makeStyles({
  alertHead: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    background: "#261F5A",
    color: "#fff",
    "& i": {
      position: "absolute",
      top: "15px",
      right: "15px",
      cursor: "pointer",
    },
    ".MuiAutocomplete-input": {
      width: "100% !important"
    }
  },
  width100: {
    width: "100% !important"
  },

  alertList: {
    padding: "0",
    overflow: "hidden",
    margin: "-28px 0 0 0",
    marginBottom: "10px",
    fontSize: "14px",
    "& li": {
      marginBottom: "10px",
    },
  },
  videoAlert: {
    margin: "10px 0 0 0",
    "& video": {
      width: "465px !important",
      height: "300px !important",
    },
    "& .video-react": {
      maxWidth: "initial",
      width: "465px !important",
      height: "300px",
    },
  },
  alertListInfo: {
    padding: "0",
    listStyle: "none",
    fontSize: "14px",
    margin: "0px",
    "& li": {
      marginBottom: "10px",
    },
  },
  avtarIcon: {
    background: "#eee",
    borderRadius: "10px",
    maxWidth: "100px",
    marginRight: "15px",
    padding: "10px",
  },
  avtarDriveInfo: {
    display: "flex",
    margin: "-25px 0 5px 0",
  },
});
