import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import logo from '../assets/medical-logo-removebg-preview.png'
import { FcSalesPerformance, FcInTransit, FcTemplate, FcClock, FcBriefcase } from 'react-icons/fc'
import { useNavigate } from 'react-router';

const AdminComponent = (page) => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(true)
  return (<div>
    <div className='hidden sm:block'>
      <div className={`${open ? "w-80" : "w-20"} p-5 pt-8 h-screen bg-white relative duration-500`}>
        <IoIosArrowBack size={30}
          className={`absolute -right-3 rounded-full cursor-pointer top-9 border-2 duration-300 bg-white  ${!open && "rotate-180"} ring-2 ring-teal-200`}
          onClick={() => setOpen(!open)} />
        <div className='flex gap-x-3 items-center'>
          <img src={logo} className={`h-10 rounded-full cursor-pointer duration-300 ${open && "rotate-[360deg]"}`} alt='medcare.com' />
          <span className={`cursor-pointer origin-center bg-gradient-to-r from-green-500 to-blue-600 text-2xl text-transparent font-extrabold bg-clip-text ${!open && "hidden"}`}>MedCare</span>
        </div>
        <div id="side menu" className="border-r border-gray-200" style={{ width: "15vw" }}>
            <ul className="text-sm font-medium text-gray-500">
                <li className="mr-2">
                    <button className={`${page.page == '/admin/dashboard' ? 'inline-flex p-4 rounded-t-lg border-b-2 text-btn-500 border-btn-500 active group' : 'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group'}`}
                        onClick={() => navigate('/admin/dasboard')}>
                        <FcTemplate size={20} className={`${page.page == '/admin/dashboard' ? 'mr-2 w-5 h-5 text-btn-500' : 'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500'}`} />
                        {/* <AiOutlineHome size={20} className={`${page.page == '/admin/dashboard' ? 'mr-2 w-5 h-5 text-btn-500' : 'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500'}`} /> */}
                        <span className={`${!open && 'hidden'}`}>Dashboard</span>
                    </button>
                </li>

                <li className="mr-2">
                    <button className={`${page.page == '/admin/product' || page.page == '/admin/product/edit' ? 'inline-flex p-4 rounded-t-lg border-b-2 text-btn-500 border-btn-500 active group' : 'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group'}`}
                        onClick={() => navigate('/admin/product')}>
                        {/* <GiMedicines size={20} className={`${page.page == '/admin/product' || page.page == '/admin/product/edit' ? 'mr-2 w-5 h-5 text-btn-500' : 'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500'}`} /> */}
                        <FcBriefcase size={20} className={`${page.page == '/admin/product' || page.page == '/admin/product/edit' ? 'mr-2 w-5 h-5 text-btn-500' : 'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500'}`} />
                        <span className={`${!open && 'hidden'}`}>Product</span>
                    </button>
                </li>

                <li className="mr-2">
                    <button className={`${page.page == '/admin/transaction' ? 'inline-flex p-4 rounded-t-lg border-b-2 text-btn-500 border-btn-500 active group' : 'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group'}`}
                        onClick={() => navigate('/admin/transaction')}>
                        {/* <TbReceipt size={20} className={`${page.page == '/admin/transaction' ? 'mr-2 w-5 h-5 text-btn-500' : 'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500'}`} /> */}
                        <FcInTransit size={20} className={`${page.page == '/admin/transaction' ? 'mr-2 w-5 h-5 text-btn-500' : 'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500'}`} />
                        <span className={`${!open && 'hidden'}`}>Transaction</span>
                    </button>
                </li>

                <li className="mr-2">
                    <button className={`${page.page == '/admin/report' ? 'inline-flex p-4 rounded-t-lg border-b-2 text-btn-500 border-btn-500 active group' : 'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group'}`}
                        onClick={() => navigate('/admin/report')}>
                        {/* <AiOutlineLineChart size={20} className={`${page.page == '/admin/report' ? 'mr-2 w-5 h-5 text-btn-500' : 'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500'}`} /> */}
                        <FcSalesPerformance size={20} className={`${page.page == '/admin/report' ? 'mr-2 w-5 h-5 text-btn-500' : 'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500'}`} />
                        <span className={`${!open && 'hidden'}`}>Sales Report</span>
                    </button>
                </li>

                <li className="mr-2">
                    <button className={`${page.page == '/admin/stock_log' ? 'inline-flex p-4 rounded-t-lg border-b-2 text-btn-500 border-btn-500 active group' : 'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group'}`}
                        onClick={() => navigate('/admin/stock_log')}>
                        <FcClock size={20} className={`${page.page == '/admin/stock_log' ? 'mr-2 w-5 h-5 text-btn-500' : 'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500'}`} />
                        <span className={`${!open && 'hidden'}`}>Product History</span>
                    </button>
                </li>
            </ul>
        </div>
        {/* <ul className='pt-10 mx-1'>
          <li className={`${page.page == '/admin/dashboard' ? 'underline decoration-wavy' : 'no-underline'} font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-5`}
            onClick={() => navigate('/admin/dasboard')}
          >
            <FcTemplate size={30} className={`duration-300 ${open && "rotate-[360deg]"}`} />
            <span className={`${!open && 'hidden'}`}>Dashboard</span>
          </li>
          <li className={`${page.page == '/admin/product' || page.page == '/admin/product/edit' ? 'underline decoration-wavy' : 'no-underline'} font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}
            onClick={() => navigate('/admin/product')}
          >
            <FcBriefcase size={30} className={`duration-300 ${open && "rotate-[360deg]"}`} />
            <span className={`${!open && 'hidden'}`}>Product</span>
          </li>
          <li className={`${page.page == '/admin/transaction' ? 'underline decoration-wavy' : 'no-underline'} font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}
            onClick={() => navigate('/admin/transaction')}
          >
            <FcInTransit size={30} className={`duration-300 ${open && "rotate-[360deg]"}`} />
            <span className={`${!open && 'hidden'}`}>Transaction</span>
          </li>
          <li className={`${page.page == '/admin/report' ? 'underline decoration-wavy' : 'no-underline'} font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}
            onClick={() => navigate('/admin/report')}
          >
            <FcSalesPerformance size={30} className={`duration-300 ${open && "rotate-[360deg]"}`} />
            <span className={`${!open && 'hidden'}`}>Sales Report</span>
          </li>
          <li className={`${page.page == '/admin/stock_log' ? 'underline decoration-wavy' : 'no-underline'} font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}
            onClick={() => navigate('/admin/stock_log')}
          >
            <FcClock size={30} className={`duration-300 ${open && "rotate-[360deg]"}`} />
            <span className={`${!open && 'hidden'}`}>Product History</span>
          </li>
        </ul> */}
      </div>
    </div>
    <div className='sm:hidden w-20'>
      <div className={`p-5 pt-8 h-screen bg-teal-200 relative`}>
        <img src={logo} className={`h-10 rounded-full cursor-pointer`} alt='medcare.com' />
        <ul className='pt-16 mx-1'>
          <li className={`font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-5`}>
            <FcTemplate size={30} />
          </li>
          <li className={`font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}>
            <FcBriefcase size={30} />
          </li>
          <li className={`font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}>
            <FcInTransit size={30} />
          </li>
          <li className={`font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}>
            <FcSalesPerformance size={30} />
          </li>
          <li className={`font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}>
            <FcClock size={30} />
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default AdminComponent