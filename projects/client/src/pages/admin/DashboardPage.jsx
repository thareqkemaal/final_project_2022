import React from "react";
import ProductAdminPage from "./ProductAdminPage";
import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { TbReceipt } from "react-icons/tb";
import { useNavigate } from 'react-router';
import { FcSalesPerformance, FcInTransit, FcTemplate, FcClock, FcBriefcase } from 'react-icons/fc'

const DashboardPage = (page) => {
    const navigate = useNavigate()
    const [active, setActive] = React.useState(2);
    const [open, setOpen] = React.useState(true)

    return <div className="grid grid-flow-col ">

        {/* <div id="side menu" className="border-r border-gray-200" style={{ width: "15vw" }}>
            <div >
                <ul className="text-sm font-medium text-gray-500">
                    <li className="mr-2">
                        {
                            active == 1
                                ?
                                <button type="button" onClick={() => setActive(1)} className="inline-flex p-4 rounded-t-lg border-b-2 text-btn-500 border-btn-500 active group" aria-current="page">
                                    <AiOutlineHome size={20} className="mr-2 w-5 h-5 text-btn-500" />
                                    Dashboard
                                </button>
                                :
                                <button type="button" onClick={() => setActive(1)} className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group">
                                    <AiOutlineHome size={20} className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
                                    Dashboard
                                </button>
                        }
                    </li>
                    <li className="mr-2">
                        {
                            active == 2
                                ?
                                <button type="button" onClick={() => setActive(2)} className="inline-flex p-4 rounded-t-lg border-b-2 text-btn-500 border-btn-500 active group" aria-current="page">
                                    <GiMedicines size={20} className="mr-2 w-5 h-5 text-btn-500" />
                                    Produk
                                </button>
                                :
                                <button type="button" onClick={() => setActive(2)} className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group">
                                    <GiMedicines size={20} className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
                                    Produk
                                </button>
                        }
                    </li>
                    <li className="mr-2">
                        {
                            active == 3
                                ?
                                <button type="button" onClick={() => setActive(3)} className="inline-flex p-4 rounded-t-lg border-b-2 text-btn-500 border-btn-500 active group" aria-current="page">
                                    <TbReceipt size={20} className="mr-2 w-5 h-5 text-btn-500" />
                                    Transaksi
                                </button>
                                :
                                <button type="button" onClick={() => setActive(3)} className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group">
                                    <TbReceipt size={20} className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
                                    Transaksi
                                </button>
                        }
                    </li>
                    <li className="mr-2">
                        {
                            active == 4
                                ?
                                <button type="button" onClick={() => setActive(4)} className="inline-flex p-4 rounded-t-lg border-b-2 text-btn-500 border-btn-500 active group" aria-current="page">
                                    <AiOutlineLineChart size={20} className="mr-2 w-5 h-5 text-btn-500" />
                                    Sales & Revenue
                                </button>
                                :
                                <button type="button" onClick={() => setActive(4)} className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group">
                                    <AiOutlineLineChart size={20} className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
                                    Sales & Revenue
                                </button>
                        }
                    </li>
                </ul>
            </div>
        </div> */}

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

        {/* <div id="active page" style={{ background: "linear-gradient(155.7deg, #D6F5F3 -46%, #F7FCFC 100%, #F1F5FC 118%)", width: "85vw" }}>
            <div className="ml-5 mt-5 md:mr-0"> */}
        {/* { */}
        {/* active == 2 
                        ?
                        <ProductAdminPage/>
                        : */}
        {/* <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis aperiam vitae sequi optio tempora quis ea perferendis ab sit tempore qui sunt illo laudantium, natus, sapiente, voluptatem neque. Placeat, consectetur?
                        </div> */}
        {/* } */}
        {/* { */}
        {/* // active == 3 
                    //     ?
                    //     <EditProductPage/>
                    //     :
                    //     <div>
                    //         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis aperiam vitae sequi optio tempora quis ea perferendis ab sit tempore qui sunt illo laudantium, natus, sapiente, voluptatem neque. Placeat, consectetur?
                    //     </div> */}
        {/* } */}
        {/* </div>
        </div> */}
    </div>
}

export default DashboardPage;