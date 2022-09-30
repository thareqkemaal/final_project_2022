import './App.css'
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/NavbarComponent';
import Footer from '../src/components/FooterComponent';
import LandingPages from '../src/pages/LandingPages.jsx';
import Register from './pages/Register';
import 'react-phone-number-input/style.css'
import Verified from './pages/user/Verified';
import Login from './pages/Login';
import axios from 'axios';
import { API_URL } from './helper';
import {useDispatch} from 'react-redux'
import { loginAction } from './action/useraction';
import EditProfile from './pages/EditProfile.jsx'
import Dashboard from './pages/admin/Dashboard';
import UserCart from './pages/user/CartPage';
import Checkout from './pages/user/CheckoutPage';




function App() {
  const dispatch = useDispatch()
  const [loading, setLoading]=useState(true)

  const { role } = (({ userReducer }) => {
    return {
      role: userReducer.role
    }
  })
  console.log(role)

  const keepLogin =()=>{
    let medcarelog = localStorage.getItem('medcarelog')
    if(medcarelog){
      axios.get(API_URL+'/api/user/keeplogin',{
        headers:{
          'Authorization': `Bearer ${medcarelog}`
        }
      }).then((res)=>{
        if(res.data.iduser){
          localStorage.getItem('medcarelog', res.data.token)
          delete res.data.token
          setLoading(false)
          dispatch(loginAction(res.data))
          
        }
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  }

  useEffect(()=>{
    keepLogin()
  },[])

  return (
    <div>
      <Navbar loading={loading}/>
        <Routes>
          <Route path='/' element={<LandingPages/>}/>
          <Route path='/register' element={<Register/>}/> 
          <Route path='/verification/:token' element={<Verified/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<EditProfile/>}/>
          <Route path='/cart' element={<UserCart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
