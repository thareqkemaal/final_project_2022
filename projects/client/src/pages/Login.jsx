import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import regisImg from '../assets/undraw_medicine_b-1-ol.svg'
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import axios from 'axios'
import { API_URL } from '../helper';
import { useDispatch } from 'react-redux'
import { loginAction } from '../action/useraction';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [visible,setVisible]=useState('password')

  const [email,setEmail]=useState('')
  const [password, setPassword]=useState('')



  const onLogin=()=>{
    axios.post(API_URL+'/api/user/login',{
      email,
      password
    })
    .then((res)=>{
      console.log(res)
      localStorage.setItem('medcarelog',res.data.token)
      delete res.data.token
      console.log(res.data.role)
      dispatch(loginAction(res.data))
      if(res.data.role === 'User'){
        navigate('/',{replace:true})
      }else if(res.data.role === 'Admin'){
        navigate('/admin/dashboard',{replace:true})
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  const showPass = ()=>{
    if(visible=="password"){
      setVisible("text")
  }else if(visible=="text"){
      setVisible("password")
  }
  }



  return (
    <div className=''>
        <div className='container mx-auto md:px-32 lg:grid grid-cols-2 pt-5'>
            <div className=' hidden bg-gradient-to-r from-blue-300 to-white py-10 drop-shadow-md lg:block'>
              <img src={regisImg}/>
              <div className='text-center text-xl bg-gradient-to-r from-blue-800 to-blue-400 font-serif bg-clip-text text-transparent mt-10'>
                <div>Apotek online khusus</div>
                <div>Untuk Keperluanmu</div>
              </div>
            </div>
            <div className='bg-white drop-shadow-md'>
              <div className='px-10 py-5 '>
                <div className='lg:px-10'>
                <div className='font-bold text-2xl font-Public'>Login</div>
                <div className='text-sm font-extralight text-gray-400 font-Public'>Don't have account ?
                <span className='ml-2 underline text-teal-500 hover:text-teal-600 text-sm font-bold font-Public' onClick={()=>navigate('/register')}>Sign In</span>
                </div>
                  <form>
                    <label className='block mb-3 my-14'>
                      <span className='block text-sm font-medium text-gray-700 font-Public'>
                        Email/Username
                      </span>
                      <input type='email' onChange={(e)=>setEmail(e.target.value)} className='mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1 '/>
                    </label>
                    <label className='block'>
                      <span className='block text-sm font-medium text-gray-700 font-Public'>
                        Password
                      </span>
                      <div className='relative'>
                        <input type={visible} onChange={(e)=>setPassword(e.target.value)} className='mt-1 px-3 py-2  bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1'/>
                        {
                          visible === 'password'
                          ?
                          <BsEye onClick={showPass} size={20} className='absolute top-2 right-3' />
                          :
                          <BsEyeSlash onClick={showPass} size={20} className='absolute top-2 right-3' />
                        }
                      </div>
                    </label>
                  </form>
                    <div className='grid grid-cols-2 my-7'>
                      <div className='flex justify-start'>
                        <input type={'checkbox'}/>
                        <div className='ml-3 text-sm font-Public'>Remember me</div>
                      </div>
                      <div className='text-end text-sm hover:underline font-Public'> Forgot password</div>
                    </div>
                    <button className='text-white rounded-md bg-main-500 hover:bg-main-600 w-full py-2 my-7 font-Public' onClick={onLogin}>Login</button>

                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login