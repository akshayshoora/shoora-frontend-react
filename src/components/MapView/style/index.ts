import { makeStyles } from "@mui/styles";
import COLORS from "../../../constants/colors";

export default makeStyles({
  root: {
    marginTop: 16,
  },
  live: {
    color: COLORS.BLACK,
    "& .MuiPaper-elevation": {
      padding: "0px !important",
    },
    "& .searchbar": {
      display: "flex",
      alignItem: "center",
      "& .searchField": {
        width: "100%",
        height: "44px",
        border: "1px solid #ddd",
        padding: "0 58px 0 10px",
        "&:focus": {
          outline: "none",
          border: "1px solid #eda43f",
        },
      },
      "& .searchBtn": {
        border: "none",
        padding: "0",
        marginLeft: "-64px",
      },
    },
    "& .contentMain": {
      "& .MuiFormControl-fullWidth": {
        // display:'flex',
        margin: "0 15px 17px",
        width: "calc(100% - 30px)",
        // overflowY:'scroll',
        // whiteSpace:'nowrap',
      },
      "& .notfound": {
        padding: "0 15px",
        textAlign: "center",
        "& .loaddata": {
          display: "flex",
          padding: "7px 10px",
          borderBottom: "1px solid #ddd",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "3px",
          "&:hover": {
            background: "#fef8f0",
          },
          cursor: "pointer",
          "& .circle": {
            width: "10px",
            height: "10px",
            borderRadius: "50px",
            background: COLORS.GRADIENT,
            marginRight: "10px",
          },
          "& .moving-vehicle": {
            background: COLORS.SUCCESSLIGHT
          },
          "& .offline-vehicle": {
            background: COLORS.DANGER
          },
          "& .trackid": {
            marginRight: "auto",
          },
          "& .arrowright": {
            marginLeft: "auto",
          },
        },
        "& .notfoundimg": {
          marginTop: "10%",
        },
      },
    },
  },
  mapdropdown: {
    position: "absolute",
    top: "10px",
    right: "55px",
    "& .maplist": {
      display: "flex",
      padding: "0px",
      listStyle: "none",
      "& li": {
        border: "1px solid #eee",
        padding: "9px 10px",
        textAlign: "center",
        margin: "0 5px",
        borderRadius: "5px",
        width: "90px",
        "&.selected": {
          background: "#f2e8e8",
        },
        "& span": {
          fontSize: "15px",
          fontWeight: "700",
          display: "block",
          marginTop: "5px",
          cursor: "pointer",
        },
      },
    },
    "& .mapstyle": {
      background: "white",
      borderRadius: "15px",
      color: COLORS.PRIMARY_FONT,
      position: "absolute",
      right: "0",
      width: "280px",
      padding: "10px 20px",
      top: "49px",
    },
    "& .mapoptions": {
      background: "white",
      borderRadius: "50px",
      color: COLORS.PRIMARY_FONT,
      border: "none",
      height: "45px",
      cursor: "pointer",
      padding: "0 15px",
      fontWeight: "700",
    },
  },
});
