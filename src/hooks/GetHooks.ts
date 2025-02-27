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

interface TripData {
  id?: string;
  truck_no: string;
  driver?: string;
  Rdriver?: string;
  from_location: string;
  to_location: string;
  trip_date: string;
  reverse_date?: string;
  Rfrom?: string;
  Rto?: string;
  remark?: string;
  reverse_remark?: string;
  current_km: string;
  fuel_level?: string;
  complaint?: string;
  tyre_condition?: string;
  mobile_numbe?: string;
  Rmobile_number?: string;
  broker?: string;
  broker1?: string;
  driverexpense?: string;
  Rdriverexpense?: string;
  supertotal: string;
  trip_items?: string;
  driverid: number
  total_expense?: string;
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

// getTruckMakersByCustomerId

export const useGetTruckMakers = (customer_id: string) => {
  return useQuery<GetApiResponse<{
    make: string,
    count: string
  }>>({
    queryKey: ["truckMakers"],
    queryFn: () =>
      GetApiCustomerRoutes(
        routes.backend.truck.getTruckMakersByCustomerId + customer_id,
        "DummyToken",
      ).then((res) => res),
  });
}

// https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createTrip

// {
//     "truck_no": "ABC1234",
//     "driver": "Bob Johnson",
//     "driverid": "3",
//     "Rdriverid": "3",
//     "Rdriver": "Bob Johnson",
//     "from_location": "Vakaga",
//     "to_location": "Chennai",
//     "trip_date": "2025-02-17",
//     "reverse_date": "2025-02-10",
//     "Rfrom": "Neyveli",
//     "Rto": "Chemin",
//     "current_km": "30",
//     "fuel_level": "30",
//     "customerid": "1001",
//     "mobile_number": "7654321098",
//     "Rmobile_number": "7654321098",
//     "driverexpense": "[{"item":"poice","amount":"300","remark":""}]",
//     "Rdriverexpense": "[{"item":"","amount":0,"remark":""}]",
//     "supertotal": 500
// }


import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import toast from "react-hot-toast";

export const useCreateTrip = (
  isEdit: boolean) => {
  return useMutation({
    mutationFn: async (data: TripData & {
      customerid: string,
    }) => {
      try {
        const res = await axios.post(
          isEdit ? routes.backend.trip.editTrip : routes.backend.trip.createTrip,
          data,
        );
        if (!res.data) {
          throw new Error('No data returned from server');
        }
        return res.data;
      } catch (error) {
        console.error("Error creating trip:", error);
        message.error("Error creating trip");
        throw error;
      }
    },
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['trips'], exact: true });
      return data; // Explicitly return the success data
    },
    onError: (error) => {
      return error; // Return error for error handling
    }
  });
}


// https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createTripDetail
// [
//     {
//         "item": "goods",
//         "weight": "2",
//         "driver_advance": 0,
//         "is_single": 0,
//         "tripid": "12",
//         "tonnage_rate": "100",
//         "total": 200,
//         "balance": 0,
//         "remarks": ""
//     },
//     {
//         "item": "",
//         "weight": "",
//         "driver_advance": 0,
//         "is_single": 1,
//         "tripid": "12",
//         "tonnage_rate": 0,
//         "total": 0,
//         "balance": 0,
//         "remarks": ""
//     }
// ]

interface TripDetailData {
  item: number;
  weight: string;
  is_single: number;
  tripid: string;
  tonnage_rate: string;
  total: number;
  remarks: string;
}
export const useCreateTripDetail = (
  isEdit: boolean
) => {
  return useMutation({
    mutationFn: async (data: TripDetailData[]) => {
      try {
        const res = await axios.post(
          isEdit ? routes.backend.trip.editTripDetail : routes.backend.trip.createTripDetail,
          data,
        );
        if (!res.data) {
          throw new Error('No data returned from server');
        }
        return res.data;
      } catch (error) {
        console.error("Error creating trip detail:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    }
  });
}


// https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=GoodName

// [
//   {
//       "name": "Arvind Blazo",
//       "customer": 1002
//   }
// ]

export const useCreateItem = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string
      customer: string
    }[]) => {
      try {
        const res = await axios.post(
          routes.backend.trip.ItemMaster,
          data,
        );
        return res.data;
      } catch (error) {
        console.error("Error creating Item:", error);
        message.error("Error creating Item");
        throw error;
      }
    },
    async onSuccess() {
      toast.success('Item added successfully', {
        id: 'addItem',
        duration: 2000
      });
      await queryClient.invalidateQueries({
        queryKey: ['itemMaster'],
        exact: true
      })
    },
  });
}

// https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruckNames&customer_id=1003

// {
//     "itemCount": 1,
//     "body": [
//         {
//             "id": "2",
//             "name": "Tata Prima",
//             "customer": "1003"
//         }
//     ]
// }


export const useGetItemMaster = (customerid: string) => {
  return useQuery<GetApiResponse<{
    id: number
    name: string
    customer: number
  }>>({
    queryKey: ['itemMaster'],
    queryFn: async () => {
      try {
        const res = await axios.get(
          routes.backend.trip.GetItemMaster + '&customer_id=' + customerid,
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching Item Master");
        return [];
      }
    },
  });
}


// deleteTripDetail

export const useDeleteTripDetail = () => {
  return useMutation({
    mutationFn: async (data: {
      id: number
    }[]) => {
      try {
        const res = await axios.post(
          routes.backend.trip.deleteTripDetail,
          data,
        );
        return res.data;
      } catch (error) {
        console.error("Error deleting data:", error);
        message.error("Error deleting data");
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    }
  });
}

// https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=analyticsOfTyre&customer_id=1001



interface Tyre {
  wheels: string;
  axtyre: string;
  total_tyres: string;
  total_axles: string;
  pressure_id: string;
  truck_id: string;
  tyre_position: string;
  tyre_pressure: string;
  recorded_at: string;
  Depth: string;
  Toberun: string;
}

interface Analytics {
  name: string;
  value: number;
}


export const useGetTyreAnalyticsByCustomer = (customer_id: string) => {
  return useQuery<{
    body: Tyre[];
    analytics: Analytics[];
  }>({
    queryKey: ['tyreAnalyticsByCustomer'],
    queryFn: async () => {
      try {
        const res = await axios.get(
          routes.backend.dashboard.analyticsOfTyre + '&customer_id=' + customer_id,
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching tyre analytics");
        return [];
      }
    },
  });
}


// getdatbyaktyresByCustomerId

// {
//   "itemCount": 2,
//   "body": {
//       "product": [
//           {
//               "name": "paper"
//           },
//           {
//               "name": "paper"
//           }
//       ],
//       "quantity": [
//           {
//               "name": 1
//           },
//           {
//               "name": 2
//           }
//       ],
//       "rate": [
//           {
//               "name": 20000
//           },
//           {
//               "name": 40000
//           }
//       ]
//   }
// }

interface Product {
  name: string;
}
interface Quantity {
  name: number;
}
interface Rate {
  name: number;
}
interface AnalyticsData {
  product: Product[];
  quantity: Quantity[];
  rate: Rate[];
}

export const useGetAnalyticsByCustomer = (customer_id: string) => {
  return useQuery<{
    itemCount: number;
    body: AnalyticsData;
  }>({
    queryKey: ['analyticsByCustomer'],
    queryFn: async () => {
      try {
        const res = await axios.get(
          routes.backend.dashboard.getdatbyaktyresByCustomerId + '&customer_id=' + customer_id,
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching analytics");
        return [];
      }
    },
  });
}
