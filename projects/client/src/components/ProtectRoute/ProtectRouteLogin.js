import {useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {
  const navigate = useNavigate()
    const {role}=useSelector((state)=>{
        return {
            iduser:state.userReducer.iduser,
            status:state.userReducer.status_name,
            role:state.userReducer.role
        }
    })


    if(role === 'User'){
          return navigate('/')
    }

    

  return <Outlet/>
}

export default ProtectRoute