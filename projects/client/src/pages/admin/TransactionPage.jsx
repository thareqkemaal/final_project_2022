import React from 'react'
import axios from 'axios'
import AdminComponent from '../../components/AdminComponent'
import Loading from '../../components/Loading'
import { BiSearchAlt2, BiDetail } from 'react-icons/bi';
import { BsFillChatDotsFill, BsClock, BsChevronDown } from 'react-icons/bs'
import { MdOutlinePayments, MdOutlineHideImage } from 'react-icons/md'
import { IoIosArrowDown } from "react-icons/io";
import { API_URL } from '../../helper';
import { DateRangePicker } from 'react-date-range'
import format from 'date-fns/format'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import background from './../../assets/background.png'
import Currency from '../../components/Currency';

const TransactionPages = () => {
  const [defaultSort, setDefaultSort] = React.useState('Date')
  const [loading, setLoading] = React.useState(true)
  const [drop, setDrop] = React.useState(true)
  const [filterKey, setFilterKey] = React.useState(0)
  const [transaction, setTransaction] = React.useState([])
  const [filterTransaction, setFilterTransaction] = React.useState([])
  const [allTransaction, setAllTransaction] = React.useState([])
  const [selectedStatus, setSelectedStatus] = React.useState(3456789)
  const [isFilter, setIsFilter] = React.useState(false)
  const [invoice, setInvoice] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [modalDetail, setModalDetail] = React.useState('')
  const [modalPayment, setModalPayment] = React.useState('')
  const [modalAccept, setModalAccept] = React.useState('')

  const [range, setRange] = React.useState([
    {
      startDate: '',
      endDate: '',
      key: 'selection',
      color: 'teal'
    }
  ])
  const [startPage, setStartPage] = React.useState(0)
  const [endPage, setEndPage] = React.useState(4)
  const [status1, setStatus1] = React.useState(true)
  const [status2, setStatus2] = React.useState(false)
  const [status3, setStatus3] = React.useState(false)
  const [status4, setStatus4] = React.useState(false)
  const [status5, setStatus5] = React.useState(false)
  const [status6, setStatus6] = React.useState(false)

  const getTrans = () => {
    axios.get(API_URL + `/api/transaction/all`)
      .then((res) => {
        setTransaction(res.data)
        setAllTransaction(res.data)
        setTimeout(() => setLoading(false), 1000)
      }).catch((err) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    getTrans()
  }, [])

  const printTrans = () => {
    return transaction.map((val, idx) => {
      if (idx >= startPage && idx <= endPage) {
        return <div key={val.idtransaction} className='bg-white border border-teal-300 my-5 mr-10 rounded-2xl divide-y divide-teal-100'>
          <div className='grid ml-5 mt-3 grid-cols-12'>
            <p className='text-xl font-bold mr-5 col-span-2'>{val.status_id == 3 || val.status_id == 4 || val.status_id == 5 ? 'New Order'
              : `${val.status_id == 6 ? 'Ready To Ship'
                : `${val.status_id == 7 ? 'Order Canceled'
                  : `${val.status_id == 8 ? 'In Delivery'
                    : 'Order Completed'}`}`}`} </p>
            <p className='text-xl font-semibold mx-5 col-span-2'>{val.invoice_number}</p>
            <p className='text-xl font-thin flex items-center col-span-2'><BsClock className='mr-2 opacity-50' /> {val.date_order} WIB</p>
          </div>
          <div className='ml-5 grid grid-cols-5 gap-0'>
            <div className='flex col-span-2'>
              <div className='w-36 px-4 pb-3 bg-white rounded-lg border border-gray-200 overflow-hidden mt-3'>
                <img class="w-full h-auto rounded my-3" src={val.prescription_pic ? val.prescription_pic : val.detail[0].product_image} alt="image description" />
              </div>
              <div className='my-3 mx-5'>
                <p className='font-bold text-lg'>{val.prescription_pic ? 'Resep Dokter' : val.detail[0].product_name}</p>
                <button type='button' className={`${val.prescription_pic ? 'text-md transition mt-3 p-1 bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded  hover:-translate-y-1 w-44' : 'hidden'}`}>Make Recipe's Copy</button>
                <div className={`${val.prescription_pic ? 'hidden' : ''}`}>
                  <p className='font-thin text-lg flex'>{val.detail[0].product_qty} x <Currency price={val.detail[0].product_price} /></p>
                  <button type='button' className='my-5 text-teal-500 flex items-center text-lg' onClick={() => setModalDetail(val)}>see {val.detail.length - 1} more medicine <BsChevronDown className='ml-1  mt-1' /> </button>
                </div>
              </div>
            </div>
            <div className='my-3'>
              <p className='font-bold text-lg'>Customer</p>
              <p className='font-thin text-lg'>{val.user_name}</p>
            </div>
            <div className='my-3'>
              <p className='font-bold text-lg'>Address</p>
              <p className='font-thin text-lg'>{val.user_address}</p>
            </div>
            <div className='my-3'>
              <p className='font-bold text-lg'>Courier</p>
              <p className='font-thin text-lg'>{val.shipping_courier}</p>
            </div>
          </div>
          <div className='bg-teal-100 flex justify-between rounded ml-5 mr-10 my-5 h-10'>
            <p className='items-center pl-2 pt-1 font-semibold text-xl'>Total</p>
            <p className='items-center pr-2 pt-1 font-semibold text-xl'>Rp{(val.total_price + val.delivery_price).toLocaleString('id')}</p>
          </div>
          <div className='flex m-5 justify-between'>
            <div className='flex'>
              <p className='mt-5 text-lg text-teal-500 font-semibold flex items-center'><BsFillChatDotsFill className='mr-2' /> Chat Customer</p>
              <button className='mt-5 text-lg text-teal-500  font-semibold flex ml-10 items-center' data-modal-toggle="detailModal" onClick={() => setModalDetail(val)}><BiDetail className='mr-2' />Order Detail</button>
              <button className='mt-5 text-lg text-teal-500  font-semibold flex ml-10 items-center' data-modal-toggle="paymentModal" onClick={() => setModalPayment(val)}><MdOutlinePayments className='mr-2' />Check Payment</button>
            </div>
            <div id="detailModal" tabindex="-1" aria-hidden='true' className={`${modalDetail ? "pl-[35%] pt-[5%] backdrop-blur-sm overflow-x-hidden fixed z-30 justify-center w-full md:inset-0" : "hidden"} `}>
              {modalDetail ?
                <div className=" overflow-y-hidden w-full max-w-3xl border rounded-lg max-h-[48rem]" >
                  {/* <!-- Modal content --> */}
                  <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center p-4 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white ml-[37%]">
                        Order Detail
                      </h3>
                      <button type="button" onClick={() => setModalDetail('')} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="detailModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className='ml-5 mt-3 border-b'>
                      <p className='text-large font-bold mr-5 my-3'>{modalDetail.status_id == 3 || modalDetail.status_id == 4 || modalDetail.status_id == 5 ? 'New Order'
                        : `${modalDetail.status_id == 6 ? 'Ready To Ship'
                          : `${modalDetail.status_id == 7 ? 'Order Canceled'
                            : `${modalDetail.status_id == 8 ? 'In Delivery'
                              : 'Order Completed'}`}`}`}  </p>
                      <div className='flex justify-between my-3 mr-3'>
                        <p className='text-large font-bold'>No. Invoice</p>
                        <p className='text-large text-main-500 font-bold'>{modalDetail.invoice_number}</p>
                      </div>
                      <div className='flex justify-between my-3 mr-3'>
                        <p className='text-large font-bold'>Transaction Date</p>
                        <p className='text-large font-thin flex items-center'> {modalDetail.date_order} WIB</p>
                      </div>
                    </div>
                    <div className='overflow-hide-modal scroll'>
                      <div className="items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <p className='text-xl font-bold'>Product Detail</p>
                        {modalDetail.detail ? modalDetail.detail.map((val, idx) => {
                          return <div key={val.idtransaction_detail} className='bg-white border border-teal-300 my-5 mr-10 rounded-2xl '>
                            <div className='flex divide-x divide-dashed justify-between '>
                              <div className='flex'>
                                <div className='w-36 px-4 pb-3 bg-white rounded-lg border border-gray-200 mt-3'>
                                  <img className="w-full h-auto rounded my-3" src={modalDetail.prescription_pic ? modalDetail.prescription_pic : val.product_image} alt="image description" />
                                </div>
                                <div className='my-3 mx-5'>
                                  <p className='font-bold text-large'>{val.product_name}</p>
                                  <p className='font-thin text-large flex'> {val.product_qty} x <Currency price={val.product_price} /></p>
                                </div>
                              </div>
                              <div className='px-10 pt-3'>
                                <p className='text-large ml-2'>Total</p>
                                <p className='font-bold text-large'><Currency price={(val.product_qty * val.product_price)} /></p>
                              </div>
                            </div>
                          </div>
                        }) : null
                        }
                      </div>
                      <div class="items-center p-6 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <p className='text-xl font-bold'>Delivery Detail</p>
                        <div className='my-3 grid grid-cols-10'>
                          <p className='font-thin text-large'>Purchaser</p>
                          <p>:</p>
                          <p className='font-bold text-large ml-[-50px] col-span-4'>{modalDetail.user_name}</p>
                        </div>
                        <div className='my-3 grid grid-cols-10'>
                          <p className='font-thin text-large'>Address</p>
                          <p>:</p>
                          <p className='font-bold text-large ml-[-50px] col-span-4'>{modalDetail.user_address}</p>
                        </div>
                        <div className='my-3 grid grid-cols-10'>
                          <p className='font-thin text-large'>Courier</p>
                          <p className='ml-9'>:</p>
                          <p className='font-bold text-large ml-[-50px] col-span-4'>{modalDetail.shipping_courier}</p>
                        </div>
                      </div>
                      <div class="items-center p-6 rounded-b border-t border-gray-200 dark:border-gray-600 divide-y divide-dashed">
                        <p className='text-xl font-bold'>Total Transaction</p>
                        <div className='my-3 pt-3 flex justify-between items-center'>
                          <p className='font-thin text-large'>Payment Method</p>
                          <p className='font-semibold text-large'>Transfer</p>
                        </div>
                        <div>
                          <div className='my-3 flex justify-between'>
                            <p className='font-thin text-large'>Total Cart</p>
                            <p className='font-semibold text-large '><Currency price={modalDetail.total_price} /></p>
                          </div>
                          <div className='my-3 flex justify-between'>
                            <p className='font-thin text-large'>Delivery Price</p>
                            <p className='font-semibold text-large '><Currency price={modalDetail.delivery_price} /></p>
                          </div>
                        </div>
                        <div className='my-3 pt-3 flex justify-between'>
                          <p className='font-semibold text-large'>Total Price</p>
                          <p className='font-bold text-large'><Currency price={(modalDetail.delivery_price + modalDetail.total_price)} /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                : null}
            </div>
            <div id="PaymentModal" tabindex="-1" aria-hidden='true' className={`${modalPayment ? "pl-[35%] pt-[5%] backdrop-blur-sm overflow-x-hidden fixed z-30 justify-center w-full md:inset-0" : "hidden"} `}>
              {modalPayment ?
                <div className=" overflow-y-hidden w-full max-w-3xl border rounded-lg max-h-[48rem]" >
                  {/* <!-- Modal content --> */}
                  <div className="rounded-lg shadow dark:bg-gray-700 bg-gray-200">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center p-4 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white ml-[43%]">
                        Payment
                      </h3>
                      <button type="button" onClick={() => setModalPayment('')} className="text-gray-400 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="detailModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    {modalPayment.payment_proof_pic ?
                      <div className='mt-3'>
                        <img src={modalPayment.payment_proof_pic.includes('https') ? modalPayment.payment_proof_pic : API_URL + modalPayment.payment_proof_pic} className='max-w-lg max-h-lg mx-auto' alt='user_payment' />
                        <div className='mt-5 flex justify-center border-t text-2xl'>
                          <p className='font-semibold my-5'>Total to be paid</p>
                          <p className='font-bold my-5'><Currency price={(modalPayment.delivery_price + modalPayment.total_price)} /></p>
                        </div>
                      </div>
                      :
                      <div className='mt-36 my-auto items-center justify-center h-[20rem]'>
                        <MdOutlineHideImage className='mx-auto text-center' size={100} />
                        <p className='sm:text-3xl font-bold mt-5 mb-3 text-center'>Customer has not uploaded proof of payment</p>
                      </div>
                    }
                  </div>
                </div>
                : null}
            </div>
            <div className='flex'>
              <p className='mt-5 text-lg mr-10 font-semibold text-teal-500 flex'>{val.status_id == 3 || val.status_id == 4 || val.status_id == 5 ? 'Reject Order' : ''}</p>
              <button type='button'
                className={`${val.status_id == 7 || val.status_id == 9 ? 'hidden' : ''} ${val.status_id == 3 || val.status_id == 4 ? 'bg-gray-300' : ' bg-main-500 hover:bg-main-700 focus:ring-main-500 hover:-translate-y-1'} text-lg transition mt-4 p-1 mr-5 font-semibold text-white rounded w-44`}
                disabled={val.status_id == 3 || val.status_id == 4 ? true : false}
                onClick={val.status_id == 8 ? () => setModalDetail(val) : val.status_id == 5 ? () => setModalAccept(val) : {}}
              >
                {val.status_id == 6 ? 'Ask For Pickup' : `${val.status_id == 8 ? 'See Detail' : 'Accept Order'}`}
              </button>
            </div>
            <div id="AcceptModal" tabindex="-1" aria-hidden='true' className={`${modalAccept ? "pl-[35%] pt-[5%] backdrop-blur-sm overflow-x-hidden fixed z-30 justify-center w-full md:inset-0" : "hidden"} `}>
              {modalAccept ?
                <div className="overflow-y-hidden w-full max-w-3xl border rounded-lg max-h-[48rem]" >
                  {/* <!-- Modal content --> */}
                  <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center p-4 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white ml-[37%]">
                        Accept Order
                      </h3>
                      <button type="button" onClick={() => setModalAccept('')} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="detailModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className='flex ml-5 mt-3'>
                      <p className='text-xl font-bold mr-5'>{modalAccept.user_name}</p>
                      <p className='font-thin mr-5'>/</p>
                      <p className='text-xl font-semibold mr-5'>{modalAccept.invoice_number}</p>
                      <p className='font-thin mr-5'>/</p>
                      <p className='text-xl font-thin flex items-center'><BsClock className='mr-2 opacity-50' /> {modalAccept.date_order} WIB</p>
                    </div>
                    <div className='my-3 mx-5'>
                      <p className='font-bold text-lg'>{modalAccept.prescription_pic ? 'Resep Dokter' : modalAccept.detail[0].product_name}</p>
                      <button type='button' className={`${modalAccept.prescription_pic ? 'text-md transition mt-3 p-1 bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded  hover:-translate-y-1 w-44' : 'hidden'}`}>Make Recipe's Copy</button>
                      <div className={`${modalAccept.prescription_pic ? 'hidden' : ''}`}>
                        <p className='font-thin text-lg flex'>{modalAccept.detail[0].product_qty} x <Currency price={modalAccept.detail[0].product_price} /></p>
                        <button type='button' className='mb-5 text-teal-500 flex items-center text-lg'>see {modalAccept.detail.length - 1} more medicine <BsChevronDown className='ml-1  mt-1' /> </button>
                      </div>
                    </div>
                    <div className='bg-teal-100 flex justify-between rounded ml-5 mr-5 my-5 h-10'>
                      <p className='items-center pl-2 pt-1 font-semibold text-xl'>Total</p>
                      <p className='items-center pr-2 pt-1 font-semibold text-xl'>Rp{(val.total_price + val.delivery_price).toLocaleString('id')}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p />
                      <button type='button' className='bg-main-500 hover:bg-main-700 focus:ring-main-500 hover:-translate-y-1 text-lg transition my-4 p-1 mr-5 font-semibold text-white rounded w-44'>Accept Order</button>
                    </div>
                  </div>
                </div>
                : null}
            </div>
          </div>
        </div>
      }
    })
  }

  const handleStatus = (status, firstSubmit) => {
    setStartPage(0)
    setEndPage(4)
    setLoading(true)
    let result = []
    if (firstSubmit) {
      result = firstSubmit.filter((val) => status.toString().includes(val.status_id.toString()))
    } else if (isFilter) {
      result = filterTransaction.filter((val) => status.toString().includes(val.status_id.toString()))
      console.log('ini dari filter', result)
    } else {
      result = allTransaction.filter((val) => status.toString().includes(val.status_id.toString()))
      console.log('ini dari all', result)
    }
    setTransaction(result)
    setTimeout(() => setLoading(false), 1000)
  }

  const handleFilter = () => {
    setIsFilter(true)
    setStartPage(0)
    setEndPage(4)
    setLoading(true)
    let filter = ''
    if (range[0].startDate && range[0].startDate) {
      filter = {
        invoice_number: invoice,
        start: range[0].startDate.toLocaleDateString("en-CA"),
        end: new Date(range[0].endDate.getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString("en-CA")
      }
    } else {
      filter = {
        invoice_number: invoice
      }
    }

    let filterArray = []
    for (const key in filter) {
      if (filter[key]) {
        filterArray.push(`${key}=${filter[key]}`)
      }
    }
    console.log(filterArray)
    axios.get(API_URL + `/api/transaction/all?${filterArray.join('&')}`)
      .then((res) => {
        setFilterTransaction(res.data)
        handleStatus(selectedStatus, res.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  return (<div className={`${loading || modalDetail || modalPayment ? 'overflow-hide scroll ' : ""}`}  >
    <div className='flex'>
      <AdminComponent page={window.location.pathname} />
      <div className='w-screen' style={{ background: "linear-gradient(155.7deg, #D6F5F3 -46%, #F7FCFC 100%, #F1F5FC 118%)" }}>
        <div className='ml-5 '>
          <p className="sm:text-2xl font-bold mt-5 mb-3 text-txt-500">Order List</p>
          <div className='sm:flex relative mt-5 sm:mt-20'>
            <input placeholder='Invoice Number' id='invoice' key={filterKey} className='w-60 sm:w-96 h-5sm:h-10 border border-teal-500 rounded-lg px-3 sm:px-10' onChange={(e) => setInvoice(e.target.value)} />
            <BiSearchAlt2 className='absolute left-2 top-2 fill-slate-500 hidden sm:block' size={25} />
            <div className="sm:ml-10 mt-2 sm:mt-0 sm:flex items-center">
              <span className="sm:text-xl mr-5">Sort</span>
              <div className='inline'>
                <button onClick={() => setDrop(!drop)} id="dropdownDefault" data-dropdown-toggle="dropdown"
                  className="border rounded-lg text-gray-400 bg-white hover:bg-gray-400 hover:text-white font-medium w-44 pl-2 h-5 sm:h-10 text-center inline-flex justify-between items-center" type="button">
                  {defaultSort}
                  <IoIosArrowDown />
                </button>
                {/* <!-- Dropdown menu --> */}
                <div id="dropdown" className={`${drop == true ? 'hidden' : 'z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow absolute'}`} >
                  <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdownDefault">
                    <li>
                      <button className="block py-2 pl-4 pr-32 hover:bg-gray-100" onClick={() => {
                        setDefaultSort('Date')
                        setTransaction(transaction.reverse())
                        setDrop(true)
                      }}>Date</button>
                    </li>
                    <li>
                      <button className="block py-2 pl-4 pr-24 hover:bg-gray-100" onClick={() => {
                        setDefaultSort('Invoice ID')
                        setTransaction(transaction.reverse())
                        setDrop(true)
                      }}>Invoice ID</button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='sm:ml-5 mt-3 sm:mt-0 flex items-center'>
                <input
                  value={range[0].startDate ? `${format(range[0].startDate, "MM/dd/yyyy")} - ${format(range[0].endDate, "MM/dd/yyyy")}` : ''}
                  className="sm:mx-3 pl-2 h-5 sm:h-10 border rounded items-center"
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
              <button type='button' className='transition mr-4 bg-white border border-main-500 focus:ring-main-500 text-main-500 rounded-lg py-1 px-2 hover:-translate-y-1 hover:bg-main-500 w-20 sm:w-30 text-black' onClick={() => {
                handleFilter()
              }}>Filter</button>
              <button type='button' className='transition mr-4 bg-white border border-main-500 focus:ring-main-500 text-main-500 rounded-lg py-1 px-2 hover:-translate-y-1 hover:bg-main-500 w-20 sm:w-30  text-black' onClick={() => {
                setIsFilter(false)
                setStartPage(0)
                setEndPage(4)
                setFilterKey(filterKey + 1)
                setInvoice('')
                setLoading(true)
                setRange([{
                  startDate: '',
                  endDate: '',
                  key: 'selection',
                  color: 'teal'
                }])
                handleStatus(selectedStatus, allTransaction)
              }}>Reset</button>
            </div>
          </div>
          <div className='flex mt-5'>
            <p className="sm:text-xl font-bold mb-3 mr-5 mt-1">Status</p>
            <div className='w-20 sm:w-full flex'>
              <button
                className={`${status1 ? "bg-main-500 text-white" : "bg-white text-gray-400"} border-teal-500 rounded-lg  hover:bg-main-500 hover:text-white text-sm sm:text-base font-medium w-36 h-10 text-center items-center mx-3`} onClick={() => {
                  setStatus1(true)
                  setStatus2(false)
                  setStatus3(false)
                  setStatus4(false)
                  setStatus5(false)
                  setStatus6(false)
                  setSelectedStatus(3456789)
                  handleStatus(3456789)
                }} type="button">
                All Orders
              </button>
              <button
                className={`${status2 ? "bg-main-500 text-white" : "bg-white text-gray-400"} border-teal-500 rounded-lg  hover:bg-main-500 hover:text-white font-medium w-36 h-10 text-center items-center mx-3`} onClick={() => {
                  setStatus1(false)
                  setStatus2(true)
                  setStatus3(false)
                  setStatus4(false)
                  setStatus5(false)
                  setStatus6(false)
                  setSelectedStatus(345)
                  handleStatus(345)
                }} type="button">
                New Order
              </button>
              <button
                className={`${status3 ? "bg-main-500 text-white" : "bg-white text-gray-400"} border-teal-500 rounded-lg  hover:bg-main-500 hover:text-white font-medium w-36 h-10 text-center items-center mx-3`} onClick={() => {
                  setStatus1(false)
                  setStatus2(false)
                  setStatus3(true)
                  setStatus4(false)
                  setStatus5(false)
                  setStatus6(false)
                  setSelectedStatus(6)
                  handleStatus(6)
                }} type="button">
                Ready To Ship
              </button>
              <button
                className={`${status4 ? "bg-main-500 text-white" : "bg-white text-gray-400"} border-teal-500 rounded-lg  hover:bg-main-500 hover:text-white font-medium w-36 h-10 text-center items-center mx-3`} onClick={() => {
                  setStatus1(false)
                  setStatus2(false)
                  setStatus3(false)
                  setStatus4(true)
                  setStatus5(false)
                  setStatus6(false)
                  setSelectedStatus(8)
                  handleStatus(8)
                }} type="button">
                In Delivery
              </button>
              <button
                className={`${status5 ? "bg-main-500 text-white" : "bg-white text-gray-400"} border-teal-500 rounded-lg  hover:bg-main-500 hover:text-white font-medium w-36 h-10 text-center items-center mx-3`} onClick={() => {
                  setStatus1(false)
                  setStatus2(false)
                  setStatus3(false)
                  setStatus4(false)
                  setStatus5(true)
                  setStatus6(false)
                  setSelectedStatus(9)
                  handleStatus(9)
                }} type="button">
                Order Completed
              </button>
              <button
                className={`${status6 ? "bg-main-500 text-white" : "bg-white text-gray-400"} border-teal-500 rounded-lg hover:bg-main-500 hover:text-white font-medium w-36 h-10 text-center items-center mx-3`} onClick={() => {
                  setStatus1(false)
                  setStatus2(false)
                  setStatus3(false)
                  setStatus4(false)
                  setStatus5(false)
                  setStatus6(true)
                  setSelectedStatus(7)
                  handleStatus(7)
                }} type="button">
                Order Canceled
              </button>
            </div>
          </div>
          <div className={`${transaction.length == 0 ? 'hidden' : "flex flex-col items-end mb-5 mr-12"}`}>
            {/* <!-- Help text --> */}
            <span className="text-large text-gray-700 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{startPage + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{endPage < transaction.length ? endPage + 1 : transaction.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{transaction.length}</span> Entries
            </span>
            {/* <!-- Buttons --> */}
            <div className="inline-flex mt-2 xs:mt-0 divide-x">
              <button className={`${startPage < 1 ? "bg-gray-300" : ' bg-main-500 hover:bg-main-700 focus:ring-main-500'} w-20 py-2 px-4 mx-1 text-sm font-medium rounded text-white`} onClick={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 1000)
                setStartPage(startPage - 5)
                setEndPage(endPage - 5)
              }}
                disabled={startPage < 1 ? true : false}>
                Prev
              </button>
              <button className={`${endPage >= transaction.length ? "bg-gray-300" : ' bg-main-500 hover:bg-main-700 focus:ring-main-500'} w-20 py-2 px-4 mx-1 text-sm font-medium rounded text-white`} onClick={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 1000)
                setStartPage(startPage + 5)
                setEndPage(endPage + 5)
              }} disabled={endPage >= transaction.length ? true : false}>
                Next
              </button>
            </div>
          </div>
          <div>
            <div className={`${transaction.length == 0 ? 'items-center text-center mt-20' : 'hidden'}`}>
              <img src={background} className='mx-auto my-auto items-center w-[50%] h-auto rounded-full' />
              <p className="sm:text-3xl font-bold mt-5 mb-3 text-txt-500 mx-auto"> No Order Yet  </p>
            </div>
            {printTrans()}
          </div>
        </div>
        <div className={`${transaction.length == 0 ? 'hidden' : "flex flex-col items-end mb-5 mr-12"}`}>
          {/* <!-- Help text --> */}
          <span className="text-large text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{startPage + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{endPage < transaction.length ? endPage + 1 : transaction.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{transaction.length}</span> Entries
          </span>
          {/* <!-- Buttons --> */}
          <div className="inline-flex mt-2 xs:mt-0 divide-x">
            <button className={`${startPage < 1 ? "bg-gray-300" : ' bg-main-500 hover:bg-main-700 focus:ring-main-500'} w-20 py-2 px-4 mx-1 text-sm font-medium rounded text-white`} onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 1000)
              setStartPage(startPage - 5)
              setEndPage(endPage - 5)
            }}
              disabled={startPage < 1 ? true : false}>
              Prev
            </button>
            <button className={`${endPage >= transaction.length ? "bg-gray-300" : ' bg-main-500 hover:bg-main-700 focus:ring-main-500'} w-20 py-2 px-4 mx-1 text-sm font-medium rounded text-white`} onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 1000)
              setStartPage(startPage + 5)
              setEndPage(endPage + 5)
            }} disabled={endPage >= transaction.length ? true : false}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    <Loading loading={loading} />
  </div>
  )
}

export default TransactionPages