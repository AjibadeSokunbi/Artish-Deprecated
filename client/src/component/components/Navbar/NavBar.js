import React, { useState, useEffect} from 'react';
import {  AppBar } from '@material-ui/core';
import useStyles from './styles';
import logo from '../../images/logo.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import './navBar.css'


const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();




  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime());
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  return (
    <div>
      
   
    <AppBar className={classes.appBar}   color="inherit">
    <div className='brandContainer'>
      <Link to="/"  >
    <img  className='logo-image'  src={logo} alt="icon" height="60" />
    </Link>
    </div>
  
  </AppBar>


  </div>
  )
}

export default NavBar;