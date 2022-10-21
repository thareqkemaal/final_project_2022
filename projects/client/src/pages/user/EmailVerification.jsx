import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { API_URL } from '../../helper'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { UpdateProfile } from '../../action/useraction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailVerification = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onVerified = async()=>{
        try {
            let res = await axios.patch(`${API_URL}/api/user/change-email`,{},{
                headers:{
                    'Authorization': `Bearer ${params.token}`
                }
            })
            console.log(res.data)
            dispatch(UpdateProfile(res.data))
            navigate('/profile')
            toast.success('Your Email has Changes', {
              theme: "colored",
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
          })

        } catch (error) {
            console.log(error)
            toast.error(error, {
              theme: "colored",
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
          })
        }
    }

  return (
    <div>
            <div>
         <div className="w-screen h-screen" id="fullscreen">
        <div className="absolute inset-0">
          <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1614064548016-0b5c13ca2c85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="A computer background" />
          <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
        </div>
        <div className="relative" id="relative">
              <>
                <div className="px-2 py-2 mx-auto my-auto max-w-7xl md:max-h-2xl md:py-6">
            <h1 className="text-4xl text-white md:text-5xl">Verify your email</h1>
            <p className="pt-2 text-2xl text-gray-100 md:text-3xl md:pt-3">
              Last step to change your email, klik link bellow to change your email
            </p>
            <a onClick={onVerified} className="pt-2 text-xl text-teal-300 font-bold hover:text-emerald-300 md:text-2xl">Click to verified your account.</a>
          </div>
              </>

        
        </div>
      </div>
    </div>
    </div>
  )
}

export default EmailVerification