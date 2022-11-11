import { makeStyles } from '@mui/styles';
import COLORS from '../../../constants/colors';

export default makeStyles({
  root: {
    marginTop: 16,
  },
  table: {
    '&.MuiTable-root': {
      borderCollapse: 'unset',
    },
    border: '1px solid #e0e0e0',
    borderRadius: 4,
  },
  tableBodyCell: {
    '&.MuiTableCell-root': {
      padding: '12px 16px',
    },
  },
  columnView: {
    display: 'flex',
    flexDirection: 'column',
  },
  noDataView: {
    display: 'flex',
    justifyContent: 'center',
  },
  durationWrapper: {
    display: 'flex',
  },
  duration: {
    '&.MuiChip-root': {
      color: COLORS.SECONDARY_FONT,
      backgroundColor: 'transparent',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
      position: 'relative',
      top: '-5px',
      transition: '0.3s',
      '& .MuiChip-label': {
        padding: '5px 10px',
      },
    },
    '&.MuiChip-root:hover': {
      backgroundColor: '#E6EAFC',
      cursor: 'pointer',
    }
  },
  activeChip: {
    '&.MuiChip-root': {
      color: '#ffffff',
      fontWeight: '500',
      cursor: 'pointer',
      backgroundColor: COLORS.PRIMARY_COLOR,
      fontSize: '16px',
      lineHeight: '19px',
      position: 'relative',
      top: '-5px',
      '& .MuiChip-label': {
        padding: '5px 10px',
      },
    },
    '&.MuiChip-root:hover': {
      backgroundColor: COLORS.PRIMARY_COLOR,
      color: '#ffffff',
      cursor: 'auto',
    }
  },
});
