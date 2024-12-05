import { CommonTableEntity } from "@/Interfaces/interface";

export interface TyresMaster extends CommonTableEntity {

    // "Wheeler_Type": "4 Wheeler",
    //     "Manufacturer": "Hyundai",
    //     "Brand": "Apollo",
    //     "Tyre_Serial_Number": "TSN33445",
    //     "Fitment_KM": "1500",
    //     "Removal_KM": "35000",
    //     "Total_Covered_KM": "33500",
    //     "Retread_Yes_No": "Yes",
    //     "Reason_for_Removal_MONTH": "Sidewall Damage",
    //     "Date": "2024-10-05",
    //     "position": "Front Right",
    //     "registration_number": "ABC1234"

    Wheeler_Type?: string;
    Manufacturer: string;
    Brand: string;
    Tyre_Serial_Number: string;
    Fitment_KM: string;
    Removal_KM: string;
    Total_Covered_KM: string;
    Retread_Yes_No: string;
    Reason_for_Removal_MONTH: string;
    Date: string;
    position: string;
    registration_number: string;
    Vehicle_Registration_Number?: string;
}


export interface TyresMasterDataStoreInterface {
    data: TyresMaster[],
    columns: [],
    filterData: [],
    sortDirection: "asc",
    sortColumn: null,
    currentPage: 1,
    rowsPerPage: 10,
    searchColumn: {
        Wheeler_Type: string;
        Manufacturer: string;
        Brand: string;
        Tyre_Serial_Number: string;
        Fitment_KM: string;
        Removal_KM: string;
        Total_Covered_KM: string;
        Retread_Yes_No: string;
        Reason_for_Removal_MONTH: string;
        Date: string;
        position: string;
        registration_number: string;
        Vehicle_Registration_Number: string;
        customItems: []
    }
}


