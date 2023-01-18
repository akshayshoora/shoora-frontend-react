import { makeStyles } from "@mui/styles";

export default makeStyles({
  disabledImage: {
    opacity: 1,
    maxWidth: "25px",
    background: "white",
    borderRadius: "10px",
    padding: "7px",
  },
  menuIcon: {
    background: "#fff",
    padding: "7px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    "& svg": {
      maxWidth: "25px",
    },
    "& path": {
      fill: "#7a4601",
    },
  },
});
