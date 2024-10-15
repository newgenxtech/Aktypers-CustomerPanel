import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import { DriverDataStoreInterface } from '@/pages/Driver/Driver.Interface';
// import { useGetDriverData } from '@/hooks/GetHooks';
import { GetApiCustomerRoutes } from '@/hooks/ApiCustomHook';
import { routes } from '@/routes/routes';
// import { GetApiResponse } from '@/Interfaces/interface';



const initialState: DriverDataStoreInterface = {
    data: [],
    columns: [],
    filterData: [],
    sortDirection: "asc",
    sortColumn: null,
    currentPage: 1,
    rowsPerPage: 10,
    searchColumn: {
        name: '',
        licenseNumber: '',
        licenseExpDate: '',
        phoneNo: '',
        address: '',
        dateOfBirth: '',
        dateOfJoining: '',
        emergencyContact: '',
        adharPic: '',
        pancardPic: '',
        licensePic: '',
        customItems: []
    }

}


export const fetchDriverData = createAsyncThunk("fetchDriverData", async () => {
    const response = await GetApiCustomerRoutes(routes.backend.driver.getAll, 'DummyToken');
    return response?.json
})



const DriverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        addDriver: (state, action) => {
            state.data.push(action.payload)
        },
        deleteDriver: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload)
        },
        updateDriver: (state, action) => {
            const index = state.data.findIndex((item) => item.id === action.payload.id)
            state.data[index] = action.payload
        },
        UpdateFilteredData: (state, action) => {
            state.filterData = action.payload
        },
        updateSort: (state, action) => {
            state.sortColumn = action.payload.sortColumn
            state.sortDirection = action.payload.sortDirection
        },
        updatePagination: (state, action) => {
            state.currentPage = action.payload.currentPage
            state.rowsPerPage = action.payload.rowsPerPage
        },
        updateSearchColumn: (state, action) => {
            state.searchColumn = action.payload
        },
        resetData: (state) => {
            state.data = []
        },
        resetPagination: (state) => {
            state.currentPage = 1
            state.rowsPerPage = 10
        },
        resetFilter: (state) => {
            state.sortColumn = null
            state.sortDirection = 'asc'
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchDriverData.fulfilled, (state, action) => {
    //         state.data = action.payload
    //     })
    //     builder.addCase(fetchDriverData.rejected, (state, action) => {
    //         state.data = []
    //     })
    //     builder.addCase(fetchDriverData.pending, (state, action) => {
    //         state.data = []
    //     })
    // }

})

export const {
    addDriver,
    deleteDriver,
    updateDriver,
    UpdateFilteredData,
    updateSort,
    updatePagination,
    updateSearchColumn,
    resetData,
    resetPagination,
    resetFilter
} = DriverSlice.actions

export default DriverSlice.reducer