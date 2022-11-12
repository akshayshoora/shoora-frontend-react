import { makeStyles } from '@mui/styles';
import COLORS from '../../../constants/colors';

export default makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    margin: '20px 0 32px',
  },
  menuItem: {
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 18,
    marginBottom: 16,
    cursor: 'pointer',
    textDecoration: 'none',
    color:'white',
    borderRadius:'0px 30px 0px 30px',
    transition: '0.3s',
    marginLeft:'20px',
    marginRight:'-20px',
  },
  menuLabel: {
    marginLeft: 12,
    textTransform: 'capitalize',
  },
  selectedMenuItem: {
    background:COLORS.BUTTON,
    borderRadius:'0px 30px 0px 30px',
    color:'white',
    transition: '0.3s',
  },
  menu: {
    width: '100%',
  },
  supportWrapper: {
    background: COLORS.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    borderTop: `1px solid ${COLORS.BORDER_GREY}`,
    cursor: 'pointer',
    position: 'fixed',
    bottom: 0,
    width: '20%',
    minWidth: 200,
  },
});
