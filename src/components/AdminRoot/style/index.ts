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
    minWidth: 200,
    background:`${COLORS.GRADIENT}`,
  },
  panelBody: {
    flex: 1,
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
