import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { API_URL } from '../../helper';
import AdminComponent from '../../components/AdminComponent'
import Loading from '../../components/Loading'
import Currency from '../../components/CurrencyComp';

const DashboardPage = (props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)
    const [revenueReport, setRevenueReport] = React.useState('')
    const [totalRevenue, setTotalRevenue] = React.useState(0)
    const [totalProduct, setTotalProduct] = React.useState(0)
    const [product, setProduct] = React.useState('')
    const [productOut, setProductOut] = React.useState('')
    const [transaction, setTransaction] = React.useState('')
    const [modalProduct, setModalProduct] = React.useState('')

    const getReport = () => {
        axios.get(API_URL + `/api/transaction/report`)
            .then((res) => {
                console.log(res.data.product)
                let total_revenue = 0
                let total_product = 0
                let revenueArray = res.data.revenue.slice(-12)
                setRevenueReport({
                    labels: revenueArray.map((val) => val.month),
                    datasets: [{
                        label: "Revenue",
                        data: revenueArray.map((val) => val.revenue),
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)'
                        ]
                    }]
                })
                res.data.revenue.map((val) => {
                    total_revenue = total_revenue + val.revenue
                })
                res.data.product.map((val) => {
                    total_product = total_product + val.best_seller
                })
                setTotalRevenue(total_revenue)
                setTotalProduct(total_product)
            }).catch((err) => {
                console.log(err)
            })
    }

    const getProduct = () => {
        axios.post(API_URL + `/api/product/getproduct`, { offset: '' })
            .then((res) => {
                res.data.results.map((val) => {
                    if (val.isDefault == 'false') {
                        let index = res.data.results.findIndex((value) => value == val)
                        res.data.results.splice(index, 1)
                    }
                })
                setProduct(res.data.results)
                let array = []
                res.data.results.map((val) => {
                    if (val.stock_unit < 5) {
                        array.push(val)
                    }
                })
                setProductOut(array)
            })
            .catch((error) => {
                console.log('Print product error', error);
            })
    }

    const getTrans = () => {
        let userToken = localStorage.getItem('medcarelog');
        axios.get(API_URL + `/api/transaction/all?limit=no`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then((res) => {
                let order = 0
                let ready = 0
                let delivery = 0
                let completed = 0
                let canceled = 0
                res.data.transaction.map((val) => {
                    if (val.status_id == 3 || val.status_id == 4 || val.status_id == 5) {
                        order += 1
                    } else if (val.status_id == 6) {
                        ready += 1
                    } else if (val.status_id == 7) {
                        canceled += 1
                    } else if (val.status_id == 8) {
                        delivery += 1
                    } else {
                        completed += 1
                    }
                })
                setTransaction([order, ready, delivery, completed, canceled])
                setTimeout(() => setLoading(false), 500)
            }).catch((err) => {
                console.log(err)
            })
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true
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

    const printMed = () => {
        return productOut.map((val, idx) => {
            if (idx < 7) {
                return <div className='grid grid-cols-5'>
                    <p className='sm:text-xl font-bold my-1 text-main-500 pl-5 col-span-3'>{val.product_name}</p>
                    <p className='sm:text-xl font-bold pl-5 text-main-800 col-span-2'>{val.stock_unit} {val.unit}</p>
                </div>
            }
        })
    }

    React.useEffect(() => {
        setLoading(true)
        getTrans()
        getReport()
        getProduct()
    }, [])

    return (<div >
        {loading ?
            <Loading loading={loading} />
            :
            <div>
                <div className='flex'>
                    <AdminComponent page={window.location.pathname} />
                    <div className='w-screen' style={{ background: "linear-gradient(155.7deg, #D6F5F3 -46%, #F7FCFC 100%, #F1F5FC 118%)" }}>
                        <div className='ml-5'>
                            <p className="sm:text-3xl font-bold mt-5 mb-3 text-txt-500">Product and Transaction Analysis</p>
                            <p className="sm:text-xl mt-2 mb-3 text-txt-500">Last Update {new Date().toLocaleString('en-CA')}</p>
                        </div>
                        <div className='mt-5 grid grid-cols-3'>
                            <div className='border shadow-lg h-40 bg-gray-100 rounded-lg mx-5'>
                                <p className="sm:text-xl font-semibold mt-5 mb-3 px-5">Total Revenue</p>
                                <p className="sm:text-4xl font-bold mt-3 mb-3 pl-5"><Currency price={totalRevenue} /></p>
                            </div>
                            <div className='border shadow-lg h-40 bg-gray-100 rounded-lg mx-5'>
                                <p className="sm:text-xl font-semibold mt-5 mb-3 px-5">Total Product Sold</p>
                                <p className="sm:text-4xl font-bold mt-3 mb-3 pl-5">{totalProduct}</p>
                            </div>
                            <div className='border shadow-lg h-40 bg-gray-100 rounded-lg mx-5'>
                                <p className="sm:text-xl font-semibold mt-5 mb-3 px-5">Total Product Registered</p>
                                <p className="sm:text-4xl font-bold mt-3 mb-3 pl-5">{product.length}</p>
                            </div>
                        </div>
                        <div className='ml-5 grid grid-cols-2'>
                            <p className="sm:text-2xl font-bold mt-5 mb-3 text-txt-500">Transaction</p>
                            <p className="sm:text-2xl font-bold mt-5 mb-3 ml-3 text-txt-500">Low Stock Product</p>
                        </div>
                        <div className='mt-5 grid grid-cols-2'>
                            <div className='grid grid-cols-3'>
                                <div className='border shadow-lg h-40 bg-gray-100 rounded-lg mx-5 mb-5' type='button' onClick={() => navigate('/admin/transaction?status=waiting')}>
                                    <p className="sm:text-xl font-semibold mt-5 mb-3 px-5">New Order</p>
                                    <p className="sm:text-4xl font-bold mt-3 mb-3 pl-5">{transaction[0]}</p>
                                </div>
                                <div className='border shadow-lg h-40 bg-gray-100 rounded-lg mx-5 mb-5' type='button' onClick={() => navigate('/admin/transaction?status=process')}>
                                    <p className="sm:text-xl font-semibold mt-5 mb-3 px-5">Ready To Ship</p>
                                    <p className="sm:text-4xl font-bold mt-3 mb-3 pl-5">{transaction[1]}</p>
                                </div>
                                <div className='border shadow-lg h-40 bg-gray-100 rounded-lg mx-5 mb-5' type='button' onClick={() => navigate('/admin/transaction?status=on')}>
                                    <p className="sm:text-xl font-semibold mt-5 mb-3 px-5">In Delivery</p>
                                    <p className="sm:text-4xl font-bold mt-3 mb-3 pl-5">{transaction[2]}</p>
                                </div>
                                <div className='border shadow-lg h-40 bg-gray-100 rounded-lg mx-5 mb-5' type='button' onClick={() => navigate('/admin/transaction?status=completed')}>
                                    <p className="sm:text-xl font-semibold mt-5 mb-3 px-5">Order Completed</p>
                                    <p className="sm:text-4xl font-bold mt-3 mb-3 pl-5">{transaction[3]}</p>
                                </div>
                                <div className='border shadow-lg h-40 bg-gray-100 rounded-lg mx-5 mb-5' type='button' onClick={() => navigate('/admin/transaction?status=canceled')}>
                                    <p className="sm:text-xl font-semibold mt-5 mb-3 px-5">Order Canceled</p>
                                    <p className="sm:text-4xl font-bold mt-3 mb-3 pl-5">{transaction[4]}</p>
                                </div>
                            </div>
                            <div className='border shadow-lg h-80 bg-gray-100 rounded-lg mx-5 pt-5'>
                                <p className={`${productOut.length < 1 ? 'mt-24 ml-20 text-5xl font-bold text-main-500' : 'hidden'}`}>All Stock Product Controlled </p>
                                {printMed()}
                                <button className={`${productOut.length > 7 ? 'font-bold pl-5 text-main-800 mt-4' : 'hidden'}`} onClick={() => setModalProduct(true)}>See All Low Stock Product</button>
                            </div>
                        </div>
                        <div type='button' onClick={() => navigate('/admin/report')} className='ml-5 border border-teal-500 rounded-lg bg-white mr-10 mb-10'>
                            <p className="sm:text-3xl font-bold mt-5 mb-3 pl-5 text-main-500 flex items-center">TOTAL REVENUE <p className='ml-2 text-xl'>(Only 12 Months)</p></p>
                            <Line style={{ width: 1200, maxHeight: 400 }} data={revenueReport} options={options} />
                        </div>
                    </div>
                </div>
                <div id="ProductModal" tabindex="-1" aria-hidden='true' className={`${modalProduct ? "pl-[35%] pt-[5%] backdrop-blur-sm overflow-x-hidden fixed z-30 justify-center w-full md:inset-0" : "hidden"} `}>
                    {modalProduct ?
                        <div className="mt-20 w-full max-w-2xl border rounded-lg max-h-[70rem]" >
                            {/* <!-- Modal content --> */}
                            <div className="bg-blue-100 rounded-lg shadow dark:bg-gray-700">
                                {/* <!-- Modal header --> */}
                                <div className="flex items-center p-4 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white ml-[37%]">
                                        Low Stock Product
                                    </h3>
                                    <button type="button" onClick={() => {
                                        setModalProduct('')
                                    }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="detailModal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <div className='h-[30rem] overflow-hide-modal'>
                                    {productOut.map((val) => {
                                        return <div className='grid grid-cols-5'>
                                            <p className='sm:text-xl font-bold my-1 text-main-500 pl-5 col-span-3'>{val.product_name}</p>
                                            <p className='sm:text-xl font-bold pl-5 text-main-800 col-span-2'>{val.stock_unit} {val.unit}</p>
                                        </div>
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <Loading loading={loading} />
            </div>
        }
    </div>
    )
}

export default DashboardPage;
