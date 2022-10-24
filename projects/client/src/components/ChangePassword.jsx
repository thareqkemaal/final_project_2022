import React,{useState} from 'react'
import { BsEye,BsEyeSlash } from 'react-icons/bs';
import axios from 'axios'
import { API_URL } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from './Tabs';
import { Helmet } from 'react-helmet';

const ChangePassword = () => {
    const [visible, setVisible]=useState('password')
    const [visibleNew, setVisibleNew]=useState('password')
    const [visibleRepeat, setVisibleRepeat]=useState('password')

    const[formInputPass, setFormInputPass]=useState({
        password:'',
        newPassword:'',
        repeatPassword:''
    })


    const onChangePass =(e)=>{
        const {value, name} = e.target

        setFormInputPass({...formInputPass, [name]:value})
    }

    const showPass = ()=>{
        if(visible=="password"){
            setVisible("text")
        }else if(visible=="text"){
            setVisible("password")
        }
    }

    const showNew = ()=>{
        if(visibleNew==="password"){
            setVisibleNew("text")
        }else if(visibleNew==="text"){
            setVisibleNew("password")
        }
    }

    const showRepeat = ()=>{
        if(visibleRepeat==="password"){
            setVisibleRepeat("text")
        }else if(visibleRepeat==="text"){
            setVisibleRepeat("password")
        }
    }

    const onSubmitPass = ()=>{
        let medcarelog = localStorage.getItem('medcarelog')
        if(formInputPass.newPassword === formInputPass.repeatPassword){
            axios.patch(API_URL+`/api/user/change-password`,{
                password:formInputPass.password,
                newPassword:formInputPass.newPassword
            },
            {
                headers:{
                    'Authorization': `Bearer ${medcarelog}`
                }
            }).then((res)=>{
                console.log(res)
                toast.success('Success', {
                    theme: "colored",
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
                setFormInputPass({
                    password:'',
                    newPassword:'',
                    repeatPassword:''
                })
            }).catch((err)=>{
                console.log(err.response.data.message)
                toast.error(`${err.response.data.message}`, {
                    theme: "colored",
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            })
            
        }else{
            toast.error('Cek repeat password', {
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
        <Helmet>
            <title>Profile</title>
            <meta name="description" content="Edit your profile" />
        </Helmet>
            <Tabs/>
           <div className='container mx-auto lg:px-96 pt-5 '>
                        <label className=' block mb-3 '>
                            <span className='block text-sm font-medium text-slate-700 mb-1'>Password</span>
                            <div className='relative'>
                                <input type={visible} name='password' value={formInputPass.password} onChange={onChangePass}  className='border border-gray-400 w-full rounded-md px-2' />
                                {
                                    visible === 'password' ?
                                    <BsEye className='absolute top-3 right-2' onClick={showPass} />
                                    :
                                    <BsEyeSlash className='absolute top-3 right-2' onClick={showPass} />
                                }
                            </div>
                        </label>
                        <label className='block mb-3'>
                            <span className='block text-sm font-medium text-slate-700 mb-1'>New Password</span>
                            <div className='relative'>
                                <input type={visibleNew} name='newPassword' value={formInputPass.newPassword} onChange={onChangePass}className='border border-gray-400 w-full rounded-md px-2' />
                                {
                                    visibleNew === 'password' ?
                                    <BsEye className='absolute top-3 right-2' onClick={showNew} />
                                    :
                                    <BsEyeSlash className='absolute top-3 right-2' onClick={showNew} />
                                }
                            </div>
                        </label>
                        <label className='block mb-3'>
                            <span className='block text-sm font-medium text-slate-700 mb-1'>Repeat Password</span>
                            <div className='relative'>
                                <input type={visibleRepeat} name='repeatPassword' value={formInputPass.repeatPassword} onChange={onChangePass} className='border border-gray-400 w-full rounded-md px-2' />
                                {
                                    visibleRepeat === 'password' ?
                                    <BsEye className='absolute top-3 right-2' onClick={showRepeat} />
                                    :
                                    <BsEyeSlash className='absolute top-3 right-2' onClick={showRepeat} />
                                }
                            </div>
                        </label>
                        <button className=' mt-5 border bg-teal-500 hover:bg-teal-700 rounded-md py-2 text-white px-10' onClick={onSubmitPass}>Save</button>
                    </div>
                    <ToastContainer />
    </div>
  )
}

export default ChangePassword