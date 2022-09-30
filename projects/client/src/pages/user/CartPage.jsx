import axios from 'axios';
import React from 'react';
import { API_URL } from '../../helper';
import { CgTrash } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

const UserCart = (props) => {

    // NOTE PROBLEM
    // 1. perlu get data produk untuk dapat stocknya? => fungsi onInc

    const [cartData, setCartData] = React.useState([]);
    const [modalDelete, setModalDelete] = React.useState(0);
    const [countItem, setCountItem] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [isCheckAll, setIsCheckAll] = React.useState('');

    const navigate = useNavigate();

    React.useEffect(() => {
        getCartData();
    }, []);

    const getCartData = async () => {
        try {
            // harus ditambah header authorization
            let getCart = await axios.get(API_URL + '/api/product/getcartdata');
            console.log('user cart', getCart.data);
            setCartData(getCart.data);

            let total = 0;
            let count = 0;
            getCart.data.forEach((val, idx) => {
                if (val.selected === 'true') {
                    total += (val.price * val.quantity);
                    count += 1;
                }
            });
            setTotalPrice(total);
            setCountItem(count);

            let temp = [];
            getCart.data.forEach((val, idx) => {
                if (val.selected === 'true') {
                    temp.push(true)
                }
            });

            if (temp.length === getCart.data.length){
                setIsCheckAll('true')
            } else {
                setIsCheckAll('false')
            }

        } catch (error) {
            console.log(error)
        }
    };

    const printCart = () => {
        return cartData.map((val, idx) => {
            return (
                <div key={val.idcart} className='flex border-b-2 border-grey-300 my-1'>
                    <div className='flex items-center px-2'>
                        <input type='checkbox' className='w-4 h-4 text-main-600 bg-gray-100 rounded border-gray-300 focus:ring-main-500'
                            onClick={onCheckbox} value={val.idcart} checked={val.selected === 'true' ? true : false} defaultChecked={val.selected}
                        />
                    </div>
                    <div>
                        <img src={val.picture} style={{ maxWidth: '8rem' }} alt={val.product_name} />
                    </div>
                    <div className='w-full flex flex-col'>
                        <div className='flex justify-between h-2/3'>
                            <div className='w-2/3 pl-3'>
                                <p className='font-medium'>{val.product_name}</p>
                                <p className='text-sm'>1 {val.default_unit}</p>
                            </div>
                            <div className='w-1/3 text-end pr-3 font-medium'>
                                Rp {val.price.toLocaleString('id')}
                            </div>
                        </div>
                        <div className='flex justify-end h-1/3 items-center'>
                            <div className='h-full w-full flex justify-end items-center pr-3'>
                                <button type='button' onClick={() => setModalDelete(val.idcart)}>
                                    <CgTrash className='w-6 h-6 text-red-600' />
                                </button>
                                {
                                    modalDelete === val.idcart ?
                                        <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 flex justify-center items-center z-50 md:inset-0 h-modal md:h-full">
                                            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                                <div className="relative border-2 bg-white rounded-lg shadow border-main-500">
                                                    <div className="p-6 text-center">
                                                        <p className="text-lg font-normal text-black">Anda yakin ingin menghapus item ini dari keranjang?</p>
                                                        <div className='flex justify-center items-center'>
                                                            <img src={val.picture} style={{ maxWidth: '8rem' }} alt={val.product_name} />
                                                        </div>
                                                        <p className='mb-3'>{val.product_name}</p>
                                                        <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                                            onClick={() => onDeleteItem(val.idcart)}>
                                                            Ya, hapus
                                                        </button>
                                                        <button type="button" className="text-black bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 "
                                                            onClick={() => setModalDelete(0)}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ""
                                }
                                <div className='flex items-center w-1/4 px-2 ml-2 rounded-md bg-teal-50 text-main-700 font-bold'>
                                    <button type='button' className='w-1/3 text-center text-lg' onClick={() => onDec(val.quantity, val.idcart)}>-</button>
                                    <div className='w-1/3 text-center mx-1'>
                                        <p>{val.quantity}</p>
                                    </div>
                                    <button type='button' className='w-1/3 text-center text-lg' onClick={() => onInc(val.quantity, val.idcart)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    };

    const onCheckboxAll = async (e) => {
        try {
            // harus pake iduser
            let checkAll = await axios.patch(API_URL + '/api/product/updatecart', { iduser: true, selected: `${e.target.checked}` })

            if (checkAll.data.success) {
                getCartData();
                printCart();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onCheckbox = async (e) => {
        if (e.target.checked) {
            //console.log("checked", e.target.value)
            let selected = await axios.patch(API_URL + `/api/product/updatecart`, { selected: 'true', idcart: e.target.value })
            if (selected.data.success) {
                getCartData();
            };
        } else {
            //console.log("unchecked", e.target.value)
            let selected = await axios.patch(API_URL + `/api/product/updatecart`, { selected: 'false', idcart: e.target.value })
            if (selected.data.success) {
                getCartData();
            };
        }
    };

    const onInc = async (quantity, idcart) => {
        try {
            // belum ditambah kondisi ketika sudah mencapai stok maximum
            let newQty = quantity + 1;
            let inc = await axios.patch(API_URL + `/api/product/updatecart`, { newQty, idcart });
            if (inc.data.success) {
                getCartData();
            }
        } catch (error) {
            console.log(error)
        }
    };

    const onDec = async (quantity, idcart) => {
        try {
            if (quantity > 1) {
                let newQty = quantity - 1;
                let inc = await axios.patch(API_URL + `/api/product/updatecart`, { newQty, idcart });
                if (inc.data.success) {
                    getCartData();
                }
            } else if (quantity === 1) {
                setModalDelete(idcart)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const onDeleteItem = async (id) => {
        try {
            let del = await axios.delete(API_URL + `/api/product/deletecart?idcart=${id}`);

            if (del.data.success) {
                toast.error('Item Removed', {
                    theme: "colored",
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                getCartData();
            }
        } catch (error) {
            console.log(error)
        }
    };

    const onPay = () => {
        let selected = [];
        cartData.forEach((val, idx) => {
            if (val.selected === 'true') {
                selected.push(val)
            }
        })
        //console.log(selected, totalPrice);

        if (selected.length === 0 || totalPrice === 0) {
            toast.error('Anda belum memilih barang', {
                theme: "colored",
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } else {
            let state = {
                selected,
                totalPrice
            }
            navigate('/checkout', { state })
        }
    };

    return (
        <div className='container mx-auto py-5'>
            <div className='mx-9'>
                <div className='text-xl font-bold px-3 text-main-600'>
                    Keranjang Saya
                </div>
                <div className='flex flex-row mt-2'>
                    <div className='basis-7/12'>
                        <div className='border m-2 p-3 shadow-md rounded-md '>
                            <div className='mb-2 align-items-center border-b-2 border-main-800 flex items-center'>
                                <input type='checkbox' className='ml-2 w-4 h-4 text-main-600 bg-gray-100 rounded border-gray-300 focus:ring-main-500'
                                    onClick={onCheckboxAll} defaultChecked={isCheckAll} checked={isCheckAll === 'true' ? true : false}
                                />
                                <span className='font-medium p-2'>Pilih Semua</span>
                            </div>
                            <div>
                                {printCart()}
                            </div>
                        </div>
                    </div>
                    <div className='basis-5/12'>
                        <div className='border m-2 p-3 shadow-md rounded-md'>
                            <p className='font-bold text-xl text-main-500 mb-3'>Ringkasan Belanja</p>
                            <div className='flex justify-between border-b-2 border-main-800 pb-4'>
                                <p>Sub Total Harga ({countItem} Barang)</p>
                                <p>Rp. {totalPrice.toLocaleString('id')}</p>
                            </div>
                            <div className='flex justify-between my-4'>
                                <p className='font-bold text-2xl text-main-500'>Total Harga</p>
                                <p className='font-bold text-2xl text-main-500'>Rp. {totalPrice.toLocaleString('id')}</p>
                            </div>
                            <div>
                                <button type='button'
                                    className='flex w-full bg-main-500 text-white justify-center py-3 font-bold text-2xl rounded-lg
                                hover:bg-main-600 focus:ring-offset-main-500 focus:ring-offset-2 focus:ring-2 focus:bg-main-600'
                                    onClick={onPay}>Bayar ({countItem})</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default UserCart;