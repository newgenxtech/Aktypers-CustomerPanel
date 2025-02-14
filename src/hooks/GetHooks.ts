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