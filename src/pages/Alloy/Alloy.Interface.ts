import { CommonTableEntity } from "@/Interfaces/interface";

export interface AlloyMaster extends CommonTableEntity {
    // "id": "7",
    date: string;
    before: string;
    after: string;
    vehicle: string;
    customerid: string;
    // "date": "2024-11-13",
    // "before": "https://aktyres-in.stackstaging.com/php-truck/class/uploads/1729001382_Water-Testing-Service-Report-H1024-19938-KIAN.pdf",
    // "after": "https://aktyres-in.stackstaging.com/php-truck/class/uploads/1729001468_Print.pdf",
    // "vehicle": "ABC1234",
    // "customerid": "1001"
}


export interface AlloyMasterStoreInterface {
    data: AlloyMaster[],
    columns: [],
    filterData: [],
    sortDirection: "asc",
    sortColumn: null,
    currentPage: 1,
    rowsPerPage: 10,
    searchColumn: {
        date: string;
        before: string;
        after: string;
        vehicle: string;
        customerid: string;
        customItems: []
    }
}


