import { CommonTableEntity } from "@/Interfaces/interface";

export interface DriverMaster extends CommonTableEntity {
    name: string;
    licenseNumber: string;
    licenseExpDate: Date;
    phoneNo: string;
    address: string;
    dateOfBirth: Date;
    dateOfJoining: Date;
    emergencyContact: string;
    adharPic: string;
    pancardPic: string;
    licensePic: string;
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


