import { makeStyles } from '@mui/styles';

export default makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#ebf1ff',
  },
  loginBoxWrapper: {
    background: 'white',
    borderRadius: 8,
    padding: 24,
    marginTop:10,
    minWidth: 400,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
  },
  loginForm: { display: 'flex', flexDirection: 'column' },
  marginTop_12: { marginTop: 12 },
  marginTop_36: { marginTop: 36 },
  marginTop_8: { marginTop: 8 },
  fullWidth: { width: '100%' },

  adornedEnd: {
    "& svg": {
      cursor: 'pointer',
    }
  },
});
