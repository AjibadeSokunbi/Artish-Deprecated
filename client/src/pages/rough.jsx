import React, { useEffect, useState, } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Container, TextField } from '@material-ui/core';
import { useNavigate  } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import { UPDATEAUTH } from '../component/constants/actionTypes';
import * as api from '../component/api/index.js';
import 'react-toastify/dist/ReactToastify.css';
import decode from 'jwt-decode';
import useStyles from '../component/components/Auth/style'; 
import Input from './Input';




const initialState = {  email: '', password: '', confirmPassword: '', skill1: '', skill2: '', bio: '', location: '', socialmedialink1: '', socialmedialink2: '', picture2: '',socialmedialink3: '', };

const Settings = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const classes = useStyles();
  // const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime());
    }

    setUser(JSON.parse(localStorage.getItem('completeProfile')));
  });


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
        <div className='okayy' >
             <ToastContainer />
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>

            <TextField name="_id"  type="number"  variant="outlined" label="_id" value={user?.result?._id}  onChange={(e) => setForm({ ...form, [e.target.name]: user?.result?._id })} />
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              <Input name="skill1" label="skill1"  handleChange={handleChange} autoFocus half />
              <Input name="skill2" label="skill2" handleChange={handleChange} half />
            <Input name="bio" label="bio" handleChange={handleChange} type="bio" />
            <Input name="location" label="location" handleChange={handleChange} type="location" />
            <Input name="Github Profile" label="Github Profile" handleChange={handleChange} />
            <Input name="Linkdn Profile" label="Linkdn Profile" handleChange={handleChange} />
            <Input name="Twitter Profile" label="Twitter Profile" handleChange={handleChange} />
            </>
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          </Grid>
          <Button type="submit" fullWidth variant="contained" style={{color: "white", backgroundColor: '#000'}} className={classes.submit}>
            Submit
          </Button>
          <Button onClick={(e) => { e.stopPropagation(); 
          setUser(user?.result._id)}}
           style={{ color: 'black' }} size="small">
          Edit
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