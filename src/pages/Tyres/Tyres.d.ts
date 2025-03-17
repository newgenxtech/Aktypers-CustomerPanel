import { CommonTableEntity } from "@/Interfaces/interface";

export interface TyresMaster extends CommonTableEntity {
  id?: string;
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
  truckid?: string;
}

export interface TyresMasterDataStoreInterface {
  data: TyresMaster[];
  columns: [];
  filterData: [];
  sortDirection: "asc";
  sortColumn: null;
  currentPage: 1;
  rowsPerPage: 10;
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
    customItems: [];
  };
}
