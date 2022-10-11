import React from 'react'
import image from '../assets/undraw_doctors_hwty.svg'
import { GiMedicines, GiChestnutLeaf, GiShinyApple, GiBeerBottle, GiSquareBottle, GiGlassShot, GiNotebook, GiShipBow } from 'react-icons/gi';
import bca from '../assets/Bank BCA Logo (PNG-1080p) - FileVector69.png'
import bri from '../assets/bri.png'
import bni from '../assets/Bank BNI Logo (PNG-1080p) - FileVector69.png'
import gopay from '../assets/Logo GoPay (PNG-1080p) - FileVector69.png'
import ovo from '../assets/ovo.png'
import shoppe from '../assets/ShopeePay Logo (PNG-1080p) - Vector69Com.png'
import Carousel from '../components/Carousel'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../helper';
import { useNavigate } from 'react-router';
import ProductCategory from '../components/ProductCategory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPages = () => {
  const navigate = useNavigate()
  const { email, status, iduser } = useSelector((state) => {
    return {
      email: state.userReducer.email,
      status: state.userReducer.status_name,
      iduser: state.userReducer.iduser
    }
  })


  const resendVerif = async () => {
    try {
      await axios.get(`${API_URL}/api/user/resend-verif?email=${email}`)
        .then((res) => {
          console.log(res)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        <div className='px-3 lg:px-[9.5rem]'>
          {
            status === 'Unverified' &&
            <button className='text-red-500 font-Public' onClick={resendVerif}>Click to verified your account</button>
          }
          <Carousel />
          <div className='grid grid-cols-2 my-3 w-full  py-10 shadow-lg bg-gradient-to-tr from-blue-500 to-white rounded-lg'>
            <div className=''>
              <img className='h-24 lg:h-52 lg:mx-auto' src={image} alt='medcare.com' />
            </div>
            <div className='mx-auto py-2 lg:mx-1 lg:py-4  md:flex justify-around md:mt-10 lg:mt-10'>
              <div className=''>
                <p className=' text-blue-800 text-sm font-bold lg:text-2xl font-Public'>Punya Resep Dokter</p>
                <p className='text-white text-xs font-Public'>Hanya foto resep anda dan unggah max 10mb</p>
                <p className='hidden lg:block text-white text-xs font-Public'>tanpa perlu antri obat akan dikirimkan ke lokasi anda</p>
              </div>
              <div className=' md:pr-2 lg:mt-5'>
                <button type='button' onClick={() => {
                  if (iduser !== null){
                  navigate('/prescription')
                  } else {
                    toast.error('You need to login!', {
                      theme: "colored",
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                  });
                  }
                }
                }
                  className='bg-teal-500 hover:bg-teal-600 px-2 py-1 rounded-lg text-white font-Public'
                  >Unggah Resep</button>
              </div>
            </div>
          </div>
          <div className='py-5'>
              <div className='flex justify-between my-2'>
                <p className='text-sm font-bold text-blue-800 font-Public'>Kategori</p>
                <p className='text-xs font-bold  text-teal-500 font-Public' onClick={()=>navigate('/product')}>Lihat Semua</p>
              </div>
              <div className='flex justify-between mx-auto' onClick={()=>navigate('/product')}>
                <div className='w-40 rounded-xl shadow-xl '>
                  <div className='py-3'>
                    <GiMedicines size={50} className='mx-auto fill-red-500'/>
                    <p className='text-xs text-center text-blue-900 font-bold font-Public'>Fever</p>
                  </div>  
                </div>
                <div className='w-40 rounded-xl shadow-xl '>
                  <div className='py-3'>
                    <GiChestnutLeaf size={50} className='mx-auto fill-green-500'/>
                    <p className='text-xs text-center text-blue-900 font-bold font-Public'>Flu</p>
                  </div>  
                </div>
                <div className='w-40 rounded-xl shadow-xl '>
                  <div className='py-3'>
                    <GiShinyApple size={50} className='mx-auto fill-red-500'/>
                    <p className='text-xs text-center text-blue-900 font-bold font-Public'>Digestive System</p>
                  </div>  
                </div>
                <div className='w-40 rounded-xl shadow-xl '>
                  <div className='py-3'>
                    <GiSquareBottle size={50} className='mx-auto fill-orange-500'/>
                    <p className='text-xs text-center text-blue-900 font-bold font-Public'>Eyes</p>
                  </div>  
                </div>
                <div className=' hidden md:block w-40 rounded-xl shadow-xl '>
                  <div className='py-3'>
                    <GiBeerBottle size={50} className='mx-auto fill-gray-500'/>
                    <p className='text-xs text-center text-blue-900 font-bold font-Public'>Vitamin</p>
                  </div>  
                </div>
                <div className='w-40 rounded-xl shadow-xl '>
                  <div className='py-3'>
                    <GiGlassShot size={50} className='mx-auto fill-red-500'/>
                    <p className='text-xs text-center text-blue-900 font-bold font-Public' >Asthma</p>
                  </div>  
                </div>
                <div className='hidden md:block w-40 rounded-xl shadow-xl '>
                  <div className='py-3'>
                    <GiMedicines size={50} className='mx-auto fill-green-500'/>
                    <p className='text-xs text-center text-blue-900 font-bold font-Public'>Hypertension</p>
                  </div>  
                </div>
                <div className='hidden md:block w-40 rounded-xl shadow-xl '>
                  <div className='py-3'>
                    <GiMedicines size={50} className='mx-auto fill-green-500'/>
                    <p className='text-xs text-center text-blue-900 font-bold font-Public'>Antivirus</p>
                  </div>  
                </div>
              </div>
              <div className='flex justify-between my-2'>
                <p className='text-sm font-bold text-blue-800 font-Public'>Produk Populer</p>
                <p className='text-xs font-bold  text-teal-500 font-Public' onClick={()=>navigate('/product')}>Lihat Semua</p>
              </div>

              {/* Gunakan Produk Component */}
              <div className='bg-gradient-to-t from-teal-50 to-white'>
                <ProductCategory
                id={1}
                />
              </div>
            </div>
            <div className='my-3 '>
              <p className='text-sm font-bold text-blue-800 font-Public'>Jaminan Untuk Anda</p>
            </div>
            <div className='my-2'>
              <div className='grid gap-2 lg:grid-cols-3'>
                <div className='w-full h-32 rounded-lg shadow-lg bg-gradient-to-t from-teal-50 to-white'>
                  <div className='grid grid-cols-3 px-5 py-4'>
                    <GiMedicines size={80} className='fill-red-600' />
                    <div className='col-span-2'>
                      <p className='text-blue-900 font-bold text-lg font-Public'>100% Obat asli</p>
                      <p className='text-sm text-gray-700 font-Public'>Semua Produk yang kami jual dijamin asli dengan kualitas yang baik</p>
                    </div>
                  </div>
                </div>
                <div className='w-full h-32 rounded-lg shadow-lg bg-gradient-to-t from-teal-50 to-white'>
                  <div className='grid grid-cols-3 px-5 py-4'>
                    <GiNotebook size={80} className='fill-green-600' />
                    <div className='col-span-2'>
                      <p className='text-blue-900 font-bold text-lg font-Public'>Terjamin dan Hemat</p>
                      <p className='text-sm text-gray-700 font-Public'>Kami menjamin pengembalian uang dari selisih perbedaan harga</p>
                    </div>
                  </div>
                </div>
                <div className='w-full h-32 rounded-lg shadow-lg bg-gradient-to-t from-teal-50 to-white'>
                  <div className='grid grid-cols-3 px-5 py-4'>
                    <GiShipBow size={80} className='fill-gray-300' />
                    <div className='col-span-2'>
                      <p className='text-blue-900 font-bold text-lg font-Public'>Gratis Ongkir</p>
                      <p className='text-sm text-gray-700 font-Public'>Kami kirim pembelian anda secara gratis tanpa antri</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
        <div className='hidden lg:block w-full bg-gray-100'>
          <div className='p-4'>
            <p className='text-center text-blue-900 text-sm font-bold font-Public'>Metode Pembayaran</p>
            <div className='container mx-auto px-20 mt-10'>
              <div className='flex justify-center'>
                <img src={bca} className='h-10' alt='medcare.com' />
                <img src={bri} className='h-10 px-10' alt='medcare.com' />
                <img src={bni} className='h-10 px-10' alt='medcare.com' />
                <img src={ovo} className='h-14 px-10' alt='medcare.com' />
                <img src={gopay} className='h-10 px-10' alt='medcare.com' />
                <img src={shoppe} className='h-10 px-10' alt='medcare.com' />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default LandingPages