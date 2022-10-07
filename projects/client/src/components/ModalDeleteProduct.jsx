import React from "react";
import axios from "axios";
import { API_URL } from "../helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalDeleteProduct = ({ setModalDeleteOn, idproduct, setLoading }) => {

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
        axios.delete(API_URL+`/api/product/delete/${idproduct}`)
        .then((res)=>{
            if(res.data.message){
                console.log('ini response ondelete',res)
                toast.success('Delete product berhasil', {
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
        .catch((error)=>{
            console.log('on delete product gagal :', error)
        })
    }
    
    return (

        <div className="bg-black bg-opacity-50 fixed inset-0 z-50">
            <div className="flex h-screen justify-center items-center">
                <div className="flex-col justify-center bg-white py-5 px-24 rounded-xl w-96" style={{ height: '200px' }}>

                    {/* <!-- Modal content --> */}
                    <div className="pt-6 text-center">
                        <h3 className="mb-7 text-xl font-medium text-gray-900">Are you sure?</h3>
                        <button onClick={handleCancelClick} className="rounded-lg px-4 py-2 text-btn-500 bg-white border border-btn-500 font-bold">Cancel</button>
                        <button onClick={handleOKClick} className=" rounded-lg px-4 py-2 ml-4 text-white  bg-btn-500 font-bold">Delete</button>
                    </div>
                </div>
               
            </div>
        </div>
    );
}

export default ModalDeleteProduct;