import { makeStyles } from '@mui/styles';
import { capitalize } from 'lodash';

export default makeStyles({
    searchWrapper:{
        display:'flex',
        justifyContent:'space-between',
        margin:'15px 0',
        '& .css-ijt50p':{
            width:'auto',
        },
        '& span':{
            fontSize:'18px !important',
        }
    },
    allReports:{
        borderTop:'1px solid #ECEBF1',
        '& span':{
        background:'#f8f8fb',
        position:'relative',
        top:'-11px',
        padding:'0px 5px',
    }
    },
    allReportView:{
        display:'flex',
        '& .reportBox':{
            boxShadow:'0px 0px 8px rgb(0 0 0 / 10%)',
            borderRadius:'12px',
            marginBottom:'25px',
            padding:'20px',
            position:'relative',
            '& h3':{
                marginTop:'0px',
                fontSize:'20px',
                fontWeight:'700',
            },
            '& h4':{
                marginBottom:'0px',
            },
            '& p':{
                fontSize:'14px',
                marginBottom:'30px',
            },
            '& .btnWrapper':{
                position:'absolute',
                left:'0',
                right:'0',
                background:'#fff',
                padding:'15px 20px',
                borderTop:'1px solid #ECEBF1',
                justifyContent:'center',
                display:'none',
                bottom:'0',
                textAlign:'center',
            '& .gbtn':{
                textTransform:'capitalize',
                borderRadius:'50px',
                width:'60%',
                '& span':{
                    display:'none',
                },
            },
         },
         '&:hover':{
            '& .btnWrapper':{
                display:'flex',
        }
        }
      }
    },
    alertHead:{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#261F5A",
        alignContent:'center',
        color:'white',
        padding:'10px 15px',
        '& i':{
            cursor:'pointer',
        }
    },
    reportContent:{
        padding:'20px 15px 30px',  
        "& .cBtn":{
            marginRight:'10px',
            border:'1px solid #eee',
        }
    },
    reportDate:{
    display:'flex',
    justifyContent:'space-between',
    '& .MuiOutlinedInput-root':{
        width:'100%',
    },
    '& input':{
        height:'38px',
        boxSizing:'border-box',
    }
    },
});
