import { useQuery } from "@tanstack/react-query";
import { GetApiCustomerRoutes, PostApiCustomerRoutes } from "./ApiCustomHook";

import { GetApiResponse } from "@/Interfaces/interface";
import { routes } from "@/routes/routes";

import { DriverMaster } from "@/pages/Driver/Driver.d"; // Add this line to import DriverMaster
import { AlloyMaster } from "@/pages/Alloy/Alloy.d";
import { ITruckData } from "@/pages/Truck/Truck.d";

export const useGetDriverData = (customer_id: string) => {
    return useQuery<GetApiResponse<DriverMaster>>({
        queryKey: ['drivers'],
        queryFn: () => GetApiCustomerRoutes(
            routes.backend.driver.getAll + customer_id,
            'DummyToken'
        ).then((res) => res as GetApiResponse<DriverMaster>),
    });
};



export const useGetAlloyData = (customer_id: string,
    fromDate: string, toDate: string) => {
    return useQuery<AlloyMaster[]>({
        queryKey: ['alloy'],
        queryFn: () => PostApiCustomerRoutes(
            routes.backend.alloy.getAll + customer_id,
            {
                from_date: fromDate,
                to_date: toDate
            }
        ).then((res) => res),

    });
};

// getTruckData
export const useGetTruckData = (customer_id: string) => {
    return useQuery<GetApiResponse<ITruckData>>({
        queryKey: ['trucks'],
        queryFn: () => GetApiCustomerRoutes(
            routes.backend.truck.getAll + customer_id,
            'DummyToken'
        ).then((res) => res as GetApiResponse<ITruckData>),
    });
}


export const useGetTruckDemensionDetails = (SelectedTruckId: string | undefined) => {
    return useQuery<GetApiResponse<{
        wheels: string; //!  number and its a count of the wheels
        axtyre: string; //!  array of objects and its a count of the axles
        total_tyres: string; //!  number and its a count of the total tyres
        total_axles: string; //!  number and its a count of the total axles
        config: string; //!  number and its a count of the total axles
    }>>({
        queryKey: ['TruckDemensionDetails', SelectedTruckId],
        queryFn: () => GetApiCustomerRoutes(
            routes.backend.tyre.getTyreDetails + SelectedTruckId,
            'DummyToken'
        ).then((res) => res as GetApiResponse<{
            wheels: string; //!  number and its a count of the wheels
            axtyre: string; //!  array of objects and its a count of the axles
            total_tyres: string; //!  number and its a count of the total tyres
            total_axles: string; //!  number and its a count of the total axles
            config: string; //!  number and its a count of the total axles
        }>),
        refetchOnWindowFocus: false,
        enabled: !!SelectedTruckId
    });
}
