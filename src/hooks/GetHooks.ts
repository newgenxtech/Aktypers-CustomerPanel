import { useQuery } from "@tanstack/react-query";
import { GetApiCustomerRoutes } from "./ApiCustomHook";
import { DriverMaster } from "@/pages/Driver/Driver.Interface";
import { GetApiResponse } from "@/Interfaces/interface";
import { routes } from "@/routes/routes";

export const useGetDriverData = (customer_id: string) => {
    return useQuery<GetApiResponse<DriverMaster>>({
        queryKey: ['drivers'],
        queryFn: () => GetApiCustomerRoutes(
            routes.backend.driver.getAll + customer_id,
            'DummyToken'
        ).then((res) => res as GetApiResponse<DriverMaster>),
    });
};
 