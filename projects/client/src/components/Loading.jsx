import React from 'react'
import logo from '../assets/medical-logo-removebg-preview.png'

const Loading = () => {
  return (
    <div>
      <div className='backdrop-blur-sm bg-white/30 py-10 px-10  '>
          <img src={logo} className='animate-bounce h-40 '/>
          <p className='text-main-500 font-bold text-center'>Loading<span className='animate-ping'>...</span></p>
      </div>
    </div>
  )
}

export default Loading