import { base } from "@/config/config";

export const routes = {
    frontend: {
        auth: {
            login: '/login',
        },
        driver: {
            list: '/driver',
            create: '/driver/create',
            edit: '/driver/edit/:id',
        },
        truck: {
            list: '/truck',
            create: '/truck/create',
            edit: '/truck/edit/:id',
        },
        trip: {
            list: '/trip',
            create: '/trip/create',
            edit: '/trip/edit/:id',
        },
    },
    backend: {
        auth: {
            // login: `${base}?route=login`,
            login: 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=login',
            signup: `${base}?route=signup`,
        },
        driver: {
            getAll: `${base}?route=getDriver&customer_id=`,
            create: `${base}?route=createDriver`,
            update: `${base}?route=updateDriver`,
            uploadDriverFile: `${base}?route=uploaddriverFile`,
        },
        truck: {
            getAll: `${base}?route=getTruck&customer_id=`,
            create: `${base}?route=createTruck`,
            update: `${base}?route=updateTruck`,
            uploadTruckFile: `${base}?route=uploadtruckFile`,
        },
        trip: {
            getAll: `${base}?route=gettrip&customer_id=`,
            create: `${base}?route=createTrip`,
            update: `${base}?route=updateTrip`,
            uploadTripFile: `${base}?route=uploadtripFile`,
        },
        file: {
            upload: `${base}`,
            download: `https://aktyres-in.stackstaging.com/php-truck/class/`,
        },
        alloy: {
            getAll: `${base}?route=getAlloyByCustomer&customer_id=`,
        },
        tyre: {
            getLatestTyrePressureDetails: `${base}?route=getLatestTyrePressureDetails&truck_id=`,
            getTyreDetails: `${base}?route=getTyreDetails&truck_id=`,

            getTyreDetailsByCustomer: `${base}?route=getTyreDetailsByCustomer`,
            // {
            //     "truck_id": 1,
            //     "from_date": "2024-01-01",
            //     "to_date": "2024-11-30",
            //     "customerid": 123
            // }
            createTyre: `${base}?route=createTyre`,
            // {
            //     "Wheeler_Type": "4 Wheeler",
            //     "Manufacturer": "Toyota",
            //     "Brand": "Michelin",
            //     "Tyre_Serial_Number": "TYR123456",
            //     "Fitment_KM": 10000,
            //     "Removal_KM": 25000,
            //     "Total_Covered_KM": 15000,
            //     "Retread_Yes_No": "No",
            //     "Reason_for_Removal_MONTH": "Wear",
            //     "Date": "2024-11-20",
            //     "position": "Front Left",
            //     "Vehicle_Registration_Number": "2"
            // }

            // {
            //     "message": "Tyre record created successfully."
            // }
            updateTyre: `${base}?route=editTyre`,
            // {
            //     "id": 1,
            //     "Wheeler_Type": "4 Wheeler",

            //     "Vehicle_Registration_Number": "1"
            // }


        },
        insurance: {
            // https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createInsurance
            create: `${base}?route=createInsurance`,
            //             BODY 
            // [{
            //                 "customer_id": 101,
            //                 "vehicle_id": 501,
            //                 "insurance_number": "INS123456",
            //                 "insurance_name": "ICICI Lombard Policy",
            //                 "filename": "policy_file_123.pdf",
            //                 "purchase_date": "2023-01-15",
            //                 "expiry_date": "2024-01-14"
            //             }
            //             ]
            // RESPONSE :

            // {
            //     "message": "Insurance records created successfully."
            // }

            // https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=editInsurance
            update: `${base}?route=editInsurance`,
            //             BODY 
            //             {
            //     "insurance_id": 1,
            //         "insurance_name": "ICICI Lombard - Updated",
            //             "filename": "updated_policy_file_123.pdf",
            //                 "purchase_date": "2023-01-20",
            //                     "expiry_date": "2024-01-19"
            // }

            // this body is dynamic what we need to edit that oine is enough to edit
            // RESPONSE:

            // {
            //     "message": "Insurance record updated successfully."
            // }
            // https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getInsuranceByCustomerId&customer_id=101
            getInsuranceByCustomerId: `${base}?route=getInsuranceByCustomerId&customer_id=`,
            //             RESPONSE 
            // [
            //     {
            //         "insurance_id": "1",
            //         "customer_id": "101",
            //         "vehicle_id": "501",
            //         "insurance_number": "INS123456",
            //         "insurance_name": "ICICI Lombard - Updated",
            //         "filename": "updated_policy_file_123.pdf",
            //         "purchase_date": "2023-01-20",
            //         "expiry_date": "2024-01-19",
            //         "created_at": "2023-01-15 10:30:00",
            //         "updated_at": "2025-01-04 08:35:51"
            //     }
            // ]
            // https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=deleteInsurance
            deleteInsurance: `${base}?route=deleteInsurance`,
            //             BODY 

            //             {
            //     "insurance_id": 1
            // }


            // RESPONSE
            // {
            //     "message": "Insurance record deleted successfully."
            // }

        }
    },
};