import React from "react";
import axios from 'axios';
import { API_URL } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Datetime from "./DatetimeConverter";
import Currency from "./CurrencyComp";

const OrderDetail = ({ selected, showModal }) => {

    const [data, setData] = React.useState({});
    const [detail, setDetail] = React.useState([]);
    const [date, setDate] = React.useState(0);
    const [courier, setCourier] = React.useState('');
    const [delivery, setDelivery] = React.useState('');

    React.useEffect(() => {
        console.log('selected', selected);
        setData(selected);
        setDetail(selected.transaction_detail);
        setDate(parseInt(selected.invoice_number.split('/')[2]));
        setCourier(selected.shipping_courier.split('/')[0]);
        setDelivery(selected.shipping_courier.split('/')[1]);
    }, []);

    return (
        <div>
            <div tabIndex={-1} className="backdrop-blur-sm fixed right-0 left-0 top-0 flex justify-center items-center z-50 md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-1/2 h-full md:h-auto">
                    <div className="relative border-2 bg-white rounded-lg shadow border-main-500">
                        <div className="p-6 text-center">
                            <div className="mb-5 flex justify-center">
                                <p className='text-2xl font-bold text-main-500'>Transaction Detail</p>
                                <button type='button' className="absolute right-10 font-extrabold pt-1 text-lg text-main-500" onClick={() => showModal(false)}>X</button>
                            </div>
                            <div className="flex">
                                <div className="w-2/3 flex flex-col p-1">
                                    <div className="border shadow-md flex flex-col p-2 my-1">
                                        <p className="text-start font-semibold text-main-500">{data.status_name}</p>
                                        <div className="flex justify-between my-2 border-t">
                                            <p>No. Invoice</p>
                                            <p className="text-main-500 font-semibold">{data.invoice_number}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Purchase Date</p>
                                            <p><Datetime value={date} /></p>
                                        </div>
                                    </div>
                                    <div className="border shadow-md flex flex-col p-2 my-1">
                                        <p className="text-start underline text-main-500 font-semibold mb-1">Product Detail</p>
                                        {
                                            detail.length > 0 ? 
                                            detail.map((val, idx) => {
                                                return (
                                                    <div className="border rounded-lg flex my-1">
                                                        <div className="w-1/6">
                                                            <img src={val.product_image} />
                                                        </div>
                                                        <div className="flex flex-col text-start h-full border-r w-3/6 p-2">
                                                            <p className="font-semibold">{val.product_name}</p>
                                                            <p>{val.product_qty} x <Currency price={val.product_price} /></p>
                                                        </div>
                                                        <div className="w-2/6 p-2 flex flex-col text-end">
                                                            <p>Total Item Price</p>
                                                            <p className="font-semibold"><Currency price={val.product_price * val.product_qty} /></p>
                                                            <div className="flex items-center justify-center my-2">
                                                                {
                                                                    data.status_id === 7 || data.status_id === 9 ?
                                                                        <button type='button'
                                                                            className="px-3 py-1 border bg-white-500 text-main-500 font-semibold rounded-lg border-main-500 focus:ring-2 focus:ring-main-500"
                                                                        >Buy Again</button>
                                                                        :
                                                                        ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            ""
                                        }
                                    </div>
                                    <div className="border shadow-md flex flex-col p-2 my-1">
                                        <p className="text-start underline font-semibold text-main-500">Delivery Information</p>
                                        <div className="my-1 flex">
                                            <div className="flex w-1/4 justify-between items-center">
                                                <p>Courier</p>
                                                <p>:</p>
                                            </div>
                                            <div className="flex pl-2 items-center w-3/4">
                                                <p className="transform: capitalize">{courier} - {delivery}</p>
                                            </div>
                                        </div>
                                        <div className="my-1 flex">
                                            <div className="flex w-1/4 justify-between">
                                                <p>Address</p>
                                                <p>:</p>
                                            </div>
                                            <div className="flex pl-2 items-start flex-col text-start w-3/4">
                                                <p className="transform: capitalize font-semibold">{data.user_name}</p>
                                                <p>{data.user_phone_number}</p>
                                                <p>{data.user_address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border shadow-md flex flex-col p-2 my-1">
                                        <p className="text-start underline font-semibold text-main-500">Payment Detail</p>
                                        <div className="my-1 flex">
                                            <div className="flex w-1/3 justify-between items-center">
                                                <p>Total Price ({detail.length} Items)</p>
                                                <p>:</p>
                                            </div>
                                            <div className="flex pl-2 justify-end w-2/3">
                                            {
                                                data.total_price ? 
                                                <p className="transform: capitalize"><Currency price={data.total_price}/></p>
                                                :
                                                <p className="transform: capitalize">Rp.0</p>
                                            }
                                            </div>
                                        </div>
                                        <div className="my-1 flex">
                                            <div className="flex w-1/3 justify-between items-center">
                                                <p>Delivery Price</p>
                                                <p>:</p>
                                            </div>
                                            <div className="flex pl-2 justify-end w-2/3">
                                            {
                                                data.delivery_price ? 
                                                <p className="transform: capitalize"><Currency price={data.delivery_price}/></p>
                                                :
                                                <p className="transform: capitalize">Rp.0</p>
                                            }
                                            </div>
                                        </div>
                                        <div className="my-1 flex border-t">
                                            <div className="flex w-1/3 justify-between items-center text-lg font-semibold">
                                                <p>Total</p>
                                                <p>:</p>
                                            </div>
                                            <div className="flex pl-2 justify-end w-2/3 text-lg font-semibold">
                                            {
                                                data.delivery_price && data.total_price ? 
                                                <p className="transform: capitalize"><Currency price={data.delivery_price + data.total_price}/></p>
                                                :
                                                <p className="transform: capitalize">Rp.0</p>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/3 px-7">
                                    <div className="flex flex-col my-1">
                                        {
                                            data.status_id === 7 || data.status_id === 9 ?
                                                <button type='button'
                                                    className="border w-auto p-3 rounded-lg bg-main-500 text-white font-semibold hover:bg-main-600 focus:ring-2 focus:ring-main-500"
                                                >Buy Again ({detail.length} items)</button>
                                                :
                                                ""
                                        }
                                        {
                                            data.status_id === 3 || data.status_id === 4 || data.status_id === 5 ?
                                                <button type='button'
                                                    className="border w-auto p-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                                                >Cancel Order</button>
                                                :
                                                ""
                                        }
                                        {
                                            data.status_id === 8 ?
                                                <button type='button'
                                                    className="border w-auto p-3 rounded-lg bg-main-500 text-white font-semibold hover:bg-main-600 focus:ring-2 focus:ring-main-500"
                                                >Delivery Accepted</button>
                                                :
                                                ""
                                        }
                                    </div>
                                    <div className="flex flex-col my-1">
                                        {
                                            data.status_id === 4 || data.status_id === 5 ?
                                                <button type='button'
                                                    className="border w-auto p-3 rounded-lg bg-white-500 border-main-500 text-main-500 font-semibold focus:ring-2 focus:ring-main-500"
                                                >Upload Payment Proof</button>
                                                :
                                                ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default OrderDetail;