import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios'
import { API_URL } from '../../helper';
import AdminComponent from '../../components/AdminComponent'
import Loading from '../../components/Loading'
import Currency from '../../components/CurrencyComp';

const ReportPage = () => {
    const [loading, setLoading] = React.useState(true)
    const [productReport, setProductReport] = React.useState('')
    const [transactionReport, setTransactionReport] = React.useState('')
    const [userReport, setUserReport] = React.useState('')
    const [totalProduct, setTotalProduct] = React.useState(0)
    const [totalTransaction, setTotalTransaction] = React.useState(0)
    const [totalUser, setTotalUser] = React.useState(0)

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

    const getReport = () => {
        axios.get(API_URL + `/api/transaction/report`)
            .then((res) => {
                let total_product = 0
                let total_transaction = 0
                let total_user = 0
                setProductReport({
                    labels: res.data.product.map((val) => val.month),
                    datasets: [{
                        label: "Product Sold",
                        data: res.data.product.map((val) => val.product)
                    }]
                })
                setTransactionReport({
                    labels: res.data.transaction.map((val) => val.month),
                    datasets: [{
                        label: "Transaction",
                        data: res.data.transaction.map((val) => val.transaction)
                    }]
                })
                setUserReport({
                    labels: res.data.user.map((val) => val.month),
                    datasets: [{
                        label: "User",
                        data: res.data.user.map((val) => val.user)
                    }]
                })
                res.data.product.map((val) => {
                    total_product = total_product + val.product
                }
                )
                res.data.transaction.map((val) => {
                    total_transaction = total_transaction + val.transaction
                }
                )
                res.data.user.map((val) => {
                    total_user = total_user + val.user
                }
                )
                setTotalProduct(total_product / res.data.product.length)
                setTotalTransaction(total_transaction / res.data.transaction.length)
                setTotalUser(total_user / res.data.user.length)
                setTimeout(() => setLoading(false), 1000)
            }).catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getReport()
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
                            <p className="sm:text-2xl font-bold mt-5 mb-3 text-txt-500">Report</p>
                        </div>
                        <div className='ml-5 border border-teal-500 rounded-lg flex mr-10'>
                            <div>
                                <p className="sm:text-2xl font-bold mt-5 mb-3 pl-5 text-main-500">PRODUCT SOLD</p>
                                <Line style={{ width: 1200, maxHeight: 400 }} data={productReport} options={options} />
                            </div>
                            <div className='border shadow-lg h-40 bg-white rounded-lg my-10'>
                                <p className="sm:text-xl font-bold mt-5 mb-3 px-5">Average Product Sold per Month</p>
                                <p className="sm:text-xl font-bold mt-5 mb-3 pl-5"><Currency price={totalProduct} /></p>
                            </div>
                        </div>
                        <div className='ml-5' style={{ width: 600 }}>
                            <Line data={transactionReport} options={options} />
                        </div>
                        <div className='ml-5' style={{ width: 600 }}>
                            <Line data={userReport} options={options} />
                        </div>
                    </div>
                </div>
                <Loading loading={loading} />
            </div>
        }
    </div>
    )
}

export default ReportPage