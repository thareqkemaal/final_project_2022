import React from 'react'
import logo from '../assets/medical-logo-removebg-preview.png'
import { BiSearchAlt2 } from 'react-icons/bi';

const NavbarComponent = () => {
  return (
    <div>
      <div className='shadow-md'>
        <div className='container md:px-14 md:mx-auto'>
          <div className='flex py-3 justify-between'>
            <div className='flex-none'>
              <div className='hidden sm:flex'>
                <img src={logo} className='h-9' alt='medcare.com'/>
                <span className='text-sm bg-gradient-to-r from-green-500 to-blue-600 text-transparent font-extrabold bg-clip-text mt-2'>MedCare</span>
              </div>
            </div>
              <div className='flex grow relative'>
                  <input placeholder='Search' className='grow mx-10 w-1/2 border border-slate-600 rounded-lg px-10'/>
                  <BiSearchAlt2 className='absolute left-12 top-2 fill-slate-500' size={25}/>
              </div>
            <div className='flex-none'>
              <div className='flex '>
                <button className='transition mr-4 text-teal-500 border-2 border-teal-500 rounded-lg py-1 px-2 mt-1 hover:-translate-y-1 hover:bg-slate-100'>Sign In</button>
                <button className='transition mr-4 text-white bg-teal-500 border-2 border-teal-500 rounded-lg py-1 px-2 mt-1 hover:-translate-y-1 hover:bg-teal-600 hover:border-teal-600' >Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarComponent