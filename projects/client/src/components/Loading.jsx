import React from "react";
import logo from '../assets/medical-logo-removebg-preview.png'


const LoadingComponent = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-2xl flex items-center justify-center">
            <div className="bg-white p-2 rounded w-72">
                <img src={logo} className='animate-bounce h-40 ' />
            </div>
        </div>
    )
}

export default LoadingComponent