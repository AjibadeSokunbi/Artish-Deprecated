import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { useLocation, useNavigate, useParams  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as api from '../../api/index.js';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.min.css';
import FileBase from 'react-file-base64';
import './autha.css'
import useStyles from './style'; 
import Input from './Input';
import decode from 'jwt-decode';
import { COMPLETEAUTH, AUTH } from '../../constants/actionTypes';

// const initialState = {  token: '', skill1: '', skill2: '', bio: '', location: '', socialmedialink1: '', socialmedialink2: '', picture2: '',socialmedialink3: '', };

const CompleteAuth = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
  const [form, setForm] = useState({ id: '', token: '', skill1: '', skill2: '', bio: '', location: '', socialmedialink1: '', socialmedialink2: '', picture2: '',socialmedialink3: '', });

  useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime());
        }
        console.log(token);
        setUser(JSON.parse(localStorage.getItem('profile')));
      },[location]);


  const update = (  form, navigate) => async (dispatch) => {

    try {
      setLoading(true);
      const { data } = await api.update( form);
      
      dispatch({ type: AUTH , data });

      console.log(data);
   
      setLoading(false);

      toast.success(data.message);
      // navigate('/home');
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      dispatch(update(form, navigate));

  };







  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className='okayy' >
    <ToastContainer />
 
<Container component="main" maxWidth="xs">

<Paper className={classes.paper} elevation={5}>
<Typography variant="h6" align="center">
COMPLETE YOUR PROFILE
</Typography>
<form className={classes.form} onSubmit={handleSubmit}>
 <Grid container spacing={2}>
   <>
   <div className='profile-contain'>
    <div className='profile-container'>              
   <div className='profile-picture'><FileBase className='profile-picture' type="file" multiple={false} onDone={({ base64 })  => setForm({ ...form, picture2: base64 })} /></div>
   </div> 
   </div>
   <TextField name="id" variant="outlined" label="id"  value={form.id} onChange={(e) => setForm({ ...form, id: user?._id })} />
   <TextField name="token" variant="outlined" label="token"  value={form.token} onChange={(e) => setForm({ ...form, token: user?.token })} />
   <Input name="Skill1" label="Skill1"  handleChange={handleChange} autoFocus half />
   <Input name="skill2" label="Skill2" handleChange={handleChange} half />
   <Input name="bio" label="Bio" handleChange={handleChange} type="bio" />
   <Input name="location" label="Location" handleChange={handleChange} type="location" />
   <Input name="Github Profile" label="Github Profile" handleChange={handleChange} />
   <Input name="Linkdn Profile" label="Linkdn Profile" handleChange={handleChange} />
   <Input name="Twitter Profile" label="Twitter Profile" handleChange={handleChange} />
   </>
 </Grid>
 {!isLoading && (
          <Button type="submit" fullWidth variant="contained" style={{color: "white",
              backgroundColor: '#000',

             }} className={classes.submit}>
            SUBMIT
          </Button>
           )}
           {isLoading && (
          <Button type="submit" fullWidth variant="contained" style={{color: "white",
              backgroundColor: '#000',

             }} className={classes.submit} disabled>
          <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{paddingRight: '20px'}}></i>
          </Button>
               )}

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

export default CompleteAuth;