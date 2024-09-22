import {configureStore} from "@reduxjs/toolkit";
import WareHouseSlice from "../services/warehouse/WareHouseSlice";


 export const store = configureStore({
        reducer: WareHouseSlice
    })