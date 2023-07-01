import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate, Link  } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import { AUTH } from '../../constants/actionTypes';
import * as api from '../../api/index.js';
import 'react-toastify/dist/ReactToastify.css';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FileBase from 'react-file-base64';
import Icon from './Icon';
import './autha.css'
import useStyles from './style'; 
import Input from './Input';
import 'font-awesome/css/font-awesome.min.css';
import CompleteSignUp from './CompleteSignUp';
import Dummy from './Dummy';
// import useButtonLoader from "../../components/hooks/useButtonLoader";
// import { register, } from '../../actions/auth';


const initialState = { firstName: '', lastName: '',  name: '', email: '', password: '', confirmPassword: '', skill1: '',skill2: '', bio: '', country: '', state: '', socialmedialink1: '', socialmedialink2: '', socialmedialink3: '',};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };


  const login = (form, navigate) => async (dispatch) => {
    
    try {
      setLoading(true);
      const { data } = await api.login(form);
  
      dispatch({ type: AUTH, data });
      setLoading(false);
      navigate('/home');
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log(error.response.data);
      toast.error(error.response.data.message);

    }
  };

  const register = (form, navigate) => async (dispatch) => {
  try {
    setLoading(true);
    const { data } = await api.register(form);
    
    dispatch({ type: AUTH, data });
    setLoading(false);

    
    toast.success(data.message);
    navigate('/auth');
 
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(register(form, navigate));
    } else {
      dispatch(login(form, navigate));

    }
  };

  const googleSuccess = async (response) => {
    const result = jwt_decode(response.credential)
    const token =  response?.credential;
 
      
    try {
      dispatch({ type: "AUTH", data: { result, token } });

      navigate('/home');
    } catch (error) {
      console.log(error);
    }

    };

    const googleSuccess1 = async (response) => {
      const result = jwt_decode(response.credential)
      const token =  response?.credential;
   
        
      try {
        dispatch({ type: "AUTH", data: { result, token } });
  
        navigate('/home');
      } catch (error) {
        console.log(error);
      }
  
      };

  const googleFailure = (error) => {
    console.log('Google Sign In was unsuccessful. Try again later');
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
              <>
             <ToastContainer />
      <form className={classes.form} onSubmit={handleSubmit}>
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
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
  
          
          <Grid container spacing={2}>
            { isSignup && (
            <>

              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              <Input name="skill1" label="Freelancing Skill"  handleChange={handleChange} half />
  
  <Input name="skill2" label="Freelancing Skill" handleChange={handleChange} half />
  <Input name="country" label="Country"  handleChange={handleChange} half />
 
 <Input name="state" label="State" handleChange={handleChange} half />

            </>
            )}
            { !isSignup && (
              <>

            <Input name="email"  id={!isSignup ?  'sign' : 'sginin'} label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password"  id={!isSignup ?  'sign' : 'sginin'} label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            </>
           
           )}
              
     

        

          </Grid>
        
     {!isLoading && (
  <Button type="submit" fullWidth variant="contained"  style={{color: "white",
      backgroundColor: '#000',

      }} className={classes.submit}  id={isSignup ?  'sign' : 'sginin'}>
    { isSignup ? 'Sign Up' : 'Sign In' }
  </Button>
          )}
      {isLoading && (
  <Button type="submit" fullWidth variant="contained" style={{paddingTop: '18px', paddingBottom: '18px', color: "white",
      backgroundColor: '#000',

      }} className={classes.submit}  id={isSignup ?  'sign' : 'sginin'} disabled>
        <span  id="loader"></span>


  </Button>
    )}

        { isSignup && (
                 <a href="#CompleteSignUp" >
    <Button  fullWidth variant="contained" style={{color: "white", paddingLeft: '160px',paddingRight: '160px'  ,
    backgroundColor: '#000',
}}
 className={classes.submit}>
  NEXT
</Button>
</a>
  )}

          { !isSignup && (
                  <>
              <Link className='forgotpassword' to="/forgotpassword">
              <div className='forgotpassword' style={{hover:{color: 'black'} , color: 'grey' , display: 'flex', justifyContent: 'flex-end'}}>Forgot Password? </div>
              </Link>
              </>
            )}
        
          <Grid container justifyContent="center">
            <Grid item>
            <Button onClick={switchMode} style={{color: 'grey'}}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>

            </Grid>
          </Grid>

      </Paper>
    </Container>
  
    { isSignup && (
    <>
    <Container component="main" maxWidth="sm" style={{marginTop: '250px'}}>
         <div  style={{paddingBottom: '30px'}}>
          <CompleteSignUp/>
          </div>
      <Paper className={classes.paper} elevation={3}>
      <Typography component="h1" variant="h5" style={{fontWeight: '500' , textAlign: 'center', marginBottom: '20px'}}>SET UP YOUR PROFILE</Typography>
      <Grid container spacing={2}>

      <div className='profile-contains'>
            <div className='profile-contain'>
              <div className='profile-container'>              
            <div className='profile-picture'><FileBase className='profile-picture' type="file" multiple={false} onDone={({ base64 })  => setForm({ ...form, picture2: base64 })} /></div>
            </div> 
            </div>
            </div>
            <Input name="bio" label="Bio" handleChange={handleChange} type="bio" />
            <Input name="socialmedialink1" label="GitHub Link" handleChange={handleChange} type="socialmedialink1" />
            <Input name="socialmedialink2" label="Twitter Link" handleChange={handleChange} type="socialmedialink2" />
            <Input name="socialmedialink3" label="Linkdn Profile Link" handleChange={handleChange} type="socialmedialink3" />
   </Grid>
   { isSignup && (
                 <a href="#Dummy" >
    <Button  fullWidth variant="contained" style={{color: "white", paddingLeft: '160px',paddingRight: '160px'  ,
    backgroundColor: '#000',

    }} className={classes.submit}>
  NEXT
</Button>
</a>
  )}
              </Paper>
                </Container>
                <Container component="main" maxWidth="sm" style={{marginTop: '250px'}}>
         <div  style={{paddingBottom: '30px'}}>
          <Dummy/>
          </div>
      <Paper className={classes.paper} elevation={3}>
      <Typography component="h1" variant="h5" style={{fontWeight: '500' , textAlign: 'center', marginBottom: '20px'}}>COMPLETE SIGN UP</Typography>
      <Grid container spacing={2}>

           
                        
            <Input name="email" className='sign' label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" id={!isSignup ?  'sign' : 'sginin'} label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && (
            <> 

            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
           
            </>
            )}
   </Grid>
   {!isLoading && (
  <Button type="submit" fullWidth variant="contained" style={{color: "white",
      backgroundColor: '#000',

      }} className={classes.submit}>
    { isSignup ? 'Sign Up' : 'Sign In' }
  </Button>
          )}
      {isLoading && (
  <Button type="submit" fullWidth variant="contained" style={{paddingTop: '18px', paddingBottom: '18px', color: "white",
  backgroundColor: '#000',

  }} className={classes.submit} disabled>
    <span  id="loader"></span>
</Button>
          )}
              </Paper>
                </Container>


 </>
      
               )}



</form>
    </>
  );
};

export default Auth;