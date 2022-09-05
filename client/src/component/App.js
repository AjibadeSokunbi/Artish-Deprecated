import React from 'react'
import { Container} from '@material-ui/core';
import NavBar from './components/Navbar/NavBar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
// import SwiperIntro from './components/swiper/SwiperIntro';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId='159147243436-6h6ns6nst5hhovg4ojgdoj2jmhf47dk0.apps.googleusercontent.com'>
    <Router>
    <NavBar/>
    {/* <SwiperIntro/> */}
    <Container maxWidth="xl">
     
        
        <Routes>
          <Route path="/" element={ <Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails/>} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
    </Container>
    </Router>
  </GoogleOAuthProvider>


  );
};

export default App;