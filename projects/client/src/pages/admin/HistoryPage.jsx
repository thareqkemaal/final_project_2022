import React from 'react'
import axios from 'axios'
import { API_URL } from '../../helper';
import AdminComponent from '../../components/AdminComponent'
import Loading from '../../components/Loading'

const HistoryPage = () => {
    const [loading, setLoading] = React.useState(false)

    return (<div >
        {loading ?
            <Loading loading={loading} />
            :
            <div>
                <div className='flex'>
                    <AdminComponent page={window.location.pathname} />
                    <div className='w-screen' style={{ background: "linear-gradient(155.7deg, #D6F5F3 -46%, #F7FCFC 100%, #F1F5FC 118%)" }}>
                        <div className='ml-5'>
                            <p className="sm:text-2xl font-bold mt-5 mb-3 text-txt-500">Stock History</p>
                            <p className="sm:text-xl font-semibold mt-5 mb-3 text-txt-500">Last Update {new Date().toLocaleString('en-CA')}</p>

                        </div>
                    </div>
                </div>
                <Loading loading={loading} />
            </div>
        }
    </div>
    )
}

export default HistoryPage