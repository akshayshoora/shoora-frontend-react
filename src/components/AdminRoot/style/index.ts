import zIndex from '@mui/material/styles/zIndex';
import { makeStyles } from '@mui/styles';
import COLORS from '../../../constants/colors';

export default makeStyles({
  root: {
    height: '100%',
    minHeight: '100vh',
  },
  displayFlex: {
    display: 'flex',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  sidePanel: {
    flex: '0.25',
    background:'#5a5d64',
    transition:'0.3s',
    width:'100px',
    position: 'fixed',
    borderRadius:'0px 16px 16px 0px',
    left:'0',
    top:'0',
    zIndex:'9',
    bottom:'0',
    "&:hover": {
      width:'300px',
      "& .makeStyles-menuLabel-15":{
        opacity:'1',
       },
    },
  },
  panelBody: {
    flex: 1,
  },
  mainContent:{
   marginLeft:'100px',
  },
  header: {
    borderBottom: `1px solid ${COLORS.BORDER_GREY}`,
    background:`${COLORS.WHITE}`,
  },
  bodyContainer: {
    padding: '24px',
    height: '100vh',
  },
  padding_0: {
    padding: 0,
  },
  loadingScreen: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
