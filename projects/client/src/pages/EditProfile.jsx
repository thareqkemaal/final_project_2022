import React from 'react'
import { Tabs } from 'flowbite-react'
import { MdDashboard } from 'react-icons/md';
import { BsFillPencilFill, BsEye } from 'react-icons/bs';
import { HiUserCircle, HiAdjustments } from 'react-icons/hi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddressComponent from '../components/AdressComponent';

const EditProfile = () => {
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
                            <div className='relative inline-block'>
                                <img src={"https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt='medcare.com' className='w-20 h-20 rounded-full inline-block object-cover' />
                                <span className='absolute bottom-0 right-0 inline-block w-6 h-6 bg-blue-500 border-2 border-white rounded-full'>
                                    <BsFillPencilFill className='fill-white mx-1 ' />
                                </span>
                            </div>
                        </div>
                        <label className=' block mb-3 '>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Name</spam>
                            <input className='border border-gray-400 w-full rounded-md px-2' />
                        </label>
                        <label className='block mb-3'>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Email</spam>
                            <input className='border border-gray-400 w-full rounded-md px-2' />
                        </label>
                        <label className='block mb-3'>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Contact Number</spam>
                            <input className='border border-gray-400 w-full rounded-md px-2' />
                        </label>
                        <button className=' mt-5 border bg-teal-500 hover:bg-teal-700 rounded-md py-2 text-white px-10'>Save</button>
                    </div>
                </Tabs.Item>
                <Tabs.Item
                    active={true}
                    title="Password"
                    icon={MdDashboard}
                >
                    <div className='container mx-auto lg:px-96'>
                        <label className=' block mb-3 '>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Password</spam>
                            <div className=''>
                                <input className='border border-gray-400 w-full rounded-md px-2' />
                            </div>
                        </label>
                        <label className='block mb-3'>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>New Password</spam>
                            <div className='relative'>
                                <input className='border border-gray-400 w-full rounded-md px-2' />
                                <BsEye className='absolute top-1 right-2' />
                            </div>
                        </label>
                        <label className='block mb-3'>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Repeat Password</spam>
                            <div className='relative'>
                                <input className='border border-gray-400 w-full rounded-md px-2' />
                                <BsEye className='absolute top-1 right-2' />
                            </div>
                        </label>
                        <button className=' mt-5 border bg-teal-500 hover:bg-teal-700 rounded-md py-2 text-white px-10'>Save</button>
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