import React from "react";

const Currency = (props) => {

    return (
        <div>Rp{props.price.toLocaleString('id')}</div>
    )
};

export default Currency;