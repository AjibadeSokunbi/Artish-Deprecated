import React, {  useState, } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Container, Typography } from '@material-ui/core';
import { useNavigate  } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { ToastContainer, toast } from 'react-toastify';
import { UPDATEAUTH } from '../component/constants/actionTypes';
import * as api from '../component/api/index.js';
import 'react-toastify/dist/ReactToastify.css';

import useStyles from '../component/components/Auth/style'; 
import Input from './Input';
import './settings.css'



const initialState = { skill1: '', skill2: '', bio: '', location: '', socialmedialink1: '', socialmedialink2: '', picture2: '',socialmedialink3: '', };

const Settings = () => {

  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const classes = useStyles();





  const login = (form, navigate) => async (dispatch) => {
    try {
      console.log(login)
      const { data } = await api.login(form);
      console.log(data);
      dispatch({ type: UPDATEAUTH, data });
     
      navigate('/home');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

      dispatch(login(form, navigate));
  };



  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
        <div className='okayy' style={{display: "none"}} >
             <ToastContainer />
          
    <Container component="main" maxWidth="xs">
      
      <Paper className={classes.paper} elevation={5}>
      <Typography variant="h6" align="center">
        TELL US MORE ABOUT YOU
      </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>
            <div className='profile-contain'>
             <div className='profile-container'>              
            <div className='profile-picture'><FileBase className='profile-picture' type="file" multiple={false} onDone={({ base64 })  => setForm({ ...form, picture2: base64 })} /></div>
            </div> 
            </div>
            <Input name="Skill1" label="Skill1"  handleChange={handleChange} autoFocus half />
            <Input name="skill2" label="Skill2" handleChange={handleChange} half />
            <Input name="bio" label="Bio" handleChange={handleChange} type="bio" />
            <Input name="location" label="Location" handleChange={handleChange} type="location" />
            <Input name="Github Profile" label="Github Profile" handleChange={handleChange} />
            <Input name="Linkdn Profile" label="Linkdn Profile" handleChange={handleChange} />
            <Input name="Twitter Profile" label="Twitter Profile" handleChange={handleChange} />
            </>
          </Grid>
          <Button type="submit" fullWidth variant="contained" style={{color: "white", backgroundColor: '#000'}} className={classes.submit}>
            Submit
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

export default Settings;