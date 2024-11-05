import { useQuery } from "@tanstack/react-query";
import { GetApiCustomerRoutes } from "./ApiCustomHook";
import { DriverMaster } from "@/pages/Driver/Driver.Interface";
import { GetApiResponse } from "@/Interfaces/interface";
import { routes } from "@/routes/routes";
import { AlloyMaster } from "@/pages/Alloy/Alloy.Interface";

export const useGetDriverData = (customer_id: string) => {
    return useQuery<GetApiResponse<DriverMaster>>({
        queryKey: ['drivers'],
        queryFn: () => GetApiCustomerRoutes(
            routes.backend.driver.getAll + customer_id,
            'DummyToken'
        ).then((res) => res as GetApiResponse<DriverMaster>),
    });
};

export const useGetAlloyData = (customer_id: string) => {
    return useQuery<GetApiResponse<AlloyMaster>>({
        queryKey: ['alloy'],
        queryFn: () => GetApiCustomerRoutes(
            routes.backend.alloy.getAll + customer_id,
            'DummyToken'
        ).then((res) => res),
    });
};
