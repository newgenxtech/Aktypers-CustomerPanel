import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
            customer_id: localStorage.getItem('customer_id') || '',
            // customer_id: '1006',
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

import { queryClient } from "./queryClient";
import toast from "react-hot-toast";
import { readFileAsBase64 } from "@/lib/utils";
import { MessageInstance } from "antd/es/message/interface";
import { TyresMaster } from "@/pages/Tyres/Tyres";

export const useCreateTrip = (
  isEdit: boolean) => {
  return useMutation({
    mutationFn: async (data: TripData & {
      customerid: string,
      customer: string
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

interface Product {
  name: string;
}
interface Quantity {
  name: number;
}
interface Rate {
  name: number;
}
export interface AnalyticsData {
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


export interface UserProfile {
  login_id: string;
  username: string;
  email: string;
  customer_id: string;
  name: string;
  companyname: string;
  companyAddress: string;
  pic: string;
}

export const useGetUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: async () => {
      try {
        const customerId = localStorage.getItem('customer_id') || '1001';
        const response = await axios.get(
          routes.backend.profile.getUserProfile + customerId
        );
        if (!response.data?.body?.[0]) {
          throw new Error('Profile data not found');
        }
        return response.data.body[0];
      } catch (error) {
        console.error('Error fetching profile:', error);
        message.error('Failed to load profile data');
        throw error;
      }
    },
  });
};

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: string) => {
      // const formData = new FormData();
      // formData.append('customer_id', localStorage.getItem('customer_id') || '1001');
      // formData.append('filename', file);

      const response = await axios.post(
        routes.backend.profile.uploadProfilePicture,
        {
          customer_id: localStorage.getItem('customer_id'),
          filename: file,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      message.success('Profile picture updated successfully');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error('Upload error:', error);
      message.error('Failed to update profile picture');
    },
  });
};





export const handleFileUpload = async (file: File) => {
  try {
    const base64Data = await readFileAsBase64(file);
    const response = await axios.post<{ message: string, file_name: string, location: string }[]>(
      routes.backend.file.upload + '?route=uploaddriverFile',
      [{
        filename: file.name,
        data: base64Data
      }]
    );

    return response.data;
  } catch (error) {
    console.error(error);
    message.error('Failed to upload file');
    return null;
  }
};


export interface OTPRequestPayload {
  email: string;
}

export interface OTPVerificationPayload {
  email: string;
  otp: string;
  new_password: string;
}

export interface AuthResponse {
  message: string;
  email_status?: boolean;
}

const AUTH_API_BASE = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php';

export const authService = {
  requestOTP: async (payload: OTPRequestPayload): Promise<AuthResponse> => {
    const response = await axios.post(
      `${AUTH_API_BASE}?route=requestOTP`,
      payload
    );
    return response.data;
  },

  verifyOTP: async (payload: OTPVerificationPayload): Promise<AuthResponse> => {
    const response = await axios.post(
      `${AUTH_API_BASE}?route=verifyOTP`,
      payload
    );
    return response.data;
  }
};

export const useRequestOTP = () => {
  return useMutation({
    mutationFn: (payload: OTPRequestPayload) => authService.requestOTP(payload),
    onSuccess: (data) => {
      if (data.email_status) {
        message.success('OTP sent successfully');
      } else {
        message.error(data.message);
      }
    },
    onError: () => {
      message.error('Failed to send OTP');
    }
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: (payload: OTPVerificationPayload) => authService.verifyOTP(payload),
    onSuccess: (data) => {
      if (data.message === 'Password updated successfully.') {
        message.success('Password updated successfully');
      } else {
        message.error(data.message);
      }
    },
    onError: () => {
      message.error('Failed to verify OTP');
    }
  });
};

export const useDriverOperations = (messageApi: MessageInstance) => {
  const queryClient = useQueryClient();

  const createDriver = useMutation({
    mutationFn: async (data: DriverMaster) => {
      // messageApi.loading('Creating driver...');
      messageApi.open({
        key: "updatable",
        type: 'loading',
        content: 'Loading...',
      })
      const response = await axios.post(routes.backend.driver.create, {
        ...data,
        customerid: localStorage.getItem('customer_id')
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message === 'Record created successfully.') {
        // message.success(data?.data?.message || 'Driver created successfully');
        messageApi.open({
          key: "updatable",
          type: 'success',
          content: data?.data?.message || 'Record created successfully.',
          duration: 2
        })
      } else {
        messageApi.open({
          key: "updatable",
          type: 'error',
          content: data?.data?.message || 'Failed to create driver',
          duration: 5
        })
      }
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
    onError: (error: any) => {
      // message.error(error?.response?.data?.message || 'Failed to create driver');
      messageApi.open({
        key: "updatable",
        type: 'error',
        content: error?.response?.data?.message || 'Failed to create driver',
        duration: 2
      })
    }
  });

  const updateDriver = useMutation({
    mutationFn: async (data: DriverMaster) => {
      // message.loading('Updating driver...');
      messageApi.open({
        key: "updatable",
        type: 'loading',
        content: 'Loading...',
      })
      const response = await axios.post(routes.backend.driver.update, {
        ...data,
        customerid: localStorage.getItem('customer_id')
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data?.message === "Record updated successfully.") {
        // message.success(data?.data?.message || 'Driver updated successfully');
        messageApi.open({
          key: "updatable",
          type: 'success',
          content: data?.data?.message || 'Driver updated successfully',
          duration: 2
        })
      } else {
        messageApi.open({
          key: "updatable",
          type: 'error',
          content: data?.data?.message || 'Failed to update driver',
          duration: 5
        })
      }
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
    onError: (error: any) => {
      // message.error(error?.response?.data?.message || 'Failed to update driver');
      messageApi.open({
        key: "updatable",
        type: 'error',
        content: error?.response?.data?.message || 'Failed to update driver',
        duration: 2
      })
    }
  });

  return {
    createDriver,
    updateDriver
  };
};


export const useTruckOperations = () => {
  const queryClient = useQueryClient();

  const createTruck = useMutation({
    mutationFn: async (data: ITruckData) => {
      message.loading({ content: 'Creating truck...', key: 'truckOperation' });
      const response = await axios.post(routes.backend.truck.create, {
        ...data,
        customerid: localStorage.getItem('customer_id'),
        wheels: data.tyre_type.split('Tyres')[0]
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message === "Record created successfully.") {
        message.success({
          content: data?.data?.message || 'Truck created successfully',
          key: 'truckOperation'
        });
        queryClient.invalidateQueries({ queryKey: ['trucks'] });
      } else {
        message.error({
          content: data?.data?.message || 'Failed to create truck',
          key: 'truckOperation'
        });
      }
    },
    onError: (error: any) => {
      message.error({
        content: error?.response?.data?.message || 'Failed to create truck',
        key: 'truckOperation'
      });
    }
  });

  const updateTruck = useMutation({
    mutationFn: async (data: ITruckData & { id: string }) => {
      message.loading({ content: 'Updating truck...', key: 'truckOperation' });
      const response = await axios.post(routes.backend.truck.update, {
        ...data,
        customerid: localStorage.getItem('customer_id'),
        wheels: data.tyre_type.split('Tyres')[0]
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message === "Record updated successfully.") {
        message.success({
          content: data?.data?.message || 'Truck updated successfully',
          key: 'truckOperation'
        });
        queryClient.invalidateQueries({ queryKey: ['trucks'] });
      } else {
        message.error({
          content: data?.data?.message || 'Failed to update truck',
          key: 'truckOperation'
        });
      }
    },
    onError: (error: any) => {
      message.error({
        content: error?.response?.data?.message || 'Failed to update truck',
        key: 'truckOperation'
      });
    }
  });

  return {
    createTruck,
    updateTruck
  };
};




export const useTyresOperations = () => {
  const queryClient = useQueryClient();

  const createTyres = useMutation({
    mutationFn: async (data: TyresMaster & { Vehicle_Registration_Number: string }) => {
      message.loading({ content: 'Creating tyre...', key: 'tyreOperation' });
      const totalCoveredKM = parseInt(data.Removal_KM) - parseInt(data.Fitment_KM);
      
      const response = await axios.post(routes.backend.tyre.createTyre, {
        ...data,
        Total_Covered_KM: totalCoveredKM,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message === "Tyre record created successfully.") {
        message.success({
          content: data?.data?.message || 'Tyre created successfully',
          key: 'tyreOperation',
          duration: 2
        });
        queryClient.invalidateQueries({ queryKey: ['tyres'] });
      } else {
        message.error({
          content: data?.data?.message || 'Failed to create tyre',
          key: 'tyreOperation',
          duration: 2
        });
      }
    },
    onError: (error: any) => {
      message.error({
        content: error?.response?.data?.message || 'Failed to create tyre',
        key: 'tyreOperation',
        duration: 2
      });
    }
  });

  const updateTyres = useMutation({
    mutationFn: async (data: TyresMaster & { id: string }) => {
      message.loading({ content: 'Updating tyre...', key: 'tyreOperation' });
      const totalCoveredKM = parseInt(data.Removal_KM) - parseInt(data.Fitment_KM);
      
      const response = await axios.post(routes.backend.tyre.updateTyre, {
        ...data,
        Total_Covered_KM: totalCoveredKM,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message === "Tyre record updated successfully.") {
        message.success({
          content: data?.data?.message || 'Tyre updated successfully',
          key: 'tyreOperation',
          duration: 2
        });
        queryClient.invalidateQueries({ queryKey: ['tyres'] });
      } else {
        message.error({
          content: data?.data?.message || 'Failed to update tyre',
          key: 'tyreOperation',
          duration: 2
        });
      }
    },
    onError: (error: any) => {
      message.error({
        content: error?.response?.data?.message || 'Failed to update tyre',
        key: 'tyreOperation',
        duration: 2
      });
    }
  });

  return {
    createTyres,
    updateTyres
  };
};