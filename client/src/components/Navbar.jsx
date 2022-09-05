import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import { UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import './navBar1.css'
import {  Avatar  } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../component/constants/actionTypes';
import {  useNavigate, useLocation} from 'react-router-dom';




const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
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

    if (decodedToken.exp * 1000 < new Date().getTime()) ;
  }

  setUser(JSON.parse(localStorage.getItem('profile')));
}, [location]);
    // end
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
        <NavButton title="Chat" dotColor="#000" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
        <TooltipComponent content="Profile" position="BottomCenter">
        {user?.user ? (
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
      <Avatar className="rounded-full h-40 w-40 avatar" alt={user?.user.name} src={user?.user.picture2}>A</Avatar>
            <p>
              <span id='nameNav' className="text-gray-400 text-14">Hi, {user?.user.firstName}</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
              {user.user.name}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
         
          </div>
             ) : (
                  <></>
            )}
        </TooltipComponent>

        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;