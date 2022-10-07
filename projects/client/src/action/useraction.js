import { API_URL } from "../helper";

export const loginAction=(data)=>{
    console.log('data dari page LOGIN', data)
    return{
        type: "LOGIN_SUCCESS",
        payload: data

    }
}

export const logoutAction=()=>{
    localStorage.removeItem('medcarelog')
    return{
        type:'LOGOUT_SUCCESS'
    }
}

export const UpdateProfile = (data) =>{
    return {
        type : 'UPDATE_PROFILE',
        payload :data
    }
}

export const updateCart = (data) => {
    //console.log('action to cart', data);
    return {
        type: 'UPDATE_CART',
        payload: data
    }
}