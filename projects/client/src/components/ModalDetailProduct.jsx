import React from "react";
import { API_URL } from "../helper";
import 'react-toastify/dist/ReactToastify.css';
import { GrFormClose } from "react-icons/gr";

const ModalDetailProduct = ({ setModalDetailProductOn, dataproduct, setLoading }) => {
    const handleOKClick = () => {
        setModalDetailProductOn(false)
        // setLoading(false)
    }

    return (

        <div className="bg-black bg-opacity-50 fixed inset-0 z-50">
            <div className="flex h-screen justify-center items-center">
                <div className="flex-col justify-center bg-white py-5 px-24 rounded-xl" style={{ height: '640px' }}>


                    {/* <!-- Modal content --> */}
                    <div className="py-6" style={{ height: "620px" }}>
                        <div className="flex justify-between">
                            <h3 className="mb-7 text-xl font-medium text-gray-900">Detail Product</h3>
                            <button onClick={handleOKClick}>
                                <GrFormClose size={22} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <div className="block">
                                    <label className="mb-2 text-sm font-medium text-gray-900 flex">
                                        Category
                                    </label>
                                    <select disabled className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2'>
                                        <option defaultValue={dataproduct.category_name}>{dataproduct.category_name}</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="product_name" className="block mt-4 mb-2 text-sm font-medium text-gray-900">
                                        Product Name
                                    </label>
                                    <input disabled defaultValue={dataproduct.product_name} type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Contoh : Sanmol 6 Kapsul" required />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mt-4 mb-2 text-sm font-medium text-gray-900">
                                        Price
                                    </label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                            Rp
                                        </span>
                                        <input disabled defaultValue={dataproduct.price} type="number" name="description" id="description" className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Masukkan harga" required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mt-4 mb-2 text-sm font-medium text-gray-900">
                                        Description
                                    </label>
                                    <textarea disabled defaultValue={dataproduct.description} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder="Tulis deskripsi singkat dari obat untuk inhtmlFormasi pembeli" type='text' />
                                </div>
                                <div>
                                    <label htmlFor="dosis" className="block mt-4 mb-2 text-sm font-medium text-gray-900">
                                        Dosis
                                    </label>
                                    <input disabled defaultValue={dataproduct.dosis} type="text" name="dosis" id="dosis" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Anjuran dosis penggunaan obat" required />
                                </div>
                            </div>
                            <div className="ml-8">
                                <div>
                                    <div>
                                        <label htmlFor="aturan_pakai" className="block mb-2 text-sm font-medium text-gray-900">
                                            Aturan Pakai
                                        </label>
                                        <input disabled defaultValue={dataproduct.aturan_pakai} type="text" name="aturan_pakai" id="aturan_pakai" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" placeholder="Anjuran aturan pemakaian obat" required />
                                    </div>
                                    <div className="columns-2">
                                        <div>
                                            <div>
                                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                                                    Main Stock
                                                </label>
                                                <input disabled defaultValue={dataproduct.stock_unit} type="number" name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Jumlah stok obat" required />
                                            </div>
                                            <div>
                                                <label className="mt-4 mb-2 text-sm font-medium text-gray-900 flex">
                                                    Main Unit
                                                </label>
                                                <select disabled className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2'>
                                                    <option defaultValue={dataproduct.default_unit}>{dataproduct.default_unit}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <label htmlFor="description" className="block mt-4 mb-2 text-sm font-medium text-gray-900">
                                                    Netto Stock
                                                </label>
                                                <input disabled defaultValue={dataproduct.netto_stock} type="number" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Isi per obat" required />
                                            </div>
                                            <div>
                                                <label className="mt-4 mb-2 text-sm font-medium text-gray-900 flex">
                                                    Netto Unit
                                                </label>
                                                <select disabled className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2'>
                                                    <option defaultValue={dataproduct.netto_unit}>{dataproduct.netto_unit}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Product Image</label>

                                    <div className="flex justify-center items-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-30 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex">
                                                {/* <img className="w-40 pt-1 mb-2" src={API_URL + dataproduct.picture} alt={dataproduct.idproduct} /> */}
                                                <img className="w-40 pt-1 mb-2" src={dataproduct.picture.includes('/imgProductPict') ? API_URL + dataproduct.picture : dataproduct.picture} alt={dataproduct.idproduct} />
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDetailProduct;