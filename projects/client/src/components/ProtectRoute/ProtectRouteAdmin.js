import {useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {
  const navigate = useNavigate()
    const {iduser, status, role}=useSelector((state)=>{
        return {
            iduser:state.userReducer.iduser,
            status:state.userReducer.status_name,
            role:state.userReducer.role
        }
    })

    console.log(iduser)

    if(role === 'User' || !iduser){
        return navigate('/')
    }

    

  return <Outlet/>
}

export default ProtectRoute