import { useQuery } from "@tanstack/react-query";
import { GetApiCustomerRoutes, PostApiCustomerRoutes } from "./ApiCustomHook";

import { GetApiResponse } from "@/Interfaces/interface";
import { routes } from "@/routes/routes";

import { DriverMaster } from "@/pages/Driver/Driver.d"; // Add this line to import DriverMaster
import { AlloyMaster } from "@/pages/Alloy/Alloy.d";
import { ITruckConfig, ITruckData } from "@/pages/Truck/Truck.d";
import { InsuranceMaster } from "@/pages/Insurance/Insurance.d";
import { ComplaintsMaster } from "@/pages/Compliant/Compliant.d";
import axios from "axios";
import { message } from "antd";
import { ITyrePressure } from "@/pages/TyprePressure/Tyre";
export const useGetDriverData = (customer_id: string) => {
  return useQuery<GetApiResponse<DriverMaster>>({
    queryKey: ["drivers"],
    queryFn: () =>
      GetApiCustomerRoutes(
        routes.backend.driver.getAll + customer_id,
        "DummyToken",
      ).then((res) => res as GetApiResponse<DriverMaster>),
  });
};

export const useGetAlloyData = (
  customer_id: string,
  fromDate: string,
  toDate: string,
) => {
  return useQuery<AlloyMaster[]>({
    queryKey: ["alloy"],
    queryFn: () =>
      PostApiCustomerRoutes(routes.backend.alloy.getAll + customer_id, {
        from_date: fromDate,
        to_date: toDate,
      }).then((res) => res),
  });
};

// getTruckData
export const useGetTruckData = (customer_id: string) => {
  return useQuery<GetApiResponse<ITruckData>>({
    queryKey: ["trucks"],
    queryFn: () =>
      GetApiCustomerRoutes(
        routes.backend.truck.getAll + customer_id,
        "DummyToken",
      ).then((res) => res as GetApiResponse<ITruckData>),
  });
};

// GetTruckConfig
export const useGetTruckConfig = () => {
  return useQuery<GetApiResponse<ITruckConfig>>({
    queryKey: ["truckConfig"],
    queryFn: () =>
      GetApiCustomerRoutes(routes.backend.truck.getTruckConfig, "DummyToken").then(
        (res) =>
          res as GetApiResponse<ITruckConfig>,
      ),
  });
};

export const useGetTruckDemensionDetails = (
  SelectedTruckId: string | undefined,
) => {
  return useQuery<
    GetApiResponse<{
      wheels: string; //!  number and its a count of the wheels
      axtyre: string; //!  array of objects and its a count of the axles
      total_tyres: string; //!  number and its a count of the total tyres
      total_axles: string; //!  number and its a count of the total axles
      config: string; //!  number and its a count of the total axles
    }>
  >({
    queryKey: ["TruckDemensionDetails", SelectedTruckId],
    queryFn: () =>
      GetApiCustomerRoutes(
        routes.backend.tyre.getTyreDetails + SelectedTruckId,
        "DummyToken",
      ).then(
        (res) =>
          res as GetApiResponse<{
            wheels: string; //!  number and its a count of the wheels
            axtyre: string; //!  array of objects and its a count of the axles
            total_tyres: string; //!  number and its a count of the total tyres
            total_axles: string; //!  number and its a count of the total axles
            config: string; //!  number and its a count of the total axles
          }>,
      ),
    refetchOnWindowFocus: false,
    enabled: !!SelectedTruckId,
  });
};

export const useGetInsuranceData = (customer_id: string) => {
  return useQuery<GetApiResponse<InsuranceMaster>>({
    queryKey: ["insurance"],
    queryFn: () =>
      GetApiCustomerRoutes(
        routes.backend.insurance.getInsuranceByCustomerId + customer_id,
        "DummyToken",
      ).then((res) => res as GetApiResponse<InsuranceMaster>),
  });
};

export const useGetComplaintsData = (customer_id: string) => {
  return useQuery<GetApiResponse<ComplaintsMaster>>({
    queryKey: ["complaints"],
    queryFn: () =>
      GetApiCustomerRoutes(
        routes.backend.complaints.getComplaintsByCustomerId + customer_id,
        "DummyToken",
      ).then((res) => res as GetApiResponse<ComplaintsMaster>),
  });
};

