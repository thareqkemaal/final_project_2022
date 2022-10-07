import React from 'react'
import axios from 'axios';
import { API_URL } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditAddressComponent = ({ selected, showModal, setAddress }) => {

    //////// KEMAL BAGIAN ADDRESS APKG2-15, MELIPUTI SEMUA FUNGSI CRUD ADDRESS DI PROFILING ////////
    const [addressData, setAddressData] = React.useState([]);
    const [selectedEdit, setSelectedEdit] = React.useState({});

    // INPUT EDIT ADDRESS
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
        setSelectedEdit(selected);
        getAddress();
        getDataCity();
        getDataProvince();
    }, []);

    const getAddress = async () => {
        try {
            let userToken = localStorage.getItem('medcarelog');
            let get = await axios.get(API_URL + '/api/address/get', {
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

    const getDataProvince = async () => {
        try {
            let province = await axios.get(API_URL + '/api/rajaongkir/province');

            //console.log(province.data)
            setDataProvince(province.data)
        } catch (error) {
            console.log(error)
        }
    };

    const getDataCity = async () => {
        try {
            let city = await axios.get(API_URL + '/api/rajaongkir/city');

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
                let edit = await axios.patch(API_URL + '/api/address/update', { dataEdit, idaddress: selectedEdit.idaddress }, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                })

                if (edit.data.success) {
                    showModal('');
                    setAddress();
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

    return (
        <div>
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
                                onClick={() => { onSaveEditAddress() }} disabled={showEditFullAddress === 'show' || showEditDistrict === 'show' || showEditPostal === 'show' || showEditProvince === 'show' ? false : true}
                            >Save</button>
                            <button type="button" className="ml-1 text-black bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-10 py-2.5 focus:z-10 "
                                onClick={() => {
                                    showModal('');
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
            <ToastContainer />
        </div>
    )
}

export default EditAddressComponent;