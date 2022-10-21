import React from "react";
import axios from "axios";
import { API_URL } from "../helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalDeleteProduct = ({ setModalDeleteOn, idproduct, nameDeleted, setLoading }) => {

    console.log('ini idproduct modal edit', idproduct)

    const handleOKClick = () => {
        onDelete()
        setModalDeleteOn(false)
        setLoading(false)
    }
    const handleCancelClick = () => {
        setModalDeleteOn(false)
    }

    const onDelete = () => {
        axios.delete(API_URL + `/api/product/delete/${idproduct}`)
            .then((res) => {
                if (res.data.message) {
                    console.log('ini response ondelete', res)
                    toast.success('Delete data success', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            })
            .catch((error) => {
                console.log('on delete product gagal :', error)
                toast.error('Delete data failed', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    }

    return (

        <div className="bg-black bg-opacity-50 fixed inset-0 z-50">
            <div className="flex h-screen justify-center items-center">
                <div className="flex-col justify-center bg-white py-5 px-16 rounded-xl w-fit" style={{ height: '270px' }}>

                    {/* <!-- Modal content --> */}
                    <div className="pt-6 text-center">
                        <h3 className="mb-5 text-xl font-bold text-gray-900">Delete Product?</h3>
                        <input disabled defaultValue={nameDeleted} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Anjuran dosis penggunaan obat" required />
                        <p className="text-gray-500 mt-3">Delete action cannot be undone</p>
                        <div className="mt-5">
                            <button onClick={handleCancelClick} className="w-28 rounded-lg px-4 py-2 text-btn-500 bg-white border border-btn-500 font-bold">Cancel</button>
                            <button onClick={handleOKClick} className="w-28 ml-4 rounded-lg px-4 py-2 text-white  bg-btn-500 font-bold">Delete</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ModalDeleteProduct;