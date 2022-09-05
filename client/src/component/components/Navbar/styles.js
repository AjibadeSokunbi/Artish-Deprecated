import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {

    marginBottom: '100px',

    paddingTop: "5px",
    paddingBottom: "5px",
   

  },

  valuer: {
    maxWidth: '30%',
 
  },


  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  // image: {
  //       marginLeft: '15px',
  //       display: 'block',
  //       width: '100%',
  //       objectFit: 'contain',
  // },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',

  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  userName: {
    // display: 'none',
    alignItems: 'center',
  },
  btn: {
    display: 'none',
    alignItems: 'center',
  },

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    cursor: 'pointer',
  },
  


}));