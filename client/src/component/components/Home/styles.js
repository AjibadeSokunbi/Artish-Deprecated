import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    display: 'none',
    borderRadius: 4,
    marginBottom: '1rem',
    // display: 'flex',
    padding: '16px',
    zIndex: "-1",
  },
  value: {
 
    // zIndex: "-1",
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
