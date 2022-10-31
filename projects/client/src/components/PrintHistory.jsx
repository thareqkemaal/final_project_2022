import React from 'react'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const PrintHistoryComponent = (data) => {
    const componentRef = useRef()

    const printHistory = () => {
        return data.data.map((val, idx) => {
            return <tr className='border border-black divide-black divide-x'>
                <th scope="col" className="py-3 px-3 text-sm text-center">
                    {val.date}
                </th>
                <th scope="col" className="py-3 px-3 text-sm text-center">
                    {val.product_name}
                </th>
                <th scope="col" className="py-3 px-3 text-sm text-center">
                    {val.username}
                </th>
                <th scope="col" className="py-3 px-3 text-sm text-center">
                    {val.unit}
                </th>
                <th scope="col" className="py-3 px-3 text-sm text-center">
                    {val.quantity}
                </th>
                <th scope="col" className="py-3 px-3 text-sm text-center">
                    {val.type}
                </th>
                <th scope="col" className="py-3 px-3 text-sm text-center">
                    {val.information}
                </th>
            </tr>
        })
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Stock Log',
        onAfterPrint: () => 'Print Success'
    })

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
                    <p className="text-3xl text-center font-bold mt-5 mb-3 text-txt-500">Stock Log</p>
                </div>
                <div className='mx-5 my-5'>
                    <div className="mt-5 mr-3 bg-white">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-sm sm:text-lg text-gray-600 uppercase border border-black">
                                <tr className=' divide-black divide-x'>
                                    <th scope="col" className="py-3 px-3 text-sm text-center">
                                        Date
                                    </th>
                                    <th scope="col" className="py-3 px-3 text-sm text-center">
                                        Product Name
                                    </th>
                                    <th scope="col" className="py-3 px-3 text-sm text-center">
                                        By Who
                                    </th>
                                    <th scope="col" className="py-3 px-3 text-sm text-center">
                                        Unit
                                    </th>
                                    <th scope="col" className="py-3 px-3 text-sm text-center">
                                        Quantity
                                    </th>
                                    <th scope="col" className="py-3 px-3 text-sm text-center">
                                        Type
                                    </th>
                                    <th scope="col" className="py-3 px-3 text-sm text-center">
                                        Information
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {printHistory()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default PrintHistoryComponent