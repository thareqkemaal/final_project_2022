import React,{useState} from 'react'
import { Modal,Label, TextInput } from 'flowbite-react';
import axios from 'axios'
import { API_URL } from '../helper';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


const ForgotPass = () => {
    const [toggle, setToggle]=useState(false)
    const [loading,setLoading]=useState(false)
    const [message, setMessage]=useState('')

    const [email, setEmail]=useState('')

    const onSendResetPass = ()=>{
        setLoading(true)
        axios.post(API_URL+`/api/user/send-reset`,{
            email:email
        }).then((res)=>{
            setLoading(false)
            setEmail('')
            setMessage('Success Please cek your email')
        }).catch((err)=>{
            setLoading(false)
            setMessage(err.response.data.message)
        })
    }
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
                        <div className="block font-Public">
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
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <div>
                            <p className={`${message === 'Success Please cek your email'?'text-green-500':'text-red-500'} text-center`}>{message}</p>
                        </div>
                        <button className='bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded-lg w-full py-2 disabled:cursor-not-allowed' onClick={onSendResetPass} disabled={loading}>
                            {
                                loading ?
                                <div className='flex justify-center'>
                                <AiOutlineLoading3Quarters className='animate-spin mt-1 mr-2'/>
                                <p className='font-bold'>Processing</p>
                                </div>
                                :
                            'Submit'
                            }
                        </button>
                    </div>
                </Modal.Body>
                        </Modal>
        </React.Fragment>
    </div>
  )
}

export default ForgotPass