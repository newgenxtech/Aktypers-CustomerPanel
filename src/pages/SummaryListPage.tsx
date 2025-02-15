import { useState, useCallback } from 'react';
import { Input, Modal, Select } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { ColDef } from 'ag-grid-community';
import { useGetTripData } from '@/hooks/GetHooks';
import { Edit } from 'lucide-react';
import AgGridTable from '@/components/AgGridTable';
interface FilterData {
    arrivalDate: dayjs.Dayjs | null;
    returnDate: dayjs.Dayjs | null;
    truck: string;
    driver: string;
    returnDriver: string;
}
const SummaryListPage = () => {

    const {
        data: tripData,
        isLoading: tripDataLoading,
    } = useGetTripData(
        localStorage.getItem("customer_id") || ""
    )

    const [filterData, setFilterData] = useState<FilterData>({
        arrivalDate: null,
        returnDate: null,
        truck: '',
        driver: '',
        returnDriver: ''
    });

    const columnDefs: ColDef[]
        = [
            { field: 'sl_no', headerName: 'Sl No', sortable: true, filter: true },
            { field: 'truck_no', headerName: 'Truck No', sortable: true, filter: true },
            { field: 'driver_name', headerName: 'Driver name', sortable: true, filter: true },
            { field: 'return_driver_name', headerName: 'Return Driver name', sortable: true, filter: true },
            { field: 'loading_date', headerName: 'Loading Date', sortable: true, filter: true },
            { field: 'unloading_date', headerName: 'Unloading Date', sortable: true, filter: true },
            { field: 'from', headerName: 'From', sortable: true, filter: true },
            { field: 'to', headerName: 'To', sortable: true, filter: true },
            { field: 'total', headerName: 'Total', sortable: true, filter: true },
            {
                headerName: 'Actions',
                cellRenderer: () => (
                    <div
                        className='cursor-pointer flex justify-center items-center'
                    >
                        <Edit
                            onClick={
                                () => {
                                    Modal.info({
                                        title: 'Edit Trip',
                                        content: (
                                            <div>
                                                <p>Edit Trip</p>
                                            </div>
                                        ),
                                        onOk() { },
                                    });
                                }
                            }
                        />
                    </div>
                ),
                width: 100
            },
        ];

    const handleSearch = useCallback((value: string) => {
        // Implement search functionality
    }, []);

    return (
        <div className='summary'>
            <div className="flex flex-col space-y-4 p-4">
                <div className="flex flex-wrap gap-4 items-center">
                    <DatePicker
                        placeholder="Arrival Date"
                        onChange={(date) => setFilterData({ ...filterData, arrivalDate: date })}
                    />
                    <DatePicker
                        placeholder="Return Date"
                        onChange={(date) => setFilterData({ ...filterData, returnDate: date })}
                    />
                    <Input
                        placeholder="Select Truck"
                        onChange={(e) => setFilterData({ ...filterData, truck: e.target.value })}
                        className="max-w-[200px]"
                    />
                    <Input
                        placeholder="Select Driver"
                        onChange={(e) => setFilterData({ ...filterData, driver: e.target.value })}
                        className="max-w-[200px]"
                    />
                    <Input
                        placeholder="Select Return Driver"
                        onChange={(e) => setFilterData({ ...filterData, returnDriver: e.target.value })}
                        className="max-w-[200px]"
                    />
                </div>

                <div className="flex items-center">
                    <h2 className="text-xl font-bold">Summary Details</h2>
                </div>

                <div className="flex items-center">
                    <Input
                        placeholder="Search"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="max-w-[200px]"
                    />
                    <Select
                        className="ml-4"
                        defaultValue="10"
                        style={{ width: 200 }}
                    >
                        <Select.Option value="10">10 entries per page</Select.Option>
                        <Select.Option value="25">25 entries per page</Select.Option>
                        <Select.Option value="50">50 entries per page</Select.Option>
                    </Select>
                </div>
                <AgGridTable
                    data={
                        tripData?.body.map((trip, index) => ({
                            sl_no: index + 1,
                            truck_no: trip.truck_no,
                            driver_name: trip.driver,
                            return_driver_name: trip.Rdriver,
                            loading_date: trip.trip_date,
                            unloading_date: trip.reverse_date,
                            from: trip.Rfrom,
                            to: trip.Rto,
                            total: trip.supertotal
                        })) || []
                    }
                    columns={columnDefs}
                    isLoading={tripDataLoading}
                    defaultColDef={{
                        flex: 0,
                        autoHeight: true,
                    }}
                />
            </div>
        </div>
    );
}

export default SummaryListPage;