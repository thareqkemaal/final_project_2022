import React from "react";
import { useLocation } from "react-router";

const OrderDetail = (props) => {

    const [orderDetailData, setOrderDetailData] = React.useState([]);

    const { state } = useLocation();

    React.useEffect(() => {
        console.log(state.data)
        setOrderDetailData(state.data)
    }, []);

    return (
        <div>
            <div>ORDER DETAIL</div>
            <div></div>
        </div>
    )
};

export default OrderDetail;