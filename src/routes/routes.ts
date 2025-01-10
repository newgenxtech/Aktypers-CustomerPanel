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
            create: `${base}?route=createInsurance`,
            update: `${base}?route=editInsurance`,
            getInsuranceByCustomerId: `${base}?route=getInsuranceByCustomerId&customer_id=`,
            deleteInsurance: `${base}?route=deleteInsurance`,
        },
        invoice: {
            // 1)
            // https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomerpayfilter
            getCustomerpayfilter: `${base}?route=getCustomerpayfilter`,
            // Post Request to get the invoice data
            // {
            //     "customer_id": "1006"

            // } 

            // Response
            // [
            //     {
            //         "Date": "2024-10-16",
            //         "Invoiceid": "68",
            //         "Particulars": "SALES",
            //         "VCH_TYP": "SALES",
            //         "VCH_NO": null,
            //         "Debit": "30",
            //         "Credit": "30"
            //     },
            //     {
            //         "Date": "2024-10-16",
            //         "Invoiceid": "71",
            //         "Particulars": "SALES",
            //         "VCH_TYP": "SALES",
            //         "VCH_NO": null,
            //         "Debit": "16",
            //         "Credit": "0"
            //     }
            // ]

            // 2)
            // https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getInvoiceFiles&invoice_id=72,
            getInvoiceFiles: `${base}?route=getInvoiceFiles&invoice_id=`,
            // Response
            // [
            //     {
            //         "id": "1",
            //         "invoice_id": "72",
            //         "file_name": "uploads/1736278157_Aktypers New changes.pdf",
            //         "created_at": "2025-01-05 08:16:36",
            //         "updated_at": "2025-01-07 19:29:28"
            //     }
            // ]

        },
        // https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getComplaintsByCustomerId&customer_id=123
        complaints: {
            getComplaintsByCustomerId: `${base}?route=getComplaintsByCustomerId&customer_id=`,
        },
        // [
        //     {
        //         "complaint_id": "1",
        //         "customer_id": "123",
        //         "truck_id": "456",
        //         "filename": "example.jpg",
        //         "complaint_description": "Brake issue",
        //         "complaint_date": "2025-01-09 11:01:09",
        //         "status": "Resolved",
        //         "updated_by": "Admin",
        //         "updated_date": "2025-01-09 12:34:56"
        //     }
        // ]
    },
};

