import React from 'react'
import { AiFillHome } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiBillLine } from 'react-icons/ri';
import { FaHeadset } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill, BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';
import logo from '../assets/medical-logo-removebg-preview.png'

const FooterComponent = () => {
  return (
    <div>
        <div className='bg-slate-300 py-5 sm:hidden'>
            <div className='container mx-auto px-5'>
                <div className='grid grid-cols-5 '>
                    <div>
                        <AiFillHome size={20} className='mx-auto fill-slate-500'/>
                        <p className='text-center text-sm text-slate-500 font-thin'>Home</p>
                    </div>
                    <div>
                        <BiCategoryAlt size={20} className='mx-auto fill-slate-500'/>
                        <p className='text-center text-sm text-slate-500 font-thin'>Category</p>
                    </div>
                    <div>
                        <RiBillLine size={20} className='mx-auto fill-slate-500'/>
                        <p className='text-center text-sm text-slate-500 font-thin'>Transaction</p>
                    </div>
                    <div>
                        <FaHeadset size={20} className='mx-auto fill-slate-500'/>
                        <p className='text-center text-sm text-slate-500 font-thin'>Help</p>
                    </div>
                    <div>
                        <CgProfile size={20} className='mx-auto fill-slate-500'/>
                        <p className='text-center text-sm text-slate-500 font-thin'>Profile</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='hidden sm:block'>
            <div className='shadow-lg'>
                <div className='container mx-auto px-10 bg-white'>
                    <div className='grid grid-cols-4 gap-10 py-10'>
                        <div className='grid grid-rows-4 gap-2'>
                            <div className='flex'>
                                <img src={logo} className='h-12' alt='medcare.com'/>
                                <p className='bg-gradient-to-r from-green-500 to-blue-600 text-transparent font-bold bg-clip-text text-lg'>Medcare</p>
                            </div>
                            <div className=''>
                                <div className='flex pl-2 '>
                                    <IoLogoWhatsapp size={25}/>
                                    <div >
                                        <p style={{fontSize:'10px'}} className='text-xs text-sky-900'>Chat Whatsapp</p>
                                        <p style={{fontSize:'10px'}} className='text-xs text-sky-900'>+62 81 4567</p>
                                    </div>
                                </div>
                            </div>
                            <div className='' >
                                <div className='flex pl-2 '>
                                    <MdEmail size={25}/>
                                    <div >
                                        <p style={{fontSize:'10px'}} className='text-xs text-sky-900'>Email</p>
                                        <p style={{fontSize:'10px'}} className='text-xs text-sky-900'>contact@medcare.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className='flex pl-2 '>
                                    <BsFillTelephoneFill size={25}/>
                                    <div>
                                        <p className='text-xs text-sky-900' style={{fontSize:'10px'}}>Call Center</p>
                                        <p className='text-xs text-sky-900' style={{fontSize:'10px'}}>+62 134598</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-rows-5 mx-auto text-sky-900' style={{fontSize:'10px'}}>
                            <p>Tentang Kami</p>
                            <p>Kebijakan Privasi</p>
                            <p>FAQ</p>
                            <p>Syarat dan Ketentuan</p>
                            <p>Karir</p>
                        </div>
                        <div className='grid grid-rows-4 mx-auto text-sky-900' style={{fontSize:'10px'}}>
                            <p>Blog</p>
                            <p>Cara Belanja</p>
                            <p>Promo</p>
                            <p>Diagnosis</p>
                        </div>
                        <div className='grid grid-rows-4 mx-auto text-sky-900'>
                            <p className='text-lg font-bold'>Ikuti Kami</p>
                            <div className='flex pl-2 '>
                                <BsFacebook size={25}/>
                                <p className='text-xs text-sky-900' style={{fontSize:'10px'}}>Facebook</p>
                            </div>
                            <div className='flex pl-2 '>
                                <BsTwitter size={25}/>
                                <p className='text-xs text-sky-900' style={{fontSize:'10px'}}>Twitter</p>
                            </div>
                            <div className='flex pl-2 '>
                                <BsInstagram size={25}/>
                                <p className='text-xs text-sky-900' style={{fontSize:'10px'}}>Instagram</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-sky-900'>
                    <p className='text-white text-xs text-center py-5'>@MedCare2022</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FooterComponent