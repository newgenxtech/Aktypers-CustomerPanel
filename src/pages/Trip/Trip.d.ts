export interface TripDetails {
    sl_no: number;
    truck_no: string;
    loading_date: string; // Consider using Date if it's parsed from a string
    from: string;
    to: string;
    total: string;
    id: string;
    driver: string | null;
    Rdriver: string | null;
    from_location: string;
    to_location: string;
    trip_date: string; // Consider using Date
    reverse_date: string | null;
    Rfrom: string | null;
    Rto: string | null;
    remark: string | null;
    reverse_remark: string | null;
    current_km: string;
    fuel_level: string | null;
    complaint: string | null;
    tyre_condition: string | null;
    mobile_number: string | null;
    Rmobile_number: string | null;
    broker: string | null;
    broker1: string | null;
    driverexpense: string | null;
    Rdriverexpense: string | null;
    supertotal: string;
    trip_items: string | null;
  }

