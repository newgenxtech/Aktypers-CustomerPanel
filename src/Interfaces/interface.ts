import { InputField } from "@/components/FormComponent"

export interface WareHouseData {
    name : string,
    code : string,
    id : number
    city: string,
    space_available: number,
    type : string,
    cluster : string,
    is_registered : boolean,
    is_live : boolean
    customItems: InputField[]
}

export interface WarehouseDataStoreInterface {
    data: WareHouseData[],
    columns:InputField[]
    sortDirection: "asc" | "desc",
    sortColumn: string | null,
    currentPage: number,
    rowsPerPage: number,
    filterData: WareHouseData[]
    searchColumn: {
        name: string,
        code: string,
        city: string,
        space_available: string,
        type: string,
        cluster: string,
        is_registered: string,
        is_live: string,
        customItems: InputField[]
    }
}
