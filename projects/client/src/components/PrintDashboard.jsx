import React from 'react'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import Currency from './CurrencyComp';

const PrintDashboardComponent = (data) => {
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Summary',
        onAfterPrint: () => 'Print Success'
    })

    const printMed = () => {
        return data.data[4].map((val, idx) => {
            if (idx < 7) {
                return <div className='grid grid-cols-5'>
                    <p className='text-xl font-bold my-1 text-main-500 pl-5 col-span-3'>{val.product_name}</p>
                    <p className='text-xl font-bold pl-5 text-main-800 col-span-2'>{val.stock_unit} {val.unit}</p>
                </div>
            }
        })
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, ticks) {
                        return 'Rp' + value.toLocaleString('id');
                    }
                },
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        layout: {
            padding: 20
        },
        elements: {
            line: {
                fill: true,
                borderColor: 'teal'
            }
        }
    }

    return <div>
        <button
            className='mt-3 sm:mt-0 sm:ml-5 bg-white border py-1 px-2 h-10'
            onClick={() => {
                handlePrint()
            }}
        >
            Print Data
        </button>
        <div className='absolute -z-30 overflow-hide-print'>
            <div ref={componentRef}>
                <div className='mt-5 mb-3'>
                    <p className="text-3xl text-center font-bold mt-5 mb-3 text-txt-500">Summary</p>
                </div>
                <div className='mx-5 my-5'>
                    <div className='mt-5 grid grid-cols-3'>
                        <div className='border shadow-lg h-40 bg-gray-100 rounded-lg my-2 mx-2'>
                            <p className="text-xl font-semibold mt-5 mb-3 px-5">Total Revenue</p>
                            <p className="text-4xl font-bold mt-3 mb-3 pl-5"><Currency price={data.data[0]} /></p>
                        </div>
                        <div className='border shadow-lg h-40 bg-gray-100 rounded-lg my-2 mx-2'>
                            <p className="text-xl font-semibold mt-5 mb-3 px-5">Total Product Sold</p>
                            <p className="text-4xl font-bold mt-3 mb-3 pl-5">{data.data[1]}</p>
                        </div>
                        <div className='border shadow-lg h-40 bg-gray-100 rounded-lg my-2 mx-2'>
                            <p className="text-xl font-semibold mt-5 mb-3 px-5">Total Product Registered</p>
                            <p className="text-4xl font-bold mt-3 mb-3 pl-5">{data.data[2]}</p>
                        </div>
                    </div>
                    <div className='ml-5'>
                        <p className="text-2xl font-bold mt-5 mb-3 text-txt-500">Transaction</p>
                    </div>
                    <div className='mt-5'>
                        <div className='grid grid-cols-3'>
                            <div className='border shadow-lg h-40 bg-gray-100 rounded-lg my-2 mx-5' type='button'>
                                <p className="text-xl font-semibold mt-5 mb-3 px-5">New Order</p>
                                <p className="text-4xl font-bold mt-3 mb-3 pl-5">{data.data[3][0]}</p>
                            </div>
                            <div className='border shadow-lg h-40 bg-gray-100 rounded-lg my-2 mx-5' type='button'>
                                <p className="text-xl font-semibold mt-5 mb-3 px-5">Ready To Ship</p>
                                <p className="text-4xl font-bold mt-3 mb-3 pl-5">{data.data[3][1]}</p>
                            </div>
                            <div className='border shadow-lg h-40 bg-gray-100 rounded-lg my-2 mx-5' type='button'>
                                <p className="text-xl font-semibold mt-5 mb-3 px-5">In Delivery</p>
                                <p className="text-4xl font-bold mt-3 mb-3 pl-5">{data.data[3][2]}</p>
                            </div>
                            <div className='border shadow-lg h-40 bg-gray-100 rounded-lg my-2 mx-5' type='button'>
                                <p className="text-xl font-semibold mt-5 mb-3 px-5">Order Completed</p>
                                <p className="text-4xl font-bold mt-3 mb-3 pl-5">{data.data[3][3]}</p>
                            </div>
                            <div className='border shadow-lg h-40 bg-gray-100 rounded-lg my-2 mx-5' type='button'>
                                <p className="text-xl font-semibold mt-5 mb-3 px-5">Order Canceled</p>
                                <p className="text-4xl font-bold mt-3 mb-3 pl-5">{data.data[3][4]}</p>
                            </div>
                        </div>
                        <div className='border shadow-lg h-96 bg-gray-100 rounded-lg mx-5 ml-5 pt-5 mt-5 mb-96'>
                            <p className="text-2xl font-bold mb-3 ml-5 text-txt-500 sm:hidden">Low Stock Product</p>
                            <p className={`${data.data[4].length < 1 ? 'mt-24 ml-20 text-5xl font-bold text-main-500' : 'hidden'}`}>All Stock Product Controlled </p>
                            {printMed()}
                        </div>
                    </div>
                    <div style={{ width: 1000, height: 350 }}>
                        <p className='mb-10 text-white'>REVENUE</p>
                        <div className='ml-5 mt-3 border border-teal-500 rounded-lg bg-white mr-10 mb-10'>
                            <p className="text-3xl font-bold mt-5 mb-3 pl-5 text-main-500 flex items-center">TOTAL REVENUE <p className='ml-2 text-xl'>(Only 12 Months)</p></p>
                            <Line style={{ maxWidth: 900, height: 350 }} data={data.data[5]} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default PrintDashboardComponent