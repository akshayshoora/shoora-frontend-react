import { makeStyles } from '@mui/styles';
import COLORS from '../../../constants/colors';

export default makeStyles({
  vehicleBox: {
    position: 'relative',
  },
  vehicleModal: {
    minWidth: '240px',
    maxWidth: '300px',
    bottom: '100%',
  },
  vehicleTrip: {
    fontSize: "14px",
    '& h2': {
      fontSize: '16px',
      marginTop: '0px',
      color: '#261F5A',
      marginBottom: '16px',
    },
    '& .label-light': {
      color: "#6c757d"
    }, '& .label-dark': {
      color: "#212529"
    }, '& .status-moving': {
      color: "#2e7d32",
      textTransform: 'capitalize'
    }, '& .status-danger': {
      color: "#d32f2f",
      textTransform: 'capitalize'
    }, '& .fw-bold': {
      fontWeight: 500
    },
    '& ul': {
      padding: '0px',
      overflow: 'hidden',
      '& li': {
        float: 'left',
        marginBottom: '10px',
        // fontSize: '12px',
        '& span': {
          minWidth: '100px',
          display: 'inline-block',
        }
      }
    }
  },
  vehicleModalClose: {
    right: '10px',
    position: 'absolute',
    top: '20px',
  },
});