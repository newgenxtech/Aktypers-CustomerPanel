import {
    createSlice,
    nanoid
} from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import { WarehouseDataStoreInterface } from '@/Interfaces/interface';

const createData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            name: `Warehouse-${faker.number.int({
                min: 1,
                max: 10000
            })}`,
            code: `W-${i + 1}`,
            id: i + 1,
            city: faker.location.city(),
            space_available: faker.number.int({
                min: 1,
                max: 3000
            }),
            type: faker.helpers.arrayElement(['Leasable Space', 'Warehouse Service']),
            cluster: faker.helpers.arrayElement(['cluster-a-1', 'cluster-a-21', 'cluster-a-32', 'cluster-v-2']),
            is_registered: faker.datatype.boolean(),
            is_live: faker.datatype.boolean(),     
            customItems: []    
        });
    }
    return data;
}

const initialState: WarehouseDataStoreInterface = {
    data: createData(),
    columns: [],
    filterData: [],
    sortDirection: "asc",
    sortColumn: null,
    currentPage: 1,
    rowsPerPage: 10,
    searchColumn: {
        name: '',
        code: '',
        city: '',
        space_available: '',
        type: '',
        cluster: '',
        is_registered: '',
        is_live: '',
        customItems: []
    }

}




const WareHouseSlice = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        addWarehouse: (state, action) => {
            const addWarehouse = {
                id: parseInt(nanoid()),
                name: action.payload.name,
                code: action.payload.code,
                city: action.payload.city,
                space_available: action.payload.space_available,
                type: action.payload.type,
                cluster: action.payload.cluster,
                is_registered: action.payload.is_registered,
                is_live: action.payload.is_live,
                customItems: action.payload.customItems
            }
            state.data.push(addWarehouse)
        },
        deleteWarehouse: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload)
        },
        updateWarehouse: (state, action) => {
            const index = state.data.findIndex((item) => item.id === action.payload.id)
            state.data[index] = action.payload
        },
        UpdateFilteredData : (state, action) => {
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
            state.data = createData()
        },
        resetPagination: (state) => {
            state.currentPage = 1
            state.rowsPerPage = 10
        },
        resetFilter: (state) => {
            state.sortColumn = null
            state.sortDirection = 'asc'
        }
        
    }
})

export const {
    addWarehouse,
    deleteWarehouse,
    updateWarehouse,
    updateSort,
    updatePagination,
    resetData,
    resetPagination,
    resetFilter,
    UpdateFilteredData,
    updateSearchColumn
} = WareHouseSlice.actions

export default WareHouseSlice.reducer