export const useGetTyreData = (
  SelectedTruckId?: string,
  fromDate?: string,
  toDate?: string,
) => {
  return useQuery({
    queryKey: ["tyres", SelectedTruckId, fromDate, toDate],
    queryFn: async () => {
      try {
        const res = await axios.post(
          routes.backend.tyre.getTyreDetailsByCustomer,
          {
            truck_id: SelectedTruckId,
            from_date: fromDate,
            to_date: toDate,
            customerid: localStorage.getItem("customer_id") || "",
          },
        );
        const result = res.data;
        return result;
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data");
      }
    },
    refetchOnWindowFocus: false,
  });
};


export const useGetInvoiceData = (fromDate?: string, toDate?: string) => {
  return useQuery({
    queryKey: ['invoices', fromDate, toDate],
    queryFn: async () => {
      try {
        const res = await axios.post(
          routes.backend.invoice.getCustomerpayfilter,
          {
            // customer_id: localStorage.getItem('customer_id') || '',
            customer_id: '1006',
          }
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching invoice data");
        return [];
      }
    },
  });
}

export const useGetPaymentAnalytics = (customer_id: string) => {
  return useQuery<GetApiResponse<{
    Date: string;
    Particulars: string;
    VCH_TYP: string;
    VCH_NO: string;
    Debit: string;
    Credit: string;
  }[]>>({
    queryKey: ['paymentAnalytics'],
    queryFn: async () => {
      try {
        const res = await axios.post(
          routes.backend.invoice.getPaymentAnalytics,
          {
            customer_id: customer_id,
          }
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching invoice data");
        return [];
      }
    },
  });
}

// https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTyreAnalytics&customer_id=1001
// {
//   "itemCount": 12,
//   "body": [
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "174",
//           "truck_id": "1",
//           "tyre_position": "1L0",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "175",
//           "truck_id": "1",
//           "tyre_position": "1R0",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "176",
//           "truck_id": "1",
//           "tyre_position": "2L0",
//           "tyre_pressure": "32.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "177",
//           "truck_id": "1",
//           "tyre_position": "2R0",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "178",
//           "truck_id": "1",
//           "tyre_position": "3L0",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "179",
//           "truck_id": "1",
//           "tyre_position": "3L1",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "180",
//           "truck_id": "1",
//           "tyre_position": "3R0",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "181",
//           "truck_id": "1",
//           "tyre_position": "3R1",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "182",
//           "truck_id": "1",
//           "tyre_position": "4L0",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "183",
//           "truck_id": "1",
//           "tyre_position": "4L1",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "184",
//           "truck_id": "1",
//           "tyre_position": "4R0",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       },
//       {
//           "wheels": "12",
//           "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
//           "total_tyres": "12",
//           "total_axles": "4",
//           "pressure_id": "185",
//           "truck_id": "1",
//           "tyre_position": "4R1",
//           "tyre_pressure": "23.00",
//           "recorded_at": "2025-02-04 00:00:00",
//           "Depth": null,
//           "Toberun": null,
//           "fixedDep": null,
//           "actualDep": null
//       }
//   ]
// }


export const useGetTyreAnalytics = (customer_id: string) => {
  return useQuery<
    {
      body: ITyrePressure[];
      analytics: {
        bad: number;
        good: number;
        normal: number;
      }
    }
  >({
    queryKey: ['tyreAnalytics'],
    queryFn: async () => {
      try {
        const res = await axios.get(
          routes.backend.tyre.getTyreAnalytics + '&customer_id=' + customer_id,
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching invoice data");
        return [];
      }
    },
  });
}



// https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruckMakersByCustomerId&customer_id=1001

// {
//   "itemCount": 6,
//     "body": [
//       {
//         "make": "134314",
//         "count": "1"
//       },
//       {
//         "make": "asdsadasd",
//         "count": "2"
//       },
//       {
//         "make": "dfgdfg",
//         "count": "1"
//       },
//       {
//         "make": "Mda",
//         "count": "1"
//       },
//       {
//         "make": "Suzuki",
//         "count": "1"
//       },
//       {
//         "make": "Toyota",
//         "count": "3"
//       }
//     ]
// }

export const useGetTruckMakers = (customer_id: string) => {
  return useQuery<GetApiResponse<{ make: string; count: string }>>({
    queryKey: ["truckMakers", customer_id],
    queryFn: () =>
      GetApiCustomerRoutes(
        routes.backend.truck.getTruckMakersByCustomerId + customer_id,
        "DummyToken",
      ).then((res) => res as GetApiResponse<{ make: string; count: string }>),
  });
}


// https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=insertTruckIdsAndGroupByBrand&customer_id=1001

// {
//     "itemCount": 7,
//     "body": [
//         {
//             "truck_id": "1",
//             "tyre_brand": "Apollo",
//             "tyre_count": "1"
//         },
//         {
//             "truck_id": "1",
//             "tyre_brand": "Bridgestone",
//             "tyre_count": "1"
//         },
//         {
//             "truck_id": "6",
//             "tyre_brand": "cdvdv",
//             "tyre_count": "1"
//         },
//         {
//             "truck_id": "1",
//             "tyre_brand": "CEAT",
//             "tyre_count": "1"
//         },
//         {
//             "truck_id": "1",
//             "tyre_brand": "Mechillen",
//             "tyre_count": "1"
//         },
//         {
//             "truck_id": "1",
//             "tyre_brand": "Michelin",
//             "tyre_count": "1"
//         },
//         {
//             "truck_id": "1",
//             "tyre_brand": "MRF",
//             "tyre_count": "1"
//         }
//     ]
// }

export const useGetTruckIdsAndGroupByBrand = (customer_id: string) => {
  return useQuery<GetApiResponse<{ truck_id: string; tyre_brand: string; tyre_count: string }>>({
    queryKey: ["truckIdsAndGroupByBrand", customer_id],
    queryFn: () =>
      GetApiCustomerRoutes(
        routes.backend.truck.getTruckIdsAndGroupByBrand + customer_id,
        "DummyToken",
      ).then((res) => res as GetApiResponse<{ truck_id: string; tyre_brand: string; tyre_count: string }>),
  });
}



// https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=gettrip&customer_id=1001

// {
//   "itemCount": 8,
//   "body": [
//       {
//           "id": "11",
//           "truck_no": "ABC123",
//           "driver": "John Doe",
//           "Rdriver": "John Doe",
//           "from_location": "Vellore",
//           "to_location": "Chennai",
//           "trip_date": "2024-09-18",
//           "reverse_date": "2024-09-24",
//           "Rfrom": "Chennai",
//           "Rto": "Vellore",
//           "remark": "",
//           "reverse_remark": "",
//           "current_km": "0",
//           "fuel_level": null,
//           "complaint": "",
//           "tyre_condition": null,
//           "mobile_number": "John Doe",
//           "Rmobile_number": "John Doe",
//           "broker": "",
//           "broker1": "",
//           "driverexpense": "[{\"item\":\"cooliee\",\"amount\":\"300\",\"remark\":\"\"}]",
//           "Rdriverexpense": "[{\"item\":\"Police\",\"amount\":\"12000\",\"remark\":\"asda\"}]",
//           "supertotal": "498",
//           "trip_items": "[{\"id\":16,\"item\":\"goods\",\"weight\":2.00,\"is_single\":0,\"tripid\":11,\"driver_advance\":0.00,\"tonnage_rate\":99.00,\"total\":198.00,\"balance\":0.00,\"remarks\":\"},{\"id\":17,\"item\":\"\",\"weight\":0.00,\"is_single\":1,\"tripid\":11,\"driver_advance\":0.00,\"tonnage_rate\":0.00,\"total\":0.00,\"balance\":0.00,\"remarks\":\"}]"
//       },
//       {
//           "id": "10",
//           "truck_no": "34343",
//           "driver": "supriyaa",
//           "Rdriver": "John Doe",
//           "from_location": "Nagercoil",
//           "to_location": "Chennai",
//           "trip_date": "2024-08-27",
//           "reverse_date": "2024-08-29",
//           "Rfrom": "Chennai",
//           "Rto": "Kashmir",
//           "remark": "",
//           "reverse_remark": "",
//           "current_km": "0",
//           "fuel_level": "full",
//           "complaint": "no",
//           "tyre_condition": null,
//           "mobile_number": "supriyaa",
//           "Rmobile_number": "supriyaa",
//           "broker": "arvind",
//           "broker1": "veera",
//           "driverexpense": "[{\"item\":\"fruits\",\"amount\":\"100\",\"remark\":\"\"}]",
//           "Rdriverexpense": "[{\"item\":\"fruits\",\"amount\":\"1000\",\"remark\":\"\"}]",
//           "supertotal": null,
//           "trip_items": "[{\"id\":14,\"item\":\"food\",\"weight\":20.00,\"is_single\":0,\"tripid\":10,\"driver_advance\":0.00,\"tonnage_rate\":100.00,\"total\":2000.00,\"balance\":0.00,\"remarks\":\"},{\"id\":15,\"item\":\"\",\"weight\":0.00,\"is_single\":1,\"tripid\":10,\"driver_advance\":0.00,\"tonnage_rate\":0.00,\"total\":0.00,\"balance\":0.00,\"remarks\":\"}]"
//       },
//       {
//           "id": "9",
//           "truck_no": "ABC123",
//           "driver": "Alice Smith",
//           "Rdriver": "Bob Johnson",
//           "from_location": "Vriddhachalam Junction",
//           "to_location": "Salem Junction",
//           "trip_date": "2024-08-26",
//           "reverse_date": "2024-08-27",
//           "Rfrom": "Neyveli",
//           "Rto": "Chennai",
//           "remark": "super",
//           "reverse_remark": "dfwf",
//           "current_km": "50",
//           "fuel_level": "best",
//           "complaint": "Very super",
//           "tyre_condition": null,
//           "mobile_number": "8765432109",
//           "Rmobile_number": "7654321098",
//           "broker": "arvind",
//           "broker1": "am good",
//           "driverexpense": null,
//           "Rdriverexpense": null,
//           "supertotal": null,
//           "trip_items": "[{\"id\":10,\"item\":\"sdfsgb\",\"weight\":1.00,\"is_single\":0,\"tripid\":9,\"driver_advance\":0.00,\"tonnage_rate\":20.00,\"total\":20.00,\"balance\":10.00,\"remarks\":\"hi},{\"id\":11,\"item\":\"\",\"weight\":2.00,\"is_single\":1,\"tripid\":9,\"driver_advance\":0.00,\"tonnage_rate\":20.00,\"total\":0.00,\"balance\":0.00,\"remarks\":\"}]"
//       },
//       {
//           "id": "6",
//           "truck_no": "ABC123",
//           "driver": "Bob Johnson",
//           "Rdriver": "John Doe",
//           "from_location": "Vriddhachalam Junction",
//           "to_location": "Neyveli",
//           "trip_date": "2024-08-08",
//           "reverse_date": "2024-08-15",
//           "Rfrom": "Cuddalore",
//           "Rto": "Vriddhachalam Junction",
//           "remark": null,
//           "reverse_remark": null,
//           "current_km": "60",
//           "fuel_level": "full",
//           "complaint": "no",
//           "tyre_condition": null,
//           "mobile_number": "7654321098",
//           "Rmobile_number": "9876543210",
//           "broker": "arvind",
//           "broker1": "arvind",
//           "driverexpense": null,
//           "Rdriverexpense": null,
//           "supertotal": null,
//           "trip_items": "[{\"id\":4,\"item\":\"foods\",\"weight\":200.00,\"is_single\":0,\"tripid\":6,\"driver_advance\":0.00,\"tonnage_rate\":2.00,\"total\":400.00,\"balance\":0.00,\"remarks\":\"},{\"id\":5,\"item\":\"\",\"weight\":300.00,\"is_single\":1,\"tripid\":6,\"driver_advance\":0.00,\"tonnage_rate\":1.00,\"total\":0.00,\"balance\":0.00,\"remarks\":\"}]"
//       },
//       {
//           "id": "5",
//           "truck_no": "ABC123",
//           "driver": "Bob Johnson",
//           "Rdriver": "John Doe",
//           "from_location": "Vriddhachalam Junction",
//           "to_location": "Neyveli",
//           "trip_date": "2024-08-08",
//           "reverse_date": "2024-08-15",
//           "Rfrom": "Cuddalore",
//           "Rto": "Vriddhachalam Junction",
//           "remark": null,
//           "reverse_remark": null,
//           "current_km": "60",
//           "fuel_level": "full",
//           "complaint": "no",
//           "tyre_condition": null,
//           "mobile_number": "7654321098",
//           "Rmobile_number": "9876543210",
//           "broker": "arvind",
//           "broker1": "arvind",
//           "driverexpense": null,
//           "Rdriverexpense": null,
//           "supertotal": null,
//           "trip_items": null
//       },
//       {
//           "id": "4",
//           "truck_no": "ABC123",
//           "driver": "Bob Johnson",
//           "Rdriver": "John Doe",
//           "from_location": "Vriddhachalam Junction",
//           "to_location": "Neyveli",
//           "trip_date": "2024-08-08",
//           "reverse_date": "2024-08-15",
//           "Rfrom": "Cuddalore",
//           "Rto": "Vriddhachalam Junction",
//           "remark": null,
//           "reverse_remark": null,
//           "current_km": "60",
//           "fuel_level": "full",
//           "complaint": "no",
//           "tyre_condition": null,
//           "mobile_number": "7654321098",
//           "Rmobile_number": "9876543210",
//           "broker": "arvind",
//           "broker1": "arvind",
//           "driverexpense": null,
//           "Rdriverexpense": null,
//           "supertotal": null,
//           "trip_items": null
//       },
//       {
//           "id": "2",
//           "truck_no": "KA02CD5678",
//           "driver": "Alice Johnson",
//           "Rdriver": "Bob Brown",
//           "from_location": "Chicago",
//           "to_location": "Houston",
//           "trip_date": "2024-07-02",
//           "reverse_date": "2024-07-06",
//           "Rfrom": "Houston",
//           "Rto": "Chicago",
//           "remark": "Furniture delivery",
//           "reverse_remark": "Minor delay due to traffic",
//           "current_km": "3200",
//           "fuel_level": "60",
//           "complaint": "Engine overheating issue",
//           "tyre_condition": "Fair",
//           "mobile_number": null,
//           "Rmobile_number": null,
//           "broker": null,
//           "broker1": null,
//           "driverexpense": null,
//           "Rdriverexpense": null,
//           "supertotal": null,
//           "trip_items": "[{\"id\":2,\"item\":\"Furniture\",\"weight\":2000.00,\"is_single\":0,\"tripid\":2,\"driver_advance\":700.00,\"tonnage_rate\":100.00,\"total\":200000.00,\"balance\":193000.00,\"remarks\":\"Minor delay due to traffic}]"
//       },
//       {
//           "id": "1",
//           "truck_no": "TN31AV4073",
//           "driver": "Alice Smith",
//           "Rdriver": "Bob Johnson",
//           "from_location": "New York",
//           "to_location": "Los Angeles",
//           "trip_date": "2024-07-01",
//           "reverse_date": "2024-07-05",
//           "Rfrom": "Los Angeles",
//           "Rto": "New York",
//           "remark": "Delivery of electronics",
//           "reverse_remark": "Return trip completed",
//           "current_km": "0",
//           "fuel_level": "75",
//           "complaint": "No arvind",
//           "tyre_condition": "Good",
//           "mobile_number": "Alice Smith",
//           "Rmobile_number": "7654321098",
//           "broker": "",
//           "broker1": "",
//           "driverexpense": "null",
//           "Rdriverexpense": "null",
//           "supertotal": null,
//           "trip_items": "[{\"id\":1,\"item\":\"arvind\",\"weight\":1000.00,\"is_single\":1,\"tripid\":1,\"driver_advance\":500.00,\"tonnage_rate\":15.00,\"total\":15000.00,\"balance\":145000.00,\"remarks\":\"Delivery on time}]"
//       }
//   ]
// }

interface TripData {
  id: string;
  truck_no: string;
  driver: string;
  Rdriver: string;
  from_location: string;
  to_location: string;
  trip_date: string;
  reverse_date: string;
  Rfrom: string;
  Rto: string;
  remark: string;
  reverse_remark: string;
  current_km: string;
  fuel_level: string;
  complaint: string;
  tyre_condition: string;
  mobile_number: string;
  Rmobile_number: string;
  broker: string;
  broker1: string;
  driverexpense: string;
  Rdriverexpense: string;
  supertotal: string;
  trip_items: string;
}


export const useGetTripData = (customer_id: string) => {
  return useQuery<GetApiResponse<TripData>>({
    queryKey: ['trips'],
    queryFn: async () => {
      try {
        const res = await axios.get(
          routes.backend.trip.getTrip + '&customer_id=' + customer_id,
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching invoice data");
        return [];
      }
    },
  });
}