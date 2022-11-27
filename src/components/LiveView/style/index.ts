import { makeStyles } from '@mui/styles';
import COLORS from '../../../constants/colors';

export default makeStyles({
  root: {
    marginTop: 16,
  },
  live:{
    color:COLORS.BLACK,
    "& .MuiPaper-elevation":{
      padding:'0px !important'
    },
    "& .searchbar":{
        display:'flex',
        alignItem:'center',
      "& .searchField":{
        width:'100%',
        height:'44px',
        border:'1px solid #ddd',
        padding:'0 58px 0 10px',
        "&:focus":{
          outline:'none',
          border: '1px solid #eda43f',
        }
      },
      "& .searchBtn":{
       border:'none',
       padding:'0',
       marginLeft:'-64px',
      }

    },
    "& .contentMain":{
     "& .MuiList-root":{
      display:'flex',
      margin: '0 15px 17px',
      overflowY:'scroll',
      whiteSpace:'nowrap',
      "& .MuiListItemText-root":{
        minWidth:'auto',
        marginRight:'10px',
        borderRadius:'50px',
        cursor:'pointer',
        padding:'8px 20px',
        textAlign:'center',
        border: '1px solid #ddd',
      }
     },
     "& .notfound":{
      padding:'0 15px',
       textAlign:'center',
       "& .loaddata":{
        display:'flex',
        padding:'7px 10px',
        borderBottom:'1px solid #ddd',
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius:'3px',
        "&:hover":{
          background:'#fef8f0',
        },
        cursor:'pointer',
        "& .circle":{
          width:'10px',
          height:'10px',
          borderRadius:'50px',
          background:COLORS.GRADIENT,
          marginRight:'10px',
        },
        "& .trackid":{
          marginRight:'auto',
        },
        "& .arrowright":{
          marginLeft:'auto',
        }
       },
       "& .notfoundimg":{
        marginTop:'10%',
       }
     }
    }
  },
 
});