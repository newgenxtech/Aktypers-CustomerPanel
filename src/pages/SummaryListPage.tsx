/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef } from 'react';
import { Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { ColDef } from 'ag-grid-community';
import { useGetDriverData, useGetTripData } from '@/hooks/GetHooks';
import { Edit, Search } from 'lucide-react';
import AgGridTable from '@/components/AgGridTable';
import { Button } from '@/components/ui/button';
import { CustomCellRendererProps } from 'ag-grid-react';
import TripModal from '@/components/Summary/TripModal';

export interface FilterData {
    arrivalDate: dayjs.Dayjs | null;
    returnDate: dayjs.Dayjs | null;
    truck: string;
    driver: string;
    returnDriver: string;
}
const SummaryListPage = () => {
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>('');
    const gridRef = useRef<any>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);

    const {
        data: tripData,
        isLoading: tripDataLoading,
    } = useGetTripData(
        localStorage.getItem("customer_id") || ""
    );

    const {
        data: driverData,
        isLoading: driverDataLoading,
    } = useGetDriverData(
        localStorage.getItem("customer_id") || ""
    )

    const [filterData, setFilterData] = useState<FilterData>({
        arrivalDate: null,
        returnDate: null,
        truck: '',
        driver: '',
        returnDriver: ''
    });

    const columnDefs: ColDef[] = [
        { field: 'sl_no', headerName: 'Sl No', sortable: true, filter: true, width: 80 },
        { field: 'truck_no', headerName: 'Truck No', sortable: true, filter: true },
        { field: 'driver_name', headerName: 'Driver name', sortable: true, filter: true },
        { field: 'return_driver_name', headerName: 'Return Driver name', sortable: true, filter: true },
        {
            field: 'loading_date',
            headerName: 'Loading Date',
            sortable: true,
            filter: true,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY')
        },
        {
            field: 'unloading_date',
            headerName: 'Unloading Date',
            sortable: true,
            filter: true,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY')
        },
        { field: 'from', headerName: 'From', sortable: true, filter: true },
        { field: 'to', headerName: 'To', sortable: true, filter: true },
        { field: 'total', headerName: 'Total', sortable: true, filter: true },
        {
            headerName: 'Actions',
            cellRenderer: (params: CustomCellRendererProps) => (
                <div
                    onClick={() => handleEdit(params.data)}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Edit className=" text-gray-600 hover:text-blue-600" />
                </div>
            ),
            width: 100,
            suppressMenu: true,
            sortable: false,
            filter: false,
            headerClass: 'text-center',
            cellStyle: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
    ];


    const handleSearch = useCallback((value: string) => {
        setSearchText(value);
        if (gridRef.current) {
            gridRef.current.api.setQuickFilter(value);
        }
    }, []);

    const handleFilter = useCallback(() => {
        if (!gridRef.current) return;

        const filterModel: any = {};

        if (filterData.truck) {
            filterModel.truck_no = {
                type: 'contains',
                filter: filterData.truck
            };
        }

        if (filterData.driver) {
            filterModel.driver_name = {
                type: 'contains',
                filter: filterData.driver
            };
        }

        if (filterData.returnDriver) {
            filterModel.return_driver_name = {
                type: 'contains',
                filter: filterData.returnDriver
            };
        }

        if (filterData.arrivalDate) {
            filterModel.loading_date = {
                type: 'equals',
                dateFrom: filterData.arrivalDate.startOf('day').toISOString()
            };
        }

        if (filterData.returnDate) {
            filterModel.unloading_date = {
                type: 'equals',
                dateFrom: filterData.returnDate.startOf('day').toISOString()
            };
        }

        gridRef.current.api.setFilterModel(filterModel);
    }, [filterData]);


    const handleEdit = (data: any) => {
        console.log('Edit data:', data);
        setSelectedTrip(data);
        setIsModalOpen(true);
        setIsEdit(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTrip(null);
    };

    const handleModalSubmit = (values: any) => {
        console.log('Form values:', values);
        // Implement your update logic here
        setIsModalOpen(false);
        setSelectedTrip(null);
    };

    return (
        <div className='summary bg-white rounded-lg shadow-sm'>
            <div className="flex flex-col space-y-4 p-6">

                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-800">Summary Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <DatePicker
                        placeholder="Arrival Date"
                        onChange={(date) => setFilterData({ ...filterData, arrivalDate: date })}
                        className="w-full"
                    />
                    <DatePicker
                        placeholder="Return Date"
                        onChange={(date) => setFilterData({ ...filterData, returnDate: date })}
                        className="w-full"
                    />
                    <Input
                        placeholder="Select Truck"
                        onChange={(e) => setFilterData({ ...filterData, truck: e.target.value })}
                        className="w-full"
                    />
                    <Input
                        placeholder="Select Driver"
                        onChange={(e) => setFilterData({ ...filterData, driver: e.target.value })}
                        className="w-full"
                    />
                    <div className="flex gap-2">
                        <Input
                            placeholder="Select Return Driver"
                            onChange={(e) => setFilterData({ ...filterData, returnDriver: e.target.value })}
                            className="w-full"
                        />
                        <Button
                            onClick={handleFilter}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="relative">
                        <Input
                            placeholder="Search"
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-8"
                        />
                        <Search className="h-4 w-4 absolute left-2 top-2 text-gray-400" />
                    </div>
                    <Button
                        onClick={() => {
                            setIsModalOpen(true)
                            setIsEdit(false)
                        }}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Add Summary
                    </Button>
                </div>

                <AgGridTable
                    data={tripData?.body.map((trip, index) => ({
                        sl_no: index + 1,
                        truck_no: trip.truck_no,
                        driver_name: trip.driver,
                        return_driver_name: trip.Rdriver,
                        loading_date: trip.trip_date,
                        unloading_date: trip.reverse_date,
                        from: trip.Rfrom,
                        to: trip.Rto,
                        total: trip.supertotal
                    })) || []}
                    columns={columnDefs}
                    isLoading={tripDataLoading}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        resizable: true,
                    }}
                />

                <TripModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit}
                    initialData={selectedTrip}
                    driverData={driverData?.body || []}
                    driverLoading={driverDataLoading}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                />
            </div>
        </div>
    );
}

export default SummaryListPage;