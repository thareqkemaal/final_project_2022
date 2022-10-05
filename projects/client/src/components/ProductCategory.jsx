import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { API_URL } from '../helper'
import { useNavigate } from 'react-router'


const ProductCategory = (props) => {
    const navigate = useNavigate()

    const [productByCategory, setProductByCategory]=useState([])
    console.log(props)


    const getCategoryProduct=()=>{
        axios.post(API_URL+`/api/product/filterproduct/category?category_id=${props.id}`,{
            query:5,
            sort:'',
            filterName:''
        })
        .then((res)=>{
            setProductByCategory(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getCategoryProduct()
    },[])

    const printData = ()=>{
        return productByCategory.map((val,idx)=>{
            return(
                <div className='w-48 h-80 shadow-lg mx-4 my-4 bg-white grid-cols-3' >
                    <div onClick={()=>navigate(`/product/detail?name:${val.product_name}:${val.category_id}`)}>
                        <div className='flex justify-center'>
                            <img src={val.picture} alt='medcare.com' className='w-64 h-36 px-10'/>
                        </div>
                        <div className='py-5 h-28'>
                            <p className=' px-5 text-blue-900 font-bold text-sm font-Public'>{val.product_name}</p>
                            <div className='w-20 py-1 px-5 flex '>
                                <p className='border border-red-400 text-xs text-red-300 font-bold text-center font-Public'>17%</p>
                                <p className='pl-1 text-gray-400 text-xs line-through font-Public'>Rp.6.000</p>
                            </div>
                            <div className='px-5'>
                                <p className='text-blue-900 font-bold text-sm'>Rp.{val.price.toLocaleString('id')}<span className='text-sm text-gray-400 font-normal font-Public'>/{val.netto_unit}</span></p>
                            </div>
                        </div>
                    </div>
                        <div className='px-5 py-5'>
                            <button className='border-2 border-teal-500 text-teal-500 px-10 rounded-lg py-1 hover:bg-teal-200 font-Public'>Keranjang</button>
                        </div>
              </div>
                
            )
        })
    }

  return (
    <div className=''>
        <div className='overflow-x-auto w-full'>
            <div className=' flex'>
                {printData()}
            </div>
        </div>
    </div>
  )
}

export default ProductCategory