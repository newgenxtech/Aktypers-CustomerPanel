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
            getTruckConfig: `${base}?route=gettruckconfig`,
            getTruckMakersByCustomerId: `${base}?route=getTruckMakersByCustomerId&customer_id=`,
            getTruckIdsAndGroupByBrand: `${base}?route=insertTruckIdsAndGroupByBrand&customer_id=`,
            // https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=gettruckconfig
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

            createTyre: `${base}?route=createTyre`,

            updateTyre: `${base}?route=editTyre`,

        },
        insurance: {
            create: `${base}?route=createInsurance`,
            update: `${base}?route=editInsurance`,
            getInsuranceByCustomerId: `${base}?route=getInsuranceByCustomerId&customer_id=`,
            deleteInsurance: `${base}?route=deleteInsurance`,
        },
        invoice: {
            getCustomerpayfilter: `${base}?route=getCustomerpayfilter`,

            getInvoiceFiles: `${base}?route=getInvoiceFiles&invoice_id=`,

        },

        complaints: {
            getComplaintsByCustomerId: `${base}?route=getComplaintsByCustomerId&customer_id=`,
        },

    },
};

