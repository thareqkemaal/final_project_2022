import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiDownload } from "react-icons/bi";
import axios from "axios";
import { API_URL } from "../../helper";
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
// Prepare import for modal CRUD
import ModalAddProduct from "../../components/ModalAddProduct";
import { ToastContainer, toast } from 'react-toastify';
import ModalEdit from "../../components/ModalEdit";
import ModalDeleteProduct from "../../components/ModalDeleteProduct";

const ProductAdminPage = (props) => {
    // APKG2-23 : product list
    const [data, setData] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [drop, setDrop] = React.useState(true);
    const [defaultSort, setDefaultSort] = React.useState('Urutkan');
    const [defaultFilterCategory, setDefaultFilterCategory] = React.useState('Kategori');
    const [offset, setOffset] = React.useState(0);
    const [sort, setSort] = React.useState('');
    const [category, setCategory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [idactive, setIdactive] = React.useState(1);
    const [categoryChecked, setCategoryChecked] = React.useState([]);
    const [filterName, setFilterName] = React.useState('');
    const [pagination, setPagination] = React.useState([1, 2, 3, 4, 5]);

    // Add, edit, delete product
    const [modalAddOn, setModalAddOn] = React.useState(false);
    const [modalEditOn, setModalEditOn] = React.useState(false);
    const [modalDeleteOn, setModalDeleteOn] = React.useState(false);
    const [idproduct, setIdproduct] = React.useState('');
    const [dataproduct, setDataproduct] = React.useState('');

    const getProduct = () => {

        if (categoryChecked.length > 0) {
            setDefaultFilterCategory(categoryChecked.length + ' kategori terpilih')
        } else {
            setDefaultFilterCategory('Kategori')
        }

        let tes = '';
        let filter = '';

        if (categoryChecked.length > 1) {
            let banyakCategory = categoryChecked.map((val, idx) => {
                return `category_id=${val}`
            })

            tes = banyakCategory.join('&')

        } else if (categoryChecked.length == 1) {

            tes = `category_id=${categoryChecked}`

        }

        if (tes && filterName) {
            filter = tes.concat('&', filterName)
        } else if (tes) {
            filter = tes
        } else {
            filter = filterName
        }

        axios.post(API_URL + `/api/product/getproductadmin?${filter ? filter : ''}`, {
            limit: "",
            sort,
            offset
        })
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log('Print product error', error);
            })
    }

    React.useEffect(() => {
        setTimeout(() => { setLoading(true) }, 1000)
        getProduct()
        return () => {
            setTimeout(() => { setLoading(true) }, 1000)
        }
    }, [loading, categoryChecked])

    const printProduct = () => {
        return data.map((val, idx) => {
            if (loading) {
                return <tr key={val.idproduct} className="bg-white border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                        <input type="checkbox" className="checked:bg-btn-500 rounded border-gray-300 focus:ring-btn-500" />
                    </td>
                    <th scope="row" className="w-96 py-4 px-6 font-bold text-gray-900 whitespace-nowrap flex items-center">
                        {
                            val.picture.includes('http') ?
                                <img className="pt-1 w-24 mr-4" src={val.picture} alt="imgHome" />
                                :
                                <img className="pt-1 w-24 mr-4" src={API_URL + val.picture} alt="imgHome" />
                        }
                        {val.product_name}
                    </th>
                    <td className="py-4 px-3 border border-x-1 text-gray-700 text-center">
                        {val.category_name}
                    </td>
                    <td className="py-4 px-3 border border-x-1 text-gray-700 text-center">
                        Rp {val.price.toLocaleString("id")}
                    </td>
                    <td className="py-4 px-3 border border-x-1 text-gray-700 text-center">
                        {val.stock_unit}
                        <span> </span>
                        {val.default_unit}
                    </td>
                    <td className="py-4 px-3 border border-x-1 text-gray-700 text-center">
                        {val.netto_stock}
                        <span> </span>
                        {val.netto_unit}
                    </td>
                    <td className="py-4 px-3 border border-x-1 text-gray-700 text-center">
                        {val.netto_stock * val.stock_unit}
                        <span> </span>
                        {val.netto_unit}
                    </td>
                    <td className="py-4 px-2 text-center">
                        <button type="button" onClick={() => { setModalEditOn(true); setDataproduct(val) }} className="w-8 border border-btn-500 text-btn-500 rounded-md py-1 font-bold">
                            {<AiFillEdit size={16} className="mx-2" />}
                        </button>
                        <button type="button" onClick={() => { setModalDeleteOn(true); setIdproduct(val.idproduct) }} className="ml-3 w-8 bg-btn-500 text-white rounded-md py-1 font-bold">
                            {<AiFillDelete size={16} className="mx-2" />}
                        </button>
                    </td>
                </tr>
            } else {
                return <tr key={val.idproduct} className="bg-white border-b h-32 hover:bg-gray-50">
                    <td className="py-4 px-6">
                        <input type="checkbox" className="checked:bg-btn-500 rounded border-gray-300 focus:ring-btn-500" />
                    </td>
                    <th scope="row" className="mt-7 py-4 font-bold text-gray-900 whitespace-nowrap flex items-center">
                        <div className="flex justify-center items-center w-10 h-10 bg-gray-300 rounded">
                            <svg className="w-3 h-3 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                        </div>
                        <div className="h-2 ml-3 bg-gray-300 rounded-full w-12 mb-2.5"></div>
                    </th>
                    <td className="py-4">
                        <div className="h-2 bg-gray-300 rounded-full w-16 mb-2.5"></div>
                    </td>
                    <td className="py-4">
                        <div className="h-2 bg-gray-300 rounded-full w-16 mb-2.5"></div>
                    </td>
                    <td className="py-4">
                        <div className="h-2 bg-gray-300 rounded-full w-16 mb-2.5"></div>
                    </td>
                    <td className="py-4">
                        <div className="h-2 bg-gray-300 rounded-full w-16 mb-2.5"></div>
                    </td>
                    <td className="py-4">
                        <div className="h-2 bg-gray-300 rounded-full w-16 mb-2.5"></div>
                    </td>
                    <td className="py-4 px-2 text-center">
                        <button type="button" className="w-8 border border-btn-500 text-btn-500 rounded-md py-1 font-bold">
                            {<AiFillEdit size={16} className="mx-2" />}
                        </button>
                        <button type="button" className="ml-3 w-8 bg-btn-500 text-white rounded-md py-1 font-bold">
                            {<AiFillDelete size={16} className="mx-2" />}
                        </button>
                    </td>
                </tr>
            }
        })
    }

    const printPagination = () => {
        return pagination.map((val, idx) => {
            if ((idx + 1) == idactive) {
                return <li>
                    {idx + 1 == 1
                        ?
                        <button type="button" onClick={() => { setCategoryChecked([]); setLoading(false); setFilterName(''); setIdactive(idx + 1); setOffset(10 * idx) }} aria-current="page" className="z-10 py-2 px-3 leading-tight text-btn-500 bg-green-50 border border-green-300 hover:bg-green-100 hover:text-btn-500">
                            {idx + 1}
                        </button>
                        :
                        <button type="button" onClick={() => { setLoading(false); setFilterName(''); setIdactive(idx + 1); setOffset(10 * idx) }} aria-current="page" className="z-10 py-2 px-3 leading-tight text-btn-500 bg-green-50 border border-green-300 hover:bg-green-100 hover:text-btn-500">
                            {idx + 1}
                        </button>}
                </li>
            } else {
                return <li>
                    {idx + 1 == 1
                        ?
                        <button type="button" onClick={() => { setCategoryChecked([]); setLoading(false); setFilterName(''); setIdactive(idx + 1); setOffset(10 * idx) }} className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            {idx + 1}
                        </button>
                        :
                        <button type="button" onClick={() => { setLoading(false); setFilterName(''); setIdactive(idx + 1); setOffset(10 * idx) }} className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            {idx + 1}
                        </button>
                    }
                </li>
            }
        })
    }

    const getCategory = () => {
        axios.get(API_URL + '/api/product/getcategory')
            .then((res) => {
                setCategory(res.data)
            })
            .catch((error) => {
                console.log('getCategory error :', error)
            })
    }

    React.useEffect(() => {
        getCategory()
    }, [category])

    const checkedCategory = (idcategory) => {
        if (document.getElementById(`select-${idcategory}`).checked) {
            setLoading(false)
            if (categoryChecked.length > 0) {
                setCategoryChecked([...categoryChecked, idcategory])
            } else {
                setCategoryChecked([idcategory])
            }
        } else {
            if (categoryChecked.length > 0) {
                categoryChecked.forEach((val, idx) => {
                    if (val == idcategory) {
                        let idxAlready = categoryChecked.findIndex(v => v == idcategory)
                        categoryChecked.splice(idxAlready, 1)
                        setLoading(false)
                    }
                })
            }
        }
    }

    const printCategory = () => {
        return category.map((val, idx) => {
            return <li key={val.idcategory} className="flex items-center mt-2">
                <input id={`select-${val.idcategory}`} onClick={() => checkedCategory(val.idcategory)} type="checkbox" className="ml-3 checked:bg-btn-500 rounded border-gray-300 focus:ring-btn-500" />
                <label className="ml-2">{val.category_name}</label>
            </li>
        })
    }

    return <div>
        <p className="text-xl font-bold mt-5 mb-3 text-txt-500">Daftar Obat</p>
        <div className="max-w-full mr-5 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden my-5 h-fit">
            <div className="px-4 py-6">
                <div id="header" className="flex justify-between items-center">
                    <div id="filter" className="flex">
                        <div className="relative">
                            <input id="search" type="form" onChange={(e) => setFilterName(`product_name=${e.target.value}`)} placeholder="Cari nama obat" className="border rounded-lg py-1 px-2 text-sm w-80" />
                            <button type="button" onClick={() => { setLoading(false); document.getElementById("search").value = null }} className="absolute right-0 p-1.5 rounded-r-lg text-gray-400">
                                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>

                        <div className="topnav" id="myTopnav">
                            <div className="dropdown">
                                <button className="dropbtn flex text-xs border rounded-lg pl-2 ml-3">
                                    {defaultFilterCategory}
                                    <IoIosArrowDown size={13} className="w-7 h-7 py-2 ml-3.5 rounded-r-lg bg-gray-200 text-sm hover:bg-gray-400 hover:text-white" />
                                </button>
                                <div className="dropdown-content w-44 pt-5 pb-5 mr-2">
                                    {printCategory()}
                                </div>
                            </div>
                        </div>

                        <div className="topnav" id="myTopnav">
                            <div className="dropdown">
                                <button className="dropbtn flex text-xs border rounded-lg pl-2 ml-3">
                                    {defaultSort}
                                    <IoIosArrowDown size={13} className="w-7 h-7 py-2 ml-3.5 rounded-r-lg bg-gray-200 text-sm hover:bg-gray-400 hover:text-white" />
                                </button>
                                <div className="dropdown-content w-44 py-3 mr-2">
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                        <li>
                                            <button onClick={() => { setLoading(false); setDefaultSort('Nama Produk'); setSort('product_name'); setDrop(!drop) }} className="block py-2 pl-4 pr-16 hover:bg-gray-100">Nama Produk</button>
                                        </li>
                                        <li>
                                            <button onClick={() => { setLoading(false); setDefaultSort('Harga Terendah'); setSort('price'); setDrop(!drop) }} className="block py-2 pl-4 pr-12 hover:bg-gray-100">Harga Terendah</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="button obat">
                        <button type="button" onClick={() => { setModalAddOn(true) }} className="text-white bg-btn-500 hover:bg-btn-600 w-32 font-bold rounded-lg place-content-center text-xs h-7 mr-1 flex items-center">
                            <BiDownload size={13} className="mr-2" />
                            Tambah Obat
                        </button>
                    </div>
                </div>

                <hr className="hidden md:flex my-5 bg-gray-200 border-0" />

                <div id="tabel obat">
                    {data.length > 0
                        ?
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-600 uppercase border-b border-t">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">
                                            <input type="checkbox" className="checked:bg-btn-500 rounded border-gray-300 focus:ring-btn-500" />
                                        </th>
                                        <th scope="col" className="py-3 pl-6 w-96">
                                            Nama Obat
                                        </th>
                                        <th scope="col" className="py-3 px-3 border border-x-1 text-center">
                                            Kategori
                                        </th>
                                        <th scope="col" className="py-3 px-3 border border-x-1 text-center">
                                            Harga
                                        </th>
                                        <th scope="col" className="py-3 px-3 border border-x-1 text-center">
                                            Stok Utama
                                        </th>
                                        <th scope="col" className="py-3 px-3 border border-x-1 text-center">
                                            Stok Netto
                                        </th>
                                        <th scope="col" className="py-3 px-3 border border-x-1 text-center">
                                            Total Stok
                                        </th>
                                        <th scope="col" className="py-3 px-3 text-center">
                                            Atur
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {printProduct()}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className="text-center text-txt-500 font-bold text-lg">
                            Data Not Found
                            <img src={require('./NoData.png')} className='w-96 text-center mx-auto' alt='medcare.com'/>
                        </div>
                    }
                </div>

                <div id="pagination" className="mt-5 text-center">
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <button disabled={idactive == 1 ? true : false} onClick={() => { setLoading(false); setIdactive(idactive - 1); setOffset((idactive - 2) * 10) }} type="button" className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </button>
                            </li>
                            {printPagination()}
                            <li>
                                <button disabled={idactive == 4 ? true : false} onClick={() => { setLoading(false); setIdactive(idactive + 1); setOffset((idactive) * 10) }} type="button" className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                    <span className="sr-only">Next</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

        {modalAddOn && < ModalAddProduct setModalAddOn={setModalAddOn} category={category} setLoading={setLoading} />}
        {modalEditOn && <ModalEdit setModalEditOn={setModalEditOn} dataproduct={dataproduct} category={category} setLoading={setLoading} />}
        {modalDeleteOn && <ModalDeleteProduct setModalDeleteOn={setModalDeleteOn} idproduct={idproduct} setLoading={setLoading} />}

    </div>
}

export default ProductAdminPage;