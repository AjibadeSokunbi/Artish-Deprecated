import React, { useEffect, useState } from 'react';
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import {  Avatar  } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../component/constants/actionTypes';
import {  useNavigate, useLocation} from 'react-router-dom';
import './home.css'

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,

} from './NavbarElements';


const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();



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
    <div className=' contained-grid '>
 
    <div className=" contain-contain ">
      <div>
       <div className="home_container">
        <div className='img-container'>
       <img className='image-home'  alt={user?.user.firstName} src={user?.user.picture2}/>
       </div>
       <div>
        <h1 className="title-1">{user?.user.firstName} {user?.user.lastName}</h1>
        <div className='skills-container'>
        <p className="description-1">{user?.user.skill1}</p>
        <p className="description-1">{user?.user.skill2}</p>
        </div>
        <div className="desc">

        <p className="ContactMe"> Get In Touch</p>
        <BsFillChatQuoteFill style={{marginTop: '3.5px'}}/> 
        </div>
        <div className='description-container'>
        <p className="description-2">{user?.user.bio}
            </p>
            </div>
            <div className='location-container'>
            <GrLocation style={{marginTop: '4px'}}/> 
            <p className="description-3">{user?.user.state} ,{user?.user.country} </p>
            </div>
            <div className='soccials'>
              <a  href={user?.user.socialmedialink3} target="_blank" rel="noreferrer" ><BsLinkedin/></a>
              <a href={user?.user.socialmedialink2} target="_blank" rel="noreferrer"><BsTwitter/></a>
              <a href={user?.user.socialmedialink1} target="_blank" rel="noreferrer"><BsGithub/></a>
            
            
            </div>
        </div>
    </div>
    </div>
    </div>
    <div className='m-2 md:mt-5 md:mb-10 md:ml-10 md:mr-10 mt-15 p-2 md:p-3 bg-white rounded-3xl  container-oppurtunities'>
    <Nav>
        <NavMenu>
          <NavLink to='/opportunities' activestyle={true} >
            Gigs
          </NavLink>
          <NavLink to='/services' activestyle={true}>
            Services
          </NavLink>
          <NavLink to='/recommendations' activestyle={true}>
          Recommendations
          </NavLink>
          <NavLink to='/work' activestyle={true}>
            Work
          </NavLink>
        </NavMenu>

      </Nav>
      </div>
      
    </div>

    </div>
  );
};



export default Home;