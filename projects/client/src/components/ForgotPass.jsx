import React,{useState} from 'react'
import { Modal,Label, TextInput } from 'flowbite-react';
import axios from 'axios'
import { API_URL } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';

const ForgotPass = () => {
    const [toggle, setToggle]=useState(false)
    const [loading,setLoading]=useState(false)

    const [email, setEmail]=useState('')

    const onSendResetPass = ()=>{
        setLoading(true)
        axios.post(API_URL+`/api/user/send-reset`,{
            email:email
        }).then((res)=>{
            setLoading(false)
            setToggle(false)
            setEmail('')
            toast.success('Success', {
                theme: "colored",
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
            
        }).catch((err)=>{
            setLoading(false)
            toast.error(`${err.response.data.message}`, {
                theme: "colored",
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
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
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <button className='bg-main-500 hover:bg-main-700 focus:ring-main-500 text-white rounded-lg w-1/2 py-2' onClick={onSendResetPass}>Ok</button>
                    </div>
                </Modal.Body>
                        </Modal>
        </React.Fragment>
        <ToastContainer/>
        <div className='absolute top-1/3 right-[45%]'>
            <Loading loading={loading}/>
        </div>
    </div>
  )
}

export default ForgotPass