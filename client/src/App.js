import React, { useEffect, useState, } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navbar, Footer, Sidebar } from './components';
import { SwitchToIndependent, Projects, Hiring, Messages, Notification, EmailPrefrences,  Wallet, Settings  } from './pages';
import './App.css';
import Auth from './component/components/Auth/Auth';
import CompleteAuth from './component/components/Auth/CompleteAuth';
import ForgotPassword from './component/components/Auth/ForgotPassword';
import NavBar from './component/components/Navbar/NavBar';
import { useStateContext } from './contexts/ContextProvider';
import HireFreelancer from './pages/HireFreelancer';
import Home from './pages/Home';
import Opportunities from './pages/Opportunities';
import Services from './pages/Services';
import Work from './pages/Work';
import Recommendations from './pages/Recommendations';
import FadeLoader from "react-spinners/FadeLoader";
import decode from 'jwt-decode';
import 'font-awesome/css/font-awesome.min.css';
import {  useLocation} from 'react-router-dom';
import UpdatePassword from './component/components/Auth/UpdatePassword';
import CompleteSignUp from './component/components/Auth/CompleteSignUp';
import Dummy from './component/components/Auth/Dummy';


const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const location = useLocation();



  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime());
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);





  const { activeMenu } = useStateContext();


  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <GoogleOAuthProvider clientId='159147243436-6h6ns6nst5hhovg4ojgdoj2jmhf47dk0.apps.googleusercontent.com'>
          {loading ? (
      <div className="loader">
        <FadeLoader color={"#000"} loading={loading} size={350} />
      </div>
    ) : (
    <div>
 
        <div className={user?.user.isVerified ? "flex relative dark:bg-main-dark-bg" : "relative dark:bg-main-dark-bg"}>
          {user?.user.isVerified ? (
          <div >   
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0  dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
            
            
          )}
               </div>
            ) : (
                 
                <NavBar/>
                 
                )}
          
          <div className={user?.user.isVerified ? (activeMenu ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full  ' : 'bg-main-bg  dark:bg-main-dark-bg  w-full min-h-screen flex-2 ') : ''}> 
          {user?.user.isVerified ? (
            
            <div className=" md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
               ) : (
                 
                <NavBar/>
                 
                )}
            
            <div>
              
      
       
              <Routes>
              
    {/* dashboard  */} 
    {!user?.user.isVerified ? (
    <Route path="/auth" element={<Auth />} />
    ) : (
                 
      <Route path="/home" element={<Home />} />
                  
                 )}

    <Route path="/CompleteSignUp" element={<CompleteSignUp/>} />
    <Route path="/CompleteSignUp" element={<Dummy/>} />
    <Route path="/home" element={(!user ? <Auth /> : <Navigate to="/home" />)} />
    <Route path="/" element={(!user?.user.isVerified ? <Auth /> : <Navigate to="/home" />)} />
    <Route path="/auth" element={(!user ? <Auth /> : <Navigate to="/home" />)} />
    <Route path="/SwitchToIndependent" element={(<SwitchToIndependent />)} />
    <Route path="/HireFreelancer" element={(<HireFreelancer />)} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path='/api/auth/reset/:token' element={<UpdatePassword />} />






    {/* pages  */}
    <Route path="/projects" element={<Projects />} />
    <Route path="/hiring" element={<Hiring />} />
    <Route path="/messages" element={<Messages />} />


    <Route path="/notification" element={<Notification />} />
    <Route path="/wallet" element={<Wallet />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/emailPrefrences" element={<EmailPrefrences />} />
    <Route path='/opportunities' element={<Opportunities/>} />
    <Route path='/services' element={<Services/>} />
    <Route path='/work' element={<Work/>} />
    <Route path='/recommendations' element={<Recommendations/>} />

    


              </Routes>
            </div>
            <div className={user ? 'foot' : 'cute'}>
            <Footer  />
            </div>
          </div>
        </div>
   
    </div>
    )}
    </GoogleOAuthProvider>
  );
};

export default App;
