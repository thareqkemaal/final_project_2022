import {useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {
  const navigate = useNavigate()
    const {iduser, status}=useSelector((state)=>{
        return {
            iduser:state.userReducer.iduser,
            status:state.userReducer.status_name,
        }
    })


    if(!iduser || status==='Unverified'){
        return navigate('/')
    }

    

  return <Outlet/>
}

export default ProtectRoute