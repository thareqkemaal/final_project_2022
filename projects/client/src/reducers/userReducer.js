const INITIAL_STATE={
    iduser:null,
    fullname:'',
    username:'',
    email:'',
    role:'',
    phone_number:'',
    gender:'',
    birthdate:'',
    profil_pict:'',
    status_id:null,
    status_name:'',
    cart:[],
    address:[],
    transaction:[]
}



export const userReducer=(state= INITIAL_STATE, action)=>{
    console.log("data dari Action",action)
        switch (action.type) {
        case "LOGIN_SUCCESS":
            return {...state, ...action.payload}
        case "UPDATE_PROFILE":
            return {...state, ...action.payload}
        case "LOGOUT_SUCCESS":
                return INITIAL_STATE;
        default:
            return state;
    }
    
    }