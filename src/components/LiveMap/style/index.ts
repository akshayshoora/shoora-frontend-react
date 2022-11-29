import { makeStyles } from '@mui/styles';
import COLORS from '../../../constants/colors';

export default makeStyles({
  root: {
    marginTop: 16,
  },
  live:{
    color:COLORS.BLACK,
  },
  mapdropdown:{
    position:'absolute',
    top:'10px',
    right:'55px',
  "& .maplist":{
    display:'flex',
    padding:'0px',
    listStyle:'none',
    "& li":{
      border:'1px solid #eee',
      padding:'9px 10px',
      textAlign:'center',
      margin:'0 5px',
      borderRadius:'5px',
      width:'90px',
      "&.selected":{
       background:'#f2e8e8',
      },
      "& span":{
       fontSize:'15px',
       fontWeight:'700',
       display:'block',
       marginTop:'5px',
      }
    }
  },
  "& .mapstyle":{
    background:'white',
    borderRadius:'15px',
    color:COLORS.PRIMARY_FONT,
    position:'absolute',
    right:'0',
    width:'280px',
    padding:'10px 20px',
    top:'49px',
  },
  "& .mapoptions":{
    background:'white',
    borderRadius:'50px',
    color:COLORS.PRIMARY_FONT,
    border:'none',
    height:'45px',
    cursor:'pointer',
    padding:'0 15px',
    fontWeight:'700',
  }

  
  
   }
 
});