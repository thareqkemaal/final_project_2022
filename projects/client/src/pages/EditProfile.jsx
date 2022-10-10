import React, { useState, useRef, useEffect } from 'react'
import { Tabs } from 'flowbite-react'
import { MdDashboard } from 'react-icons/md';
import { BsFillPencilFill, BsEye } from 'react-icons/bs';
import { HiUserCircle, HiAdjustments } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from '../helper'
import { UpdateProfile } from '../action/useraction';
import PhoneInput from 'react-phone-number-input'
import Avatar from '../components/Avatar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AddressComponent from '../components/AdressComponent';
import ChangePassword from '../components/ChangePassword';
import { compareAsc, format } from 'date-fns'


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
            gender:gender?gender:'select gender',
            birthdate:format(new Date(birthdate), 'yyyy-MM-dd'),
            phone_number: phone_number,
        })
    },[fullname,username,email,phone_number, gender, birthdate])
    
    
    const updateProfile = ()=>{
        let medcarelog = localStorage.getItem('medcarelog')
        let formData = new FormData()
        formData.append('data',JSON.stringify(input))
        formData.append('images',newProfilPict)
        axios.patch(API_URL+`/api/user/edit-profile`,formData,{
            headers:{
                'Authorization': `Bearer ${medcarelog}`
            }
        })
        .then((res)=>{
            dispatch(UpdateProfile(res.data))
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
        })
        .catch((err)=>{
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
    }

    const onChange = (e)=>{
        console.log(e.target.value)
        const {value,name}=e.target
        setInput({...input, [name]:value})
    }

    const handleClick = () => {
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
            return toast.error(`Wrong file format`, {
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

    return (
        <div className='container mx-auto px-16'>
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
                            {
                                profile_pic || newProfilPict ?
                                <>
                                <Avatar
                                    onClick={handleClick}
                                    src={newProfilPict ? URL.createObjectURL(newProfilPict) :API_URL + profile_pic}
                                    w={20}
                                    h={20}
                                    b={1}
                                    width={6}
                                    height={6}
                                />
                                </>
                                :
                                <>
                                <Avatar
                                    onClick={handleClick}
                                    src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                    w={20}
                                    h={20}
                                    b={1}
                                    width={6}
                                    height={6}
                                />
                                </>
                            }
                            <input onChange={(e) => onChangeNewProfilePic(e.target.files[0])} type='file' ref={hiddenFileInput} style={{ display: 'none' }} />
                        </div>
                        <form>
                            {/* Tolong pakai yang tidak ada command di atas label nya pak */}
                            
                            {/* fullname */}
                            <label className=' block mb-3 '>
                                <span className='block text-sm font-medium text-slate-700 mb-1'>Fullname</span>
                                <input className='border border-gray-400 w-full rounded-md px-2 h-10 font-Public' name='fullname' onChange={onChange} defaultValue={input.fullname} />
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
                                <input className='border border-gray-400 w-2/6 rounded-md px-2 h-10 font-Public' defaultValue={input.birthdate} name='birthdate' onChange={onChange} type='date' />
                            </label>
                            {/* gender*/}
                            <label className='block mb-3'>
                                <span className='block text-sm font-medium text-slate-700 mb-1 font-Public'>Gender</span>
                                <select onChange={onChange} value={input.gender} name='gender' className='h-10 rounded-md font-Public'>
                                    <option disabled value='select gender' className='font-Public'>Select Gender</option>
                                    <option value='male' className='font-Public'>Male</option>
                                    <option value='female' className='font-Public'>Female</option>
                                </select>
                            </label>
                        </form>
                        <button className=' mt-5 border bg-teal-500 hover:bg-teal-700 rounded-md py-2 text-white px-10 font-Public' onClick={updateProfile}>Save</button>
                    </div>
                </Tabs.Item>
                <Tabs.Item
                    active={true}
                    title="Password"
                    icon={MdDashboard}
                >
                    <ChangePassword/>
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