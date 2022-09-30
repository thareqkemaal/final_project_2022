import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router';
import { API_URL } from '../../helper';

const Checkout = (props) => {

    const [checkoutData, setCheckoutData] = React.useState([]);
    const [allAddress, setAllAddress] = React.useState([]);
    const [selectedAddress, setSelectedAddress] = React.useState({});

    const { state } = useLocation();

    React.useEffect(() => {
        getAddress();
        setCheckoutData(state.selected)
    }, []);

    // tampung selected di reducer
    // selected address buat shipping
    
    const getAddress = async () => {
        try {
            // harus ditambah header authorization
            let getAddress = await axios.get(API_URL + '/api/user/getaddress');
            //console.log('user address', getAddress.data);
            setAllAddress(getAddress.data)

            let getPrimaryAddress = getAddress.data.find((val, idx) => val.status_name === "Primary");
            //console.log('primary address', getPrimaryAddress);
            setSelectedAddress(getPrimaryAddress);
        } catch (error) {
            console.log(error)
        }
    };

    const printSelectedAddress = () => {
        if (selectedAddress !== {}) {
            return (
                <div>
                    <p className='text-transform: uppercase'>{selectedAddress.full_address}</p>
                    <p className='text-transform: uppercase'>KECAMATAN {selectedAddress.district}, {selectedAddress.city}, {selectedAddress.province}, {selectedAddress.postal_code}</p>
                </div>
            )
        } else {
            return (
                <div>
                    Anda belum memiliki alamat. Silahkan klik tombol pilih alamat lalu pilih tambah alamat.
                </div>
            )
        }
    };

    const printSummary = () => {
        return checkoutData.map((val, idx) => {
            return (
                <div key={val.idcart} className='flex border-b-2 border-grey-300 my-1'>
                    <div>
                        <img src={val.picture} style={{ maxWidth: '8rem' }} alt={val.product_name} />
                    </div>
                    <div className='flex flex-column w-full'>
                        <div className='flex justify-between h-2/3'>
                            <div className='w-3/4 px-3 pt-1'>
                                <p className='font-medium'>{val.product_name}</p>
                                <p className='text-transform: capitalize text-sm'>1 {val.default_unit}</p>
                            </div>
                            <div className='w-1/4 text-center pt-1 font-semibold'>
                                Rp {(val.price * val.quantity).toLocaleString('id')}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    };

    return (
        <div className='container py-5'>
            <div className='mx-9'>
                <div className='text-xl font-bold px-3 text-main-600'>
                    Checkout
                </div>
                <div className='flex flex-row mt-2'>
                    <div className='basis-7/12'>
                        <div className='border m-2 p-3 shadow-md rounded-md'>
                            {/* tunggu nama address dari api */}
                            <p className='text-md font-bold mb-2 border-b-2 pb-2 text-main-600 border-main-800'>Alamat</p>
                            <p className='text-red-500'>nama user dari reducer</p>
                            <div className='my-2'>
                                {printSelectedAddress()}
                            </div>
                            <button type='button' className='text-main-600 hover:underline'>Pilih Alamat</button>
                        </div>
                        <div className='border m-2 p-3 shadow-md rounded-md '>
                            <p className='text-md font-bold mb-2 border-b-2 pb-2 text-main-600 border-main-800'>Rangkuman Belanja</p>
                            {printSummary()}
                            <div className='w-full flex flex-row py-3 text-lg'>
                                <div className='w-4/5 px-3 font-semibold'>
                                    Sub Total
                                </div>
                                <div className='w-1/5 text-center font-semibold'>
                                    Rp {state.totalPrice.toLocaleString('id')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border basis-5/12'>
                        total
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Checkout;