import React from 'react'
import axios from 'axios';
import { API_URL } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewAddressComponent from "../components/NewAddressModalComp";
import EditAddressComponent from './EditAddressModalComp';
import LoadingComponent from './Loading';
import { useSelector } from 'react-redux';
import placeholder from '../assets/placeholder.png';
import Tabs from './Tabs';
import { Helmet } from 'react-helmet';



const AddressComponent = (props) => {

    const [loading, setLoading] = React.useState(false);

    //////// KEMAL BAGIAN ADDRESS APKG2-15, MELIPUTI SEMUA FUNGSI CRUD ADDRESS DI PROFILING ////////
    const [addressData, setAddressData] = React.useState([]);
    const [showNewAddressModal, setShowNewAddressModal] = React.useState('');
    const [showEditAddressModal, setShowEditAddressModal] = React.useState('');
    const [modalDelete, setModalDelete] = React.useState(0);
    const [selectedEdit, setSelectedEdit] = React.useState({});

    const { status } = useSelector((state) => {
        return {
            status: state.userReducer.status_name
        }
    })

    React.useEffect(() => {
        getAddress();
    }, [showNewAddressModal, showEditAddressModal]);

    const getAddress = async () => {
        try {
            setLoading(true);
            let userToken = localStorage.getItem('medcarelog');
            let get = await axios.get(API_URL + '/api/address/get', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });

            if (get.data) {
                // console.log("data address profiling", get.data);
                setAddressData(get.data);
                setLoading(false);
            }

        } catch (error) {
            console.log(error)
        }
    };

    const printAddress = () => {
        return addressData.map((val, idx) => {
            return (
                <div key={val.idaddress}
                    className={val.status_name === 'Primary' ? 'shadow-lg border-2 rounded-lg bg-teal-50 border-main-500 my-2 p-3 flex' : 'shadow-lg border-2 rounded-lg border-main-500 my-2 p-3 flex'}>
                    <div className='w-full sm:w-4/5'>
                        <p className='transform: capitalize font-bold text-main-600'>{val.fullname}</p>
                        <p>{val.phone_number}</p>
                        <p className='transform: capitalize'>{val.full_address}, Kecamatan {val.district}, {val.city}</p>
                        <p className='transform: capitalize'>{val.province}, {val.postal_code}</p>
                        <div className='sm:w-1/2 xl:w-1/3 flex  sm:justify-between items-center'>
                            <button type='button' className='text-main-500 hover:underline focus:underline' onClick={() => { setShowEditAddressModal('show'); setSelectedEdit(val) }}>Edit Address</button>
                            {
                                val.status_name !== 'Primary' ?
                                    <>
                                        <p className='font-bold text-main-500 mx-2 sm:mx-0'>|</p>
                                        <button type='button' className='text-red-500 hover:underline focus:underline'
                                            onClick={() => setModalDelete(val.idaddress)}
                                        >Delete Address</button>
                                    </>
                                    :
                                    ""
                            }
                            {
                                modalDelete === val.idaddress ?
                                    <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed right-0 left-0 top-0 flex justify-center items-center z-50 md:inset-0 h-full">
                                        <div className="relative p-4 w-full max-w-md h-auto">
                                            <div className="relative border-2 bg-white rounded-lg shadow border-main-500">
                                                <div className="p-6 text-center">
                                                    <p className="text-lg font-normal text-black mb-4">Are you sure to delete this address?</p>
                                                    <div className='flex justify-center items-center'>
                                                    </div>
                                                    <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                                        onClick={() => onDeleteAddress(val.idaddress)}>
                                                        Yes, Delete
                                                    </button>
                                                    <button type="button"
                                                        className="text-main-500 bg-white focus:ring-2 focus:ring-main-500 border border-teal-500 hover:bg-main-500 hover:text-white rounded-lg  text-sm font-medium px-5 py-2.5 focus:z-10 "
                                                        onClick={() => setModalDelete(0)}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }
                            {
                                val.status_name === 'Primary' ?
                                    ""
                                    :
                                    <>
                                        <p className='sm:hidden font-bold text-main-500 mx-2'>|</p>
                                        <button type='button' onClick={() => onSelectPrimary(val.idaddress)}
                                            className='sm:hidden text-main-500 hover:underline focus:underline'>Set Primary</button>
                                    </>
                            }
                        </div>
                    </div>
                    <div className='hidden sm:w-1/5 sm:flex justify-center items-center'>
                        {
                            val.status_name === 'Primary' ?
                                ""
                                :
                                <button type='button' onClick={() => onSelectPrimary(val.idaddress)}
                                    className='border p-3 rounded-lg bg-main-500 text-white font-bold hover:bg-main-600 focus:ring-2 focus:ring-main-500'>Select as Primary</button>
                        }
                    </div>
                </div>
            )
        })
    };

    const onSelectPrimary = async (id) => {
        try {
            let userToken = localStorage.getItem('medcarelog');

            if (addressData.length === 1) {
                let update = await axios.patch(API_URL + '/api/address/update', { setPrimary: addressData[0].idaddress }, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                if (update.data.success) {
                    getAddress();
                }
            } else {
                let update = await axios.patch(API_URL + '/api/address/update', { setPrimary: id }, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                if (update.data.success) {
                    getAddress();
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    const onDeleteAddress = async (id) => {
        try {
            let del = await axios.delete(API_URL + `/api/address/delete/${id}`);

            if (del.data.success) {
                setModalDelete(0);
                toast.error('Address Removed', {
                    theme: "colored",
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                getAddress();
            }

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <Helmet>
                <title>Profile</title>
                <meta name="description" content="Edit your profile" />
            </Helmet>
            <Tabs />
            <div className='md:container md:mx-auto'>
                <p className='flex items-center justify-center text-main-500 font-bold text-2xl my-3'>ADDRESS</p>
                <div className='w-full md:flex md:justify-center'>
                    <div className='md:border-2 md:w-4/5 lg:w-2/3 md:rounded-lg p-4 shadow-lg'>
                        <div className='flex justify-end'>
                            <button type='button' onClick={() => {
                                if (status !== 'Unverified') {
                                    setShowNewAddressModal('show')
                                } else {
                                    toast.info('Verified your account first!', {
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
                                className='border p-3 rounded-lg bg-main-500 text-white font-bold hover:bg-main-600 focus:ring-2 focus:ring-main-5'>Add New Address</button>
                        </div>
                        {
                            addressData.length > 0 ?
                                <>
                                    {printAddress()}
                                </>
                                :
                                <div className='my-3'>
                                    <p className='text-center font-bold text-2xl text-main-500 drop-shadow-lg'>Oops you dont have any address data yet</p>
                                    <img src={placeholder} />
                                </div>

                        }
                        {/* MODAL ALAMAT BARU */}
                        {
                            showNewAddressModal === 'show' ?
                                <NewAddressComponent showModal={setShowNewAddressModal} />
                                :
                                ""
                        }
                        {/* MODAL EDIT ALAMAT */}
                        {
                            showEditAddressModal === 'show' ?
                                <EditAddressComponent selected={selectedEdit} showModal={setShowEditAddressModal} />
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
            <LoadingComponent loading={loading} />
        </div>
    )
}

export default AddressComponent;