export interface TripDetails {
  sl_no: number;
  truck_no: string;
  loading_date: string; // Consider using Date if it's parsed from a string
  from: string;
  to: string;
  total: string;
  id: string;
  driverid: number;
  from_location: string;
  to_location: string;
  trip_date: string; // Consider using Date
  remark: string | null;
  current_km: string;
  supertotal: string;
  trip_items: string | null;
  expense_items: string | null;
  customer?: string;
  drivername?: string;
  registration_number?: string;
}

