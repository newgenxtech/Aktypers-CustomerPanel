import { useQuery } from "@tanstack/react-query";
import { GetApiCustomerRoutes, PostApiCustomerRoutes } from "./ApiCustomHook";

import { GetApiResponse } from "@/Interfaces/interface";
import { routes } from "@/routes/routes";

import { ITyrePressure } from "@/pages/TyprePressure/Tyre";
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


// // getTyreDetails
// export const useGetTyreDetails = (truck_id: string) => {
//     return useQuery<GetApiResponse<ITyrePressure>>({
//         queryKey: ['tyreDetails'],
//         queryFn: () => GetApiCustomerRoutes(
//             routes.backend.tyre.getTyreDetails + truck_id,
//             'DummyToken'
//         ).then((res) => res as GetApiResponse<ITyrePressure>),
//         enabled: truck_id ? true : false
//     });
// }