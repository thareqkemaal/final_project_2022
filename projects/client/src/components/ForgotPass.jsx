import React,{useState} from 'react'
import { Modal,Label, TextInput } from 'flowbite-react';

const ForgotPass = () => {
    const [toggle, setToggle]=useState(false)
  return (
    <div>
        <React.Fragment>
            <button onClick={()=>setToggle(!toggle)}  className='hover:underline underline-offset-1'> Forgot password</button>
            <Modal
            show={toggle}
            size='md'
            popup={true}
            onClose={()=>setToggle(!toggle)}
           
            >
            <Modal.Header/>
                <Modal.Body>
                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white font-Public">
                            Enter your email
                        </h3>
                        <div className="mb-2 block font-Public">
                            <Label
                            htmlFor="email"
                            value="Your email"
                            />
                        </div>
                        <TextInput
                        id="email"
                        placeholder="name@company.com"
                        required={true}
                        className='font-Public'
                        />
                        <button className='bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded-lg w-1/2 py-2'>Ok</button>
                    </div>
                </Modal.Body>
                        </Modal>
        </React.Fragment>
    </div>
  )
}

export default ForgotPass