import React from 'react'
import{useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../helper';

const Verified = () => {
    const params = useParams()
    const navigate = useNavigate()
    console.log(params)

    const onVerified = async ()=>{
        try {
            let res = await axios.patch(`${API_URL}/api/user/updateverif`,{},{
                headers:{
                    'Authorization': `Bearer ${params.token}`
                }
            })
            console.log(res)
            if(res.data.success){
                navigate('/',{replace:true})
            }else{
                alert('Verification failed ❌')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
         <div className="w-screen h-screen" id="fullscreen">
        <div className="absolute inset-0">
          <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1614064548016-0b5c13ca2c85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="A computer background" />
          <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
        </div>
        <div className="relative" id="relative">
          <div className="px-2 py-2 mx-auto my-auto max-w-7xl md:max-h-2xl md:py-6">
            <h1 className="text-4xl text-white md:text-5xl">Verify your email</h1>
            <p className="pt-2 text-2xl text-gray-100 md:text-3xl md:pt-3">
              Meanwhile we'd love to have you get started right now, we still need you to verify your email. Once that's done, you can access all features!
            </p>
            <a onClick={onVerified} className="pt-2 text-xl text-teal-300 font-bold hover:text-emerald-300 md:text-2xl">Click to verified your account.</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verified