import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../helper'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductCategory = (props) => {
    const navigate = useNavigate()

    const [productByCategory, setProductByCategory] = useState([]);
    const [userCartData, setUserCartData] = React.useState([]);

    console.log(props)

    const getCategoryProduct = () => {
        axios.post(API_URL + `/api/product/filterproduct/category?category_id=${props.id}`, {
            query: 5,
            sort: '',
            filterName: ''
        })
            .then((res) => {
                setProductByCategory(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCategoryProduct();
        let userToken = localStorage.getItem('medcarelog');
        if (userToken !== null) {
            getUserCartData();
        }
    }, []);

    // kemal add to cart APKG2-26
    const getUserCartData = async () => {
        try {
            let userToken = localStorage.getItem('medcarelog');
            let get = await axios.get(API_URL + '/api/product/getcartdata', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });

            console.log('user cart', get.data);
            setUserCartData(get.data);
        } catch (error) {
            console.log(error)
        }
    };

    // kemal add to cart APKG2-26
    const onAddToCart = async (id) => {
        try {
            console.log('idproduct', id);

            let userToken = localStorage.getItem('medcarelog');

            if (userToken === null) {
                toast.info('You need to login first', {
                    theme: "colored",
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                navigate('/login');
            } else {
                let find = null;
                let qty = 0;
                let idcart = 0;
                userCartData.forEach((val, idx) => {
                    if (val.idproduct === id) {
                        find = true;
                        qty = val.quantity;
                        idcart = val.idcart;
                    } else {
                        find = false;
                    }
                });

                console.log(find);
                console.log('quantity in cart', qty);
                console.log('idcart', idcart);

                if (find) {
                    let data = {
                        idcart,
                        newQty: qty + 1
                    };

                    let res = await axios.patch(API_URL + '/api/product/updatecart', data, {
                        headers: {
                            'Authorization': `Bearer ${userToken}`
                        }
                    });

                    if (res.data.success) {
                        toast.success('Item Added to Cart', {
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

                } else {
                    let data = {
                        idproduct: id,
                        newQty: qty + 1
                    };

                    let res = await axios.post(API_URL + '/api/product/addcart', data, {
                        headers: {
                            'Authorization': `Bearer ${userToken}`
                        }
                    });

                    if (res.data.success) {
                        toast.success('Item Added to Cart', {
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
        } catch (error) {
            console.log(error)
        }
    };

    const printData = () => {
        return productByCategory.map((val, idx) => {
            return (
                <div className='w-48 h-80 shadow-lg mx-4 my-4 bg-white grid-cols-3' >
                    <div onClick={() => navigate(`/product/detail?name:${val.product_name}:${val.category_id}`)}>
                        <div className='flex justify-center'>
                            <img src={val.picture} alt='medcare.com' className='w-64 h-36 px-10' />
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
                        <button className='border-2 border-teal-500 text-teal-500 px-10 rounded-lg py-1 hover:bg-teal-200 font-Public'
                            onClick={() => onAddToCart(val.idproduct)}>Keranjang</button>
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
            <ToastContainer />
        </div>
    )
}

export default ProductCategory