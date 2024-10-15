import { configureStore } from "@reduxjs/toolkit";
import WareHouseSlice from "../services/warehouse/WarehouseSlice";
import tableReducer from "../services/TableSlice";
import DriverStore from "../services/Driver/Driver";


export const store = configureStore({
    reducer: {
        warehouse: WareHouseSlice,
        driver: DriverStore,
        table: tableReducer,

    }
})

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;