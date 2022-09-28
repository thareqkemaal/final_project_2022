import React, { useState } from 'react'
import regisImg from '../assets/undraw_medicine_b-1-ol.svg'
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsEye, BsEyeSlash } from 'react-icons/bs';
import { HiCheck, HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import { API_URL } from '../helper' ;

const Register = () => {
    const navigate = useNavigate()
    const [weakPass, setWeakPass] = useState(false)
    const [mediumPass, setMediumPass] = useState(false)
    const [strongPass, setStrongPass] = useState(false)
    const [visible,setVisible]=useState('password')
    const [phone_number, setPhone_Number] = useState('+62')
    const [toast, setToast]=useState(false)
    const [agree, setAgree]=useState(false)
    const [alert, setAlert]=useState(false)


    const [input, setInput]= useState({
        name:'',
        email:'',
        password:''
    })

    console.log(phone_number)


    const onChange =(event)=>{
        const {value, name} = event.target

        if(name === 'password') {
            const isweekPass= value.length>0
            const isMediumPass = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})")
            const isStrongPass = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

            if(isweekPass){
                setWeakPass(true)
            }else{
                setWeakPass(false)
            }
            if(isMediumPass){
                setMediumPass(true)
            }else{
                setMediumPass(false)
            }
            if(isStrongPass){
                setStrongPass(true)
            }else{
                setStrongPass(false)
            }
        }
            setInput({...input, [name]:value})
    }

    const showPass = ()=>{
        if(visible=="password"){
            setVisible("text")
        }else if(visible=="text"){
            setVisible("password")
        }
    }

    const onSubmit = ()=>{
        let {name,email,password}=input
        axios.post(API_URL + '/api/user/register',{
            name,
            email,
            phone_number,
            password
        })
        .then((res)=>{
            console.log('data token', res.data)
            if(res.data.success){
                // navigate('/',{replace:true})
                setToast(true)
                setInput({
                    name:'',
                    email:'',
                    password:''
                })
                setPhone_Number('+62')
                setAgree(false)
                setWeakPass(false)
                setMediumPass(false)
                setStrongPass(false)
            }
        }).catch((err)=>{
            console.log(err)
            setAlert(true)
        })
    }

  return (
    <div className='relative'>
        <div className='container mx-auto py-5 xl:px-52 '>
            <div className='lg:grid grid-cols-2'>
                <div className=' hidden bg-gradient-to-r from-blue-300 to-white py-10 drop-shadow-md lg:block'>
                    <img src={regisImg} alt='medcare.com'/>
                    <div className='text-center text-xl bg-gradient-to-r from-blue-800 to-blue-400 font-serif bg-clip-text text-transparent mt-10'>
                        <div>Apotek online khusus</div>
                        <div>Untuk Keperluanmu</div>
                    </div>
                </div>
                <div className='bg-white drop-shadow-md'>
                    <div className='px-16 py-4 lg:px-10 xl:px-5 '>
                        <div className='font-bold font-serif text-2xl'>Let Started</div>
                        <div className=' flex justify-start'>
                            <div className='text-sm font-extralight text-gray-400'>Sudah punya akun ?</div>
                            <div className='ml-2 underline text-teal-500 hover:text-teal-600 text-sm font-bold' onClick={()=>navigate('/login')}>Masuk</div>
                        </div>
                        <div className='flex justify-evenly lg:justify-around pt-4'>
                            <div className='border border-gray-400 rounded-lg w-32 hover:bg-slate-300 h-12 lg:w-48'>
                                <div className='py-3 flex justify-center'>
                                    <FcGoogle className='' size={20}/>
                                    <div className='text-sm font-bold '><span className='hidden lg:inline-flex'>Daftar dengan </span> Google</div>
                                </div>
                            </div>
                            <div className='border bg-blue-700 border-blue-700 w-32 hover:bg-blue-900 rounded-lg h-12 lg:w-48'>
                                <div className='py-3 flex justify-center '>
                                    <BsFacebook className='mr-2 fill-white' size={20}/>
                                    <div className='text-sm text-white'><span className='hidden lg:inline-flex'>Daftar dengan </span> Facebook</div>
                                </div>
                            </div>
                        </div>
                        <div className='relative py-4'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-b border-gray-300'></div>
                            </div>
                            <div className='relative flex justify-center'>
                                <span className='bg-white px-4 text-sm text-gray-500'>Or</span>
                            </div>
                        </div>
                        <form action='' >
                            <label for='name' className="block mb-3 ">
                                <span className="block text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5" >
                                    Name
                                </span>
                                <input requried value={input.name} id='name' name='name' onChange={onChange} className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1' placeholder="John Doe"/>
                            </label>
                            <label for='email' className='block mb-3'>
                                <span className="block text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5">
                                Email<span className='text-red-500'></span>
                                </span>
                                <input requried  value={input.email} id='email' name='email' onChange={onChange} type='email' className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1 invalid:text-red-500 invalid:border-red-500 invalid:ring-red-500 invalid:focus:border-red-500 invalid:focus:ring-red-500 peer' placeholder="you@example.com"/>
                                    <p className='text-red-600 text-xs invisible peer-invalid:visible'>email invalid</p>
                                {
                                    alert &&
                                    <p className='text-red-600 text-xs'>e-mail already used</p>
                                }
                            </label>
                            <label for='phone' className='block mb-3'>
                                <span className='block text-sm font-medium text-slate-700'>
                                Phone Number<span className='text-red-500'>*</span>
                                </span>
                                <PhoneInput international defaultCountry='RU' value={phone_number} id='phone' name='phone_number' onChange={setPhone_Number} placeholder='081234566'/>
                            </label>
                            <label for='password' className='block'>
                                <span className='block text-sm font-medium text-slate-700'>
                                Password<span className='text-red-500'>*</span>
                                </span>
                                <div className='relative'>
                                    <input requried value={input.password} id='password' name='password' onChange={onChange} type={visible} className='mt-1 px-3 py-2  bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1'/>
                                    {
                                        visible === 'password'
                                        ?
                                        <BsEye className='absolute top-3 right-3' size={20} onClick={showPass}/>
                                        :
                                        <BsEyeSlash className='absolute top-3 right-3' size={20} onClick={showPass}/>
                                    }
                                </div>
                            </label>
                            <div className='grid grid-cols-3 gap-1 mt-2'>
                                {
                                    weakPass ?
                                    <div className='max-w-full bg-red-500 rounded-full h-2'></div>
                                    :
                                    <div className='max-w-full border border-sky-500 rounded-full h-2'></div>

                                }
                                {
                                    mediumPass ?
                                    <div className='max-w-full bg-yellow-200 rounded-full h-2'></div>
                                    :
                                    <div className='max-w-full border border-sky-500  rounded-full h-2'></div>
                                }
                                {
                                    strongPass ?
                                    <div className='max-w-full bg-green-400 rounded-full h-2'></div>
                                    :
                                    <div className='max-w-full border border-sky-500  rounded-full h-2'></div>
                                }
                            </div>
                        </form>
                        <div className='flex my-4'>
                            <input requried type={'checkbox'} name='agree' id='agree' onClick={(e)=>setAgree(e.target.checked)} />
                            <div className='flex ml-3 text-xs'>
                                <div>Saya setuju dengan </div>
                                <div className='ml-1 text-teal-500 font-bold'>persyaratan</div>
                                <div className='ml-1'>dan</div>
                                <div className='ml-1 text-teal-500 font-bold'>ketentuan</div>
                            </div>
                        </div>
                            <button className={`text-white rounded-md bg-teal-600 hover:bg-teal-700 w-full py-2 my-7 disabled:cursor-not-allowed`} disabled={input.name.length>0 && phone_number.length>3 && input.email.includes('@') && input.email.includes('.co') && weakPass && agree?false:true} onClick={onSubmit}>Register</button>
                </div>
                </div>
            </div>
        {
            toast &&
            <div className='absolute top-1 left-1'>
                <div className='relative'>
                    <div className='flex bg-white h-16 shadow-lg'>
                        <div className='w-2 bg-emerald-500 '></div>
                        <div className='flex py-1'>
                        <HiCheck size={40} className='fill-emerald-500 mt-1 ml-1 border border-emerald-500 rounded-full'/>
                            <div className='px-5 pt-1'>
                                <p className='text-slate-700 font-bold'>Register Success</p>
                                <p className='text-slate-500 text-xs '>please cek your email</p>
                            </div>
                        </div>
                    </div>
                        <HiX className='absolute top-1 right-1 fill-red-500' onClick={()=>setToast(false)} />
                </div>
            </div>
        }
        </div>
    </div>
  )
}

export default Register