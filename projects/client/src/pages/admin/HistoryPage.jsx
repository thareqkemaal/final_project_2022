import React from 'react'
import axios from 'axios'
import { API_URL } from '../../helper';
import AdminComponent from '../../components/AdminComponent'
import { useNavigate, useLocation } from 'react-router'
import { BiSearchAlt2 } from 'react-icons/bi';
import Loading from '../../components/Loading'
import { DateRangePicker } from 'react-date-range'
import format from 'date-fns/format'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Helmet } from 'react-helmet';

const HistoryPage = () => {
    const navigate = useNavigate()
    const search = useLocation().search
    const [loading, setLoading] = React.useState(true)
    const [history, setHistory] = React.useState([])
    const [product, setProduct] = React.useState('')
    const [filterKey, setFilterKey] = React.useState(0)
    const [filter, setFilter] = React.useState('')
    const [count, setCount] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [range, setRange] = React.useState([
        {
            startDate: '',
            endDate: '',
            key: 'selection',
            color: 'teal'
        }
    ])
    const [open, setOpen] = React.useState(false)



    const getHistory = (search) => {
        axios.get(API_URL + `/api/transaction/history${search}`)
            .then((res) => {
                console.log(res.data.count[0].total)
                setHistory(res.data.history)
                setCount(res.data.count[0].total)
                setTimeout(() => setLoading(false), 1000)
            }).catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getHistory(search)
        if (search) {
            let first = search.split('?')
            let split = first[1].split('&')
            let firstProduct = split.filter((val) => val.includes('product'))
            let firstPage = split.filter((val) => val.includes('page'))
            let firstStart = split.filter((val) => val.includes('start'))
            let firstEnd = split.filter((val) => val.includes('end'))
            if (firstProduct.length != 0 || firstStart.length != 0) {
                if (firstProduct.length != 0 && firstStart.length == 0) {
                    setProduct(firstProduct[0].split('=')[1])
                    setFilter(firstProduct[0])
                } else if (firstProduct.length == 0 && firstStart.length != 0) {
                    setRange([
                        {
                            startDate: new Date(`${firstStart[0].split('=')[1]}`),
                            endDate: new Date(`${firstEnd[0].split('=')[1]}`),
                            key: 'selection',
                            color: 'teal'
                        }
                    ])
                    setFilter(`${firstStart[0]}&${firstEnd[0]}`)
                } else {
                    setProduct(firstProduct[0].split('=')[1])
                    setFilter(`${firstProduct[0]}&${firstStart[0]}&${firstEnd[0]}`)
                }
            }
            if (firstPage.length != 0) {
                setPage(firstPage[0].split('=')[1])
            }
        }
    }, [])

    const printHistory = () => {
        return history.map((val, idx) => {
            return <tr className='border border-black divide-black divide-x'>
                <th scope="col" className="py-3 px-3 text-center">
                    {val.date_change}
                </th>
                <th scope="col" className="py-3 pl-6 w-96 text-center">
                    {val.product_name}
                </th>
                <th scope="col" className="py-3 px-3 w-32 text-center">
                    {val.username}
                </th>
                <th scope="col" className="py-3 px-3 text-center">
                    {val.unit}
                </th>
                <th scope="col" className="py-3 px-3 w-20 text-center">
                    {val.quantity}
                </th>
                <th scope="col" className="py-3 px-3 text-center">
                    {val.type}
                </th>
                <th scope="col" className="py-3 px-3 text-center">
                    {val.information}
                </th>
            </tr>
        })
    }

    const handleFilter = () => {
        setPage(1)
        setLoading(true)
        let filter = ''
        if (range[0].startDate && range[0].startDate) {
            filter = {
                product_name: product,
                start: range[0].startDate.toLocaleDateString("en-CA"),
                end: range[0].endDate.toLocaleDateString("en-CA")
            }
        } else {
            filter = {
                product_name: product
            }
        }

        let filterArray = []
        for (const key in filter) {
            if (filter[key]) {
                filterArray.push(`${key}=${filter[key]}`)
            }
        }
        setFilter(filterArray.join('&'))
        navigate(`/admin/stock_log?${filterArray.join('&')}`)
        getHistory(`?${filterArray.join('&')}`)
    }

    return (
    <div>
        <Helmet>
            <title>History</title>
        </Helmet>
        <div className='flex'>
            <AdminComponent page={window.location.pathname} />
            <div className='w-screen' style={{ background: "linear-gradient(155.7deg, #D6F5F3 -46%, #F7FCFC 100%, #F1F5FC 118%)" }}>
                <div className='ml-5'>
                    <p className="sm:text-2xl font-bold mt-5 mb-3 text-txt-500">Stock History</p>
                    <p className="sm:text-xl font-semibold mt-5 mb-3 text-txt-500">Last Update {new Date().toLocaleString('en-CA')}</p>
                    <div className='sm:flex relative mt-5 sm:mt-10'>
                        <input placeholder='Product Name' defaultValue={product ? product : null} id='product' key={filterKey} className='w-60 sm:w-96 h-5sm:h-10 border border-teal-500 rounded-lg px-3 sm:px-10' onChange={(e) => setProduct(e.target.value)} />
                        <BiSearchAlt2 className='absolute left-2 top-2 fill-slate-500 hidden sm:block' size={25} />
                        <div className='sm:ml-5 mt-3 sm:mt-0 flex items-center'>
                            <input
                                value={range[0].startDate ? `${format(range[0].startDate, "MM/dd/yyyy")} - ${format(range[0].endDate, "MM/dd/yyyy")}` : ''}
                                className="sm:mx-3 pl-2 h-5 sm:h-10 border rounded items-center border-main-500"
                                placeholder='Select Date Range'
                                onClick={() => setOpen(open => !open)}
                                id="dropdownDate"
                                data-dropdown-toggle="dropdownDate"
                            />
                            <div id="dropdownDate" className={`${open == false ? 'hidden' : 'z-10 w-10 sm:w-44 bg-white rounded divide-y divide-gray-100 shadow absolute'}`} >
                                <div>
                                    <DateRangePicker
                                        onChange={item => setRange([item.selection])}
                                        editableDateInputs={true}
                                        moveRangeOnFirstSelection={false}
                                        ranges={range}
                                        months={2}
                                        direction="horizontal"
                                        className='absolute z-10 mt-5 sm:ml-[-680px] border'
                                    />
                                    <button type='button' className='transition mr-4 bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded-lg py-1 px-2 hover:-translate-y-1 w-36 absolute z-10 mt-[400px] ml-16 border' onClick={() => setOpen(!open)}>Set Date</button>
                                </div>
                            </div>
                        </div>
                        <button type='button' className='transition mr-4 bg-white border border-main-500 focus:ring-main-500 rounded-lg py-1 px-2 hover:-translate-y-1 hover:bg-main-500 w-20 sm:w-30 text-black' onClick={() => {
                            handleFilter()
                        }}>Filter</button>
                        <button type='button' className='transition mr-4 bg-white border border-main-500 focus:ring-main-500 rounded-lg py-1 px-2 hover:-translate-y-1 hover:bg-main-500 w-20 sm:w-30  text-black' onClick={() => {
                            setFilterKey(filterKey + 1)
                            setLoading(true)
                            setRange([{
                                startDate: '',
                                endDate: '',
                                key: 'selection',
                                color: 'teal'
                            }])
                            navigate('/admin/stock_log')
                            setProduct('')
                            getHistory('')
                        }}>Reset</button>
                    </div>
                    <div className={`${history.length == 0 ? 'hidden' : "flex flex-col items-end mr-12"}`}>
                        {/* <!-- Help text --> */}
                        <span className="text-large text-gray-700 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">{page == 1 ? page : (page * 20) - 19}</span> to <span className="font-semibold text-gray-900 dark:text-white">{page * 20 <= count ? page * 20 : count}</span> of <span className="font-semibold text-gray-900 dark:text-white">{count}</span> Entries
                        </span>
                        {/* <!-- Buttons --> */}
                        <div className="inline-flex mt-2 xs:mt-0 divide-x">
                            <button className={`${page == 1 ? "bg-gray-300" : ' bg-main-500 hover:bg-main-700 focus:ring-main-500'} w-20 py-2 px-4 mx-1 text-sm font-medium rounded text-white`} onClick={search && search != '?&' ? () => {
                                setLoading(true)
                                setTimeout(() => setLoading(false), 1000)
                                if (search.includes('page')) {
                                    let add = search.replace(`page=${page}`, `page=${page - 1}`)
                                    navigate(`/admin/stock_log${add}`)
                                    getHistory(add)
                                } else {
                                    navigate(`/admin/stock_log${search}&page=${page - 1}`)
                                    getHistory(`${search}&page=${page - 1}`)
                                }
                                setPage(page - 1)
                            }
                                :
                                () => {
                                    setLoading(true)
                                    setTimeout(() => setLoading(false), 1000)
                                    navigate(`/admin/stock_log?page=${page - 1}`)
                                    getHistory(`?page=${page - 1}`)
                                    setPage(page - 1)
                                }}
                                disabled={page == 1 ? true : false}>
                                Prev
                            </button>
                            <button className={`${page * 20 >= count ? "bg-gray-300" : ' bg-main-500 hover:bg-main-700 focus:ring-main-500'} w-20 py-2 px-4 mx-1 text-sm font-medium rounded text-white`} onClick={search && search != '?&' ? () => {
                                setLoading(true)
                                setTimeout(() => setLoading(false), 1000)
                                if (search.includes('page')) {
                                    let add = search.replace(`page=${page}`, `page=${page + 1}`)
                                    navigate(`/admin/stock_log${add}`)
                                    getHistory(add)
                                } else {
                                    navigate(`/admin/stock_log${search}&page=${page + 1}`)
                                    getHistory(`${search}&page=${page + 1}`)
                                }
                                setPage(page + 1)
                            }
                                :
                                () => {
                                    setLoading(true)
                                    setTimeout(() => setLoading(false), 1000)
                                    navigate(`/admin/stock_log?page=${page + 1}`)
                                    getHistory(`?page=${page + 1}`)
                                    setPage(page + 1)
                                }} disabled={page * 20 >= count ? true : false}>
                                Next
                            </button>
                        </div>
                    </div>
                    <div className="mt-5 bg-white border border-main-500 mr-10 relative shadow-md sm:rounded-lg">
                        <table className="w-full text-xl text-left text-gray-500">
                            <thead className="text-lg text-gray-600 uppercase border border-black">
                                <tr className=' divide-black divide-x'>
                                    <th scope="col" className="py-3 px-3 text-center">
                                        Date
                                    </th>
                                    <th scope="col" className="py-3 pl-6 w-96 text-center">
                                        Product Name
                                    </th>
                                    <th scope="col" className="py-3 px-3 w-32 text-center">
                                        By Who
                                    </th>
                                    <th scope="col" className="py-3 px-3 text-center">
                                        Unit
                                    </th>
                                    <th scope="col" className="py-3 px-3 w-20 text-center">
                                        Quantity
                                    </th>
                                    <th scope="col" className="py-3 px-3 text-center">
                                        Type
                                    </th>
                                    <th scope="col" className="py-3 px-3 text-center">
                                        Information
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {printHistory()}
                            </tbody>
                        </table>
                    </div>
                    <div className={`${history.length == 0 ? 'hidden' : "flex flex-col items-end mr-12"}`}>
                        {/* <!-- Help text --> */}
                        <span className="text-large text-gray-700 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">{page == 1 ? page : (page * 20) - 19}</span> to <span className="font-semibold text-gray-900 dark:text-white">{page * 20 <= count ? page * 20 : count}</span> of <span className="font-semibold text-gray-900 dark:text-white">{count}</span> Entries
                        </span>
                        {/* <!-- Buttons --> */}
                        <div className="inline-flex mt-2 xs:mt-0 divide-x">
                            <button className={`${page == 1 ? "bg-gray-300" : ' bg-main-500 hover:bg-main-700 focus:ring-main-500'} w-20 py-2 px-4 mx-1 text-sm font-medium rounded text-white`} onClick={search && search != '?&' ? () => {
                                setLoading(true)
                                setTimeout(() => setLoading(false), 1000)
                                if (search.includes('page')) {
                                    let add = search.replace(`page=${page}`, `page=${page - 1}`)
                                    navigate(`/admin/stock_log${add}`)
                                    getHistory(add)
                                } else {
                                    navigate(`/admin/stock_log${search}&page=${page - 1}`)
                                    getHistory(`${search}&page=${page - 1}`)
                                }
                                setPage(page - 1)
                            }
                                :
                                () => {
                                    setLoading(true)
                                    setTimeout(() => setLoading(false), 1000)
                                    navigate(`/admin/stock_log?page=${page - 1}`)
                                    getHistory(`?page=${page - 1}`)
                                    setPage(page - 1)
                                }}
                                disabled={page == 1 ? true : false}>
                                Prev
                            </button>
                            <button className={`${page * 20 >= count ? "bg-gray-300" : ' bg-main-500 hover:bg-main-700 focus:ring-main-500'} w-20 py-2 px-4 mx-1 text-sm font-medium rounded text-white`} onClick={search && search != '?&' ? () => {
                                setLoading(true)
                                setTimeout(() => setLoading(false), 1000)
                                if (search.includes('page')) {
                                    let add = search.replace(`page=${page}`, `page=${page + 1}`)
                                    navigate(`/admin/stock_log${add}`)
                                    getHistory(add)
                                } else {
                                    navigate(`/admin/stock_log${search}&page=${page + 1}`)
                                    getHistory(`${search}&page=${page + 1}`)
                                }
                                setPage(page + 1)
                            }
                                :
                                () => {
                                    setLoading(true)
                                    setTimeout(() => setLoading(false), 1000)
                                    navigate(`/admin/stock_log?page=${page + 1}`)
                                    getHistory(`?page=${page + 1}`)
                                    setPage(page + 1)
                                }} disabled={page * 20 >= count ? true : false}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Loading loading={loading} />
    </div>
    )
}

export default HistoryPage