import React from 'react'
import { Tabs } from 'flowbite-react'
import { MdDashboard } from 'react-icons/md';
import { BsFillPencilFill, BsEye } from 'react-icons/bs';
import { HiUserCircle, HiAdjustments } from 'react-icons/hi';
import axios from 'axios';
import { API_URL } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProfile = () => {


    //////// KEMAL BAGIAN ADDRESS APKG2-15, MELIPUTI SEMUA FUNGSI CRUD ADDRESS DI PROFILING ////////
    const [addressData, setAddressData] = React.useState([]);
    const [showNewAddressModal, setShowNewAddressModal] = React.useState('');
    const [showEditAddressModal, setShowEditAddressModal] = React.useState('');
    const [modalDelete, setModalDelete] = React.useState(0);

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

    // RAJAONGKIR
    const [dataProvince, setDataProvince] = React.useState([]);
    const [dataCity, setDataCity] = React.useState([]);
    const [filterCity, setFilterCity] = React.useState([]);

    React.useEffect(() => {
        getAddress();
        getDataCity();
        getDataProvince();
    }, []);

    const getAddress = async () => {
        try {
            let userToken = localStorage.getItem('medcarelog');
            let get = await axios.get(API_URL + '/api/user/getaddress', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });

            console.log("data address profiling", get.data);
            setAddressData(get.data);
        } catch (error) {
            console.log(error)
        }
    };

    const printAddress = () => {
        return addressData.map((val, idx) => {
            return (
                <div key={val.idaddress}
                    className={val.status_name === 'Primary' ? 'shadow-lg border-2 rounded-lg bg-teal-50 border-main-500 my-2 p-3 flex' : 'shadow-lg border-2 rounded-lg border-main-500 my-2 p-3 flex'}>
                    <div className='w-4/5'>
                        <p className='transform: capitalize font-bold text-main-600'>{val.fullname}</p>
                        <p>{val.phone_number}</p>
                        <p className='transform: capitalize'>{val.full_address}, Kecamatan {val.district}, {val.city}</p>
                        <p className='transform: capitalize'>{val.province}, {val.postal_code}</p>
                        <div className='w-1/3 flex justify-between items-center'>
                            <button type='button' className='text-main-500 hover:underline focus:underline' onClick={() => {setShowEditAddressModal('show'); setSelectedEdit(val)}}>Edit Address</button>
                            <p className='font-bold text-main-500'>|</p>
                            <button type='button' className='text-red-500 hover:underline focus:underline'
                                onClick={() => setModalDelete(val.idaddress)}
                            >Delete Address</button>
                            {
                                modalDelete === val.idaddress ?
                                    <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed right-0 left-0 top-0 flex justify-center items-center z-50 md:inset-0 h-modal md:h-full">
                                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                            <div className="relative border-2 bg-white rounded-lg shadow border-main-500">
                                                <div className="p-6 text-center">
                                                    <p className="text-lg font-normal text-black mb-4">Are you sure to delete this address?</p>
                                                    <div className='flex justify-center items-center'>
                                                    </div>
                                                    <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                                        onClick={() => onDeleteAddress(val.idaddress)}>
                                                        Yes, Delete
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
                        </div>
                    </div>
                    <div className='w-1/5 flex justify-center items-center'>
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

    const onSelectPrimary = async (id) => {
        try {
            let userToken = localStorage.getItem('medcarelog');
            let update = await axios.patch(API_URL + '/api/user/updateaddress', {setPrimary: id}, {
                headers : {
                    'Authorization' : `Bearer ${userToken}`
                }
            });

            if (update.data.success){
                getAddress();
            }
        } catch (error) {
            console.log(error)
        }
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
                let add = await axios.post(API_URL + '/api/user/addaddress', { data }, {
                    headers: {
                        'Authorization' : `Bearer ${userToken}`
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

            if (tempProvince !== '' && tempCity === '') {
                setCheckEditCity('show');
            } else {
                let edit = await axios.patch(API_URL + '/api/user/updateaddress', { dataEdit, idaddress: selectedEdit.idaddress }, {
                    headers: {
                        'Authorization' : `Bearer ${userToken}`
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

    const onDeleteAddress = async (id) => {
        try {
            let del = await axios.delete(API_URL + `/api/user/deleteaddress/${id}`);

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
            <Tabs.Group
                aria-label="Tabs with icons"
                style="underline"
            >
                <Tabs.Item
                    title="Profile"
                    icon={HiUserCircle}
                >
                    <div className='container mx-auto lg:px-96'>
                        <div className='flex justify-center mt-5'>
                            <div className='relative inline-block'>
                                <img src={"https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt='medcare.com' className='w-20 h-20 rounded-full inline-block object-cover' />
                                <span className='absolute bottom-0 right-0 inline-block w-6 h-6 bg-blue-500 border-2 border-white rounded-full'>
                                    <BsFillPencilFill className='fill-white mx-1 ' />
                                </span>
                            </div>
                        </div>
                        <label className=' block mb-3 '>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Name</spam>
                            <input className='border border-gray-400 w-full rounded-md px-2' />
                        </label>
                        <label className='block mb-3'>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Email</spam>
                            <input className='border border-gray-400 w-full rounded-md px-2' />
                        </label>
                        <label className='block mb-3'>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Contact Number</spam>
                            <input className='border border-gray-400 w-full rounded-md px-2' />
                        </label>
                        <button className=' mt-5 border bg-teal-500 hover:bg-teal-700 rounded-md py-2 text-white px-10'>Save</button>
                    </div>
                </Tabs.Item>
                <Tabs.Item
                    active={true}
                    title="Password"
                    icon={MdDashboard}
                >
                    <div className='container mx-auto lg:px-96'>
                        <label className=' block mb-3 '>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Password</spam>
                            <div className=''>
                                <input className='border border-gray-400 w-full rounded-md px-2' />
                            </div>
                        </label>
                        <label className='block mb-3'>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>New Password</spam>
                            <div className='relative'>
                                <input className='border border-gray-400 w-full rounded-md px-2' />
                                <BsEye className='absolute top-1 right-2' />
                            </div>
                        </label>
                        <label className='block mb-3'>
                            <spam className='block text-sm font-medium text-slate-700 mb-1'>Repeat Password</spam>
                            <div className='relative'>
                                <input className='border border-gray-400 w-full rounded-md px-2' />
                                <BsEye className='absolute top-1 right-2' />
                            </div>
                        </label>
                        <button className=' mt-5 border bg-teal-500 hover:bg-teal-700 rounded-md py-2 text-white px-10'>Save</button>
                    </div>
                </Tabs.Item>
                {/* KEMAL BAGIAN ADDRESS APKG2-15 */}
                <Tabs.Item
                    title="Address"
                    icon={HiAdjustments}
                >
                    <div className='container mx-auto'>
                        <p className='flex items-center justify-center text-main-500 font-bold text-2xl my-3'>ADDRESS</p>
                        <div className='flex justify-center'>
                            <div className='border-2 w-2/3 rounded-lg p-4'>
                                <div className='flex justify-end'>
                                    <button type='button' onClick={() => setShowNewAddressModal('show')}
                                        className='border p-3 rounded-lg bg-main-500 text-white font-bold hover:bg-main-600 focus:ring-2 focus:ring-main-5'>Add New Address</button>
                                </div>
                                {printAddress()}
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
                                                            onClick={() => {onSaveEditAddress()}} disabled={showEditFullAddress === 'show' || showEditDistrict === 'show' || showEditPostal === 'show' || showEditProvince === 'show' ? false : true}
                                                            >Save</button>
                                                        <button type="button" className="ml-1 text-black bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-10 py-2.5 focus:z-10 "
                                                            onClick={() => {
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
                        </div>
                    </div>
                </Tabs.Item>

            </Tabs.Group>
            <ToastContainer />
        </div>
    )
}

export default EditProfile