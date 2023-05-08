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
  fieldSetContainer: {
    border: "2px solid #ECEBF1"
  },
  vehicleRCLabel: {
    fontSize: 16,
    fontWeight: 500,
    color: COLORS.SECONDARY_FONT,
  },
  vehicleRCValue: {
    fontSize: 16,
    fontWeight: 500,
    color: COLORS.PRIMARY_FONT,
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
  imgContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  inspectionImg: {
    border: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: "4px",
    objectFit: "contain",
    height: "150px",
    width: "48%",
    marginBottom: "8px"
  },
  clicked: {
    width: "100%",
    position: "absolute",
    margin:"auto",
    left:"100px",
    height: "100%"
  },
  popup: {
    position: "fixed",
    zIndex: 1,
    paddingTop: "100px",
    justifyContent:"center",
    //right: "auto",
    top: 0,
    width: "80%",
    height: "80%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  popupImage: {
    
    display: "block",
    margin: "auto",
    width: "80%",
    height: "50%",
    objectFit:"contain",
    
  },
  popupCloseButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      color: "#ccc",
    },
  }

});
