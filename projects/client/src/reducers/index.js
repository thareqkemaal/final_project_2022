import { configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";

export const rootStore = configureStore({
    // Untuk mengelompokan seluruh reducernya
    reducer:{
        userReducer
    }
})
