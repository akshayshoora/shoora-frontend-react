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
    margin: '0px 0 24px',
    width:'100%',
    padding:'10px 0 0px 0px',
    textAlign:'center',
  },
  menuItem: {
    padding: '10px 8px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 18,
    marginBottom: 16,
    cursor: 'pointer',
    textDecoration: 'none',
    color:'white',
    borderRadius:'11px',
    transition: '0.3s',
    marginLeft:'15px',
    marginRight:'15px',
  },
  menuLabel: {
    marginLeft: 12,
    textTransform: 'capitalize',
    opacity:0,
    transition:'0.3s',
    overflow:'hidden',
    '& .MuiTypography-root':{
      color:'black',
    }
  },
  selectedMenuItem: {
    background:'#f8dad1',
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
