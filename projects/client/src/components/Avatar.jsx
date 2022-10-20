import React from 'react'
import { API_URL } from '../helper'


const Avatar = (props) => {
  return (
    <div>
          <div className='relative inline-block' onClick={props.onClick}>
            <img src={props.src} alt='profile' className={`w-${props.w} h-${props.h} rounded-full inline-block object-cover`} />
            <span className={`absolute -bottom-${props.b} right-0 inline-block w-${props.width} h-${props.height} bg-blue-500 border-2 border-white rounded-full`}>
            </span>
            </div>
    </div>
  )
}

export default Avatar