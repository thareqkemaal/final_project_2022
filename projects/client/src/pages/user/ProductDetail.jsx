import React, {useState, useEffect} from 'react'
import { AiOutlineHeart,AiOutlineShoppingCart } from 'react-icons/ai';
import { ImMinus, ImPlus } from 'react-icons/im';
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../helper';
import { Tabs } from 'flowbite-react';
import ProductCategory from '../../components/ProductCategory';

const ProductDetail = () => {
    const {search} = useLocation()

    
    const [productDetail,setProductDetail]=useState([])
    const [counter,setCounter]=useState(0)

    const getDetailProduct =()=> {
        axios.post(API_URL+`/api/product/getproductadmin${search.split('&')[0]}`,{
            limit:1,
            sort:"",
            offset:""
        })
        .then((res)=>{
            setProductDetail(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }



    useEffect(()=>{
        getDetailProduct();
    },[search])

    const printProductDetail = ()=>{
        return productDetail.map((val,idx)=>{
            let desc =val.description.split(' ')
            let index = [0,1,2,3]
            return (
                <div>
                    <div className='py-5 divide-y divide-[#F8F8F8] md:grid md:grid-cols-3' key={val.idproduct}>
                        <div className='bg-white  max-w-full max-h-[184-x] lg:px-20'>
                            <div className='w-full h-[200px] top-[100px]'>
                                <img src={val.picture} className='absolute w-[206.52px] h-[159.34px] right-114.84[px] left-[84.63px] md:left-[70.63px] lg:left-[160px] '/>
                            </div>
                            <div className='hidden  mx-auto px-3 md:grid grid-cols-2 gap-2'>
                                <button className='bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded-full py-[5px] font-Public text-sm'>Chat admin</button>
                                <button className='bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded-full py-[5px] font-Public text-sm'>Bagikan</button>
                            </div>
                        </div>
                        <div className='py-5 px-5 text-xs divide-y divide-[#F8F8F8] md:col-span-2 md:px-10'>
                            <div>
                                <p className='font-Public text-blue-900 '>{val.product_name}</p>
                                <p className='text-sm text-blue-900 font-Public'>{index.map(e=>desc[e])}</p>
                                <p className='text-base bg-gradient-to-t from-[#000C36] via-[#2B4179] to-[#7987BC] bg-clip-text text-transparent font-Public'>Rp. {val.price.toLocaleString('ID')}</p>
                            </div>
                            <div className=' bg-gray-100  w-32 h-9 mt-5 rounded-sm mb-3'>
                                <div className='flex justify-between px-2 my-2'>
                                    <ImMinus size={20} className='fill-main-500 ' onClick={()=>setCounter(counter-1)}/>
                                    <div className='font-Public text-base text-center bg-white w-8 h-full text-main-500'>{counter}</div>
                                    <ImPlus size={20} className='fill-main-500' onClick={()=>setCounter(counter+1)}/>
                                </div>
                                
                            </div>
                            <div className='hidden md:flex'>
                                <button className='w-32 border bg-white border-main-600 hover:bg-gray-100 focus:ring-main-500 text-white rounded-lg flex justify-center py-2'>
                                    <AiOutlineShoppingCart size={20} className='fill-teal-500'/>
                                    <p className='text-sm text-main-500 font-Public'>Keranjang</p>
                                </button>
                                <button className='w-32 mx-3 bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded-lg font-Public'>Buy</button>
                                <button className='w-10 pl-2 border  border-main-600 bg-white rounded-lg hover:bg-gray-100'><AiOutlineHeart size={20} className='fill-teal-500'/></button>
                            </div>
                            <div className='px-7  pt-10 md:px-0'>
                            <Tabs.Group
                            aria-label="Tabs"
                            style="underline"
                            >
                                <Tabs.Item title='Description'>
                                    <div className='text-justify text-sm font-Public text-[#4F618E]'>
                                        {val.description}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item title='How To Use'>
                                <div className='text-justify text-sm font-Public text-[#4F618E]'>
                                        {val.aturan_pakai}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item title='Dosis'>
                                    <div className='text-justify text-sm font-Public text-[#4F618E]'>
                                        {val.dosis}
                                    </div>
                                </Tabs.Item>
                            </Tabs.Group>
                            </div>
                        </div>
                        <div className='w-full h-24 bg-gray-100 mt-24 md:hidden'>
                            <div className='flex py-10 justify-center '>
                                <button className='px-2 py-2 mr-3 border  border-main-600 bg-white rounded-lg hover:bg-gray-100'><AiOutlineHeart className='fill-teal-500'/></button>
                                <button className='px-2 py-2 mr-3 border  border-main-600 bg-white rounded-lg hover:bg-gray-100'><AiOutlineShoppingCart className='fill-teal-500'/></button>
                                <button className='px-20 bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded-lg font-Public'>Buy</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        })
    }


    
return (
    <div>
        <div className=' container mx-auto md:px-10'>
            {printProductDetail()}
            <p className='mt-5 text-sm font-Public font-bold text-blue-900'>Product Terkait</p>
                <div className='bg-gradient-to-t from-teal-50 to-white'>
                    <ProductCategory
                    id={search.split('&')[1]}
                    />
                </div>
        </div>
    </div>
)
}

export default ProductDetail