import React from "react";
import NewAddressComponent from "../components/NewAddressModalComp";

const Testing = (props) => {

    const [showNewAddressModal, setShowNewAddressModal] = React.useState('')

    return (
        <div className="container mx-auto py-5">
            <button type='button' onClick={() => setShowNewAddressModal('show')}>Edit</button>
            {
                showNewAddressModal === 'show' ?
                    <NewAddressComponent showModal={setShowNewAddressModal}/>
                    :
                    ""
            }
        </div>
    )
};

export default Testing;