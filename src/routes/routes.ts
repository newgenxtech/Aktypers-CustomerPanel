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
            download: `${base}`,
        },
        alloy: {
            getAll: `${base}?route=getAlloyByCustomer&customer_id=`,
        }
    },
};