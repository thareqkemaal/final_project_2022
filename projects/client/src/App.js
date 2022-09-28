import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/NavbarComponent'
import Footer from '../src/components/FooterComponent'
import LandingPages from '../src/pages/LandingPages.jsx'
import Register from './pages/Register';
import 'react-phone-number-input/style.css'



function App() {

  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPages/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      <Footer/>

    </div>
  );
}

export default App;
