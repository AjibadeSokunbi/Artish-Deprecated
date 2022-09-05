import React, { useState, useEffect} from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { useDispatch } from 'react-redux';
import {  Avatar  } from '@material-ui/core';
import decode from 'jwt-decode';
import * as actionType from '../component/constants/actionTypes';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import './userprofile.css'

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const logout = (error) => {
    setLoading(true);
    dispatch({ type: actionType.LOGOUT });
    setLoading(false);
    navigate('/auth');
    setLoading(true);
    setUser(null);
    setLoading(false);
    console.log(error)
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
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">My Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
         <Avatar className="rounded-full h-40 w-40 avatar" alt={user?.user.picture2} src={user?.user.picture2}>a</Avatar>
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {user?.user.firstName} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user?.user.email}  </p>
          
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      {!isLoading && (
      <div className="mt-5"  onClick = {logout}>
        <Button
         onClick = {logout}
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div>
       )}
         {isLoading && (
      <div className="mt-5"  onClick = {logout}>
        <Button
         onClick = {logout}
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          style={{paddingTop: '18px', paddingBottom: '18px'}}
        >
                  <span  id="loader"></span>
          </Button>
      </div>
       )}

    </div>

  );
};

export default UserProfile;
