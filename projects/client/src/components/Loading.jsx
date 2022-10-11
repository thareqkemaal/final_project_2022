import React from "react";
import logo from '../assets/medical-logo-removebg-preview.png'


const LoadingComponent = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-2xl flex items-center justify-center z-50">
            <div className="p-2 rounded">
                <img src={logo} className='animate-bounce h-40 bg-white rounded-full' />
            </div>
        </div>
    )
}

export default LoadingComponent