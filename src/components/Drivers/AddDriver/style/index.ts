import { makeStyles } from "@mui/styles";
import COLORS from "../../../../constants/colors";

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
  uploadFileSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    // padding: "10px",
    // minHeight: "100px",
    marginBottom: "50px"
  },
  dropzone: {
    padding: "10px",
    border: "1px dashed #261f5a",
    borderRadius: "8px",
    height: "60px",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "8px",
  },
  filesContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap"
  },
  uploadedFilePreviewContainer: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #261f5a",
    borderRadius: "8px",
    padding: "10px 10px",
    marginRight: "10px",
    marginBottom: "10px"
    // width: "0%"
  },
  verifyFileImg: {
    height: "120px",
    width: "120px",
    borderRadius: "4px",
    marginRight: "8px",
    flexShrink: "0"
  },
  uploadFileInfo: {
    display: "flex",
    flexDirection: "column",
  },
  uploadfileName: {
    fontSize: "16px"
  },
  uploadfileSize: {
    fontSize: "12px"
  },
  deleteIcon: {
    color: COLORS.DANGER
  }
});
