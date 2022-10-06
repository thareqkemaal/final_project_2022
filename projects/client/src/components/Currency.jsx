import React from 'react'

const Currency = (props) => {
    return (
        <div className='ml-2'>Rp{props.price.toLocaleString('id')}</div>
    )
};

export default Currency;