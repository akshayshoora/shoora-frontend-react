import { makeStyles } from '@mui/styles';
import COLORS from '../../../constants/colors';

export default makeStyles({
  root: {
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberOfRows: {
    display: 'flex',
    alignItems: 'center',
  },
  greetingView: {
    display: 'flex',
    flexDirection: 'column',
  },
  notificationIcon: {
    color: COLORS.SECONDARY_FONT,
    marginRight: 12,
  },
  userBar: {
    display: 'flex',
    alignItems: 'center',
  },
  separator: {
    '&.MuiDivider-root': {
      height: 36,
    },
  },
});
