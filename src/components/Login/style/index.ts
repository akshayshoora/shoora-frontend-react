import { makeStyles } from '@mui/styles';

export default makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    background:'linear-gradient(to right, #1723b1,#ec6a2b)',
  },
  loginBoxWrapper: {
    background: 'white',
    borderRadius: 8,
    padding: 24,
    marginTop:10,
    minWidth: 340,
    maxWidth:'40%',
    marginLeft:'-40px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
  },
  loginLeft:{
    maxWidth:'60%',
  },
  loginBoxMain:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'30px',
  },
  loginForm: { display: 'flex', flexDirection: 'column' },
  shooraBtn: { 
    background:'linear-gradient(to right, #1723b1,#ec6a2b)',
    color:'white !important',
    height:'40px',
    "&.Mui-disabled": {
      background: 'white',
      color:'grey !important',
    }
  },
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
