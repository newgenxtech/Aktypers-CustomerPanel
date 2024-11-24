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
            login: `${base}?route=login`,
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


        }
    },


};