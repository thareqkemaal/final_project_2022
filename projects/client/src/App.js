import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/NavbarComponent';
import Footer from '../src/components/FooterComponent';
import LandingPages from '../src/pages/LandingPages.jsx';
import Register from './pages/Register';
import UserCart from './pages/user/CartPage';
import 'react-phone-number-input/style.css';
import Checkout from './pages/user/CheckoutPage';



function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPages />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<UserCart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
