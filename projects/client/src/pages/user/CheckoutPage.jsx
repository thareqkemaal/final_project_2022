import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router';
import { API_URL } from '../../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bni from '../../assets/Bank BNI Logo (PNG-1080p) - FileVector69.png';
import bca from '../../assets/Bank BCA Logo (PNG-1080p) - FileVector69.png';
import bri from '../../assets/bri.png';

const Checkout = (props) => {

    // NOTE PROBLEM
    // 1. PERLU PERBAIKAN DI DELIVERY KETIKA ADDRESS DIGANTI, CHECK DAN TES ULANG! RAJAONGKIR KENA LIMIT DAILY

    const [checkoutData, setCheckoutData] = React.useState([]);
    const [allAddress, setAllAddress] = React.useState([]);
    const [selectedAddress, setSelectedAddress] = React.useState({});
    const [showAddressModal, setShowAddressModal] = React.useState('');
    const [showNewAddressModal, setShowNewAddressModal] = React.useState('');
    const [showEditAddressModal, setShowEditAddressModal] = React.useState('');
    const [showPaymentModal, setShowPaymentModal] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('');

    // RAJAONGKIR
    const [dataProvince, setDataProvince] = React.useState([]);
    const [dataCity, setDataCity] = React.useState([]);
    const [filterCity, setFilterCity] = React.useState([]);
    const [courier, setCourier] = React.useState('');
    const [delivery, setDelivery] = React.useState([]);
    const [selectedDelivery, setSelectedDelivery] = React.useState('');
    const [loadDelivery, setLoadDelivery] = React.useState(false);
    const [loadCourier, setLoadCourier] = React.useState(false);
    const [weight, setWeight] = React.useState(1000); // contoh berat 1000 gram
    const [origin, setOrigin] = React.useState(153); //kode city_id Jakarta Selatan
    const [totalDelivery, setTotalDelivery] = React.useState(0);

    // INPUT NEW ADDRESS
    const [countFullAddress, setCountFullAddress] = React.useState(0);
    const [selectedProvinceID, setSelectedProvinceID] = React.useState(0);
    const [selectedCityID, setSelectedCityID] = React.useState(0);
    const [inputFullAddress, setInputFullAddress] = React.useState('');
    const [inputDistrict, setInputDistrict] = React.useState('');
    const [inputPostalCode, setInputPostalCode] = React.useState('');
    const [checkAddress, setCheckAddress] = React.useState('');
    const [checkProvince, setCheckProvince] = React.useState('');
    const [checkCity, setCheckCity] = React.useState('');
    const [checkDistrict, setCheckDistrict] = React.useState('');
    const [checkPostal, setCheckPostal] = React.useState('');

    // INPUT EDIT ADDRESS
    const [selectedEdit, setSelectedEdit] = React.useState({});
    const [countEditFullAddress, setCountEditFullAddress] = React.useState(0);
    const [selectedEditProvinceID, setSelectedEditProvinceID] = React.useState(0);
    const [selectedEditCityID, setSelectedEditCityID] = React.useState(0);
    const [inputEditFullAddress, setInputEditFullAddress] = React.useState('');
    const [inputEditDistrict, setInputEditDistrict] = React.useState('');
    const [inputEditPostalCode, setInputEditPostalCode] = React.useState('');

    const [showEditFullAddress, setShowEditFullAddress] = React.useState('');
    const [showEditProvince, setShowEditProvince] = React.useState('');
    const [showEditCity, setShowEditCity] = React.useState('');
    const [showEditDistrict, setShowEditDistrict] = React.useState('');
    const [showEditPostal, setShowEditPostal] = React.useState('');

    const [checkEditAddress, setCheckEditAddress] = React.useState('');
    const [checkEditProvince, setCheckEditProvince] = React.useState('');
    const [checkEditCity, setCheckEditCity] = React.useState('');
    const [checkEditDistrict, setCheckEditDistrict] = React.useState('');
    const [checkEditPostal, setCheckEditPostal] = React.useState('');

    const { state } = useLocation();

    React.useEffect(() => {
        setCheckoutData(state.selected);
        getAddress();
        getDataProvince();
        getDataCity();
    }, []);

    const getAddress = async () => {
        try {
            let userToken = localStorage.getItem('medcarelog');
            let getAddress = await axios.get(API_URL + '/api/address/get', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            //console.log('user address', getAddress.data);
            setAllAddress(getAddress.data);

            let getSelectedAddress = getAddress.data.find((val, idx) => val.selected === "true");
            let getPrimaryAddress = getAddress.data.find((val, idx) => val.status_name === "Primary");


            if (selectedAddress === {}) {
                setSelectedAddress(getPrimaryAddress);
            } else {
                if (getSelectedAddress === getPrimaryAddress) {
                    setSelectedAddress(getPrimaryAddress);
                } else {
                    setSelectedAddress(getSelectedAddress);
                }
            }

        } catch (error) {
            console.log(error)
        }
    };

    const onSelectAddress = async (id) => {
        try {
            let userToken = localStorage.getItem('medcarelog');
            let select = await axios.patch(API_URL + '/api/user/updateaddress', { selected: 'true', idaddress: id }, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })

            if (select.data.success) {
                getAddress();
            }
        } catch (error) {
            console.log(error)
        }
    };

    const printAllAddress = () => {
        return allAddress.map((val, idx) => {
            return (
                <div key={val.idaddress} className={selectedAddress === val ? 'border-2 rounded-lg flex my-3 bg-teal-50' : 'border-2 rounded-lg flex my-3'}>
                    <div key={val.idaddress} className='flex flex-col items-start p-3 w-3/4'>
                        <p className='text-red-500'>disini username</p>
                        <p className='text-red-500'>disini phone number</p>
                        <p className='text-transform: capitalize'>{val.full_address}</p>
                        <p className='text-transform: capitalize'>Kecamatan {val.district}, {val.city}, {val.province}, {val.postal_code}</p>
                        <button type='button' className='text-main-600 hover:underline' onClick={() => { setShowEditAddressModal('show'); setSelectedEdit(val); setShowAddressModal('') }}>Edit Address</button>
                    </div>
                    {
                        selectedAddress === val ?
                            ""
                            :
                            <div className='w-1/4 flex items-center justify-center'>
                                <button type='button'
                                    className='border p-3 rounded-lg bg-main-500 text-white font-semibold hover:bg-main-600 focus:ring-2 focus:ring-main-500'
                                    onClick={() => {
                                        onSelectAddress(val.idaddress);
                                        setShowAddressModal('');
                                        setLoadDelivery(true);
                                        setLoadCourier(true);
                                        setCourier('');
                                        setDelivery([]);
                                        setSelectedDelivery('');
                                        setTimeout(() => {
                                            setLoadDelivery(false);
                                            setLoadCourier(false);
                                        }, 1000)
                                        setTotalDelivery(0);
                                    }}>Select Address</button>
                            </div>
                    }
                </div>
            )
        })
    };

    const printSelectedAddress = () => {
        if (selectedAddress !== {}) {
            return (
                <div>
                    <p className='text-transform: uppercase'>{selectedAddress.full_address}</p>
                    <p className='text-transform: uppercase'>Kecamatan {selectedAddress.district}, {selectedAddress.city}, {selectedAddress.province}, {selectedAddress.postal_code}</p>
                </div>
            )
        } else {
            return (
                <div>
                    You don't have any address. Please click select address and click add new address.
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
                    <div className='flex flex-col w-full'>
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

    const getDataProvince = async () => {
        try {
            let province = await axios.get(API_URL + '/api/user/province');

            //console.log(province.data)
            setDataProvince(province.data)
        } catch (error) {
            console.log(error)
        }
    };

    const getDataCity = async () => {
        try {
            let city = await axios.get(API_URL + '/api/user/city');

            //console.log(city.data)
            setDataCity(city.data)
        } catch (error) {
            console.log(error)
        }
    };

    const handleFilterCity = (id) => {
        //console.log(id)
        let temp = [];

        dataCity.forEach((val, idx) => {
            if (val.province_id === id) {
                temp.push(val);
            }
        })
        //console.log(temp);
        setFilterCity(temp);
    };

    const onSaveNewAddress = async () => {
        try {
            let userToken = localStorage.getItem('medcarelog');
            // console.log("full", inputFullAddress); string
            // console.log("district", inputDistrict); string
            // console.log("postal", inputPostalCode); number
            // console.log("cityID", selectedCityID); number
            // console.log("provinceID", selectedProvinceID); number

            let searchData = dataProvince.find(val => val.province_id === selectedProvinceID);
            let searchCity = filterCity.find(val => val.city_id === selectedCityID);

            // console.log("kota", searchCity.type + ' ' + searchCity.city_name);

            if (inputFullAddress === '' || inputDistrict === '' || searchData === undefined || searchCity === undefined || inputPostalCode === '') {
                if (inputFullAddress === '') {
                    setCheckAddress('show');
                }
                if (inputDistrict === '') {
                    setCheckDistrict('show');
                }
                if (searchData === undefined) {
                    setCheckProvince('show');
                }
                if (searchCity === undefined) {
                    setCheckCity('show');
                }
                if (inputPostalCode === '') {
                    setCheckPostal('show');
                }
            } else {
                let data = {
                    full_address: inputFullAddress,
                    district: inputDistrict,
                    city: searchCity.type + ' ' + searchCity.city_name,
                    city_id: selectedCityID,
                    province: searchData.province,
                    province_id: selectedProvinceID,
                    postal_code: inputPostalCode
                }

                // pakai authorization
                let add = await axios.post(API_URL + '/api/address/add', { data }, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                })

                if (add.data.success) {
                    getAddress();
                    toast.success('Address Added Success!', {
                        theme: 'colored',
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setInputFullAddress('');
                    setInputDistrict('');
                    setInputPostalCode('');
                    setSelectedProvinceID(0);
                    setSelectedCityID(0);
                    setCountFullAddress(0);
                    setCheckAddress('');
                    setCheckCity('');
                    setCheckDistrict('');
                    setCheckPostal('');
                    setCheckProvince('');
                    setShowNewAddressModal('');
                    setShowAddressModal('show');
                }

                console.log(data)
            }

        } catch (error) {
            console.log(error)
        }
    };

    const onSaveEditAddress = async () => {
        try {
            let userToken = localStorage.getItem('medcarelog');
            // console.log("full", inputEditFullAddress);
            // console.log("district", inputEditDistrict);
            // console.log("postal", inputEditPostalCode);
            // console.log("cityID", selectedEditCityID);
            // console.log("provinceID", selectedEditProvinceID);
            // console.log(selectedEdit)

            let searchData = dataProvince.find(val => val.province_id === selectedEditProvinceID);
            let searchCity = filterCity.find(val => val.city_id === selectedEditCityID);

            let tempCity = '';
            if (searchCity === undefined) {
                tempCity = '';
            } else {
                tempCity = searchCity.type + ' ' + searchCity.city_name;
            }

            let tempProvince = '';
            if (searchData === undefined) {
                tempProvince = '';
            } else {
                tempProvince = searchData.province;
            }

            let dataEdit = {
                full_address: inputEditFullAddress,
                district: inputEditDistrict,
                city: tempCity,
                city_id: selectedEditCityID,
                province: tempProvince,
                province_id: selectedEditProvinceID,
                postal_code: inputEditPostalCode
            }

            // // pakai authorization
            if (tempProvince !== '' && tempCity === '') {
                setCheckEditCity('show');
            } else {
                let edit = await axios.patch(API_URL + '/api/address/update', { dataEdit, idaddress: selectedEdit.idaddress }, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                })

                if (edit.data.success) {
                    getAddress();
                    toast.success('Address Edit Success!', {
                        theme: 'colored',
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setShowAddressModal('show');
                    setShowEditAddressModal('');
                    setShowEditFullAddress('');
                    setShowEditCity('');
                    setShowEditDistrict('');
                    setShowEditProvince('');
                    setShowEditPostal('');
                    setInputEditFullAddress('');
                    setInputEditDistrict('');
                    setInputEditPostalCode('');
                    setSelectedEditCityID(0);
                    setSelectedEditProvinceID(0);
                }
            }
            console.log(dataEdit)
        } catch (error) {
            console.log(error)
        }
    };

    const getDelivery = async (courier) => {
        try {
            if (courier != '') {
                setLoadDelivery(true);
                let getDeliv = await axios.get(API_URL + `/api/user/delivery/${origin}/${selectedAddress.city_id}/${weight}/${courier}`)

                console.log(getDeliv.data);
                if (getDeliv.data.length > 0) {
                    setDelivery(getDeliv.data);
                    setDelivery(getDeliv.data);
                    setTimeout(() => {
                        setLoadDelivery(false)
                    }, 1000)
                }
            } else {
                setDelivery([]);

            }
        } catch (error) {
            console.log(error)
        }
    };

    const printDelivery = () => {
        return delivery.map((val, idx) => {
            if (courier !== 'none') {
                if (courier === 'pos') {
                    return (
                        <option key={idx} value={`${val.cost[0].value},${val.service}`}>{val.service} [Estimate {val.cost[0].etd.split(' ')[0]} Day(s)] - Rp {val.cost[0].value.toLocaleString('id')}</option>
                    )
                } else {
                    return (
                        <option key={idx} value={`${val.cost[0].value},${val.service}`}>{val.service} [Estimate {val.cost[0].etd} Day(s)] - Rp {val.cost[0].value.toLocaleString('id')}</option>
                    )
                }
            }
        })
    };

    return (
        <div className='container mx-auto py-5'>
            <div className='mx-9'>
                <div className='text-xl font-bold px-3 text-main-600'>
                    Checkout
                </div>
                <div className='flex flex-row mt-2'>
                    <div className='basis-7/12'>
                        <div className='border m-2 p-3 shadow-md rounded-md'>
                            {/* tunggu nama address dari api */}
                            <p className='text-md font-bold mb-2 border-b-2 pb-2 text-main-600 border-main-800'>Delivery Address</p>
                            <p className='text-red-500'>nama user dari reducer</p>
                            <div className='my-2'>
                                {printSelectedAddress()}
                            </div>
                            <button type='button' className='text-main-600 hover:underline' onClick={() => setShowAddressModal('show')}>Change Address</button>
                            {/* MODAL ALAMAT */}
                            {
                                showAddressModal === 'show' ?
                                    <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed right-0 left-0 top-0 flex justify-center items-center z-50 md:inset-0 h-modal md:h-full">
                                        <div className="relative p-4 w-1/2 h-full md:h-auto">
                                            <div className="relative border-2 bg-white rounded-lg shadow border-main-500">
                                                <div className="p-6 text-center">
                                                    <div>
                                                        <p className='text-2xl font-bold text-main-500'>Choose Delivery Address</p>
                                                    </div>
                                                    <button type='button' className='mt-3 mb-2 py-3 w-full border rounded-lg font-bold text-gray-400 text-lg hover:bg-teal-50 focus:ring-2 focus:ring-teal-100'
                                                        onClick={() => { setShowNewAddressModal('show'); setShowAddressModal('') }}>Add New Address</button>
                                                    <div>
                                                        {printAllAddress()}
                                                    </div>
                                                    <button type="button" className="text-black bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-10 py-2.5 focus:z-10 "
                                                        onClick={() => setShowAddressModal('')}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }
                            {/* MODAL ALAMAT BARU */}
                            {
                                showNewAddressModal === 'show' ?
                                    <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed right-0 left-0 top-0 flex justify-center items-center z-50 md:inset-0 h-modal md:h-full">
                                        <div className="relative p-4 w-1/2 h-full md:h-auto">
                                            <div className="relative border-2 bg-white rounded-lg shadow border-main-500">
                                                <div className="p-6 text-center">
                                                    <div>
                                                        <p className='text-2xl font-bold text-main-500'>Add New Address</p>
                                                    </div>
                                                    <div className='border my-4'>
                                                        <div className='border flex flex-col items-start px-3 mb-2'>
                                                            <p>Full Address :</p>
                                                            <textarea maxLength={200} type='text'
                                                                className={checkAddress === 'show' ? 'border border-red-600 w-full rounded-lg px-3 mt-2' : 'border border-main-600 w-full rounded-lg px-3 mt-2 focus:ring-2 focus:ring-main-500'}
                                                                placeholder='Full Address' onChange={(e) => { setInputFullAddress(e.target.value); setCountFullAddress(e.target.value.length); if (e.target.value.length > 0) { setCheckAddress('') } }} value={inputFullAddress} />
                                                            <div className='flex justify-end w-full'>
                                                                {countFullAddress} / 200
                                                            </div>
                                                        </div>
                                                        <div className='border flex flex-col items-start px-3 mb-2'>
                                                            <p>Province (Provinsi) :</p>
                                                            <select type='text' onChange={(e) => { handleFilterCity(e.target.value); setSelectedProvinceID(e.target.value); if (e.target.value > 0) { setCheckProvince('') } }}
                                                                className={checkProvince === 'show' ? 'border border-red-600 w-full rounded-lg px-3 h-10 mt-2' :
                                                                    'border border-main-600 w-full rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'}>
                                                                <option value='' className='w-1/2'>Select Province</option>
                                                                {
                                                                    dataProvince.map((val, idx) => {
                                                                        return (
                                                                            <option value={val.province_id} key={val.province_id}>{val.province}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className='border flex flex-col items-start px-3 mb-2'>
                                                            <p>City (Kota) :</p>
                                                            <select type='text' onChange={(e) => { setSelectedCityID(e.target.value); if (e.target.value > 0) { setCheckCity('') } }}
                                                                className={checkCity === 'show' ? 'border border-red-600 w-full rounded-lg px-3 h-10 mt-2' :
                                                                    'border border-main-600 w-full rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'}>
                                                                <option value='' className='w-1/2'>Select City</option>
                                                                {
                                                                    filterCity.map((val, idx) => {
                                                                        return (
                                                                            <option value={val.city_id} key={val.city_id}>{val.type} {val.city_name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className='border flex flex-col items-start px-3 mb-2'>
                                                            <p>District (Kecamatan/Kabupaten) :</p>
                                                            <input type='text'
                                                                className={checkDistrict === 'show' ? 'border border-red-600 w-full rounded-lg px-3 h-10 mt-2' :
                                                                    'border border-main-600 w-full rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'}
                                                                placeholder='District' onChange={(e) => { setInputDistrict(e.target.value); if (e.target.value.length > 0) { setCheckDistrict('') } }}
                                                                value={inputDistrict} />
                                                        </div>
                                                        <div className='border flex flex-col items-start px-3 mb-2'>
                                                            <p>Postal Code (Kode Pos) :</p>
                                                            <input type='number'
                                                                className={checkPostal === 'show' ? 'border border-red-600 w-full rounded-lg px-3 h-10 mt-2' :
                                                                    'border border-main-600 w-full rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'}
                                                                placeholder='Postal Code' onChange={(e) => { setInputPostalCode(e.target.value); if (e.target.value > 0) { setCheckPostal('') } }}
                                                                value={inputPostalCode} />
                                                        </div>
                                                    </div>
                                                    <button type="button" className="mr-1 text-white bg-main-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-10 py-2.5 focus:z-10 "
                                                        onClick={() => {
                                                            onSaveNewAddress();
                                                        }}>Save</button>
                                                    <button type="button" className="ml-1 text-black bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-10 py-2.5 focus:z-10 "
                                                        onClick={() => {
                                                            setInputFullAddress('');
                                                            setInputDistrict('');
                                                            setInputPostalCode('');
                                                            setSelectedProvinceID(0);
                                                            setSelectedCityID(0);
                                                            setCountFullAddress(0);
                                                            setCheckAddress('');
                                                            setCheckCity('');
                                                            setCheckDistrict('');
                                                            setCheckPostal('');
                                                            setCheckProvince('');
                                                            setShowAddressModal('show');
                                                            setShowNewAddressModal('')
                                                        }}
                                                    >Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }
                            {/* MODAL EDIT ALAMAT */}
                            {
                                showEditAddressModal === 'show' ?
                                    <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed right-0 left-0 top-0 flex justify-center items-center z-50 md:inset-0 h-modal md:h-full">
                                        <div className="relative p-4 w-1/2 h-full md:h-auto">
                                            <div className="relative border-2 bg-white rounded-lg shadow border-main-500">
                                                <div className="p-6 text-center">
                                                    <div>
                                                        <p className='text-2xl font-bold text-main-500'>Edit Address</p>
                                                    </div>
                                                    <div className='my-4'>
                                                        <div className='flex flex-col items-start px-3 mb-2'>
                                                            {
                                                                showEditFullAddress === 'show' ?
                                                                    <>
                                                                        <p>Full Address :</p>
                                                                        <div className='w-full flex'>
                                                                            <div className='w-11/12'>
                                                                                <textarea maxLength={200} type='text'
                                                                                    className={checkEditAddress === 'show' ? 'border border-red-600 w-full rounded-lg px-3 mt-2' : 'border border-main-600 w-full rounded-lg px-3 mt-2 focus:ring-2 focus:ring-main-500'}
                                                                                    placeholder={selectedEdit.full_address} onChange={(e) => { setInputEditFullAddress(e.target.value); setCountEditFullAddress(e.target.value.length); if (e.target.value.length > 0) { setCheckEditAddress('') } }}
                                                                                    value={inputEditFullAddress} />
                                                                                <div className='flex justify-end w-full'>
                                                                                    {countEditFullAddress} / 200
                                                                                </div>
                                                                            </div>
                                                                            <div className='w-1/12 flex items-center justify-center'>
                                                                                <button type='button' className='text-red-600 hover:underline ' onClick={() => { setShowEditFullAddress(''); setInputEditFullAddress('') }}>Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className='flex w-full py-3'>
                                                                        <div className='w-11/12 flex text-start'>
                                                                            <p className='w-1/6 font-bold'>Full Address</p>
                                                                            <p>: {selectedEdit.full_address}</p>
                                                                        </div>
                                                                        <div className='w-1/12 flex items-center justify-center'>
                                                                            <button type='button' className='text-main-600 hover:underline ' onClick={() => setShowEditFullAddress('show')}>Edit</button>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div className='flex flex-col items-start px-3 mb-2'>
                                                            {
                                                                showEditProvince === 'show' ?
                                                                    <>
                                                                        <p>Province (Provinsi) :</p>
                                                                        <div className='w-full flex'>
                                                                            <select type='text' onChange={(e) => { handleFilterCity(e.target.value); setSelectedEditProvinceID(e.target.value); if (e.target.value > 0) { setCheckEditProvince('') } }}
                                                                                className={checkEditProvince === 'show' ? 'w-11/12 border border-red-600 rounded-lg px-3 h-10 mt-2' :
                                                                                    'border border-main-600 w-11/12 rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'}>
                                                                                <option value='' className='w-1/2'>Select Province</option>
                                                                                {
                                                                                    dataProvince.map((val, idx) => {
                                                                                        return (
                                                                                            <option value={val.province_id} key={val.province_id}>{val.province}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                            <div className='w-1/12 flex items-center justify-center'>
                                                                                <button type='button' className='text-red-600 hover:underline'
                                                                                    onClick={() => { setShowEditProvince(''); setSelectedEditProvinceID(0); setSelectedEditCityID(0) }}>Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className='flex w-full py-3'>
                                                                        <div className='w-11/12 flex text-start'>
                                                                            <p className='w-1/6 font-bold'>Province</p>
                                                                            <p>: {selectedEdit.province}</p>
                                                                        </div>
                                                                        <div className='w-1/12 flex items-center justify-center'>
                                                                            <button type='button' className='text-main-600 hover:underline ' onClick={() => setShowEditProvince('show')}>Edit</button>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div className='flex flex-col items-start px-3 mb-2'>
                                                            {
                                                                showEditProvince === 'show' ?
                                                                    <>
                                                                        <p>City (Kota) :</p>
                                                                        <div className='w-full flex'>
                                                                            <select type='text' onChange={(e) => { setSelectedEditCityID(e.target.value); if (e.target.value > 0) { setCheckEditCity('') } }}
                                                                                className={checkEditCity === 'show' ? 'border border-red-600 w-11/12 rounded-lg px-3 h-10 mt-2' :
                                                                                    'border border-main-600 w-11/12 rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'}>
                                                                                <option value='' className='w-1/2'>Select City</option>
                                                                                {
                                                                                    filterCity.map((val, idx) => {
                                                                                        return (
                                                                                            <option value={val.city_id} key={val.city_id}>{val.type} {val.city_name}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className='flex w-full py-3'>
                                                                        <div className='w-11/12 flex text-start'>
                                                                            <p className='w-1/6 font-bold'>City</p>
                                                                            <p>: {selectedEdit.city}</p>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div className='flex flex-col items-start px-3 mb-2'>
                                                            {
                                                                showEditDistrict === 'show' ?
                                                                    <>
                                                                        <p>District (Kecamatan/Kabupaten) :</p>
                                                                        <div className='w-full flex'>
                                                                            <input type='text'
                                                                                className={checkEditDistrict === 'show' ? 'border border-red-600 w-11/12 rounded-lg px-3 h-10 mt-2' :
                                                                                    'border border-main-600 w-11/12 rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'}
                                                                                placeholder={selectedEdit.district} onChange={(e) => { setInputEditDistrict(e.target.value); if (e.target.value.length > 0) { setCheckEditDistrict('') } }}
                                                                                value={inputEditDistrict} />
                                                                            <div className='w-1/12 flex items-center justify-center'>
                                                                                <button type='button' className='text-red-600 hover:underline ' onClick={() => { setShowEditDistrict(''); setInputEditDistrict('') }}>Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className='flex w-full py-3'>
                                                                        <div className='w-11/12 flex text-start'>
                                                                            <p className='w-1/6 font-bold'>District</p>
                                                                            <p>: {selectedEdit.district}</p>
                                                                        </div>
                                                                        <div className='w-1/12 flex items-center justify-center'>
                                                                            <button type='button' className='text-main-600 hover:underline ' onClick={() => setShowEditDistrict('show')}>Edit</button>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div className='flex flex-col items-start  px-3 mb-2'>
                                                            {
                                                                showEditPostal === 'show' ?
                                                                    <>
                                                                        <p>Postal Code (Kode Pos) :</p>
                                                                        <div className='w-full flex'>
                                                                            <input type='number'
                                                                                className={checkEditPostal === 'show' ? 'border border-red-600 w-11/12 rounded-lg px-3 h-10 mt-2' :
                                                                                    'border border-main-600 w-11/12 rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'}
                                                                                placeholder={selectedEdit.postal_code} onChange={(e) => { setInputEditPostalCode(e.target.value); if (e.target.value > 0) { setCheckEditPostal('') } }}
                                                                                value={inputEditPostalCode} />
                                                                            <div className='w-1/12 flex items-center justify-center'>
                                                                                <button type='button' className='text-red-600 hover:underline ' onClick={() => { setShowEditPostal(''); setInputEditPostalCode('') }}>Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className='flex w-full py-3'>
                                                                        <div className='w-11/12 flex text-start'>
                                                                            <p className='w-1/6 font-bold'>Postal Code</p>
                                                                            <p>: {selectedEdit.postal_code}</p>
                                                                        </div>
                                                                        <div className='w-1/12 flex items-center justify-center'>
                                                                            <button type='button' className='text-main-600 hover:underline ' onClick={() => setShowEditPostal('show')}>Edit</button>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <button type="button" className="mr-1 text-white bg-main-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-10 py-2.5 focus:z-10 disabled:bg-opacity-50"
                                                        onClick={() => onSaveEditAddress()} disabled={showEditFullAddress === 'show' || showEditDistrict === 'show' || showEditPostal === 'show' || showEditProvince === 'show' ? false : true}
                                                        >Save</button>
                                                    <button type="button" className="ml-1 text-black bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-10 py-2.5 focus:z-10 "
                                                        onClick={() => {
                                                            setShowAddressModal('show');
                                                            setShowEditAddressModal('');
                                                            setShowEditFullAddress('');
                                                            setShowEditCity('');
                                                            setShowEditDistrict('');
                                                            setShowEditProvince('');
                                                            setShowEditPostal('');
                                                            setInputEditFullAddress('');
                                                            setInputEditDistrict('');
                                                            setInputEditPostalCode('');
                                                            setSelectedEditCityID(0);
                                                            setSelectedEditProvinceID(0);
                                                        }}
                                                    >Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }
                        </div>
                        <div className='border m-2 p-3 shadow-md rounded-md '>
                            <p className='text-md font-bold mb-2 border-b-2 pb-2 text-main-600 border-main-800'>Summary</p>
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
                    <div className='basis-5/12'>
                        <div className='border m-2 p-3 shadow-md rounded-md'>
                            <p className='font-bold text-xl text-main-500 mb-3'>Checkout Summary</p>
                            <div className='w-full flex flex-col my-2'>
                                <p>Choose Courier :</p>
                                {
                                    loadCourier ?
                                        <div role="status" className='w-full flex items-center justify-center'>
                                            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin  fill-main-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                        <select type='text' onChange={(e) => { getDelivery(e.target.value); setCourier(e.target.value) }}
                                            className='w-full border border-main-600 rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'>
                                            <option value=''>Select Courier</option>
                                            <option value='jne'>JNE</option>
                                            <option value='tiki'>TIKI</option>
                                            <option value='pos'>POS Indonesia</option>
                                        </select>
                                }
                            </div>
                            <div className='w-full flex flex-col my-2'>
                                <p>Choose Delivery Duration:</p>
                                {
                                    loadDelivery ?
                                        <div role="status" className='w-full flex items-center justify-center'>
                                            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin  fill-main-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                        <select type='text' onChange={(e) => { setSelectedDelivery(e.target.value); setTotalDelivery(parseInt(e.target.value.split(',')[0]) + parseInt(state.totalPrice)) }}
                                            className='w-full border border-main-600 rounded-lg px-3 h-10 mt-2 focus:ring-2 focus:ring-main-500'>
                                            <option value='none'>Select Duration</option>
                                            {printDelivery()}
                                        </select>
                                }
                            </div>
                            <div className='flex justify-between py-4'>
                                <p>Sub Total Item(s)</p>
                                <p>Rp. {state.totalPrice.toLocaleString('id')}</p>
                            </div>
                            <div className='flex justify-between border-b-2 border-main-800 pb-4'>
                                <p>Delivery</p>
                                {
                                    selectedDelivery ?
                                        <p>Rp {parseInt(selectedDelivery.split(',')[0]).toLocaleString('id')}</p>
                                        :
                                        <p>Rp 0</p>
                                }
                            </div>
                            <div className='flex justify-between my-4'>
                                <p className='font-bold text-2xl text-main-500'>Total Harga</p>
                                <p className='font-bold text-2xl text-main-500'>Rp {totalDelivery.toLocaleString('id')}</p>
                            </div>
                            <div>
                                <button type='button'
                                    className='flex w-full bg-main-500 text-white justify-center py-3 font-bold text-2xl rounded-lg
                                hover:bg-main-600 focus:ring-offset-main-500 focus:ring-offset-2 focus:ring-2 focus:bg-main-600'
                                    onClick={() => setShowPaymentModal('show')}>Select Payment</button>
                                {/* MODAL SELECT PAYMENT */}
                                {
                                    showPaymentModal === 'show' ?
                                        <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed right-0 left-0 top-0 flex justify-center items-center z-50 md:inset-0 h-modal md:h-full">
                                            <div className="relative p-4 w-1/3 h-full md:h-auto">
                                                <div className="relative border-2 bg-white rounded-lg shadow border-main-500">
                                                    <div className="p-6 text-center">
                                                        <div>
                                                            <p className='text-2xl font-bold text-main-500'>Select Payment Method</p>
                                                        </div>
                                                        <div className='flex w-full my-4 items-center justify-center'>
                                                            <img src={bni} className='w-20' />
                                                            <img src={bca} className='w-20 mx-4' />
                                                            <img src={bri} className='w-28' />
                                                        </div>
                                                        <div className='border-2 rounded-lg border-main-600 p-3 my-3'>
                                                            <div className='flex w-full items-center justify-start my-1'>
                                                                <input type='radio' value='manual' onChange={(e) => { setPaymentMethod(e.target.value); console.log(paymentMethod) }} />
                                                                <span className='ml-2'>Bank Transfer (Manual Verification)</span>
                                                            </div>
                                                        </div>
                                                        <div className='w-full flex justify-center'>
                                                            <div className='w-1/2 flex justify-evenly items-center'>
                                                                <button type="button" className="text-white bg-main-500 focus:ring-4 focus:outline-none hover:bg-main-600 focus:ring-main-500 rounded-lg border border-main-500 text-sm font-medium px-10 py-2.5 focus:z-10 "
                                                                    onClick={() => setShowPaymentModal('')}>Pay</button>
                                                                <button type="button" className="text-black bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-8 py-2.5 focus:z-10 "
                                                                    onClick={() => setShowPaymentModal('')}>Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default Checkout;