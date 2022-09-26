import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/NavbarComponent'
import Footer from '../src/components/FooterComponent'
import LandingPages from '../src/pages/LandingPages.jsx'



function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LandingPages/>}/>
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;
