import React, { useState, useRef, useEffect } from 'react'
import { Tabs } from 'flowbite-react'
import { MdDashboard } from 'react-icons/md';
import { BsFillPencilFill, BsEye } from 'react-icons/bs';
import { HiUserCircle, HiAdjustments } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from '../helper'
import axios from 'axios'
import { UpdateProfile } from '../action/useraction';
import PhoneInput from 'react-phone-number-input'
import Avatar from '../components/Avatar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddressComponent from '../components/AdressComponent';

const EditProfile = () => {

    // DanielHS APKG2-13 dan APKG2-14
    const dispatch = useDispatch()
    const hiddenFileInput = useRef(null)
    
    let{fullname,username,email,phone_number, profile_pic, gender, birthdate}=useSelector((state)=>{
        return{
            fullname:state.userReducer.fullname,
            username:state.userReducer.username,
            email:state.userReducer.email,
            phone_number:state.userReducer.phone_number,
            gender:state.userReducer.gender,
            birthdate:state.userReducer.birthdate,
            profile_pic:state.userReducer.profile_pic,
        }
    })

    const [input, setInput]=useState({
        fullname:'',
        username:'',
        email:'',
        gender:'',
        birthdate:'',
        phone_number: ''
    })
    const[newProfilPict, setNewProfilPict]=useState('')
    
    useEffect(()=>{
        setInput({
            fullname: fullname,
            username:username,
            email:email,
            gender:gender,
            birthdate:birthdate.split('').splice(0,10).join(''),
            phone_number: phone_number
        })
    },[fullname,username,email,phone_number, gender, birthdate])

    
    const updateProfile = ()=>{
        let medcarelog = localStorage.getItem('medcarelog')
        let formData = new FormData()
        formData.append('data',JSON.stringify(input))
        formData.append('images',newProfilPict)
        axios.patch(API_URL+`/api/user/editprofile`,formData,{
            headers:{
                'Authorization': `Bearer ${medcarelog}`
            }
        })
        .then((res)=>{
            dispatch(UpdateProfile(res.data))
            alert('sukses bosq')
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    const onChange = (e)=>{
        const {value,name}=e.target
        setInput({...input, [name]:value})
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const onChangeNewProfilePic = (files) => {
        if(files.size>=1000000 ){
            return alert('Size kebesaran')
        }
        switch(files.type.split('/')[1].toLowerCase()){
            case 'jpg':
                case'png':
                    case'gif':
                return setNewProfilPict(files)
            }
            return alert('format gagal')
    }

    return (
        <div>
            <Tabs.Group
                aria-label="Tabs with icons"
                style="underline"
            >
                <Tabs.Item
                    title="Profile"
                    icon={HiUserCircle}
                >
                    <div className='container mx-auto lg:px-96'>
                        <div className='flex justify-center mt-5'>
                            <Avatar
                                onClick={handleClick}
                                src={newProfilPict ? URL.createObjectURL(newProfilPict) : API_URL + profile_pic}
                                w={20}
                                h={20}
                                b={1}
                                width={6}
                                height={6}
                            />
                            <input onChange={(e) => onChangeNewProfilePic(e.target.files[0])} type='file' ref={hiddenFileInput} style={{ display: 'none' }} />
                        </div>

                        <form>
                            {/* fullname */}
                            <label className=' block mb-3 '>
                                <span className='block text-sm font-medium text-slate-700 mb-1'>Fullname</span>
                                <input className='border border-gray-400 w-full rounded-md px-2 h-10 font-Public' name='fullname' onChange={onChange} defaultValue={input.fullname} />
                                <label className=' block mb-3 '>
                                    <spam className='block text-sm font-medium text-slate-700 mb-1'>Name</spam>
                                    <input className='border border-gray-400 w-full rounded-md px-2' />
                                </label>
                            </label>
                            {/* Username */}
                            <label className=' block mb-3 '>
                                <span className='block text-sm font-medium text-slate-700 mb-1 font-Public'>Username</span>
                                <input className='border border-gray-400 w-full rounded-md px-2 h-10 font-Public' name='username' defaultValue={input.username} onChange={onChange} />
                            </label>
                            {/* Email */}
                            <label className='block mb-3'>
                                <span className='block text-sm font-medium text-slate-700 mb-1 font-Public'>Email</span>
                                <input className='border border-gray-400 w-full rounded-md px-2 h-10 font-Public' name='email' defaultValue={input.email} onChange={onChange} />

                            </label>
                            {/* Phone */}
                            <label className='block mb-3'>
                                <span className='block text-sm font-medium text-slate-700 mb-1 font-Public'>Phone Number</span>
                                <PhoneInput international defaultCountry='ID' type='tel' value={input.phone_number} name='phone_number' onChange={(a) => setInput({ ...input, phone_number: a })} />
                            </label>
                            {/* Birth date */}
                            <label className='block mb-3'>
                                <span className='block text-sm font-medium text-slate-700 mb-1 font-Public'>Birth Date</span>
                                <input className='border border-gray-400 w-2/6 rounded-md px-2 h-10 font-Public' defaultValue={input.birthdate.split('').splice(0, 10).join('')} name='birthdate' onChange={onChange} type='date' />
                            </label>
                            {/* gender*/}
                            <label className='block mb-3'>
                                <span className='block text-sm font-medium text-slate-700 mb-1 font-Public'>Gender</span>
                                <select onChange={onChange} value={input.gender} name='gender' className='h-10 rounded-md font-Public'>
                                    <option disabled className='font-Public'>Select Gender</option>
                                    <option value='male' className='font-Public'>Male</option>
                                    <option value='female' className='font-Public'>Female</option>
                                </select>
                            </label>
                        </form>
                        <button className=' mt-5 border bg-teal-500 hover:bg-teal-700 rounded-md py-2 text-white px-10 font-Public' onClick={UpdateProfile}>Save</button>
                    </div>
                </Tabs.Item>
                <Tabs.Item
                    active={true}
                    title="Password"
                    icon={MdDashboard}
                >
                    <div className='container mx-auto lg:px-96'>

                        <label className=' block mb-3 '>
                            <span className='block text-sm font-medium text-slate-700 mb-1'>Password</span>
                            <div className=''>
                                <input className='border border-gray-400 w-full rounded-md px-2' />
                            </div>
                        </label>
                        <label className='block mb-3'>
                            <span className='block text-sm font-medium text-slate-700 mb-1'>New Password</span>
                            <div className='relative'>
                                <input className='border border-gray-400 w-full rounded-md px-2' />
                                <BsEye className='absolute top-1 right-2' />
                            </div>
                        </label>
                        <label className='block mb-3'>
                            <span className='block text-sm font-medium text-slate-700 mb-1'>Repeat Password</span>
                            <div className='relative'>
                                <input className='border border-gray-400 w-full rounded-md px-2' />
                                <BsEye className='absolute top-1 right-2' />
                            </div>
                        </label>
                        <button className=' mt-5 border bg-teal-500 hover:bg-teal-700 rounded-md py-2 text-white px-10' onClick={() => updateProfile()}>Save</button>
                    </div>
                </Tabs.Item>
                {/* KEMAL BAGIAN ADDRESS APKG2-15 */}
                <Tabs.Item
                    title="Address"
                    icon={HiAdjustments}
                >
                    <AddressComponent />
                </Tabs.Item>
            </Tabs.Group>
            <ToastContainer />
        </div>
    )
}

export default EditProfile;