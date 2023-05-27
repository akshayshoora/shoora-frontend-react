import { makeStyles } from "@mui/styles";

export default makeStyles({
  searchWrapper: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0",
    "& .css-ijt50p": {
      width: "auto",
    },
    "& span": {
      fontSize: "18px !important",
    },
  },
  allReports: {
    borderTop: "1px solid #ECEBF1",
    "& span": {
      background: "#f8f8fb",
      position: "relative",
      top: "-11px",
      padding: "0px 5px",
    },
  },
  allReportView: {
    display: "flex",
    "& .reportBox": {
      boxShadow: "0px 0px 8px rgb(0 0 0 / 10%)",
      borderRadius: "12px",
      marginBottom: "25px",
      // padding: "20px",
      position: "relative",
      "& h3": {
        marginTop: "0px",
        fontSize: "20px",
        fontWeight: "700",
      },
      "& h4": {
        marginBottom: "0px",
      },
      "& p": {
        fontSize: "14px",
        marginBottom: "0px",
      },
      "& .btnWrapper": {
        // position: "absolute",
        // left: "0",
        // right: "0",
        // background: "#fff",
        padding: "15px 20px",
        borderTop: "1px solid #ECEBF1",
        justifyContent: "center",
        display: "flex",
        bottom: "0",
        textAlign: "center",
        opacity: 0.8,
        "& .gbtn": {
          textTransform: "capitalize",
          borderRadius: "50px",
          // width: "60%",
          whiteSpace: "nowrap",
          "& span": {
            display: "none",
          },
        },
      },
      "&:hover": {
        "& .btnWrapper": {
          opacity: 1
        },
      },
    },
  },
  alertHead: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#261F5A",
    alignContent: "center",
    color: "white",
    padding: "10px 15px",
    "& i": {
      cursor: "pointer",
    },
  },
  reportContent: {
    padding: "16px 20px",
    position: "relative",
    "& .cBtn": {
      marginRight: "10px",
      border: "1px solid #eee",
    },
  },
  loadingDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1000
  },
  reportDate: {
    display: "flex",
    justifyContent: "space-between",
    "& .MuiOutlinedInput-root": {
      width: "100%",
    },
    "& input": {
      height: "38px",
      boxSizing: "border-box",
    },
  },
});
