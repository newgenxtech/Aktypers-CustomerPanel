// "id": "1",
// "customerid": "1001",
// "registration_number": "ABC1234",
// "chassis_number": "CH123456789",
// "engine_number": "EN987654321",
// "make": "Toyota",
// "model": "mahindra",
// "year_of_manufacture": "0000",
// "wheels": "12",
// "tyre_type": "3",
// "load_capacity": "1500.00",
// "fuel_type": "Diesel",
// "insurance_number": "",
// "insurance_expiry_date": "2024-12-31",
// "last_service_date": "2023-06-01",
// "remarks": "No issues",
// "rc_book": "",
// "insurance": "",
// "pic": ""


export type ITruckData = {
    id: string;
    customerid: string;
    registration_number: string;
    chassis_number: string;
    engine_number: string;
    make: string;
    model: string;
    year_of_manufacture: string;
    wheels: string;
    tyre_type: string;
    load_capacity: string;
    fuel_type: string;
    insurance_number: string;
    insurance_expiry_date: string;
    last_service_date: string;
    remarks: string;
    rc_book: string;
    insurance: string;
    pic: string;
}