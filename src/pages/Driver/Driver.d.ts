import { CommonTableEntity } from "@/Interfaces/interface";

export interface DriverMaster extends CommonTableEntity {
    name: string;
    customerid: string;
    license_number: string;
    license_expiry_date: string;
    phone_number: string;
    address: string;
    date_of_birth: string;
    date_of_joining: string;
    emergency_contact: string;
    status: string;
    aadhaar_pic: string;
    pancard_pic: string;
    license_pic: string;
    email: string;
}


export interface DriverDataStoreInterface {
    data: DriverMaster[],
    columns: [],
    filterData: [],
    sortDirection: "asc",
    sortColumn: null,
    currentPage: 1,
    rowsPerPage: 10,
    searchColumn: {
        name: string;
        customerid: string;
        license_number: string;
        license_expiry_date: string;
        phone_number: string;
        address: string;
        date_of_birth: string;
        date_of_joining: string;
        emergency_contact: string;
        status: string;
        aadhaar_pic: string;
        pancard_pic: string;
        license_pic: string;
        email: string;
        customItems: []
    }
}


