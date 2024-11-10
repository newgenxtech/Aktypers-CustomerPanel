import { useQuery } from "@tanstack/react-query";
import { GetApiCustomerRoutes, PostApiCustomerRoutes } from "./ApiCustomHook";
import { DriverMaster } from "@/pages/Driver/Driver.Interface";
import { GetApiResponse } from "@/Interfaces/interface";
import { routes } from "@/routes/routes";
import { AlloyMaster } from "@/pages/Alloy/Alloy.Interface";
import { ITyrePressure } from "@/pages/TyprePressure/Interface.Tyre";

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

// getLatestTyrePressureDetails
export const useGetTyrePressureData = (truck_id: string) => {
    return useQuery<GetApiResponse<ITyrePressure>>({
        queryKey: ['tyre'],
        queryFn: () => GetApiCustomerRoutes(
            routes.backend.tyre.getLatestTyrePressureDetails + truck_id,
            'DummyToken'
        ).then((res) => res as GetApiResponse<ITyrePressure>),
    });
}