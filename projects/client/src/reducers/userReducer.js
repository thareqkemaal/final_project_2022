const INITIAL_STATE={
    iduser:null,
    name:'',
    email:'',
    role:'',
    phone_number:'',
    gender:'',
    birthdate:'',
    profilpict:'',
    status:'',
    status_name:'',
    cart:[],
    address:[],
    transaction:[]
}



export const userReducer=(state= INITIAL_STATE, action)=>{
    console.log("data dari Action",action)
        switch (action.type) {
        case "LOGIN_SUCCESS":
            // delete action.payload.password; //menghapus property password dari payload
            return {...state, ...action.payload}
        case "UPDATE_CART":
                return {...state, cart:action.payload}
        case "UPDATE_STATUS":
            return {...state, status:action.payload}
        case "LOGOUT_SUCCESS":
                return INITIAL_STATE;
        default:
            return state;
    }
    
    }