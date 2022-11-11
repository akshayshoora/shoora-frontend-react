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
    margin: '32px 0 32px',
  },
  menuItem: {
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 18,
    marginBottom: 16,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: '0.3s',
    '&:hover':{
      background:
      'linear-gradient(90deg, rgba(2, 51, 225, 0.1) 0%, rgba(2, 51, 225, 0.000520833) 98.65%, rgba(2, 51, 225, 0) 98.66%);',
    },
  },
  menuLabel: {
    marginLeft: 12,
    textTransform: 'capitalize',
  },
  selectedMenuItem: {
    background:
      'linear-gradient(90deg, rgba(2, 51, 225, 0.1) 0%, rgba(2, 51, 225, 0.000520833) 98.65%, rgba(2, 51, 225, 0) 98.66%);',
    borderLeft: `3px solid` + COLORS.PRIMARY_COLOR,
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
    minWidth: 240,
  },
});
