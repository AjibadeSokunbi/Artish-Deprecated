import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { UPDATEAUTH } from '../../constants/actionTypes';
// import * as api from '../../api/index.js';
import 'react-toastify/dist/ReactToastify.css';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import './autha.css'
import useStyles from './style'; 
import Input from './Input';



const initialState = {user: '', password: '', confirmPassword: '', token: '',};

const UpdatePassword = () => {
  const [form, setForm] = useState(initialState);
  const user = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);
  const params = useParams();


  const token = params;

 const reset =   useEffect(() => {
        const token = params.token;
        if(token) {
          setForm({...form, token})
        }
        console.log(token);
      }, [token])

//  const API = axios.create({ baseURL: 'http://localhost:5000' })

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }
  
//   return req;
// });


//   const resetPassword = ( form, token ) => async (dispatch) => {
//     const resetPassword = (form) => API.post(`/api/auth/reset/${token}`, form);
//   try {
//     const { data } = await resetPassword(form);
//     console.log(data)
   
//     dispatch({ type: UPDATEAUTH,  data });
//     console.log(data);
//     console.log(token);
    
//     toast.success(data.message);
//     // navigate('/auth');
//   } catch (error) {
//     console.log(error);
//     toast.success(error.response.data.message);
//   }
// };

const handleSubmit = e => {
e.preventDefault();
  setForm({ ...form});
  
  axios
    .post('http://localhost:5000/api/auth/reset/515ad36d5f2d5daf364c73a10c84c6ea3e55fcf1', { token })
    .then(res => {
      console.log(res.data.message)
        setForm({
          ...form,
           password: '',
          confirmPassword: ''
        });
        toast.success(res.data.message);
      
    })
  
}




  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
        <div className='okayy' >
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
        <Typography component="h1" variant="h5">Create A New Password</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>

     
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />

          </Grid>
          <Button type="submit" fullWidth variant="contained" style={{color: "white",
              backgroundColor: '#000',

             }} className={classes.submit}>
            SUBMIT
          </Button>

         
        
          <Grid container justifyContent="flex-end">
            <Grid item>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </div>
  );
};

export default UpdatePassword;