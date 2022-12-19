import { makeStyles } from '@mui/styles';

export default makeStyles({

    alertHead: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        background:'#261F5A',
        color:'#fff',
        "& i":{
          position:'absolute',
          top:'15px',
          right:'15px',
          cursor:'pointer',
        }
      },

      alertList:{
        padding:'0',
        overflow:'hidden',
        margin:'-20px 0 0 0',
        "& li":{
        float:'left',
        width: '60%',
        marginBottom:'10px',
        listStyle: 'none',
        fontSize:'14px',
        "&:nth-child(odd)":{
         width: '40%',
        }
       }
    },
    videoAlert:{
        margin:'10px 0 0 0',
        "& video":{
          width:'465px !important',
          height:'300px !important',
        },
        "& .video-react":{
          maxWidth:'initial',
          width:'465px !important',
          height: '300px',
        }
      },
      alertListInfo:{
        padding:'0',
        listStyle: 'none',
        fontSize:'14px',
        margin:'0px',
        "& li":{
          marginBottom:'10px',
        }
      },
      avtarIcon:{
        background:'#eee',
        borderRadius:'10px',
        maxWidth:'100px',
        marginRight:'15px',
        padding:'10px',
      },
      avtarDriveInfo:{
        display:'flex',
        margin:'-25px 0 5px 0',
      },

});
