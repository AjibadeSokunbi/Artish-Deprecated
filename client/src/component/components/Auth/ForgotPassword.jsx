import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate, Link  } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import { UPDATEAUTH } from '../../constants/actionTypes';
import * as api from '../../api/index.js';
import 'react-toastify/dist/ReactToastify.css';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import 'font-awesome/css/font-awesome.min.css';
import './autha.css'
import useStyles from './style'; 
import Input from './Input';
// import { recover, } from '../../actions/auth';


const initialState = {  email: ''};

const ForgotPassword = () => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const classes = useStyles();




  const recover = ( form, navigate) => async (dispatch) => {
  try {
    setLoading(true);
    const { data } = await api.recover(form);

    
    dispatch({ type: UPDATEAUTH, data});
    setLoading(false);
    console.log(data.message);
    console.log(form);

    toast.success(data.message);
    // navigate('/updatepassword');
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.success(error.response.data.message);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(recover( form, navigate));
  };





  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
        <div  >
             <ToastContainer />
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon  style={{
              backgroundColor: '#000',
              borderRadius: '50%',
              width: '100%',
              height: '100%',
              padding: '10px',
             }}/>
        </Avatar>
        <Typography component="h1" variant="h5">Please Provide your Email</Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>

            
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus/>
   


          </Grid>
          {!isLoading && (
          <Button type="submit" fullWidth variant="contained" style={{color: "white",
              backgroundColor: '#000',

             }} className={classes.submit}>
            SUBMIT
          </Button>
           )}
           {isLoading && (
    <Button type="submit" fullWidth variant="contained" style={{paddingTop: '18px', paddingBottom: '18px', color: "white",
    backgroundColor: '#000',

    }} className={classes.submit} disabled>
      <span  id="loader"></span>


</Button>
               )}
         
        
          <Grid container justifyContent="center">
      
              <Link to='/auth'>
                Go Back to Login
              </Link>
   
          </Grid>
        </form>
      </Paper>
    </Container>
    </div>
  );
};

export default ForgotPassword;