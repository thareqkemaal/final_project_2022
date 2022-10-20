import React from 'react'
import { HiUserCircle, HiAdjustments } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router';

const Tabs = () => {
    const navigate = useNavigate()
    const { pathname } = window.location
  return (
    <div className='container mx-auto  border border-t-0 border-l-0 border-r-0 h-14 w-[1408px]'>
            <div className='flex'>
                <div className={`flex w-24 h-14 pt-3 ${pathname === '/profile' && 'border border-t-0 border-l-0 border-r-0  border-blue-600'}`} onClick={()=>navigate('/profile')}>
                    <HiUserCircle size={25} className={`${pathname === '/profile'?'fill-blue-600':'fill-[#4b5563]' } ml-2`}/>
                    <p className={`text-sm leading-6 pl-2 ${pathname === '/profile' ? 'text-blue-600':'text-[#4b5563]'}`}>Profile</p>
                </div>
                <div className={`flex w-24 h-14 pt-3 ${pathname === '/change-pass' && 'border border-t-0 border-l-0 border-r-0  border-blue-600'}`} onClick={()=>navigate('/change-pass')}>
                    <MdDashboard size={25} className={`${pathname === '/change-pass'?'fill-blue-600':'fill-[#4b5563]' } ml-2`}/>
                    <p className={`text-sm leading-6  ${pathname === '/change-pass' ? 'text-blue-600':'text-[#4b5563]'}`}>Password</p>
                </div>
                <div className={`flex w-24 h-14 pt-3 ml-2 ${pathname === '/address' && 'border border-t-0 border-l-0 border-r-0  border-blue-600'}`} onClick={()=>navigate('/address')}>
                    <HiAdjustments size={25} className={`${pathname === '/address'?'fill-blue-600':'fill-[#4b5563]' } ml-2`}/>
                    <p className={`text-sm leading-6 pl-2 ${pathname === '/address' ? 'text-blue-600':'text-[#4b5563]'}`}>Address</p>
                </div>
  
            </div>
    </div>
  )
}

export default Tabs