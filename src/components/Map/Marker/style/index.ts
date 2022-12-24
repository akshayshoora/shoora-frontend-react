import { makeStyles } from '@mui/styles';
import COLORS from '../../../../constants/colors';

export default makeStyles({
  root: {
    marginTop: 16,
  },
  vehicleBox:{
    position:'relative',
  },
  vehicleModal:{
    background:COLORS.WHITE,
    width:'240px',
    position:'absolute',
    bottom:'100%',
    padding:'10px 20px',
    boxShadow: '0px 4px 16px rgb(0 0 0 / 10%)',
    borderRadius: '12px',
    zIndex:'999',
    left:'-120px',
    right:'0',
  },
  vehicleTrip:{
    '& h2':{
    fontSize:'16px',
    color:'#261F5A',
    marginBottom:'20px',
    },
    '& ul':{
      padding:'0px',
      overflow:'hidden',
      '& li':{
        float:'left',
        marginBottom:'10px',
        fontSize:'12px',
        '& span':{
          minWidth:'100px',
          display:'inline-block',
        }
      }
    }
  },
  vehicleModalClose:{
    right:'10px',
     position:'absolute',
     top:'20px',
   },
});