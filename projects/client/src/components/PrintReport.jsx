import React from 'react'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import Currency from './CurrencyComp';

const PrintReportComponent = (data) => {
    const componentRef = useRef()
    console.log('ini data', data)
    console.log(data.data[0])
    const options1 = {
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

    const options2 = {
        scales: {
            y: {
                beginAtZero: true,
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

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Report',
        onAfterPrint: () => 'Print Success'
    })

    return <div>
        <button
            className='mt-3 sm:mt-0 sm:ml-5 bg-white border py-1 px-2'
            onClick={() => {
                handlePrint()
            }}
        >
            Print Data
        </button>
        <div className='absolute -z-30 overflow-hide-modal'>
            <div ref={componentRef}>
                <div className='mt-5 mb-3'>
                    <p className="text-3xl text-center font-bold mt-5 mb-3 text-txt-500">Report</p>
                </div>
                <div className='ml-5 mt-3 border border-teal-500 rounded-lg bg-white mr-10 mb-96'>
                    <div className='mr-5'>
                        <p className="text-3xl font-bold mt-5 mb-3 pl-5 text-main-500">TOTAL REVENUE</p>
                        <Line style={{ maxWidth: 900, height: 350 }} data={data.data[0]} options={options1} />
                    </div>
                    <div className='border shadow-lg h-52 bg-gray-100 rounded-lg my-10'>
                        <p className="text-xl font-semibold mt-5 px-5">Total Revenue</p>
                        <p className="text-3xl font-bold mt-3 pl-5"><Currency price={data.data[5] * data.data[4].length} /></p>
                        <p className="text-xl font-semibold mt-5  px-5">Average Revenue per Month</p>
                        <p className="text-3xl font-bold mt-3 pl-5"><Currency price={data.data[5]} /></p>
                    </div>
                </div>
                <p className='mb-10 text-white'>TRANSACTION</p>
                <div className='ml-5 border border-teal-500 rounded-lg bg-white mr-10 mt-10 mb-32'>
                    <div className='mr-5'>
                        <p className="text-3xl font-bold mt-5 mb-3 pl-5 text-main-500">TRANSACTION</p>
                        <Line style={{ maxWidth: 900, height: 350 }} data={data.data[1]} options={options2} />
                    </div>
                </div>
                <div className='ml-5 mt-10 border border-teal-500 rounded-lg bg-white mr-10 mb-40'>
                    <div className='mr-5'>
                        <p className="text-3xl font-bold mt-5 mb-3 pl-5 text-main-500">USER</p>
                        <Line style={{ maxWidth: 900, height: 350 }} data={data.data[2]} options={options2} />
                    </div>
                </div>
                <p className='mb-10 text-white'>BEST SELLER</p>
                <div className='ml-5 mt-3 border border-teal-500 rounded-lg bg-white mr-10' >
                    <div className='mr-5'>
                        <p className="text-3xl font-bold mt-5 mb-3 pl-5 text-main-500">BEST SELLER {data.data[6]}</p>
                        <Line style={{ maxWidth: 900, height: 350 }} data={data.data[3]} options={options2} />
                    </div>
                    <div className='border shadow-lg h-52 bg-gray-100 rounded-lg my-10'>
                        <p className="text-xl font-semibold mt-5 px-5">Total Product Sold in {data.data[6]}</p>
                        <p className="text-3xl font-bold mt-3 pl-5">{data.data[7]}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default PrintReportComponent