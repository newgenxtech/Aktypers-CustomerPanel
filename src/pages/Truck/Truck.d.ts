
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
    truckid?: string;
}

export interface ITruckConfig {
    truck_id: string;
    truck_type: string;
    total_tyres: string;
    axle_configuration: string;
    total_axles: string;
    axtyre: string;
    config: string;
}