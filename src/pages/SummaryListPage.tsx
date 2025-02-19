/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef } from 'react';
import { Input, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { ColDef } from 'ag-grid-community';
import { useCreateTrip, useCreateTripDetail, useGetDriverData, useGetItemMaster, useGetTripData, useGetTruckData } from '@/hooks/GetHooks';
import { Edit, Search } from 'lucide-react';
import AgGridTable from '@/components/AgGridTable';
import { Button } from '@/components/ui/button';
import { CustomCellRendererProps } from 'ag-grid-react';
import TripModal, { FormValues } from '@/components/Summary/TripModal';
import toast from 'react-hot-toast';
import { TripDetails } from './Trip/Trip';


export interface FilterData {
    arrivalDate: dayjs.Dayjs | null;
    returnDate: dayjs.Dayjs | null;
    truck: string;
    driver: string;
    returnDriver: string;
}

const SummaryListPage = () => {
    // const [pageSize, setPageSize] = useState<number>(10);
    const [, setSearchText] = useState<string>('');
    const gridRef = useRef<any>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);

    const createTrip = useCreateTrip();

    const createTripDetail = useCreateTripDetail();

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

    const {
        data: truckData,
        isLoading: truckDataLoading,
    } = useGetTruckData(
        localStorage.getItem("customer_id") || ""
    )

    const {
        data: itemMasterData,
        isLoading: itemMasterLoading
    } = useGetItemMaster(
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
        {
            field: 'loading_date',
            headerName: 'Loading Date',
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


    const handleEdit = (data: TripDetails) => {
        console.log('Edit data:', data);
        const formattedData = {
            ...data,
            current_km: data.current_km,
            loading_date: data.trip_date,
            driver: data.driverid,
            truck_no: data.truck_no,
            from_location: data.from_location,
            to_location: data.to_location,
            trip_items: data.trip_items || '[]',
            expenses: data.expense_items || '[]'
        };
        setSelectedTrip(formattedData);
        setIsModalOpen(true);
        setIsEdit(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTrip(null);
    };

    const handleModalSubmit = async (values: FormValues) => {
        console.log('Form values:', values);
        toast.loading('Creating Trip...', {
            id: 'tripDataloading',
            duration: 0
        });

        try {
            // Create the trip
            const tripResponse = await createTrip.mutateAsync({
                truck_no: values.truckNumber,
                driverid: values.driverId,
                to_location: values.to,
                from_location: values.from,
                trip_date: dayjs(values.date).format('YYYY-MM-DD'),
                current_km: values.currentMileage.toString(),
                customerid: localStorage.getItem("customer_id") || "",
                supertotal: values.items
                    .reduce((acc, item) => acc + item.weight * item.tonageRate, 0).toString(),
            });

            if (tripResponse?.trip_details?.id) {
                // Prepare Normal and Expense items
                const NormalItems = values.items.map((item) => ({
                    "item": item.item ?? 0,
                    "driver_advance": 0,
                    "balance": 0,
                    "is_single": 0,
                    "tripid": tripResponse.trip_details.id,
                    "tonnage_rate": item.tonageRate.toString(),
                    "weight": item.weight.toString(),
                    "total": item.weight * item.tonageRate,
                    "remarks": item.remarks && item.remarks.length > 0 ? item.remarks : ""
                }));
                const ExpensesItems = values.expenses.map((item) => ({
                    "item": item.item ?? 0,
                    "driver_advance": 0,
                    "balance": 0,
                    "is_single": 1,
                    "tripid": tripResponse.trip_details.id,
                    "weight": "0",
                    "tonnage_rate": "0",
                    "total": item.amount,
                    "remarks": item.remarks && item.remarks.length > 0 ? item.remarks : ""
                }));

                // Create trip details
                await createTripDetail.mutateAsync([...NormalItems, ...ExpensesItems]);

                toast.success('Trip Created Successfully', {
                    id: 'tripDataloading',
                    duration: 2000
                });
                setIsModalOpen(false);
                setSelectedTrip(null);
            }
        } catch (error) {
            console.error('Error creating trip:', error);
            toast.error('Failed to create trip', {
                id: 'tripDataloading',
                duration: 2000
            });
        }
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
                    data={
                        tripData && tripData.body &&
                        tripData?.body.map((trip, index) => ({
                            sl_no: index + 1,
                            registration_number: truckData?.body.find((truck) => truck.id === trip.truck_no)?.registration_number,
                            driver_name: driverData?.body.find((driver) => driver.id === trip.driverid)?.name,
                            loading_date: trip.trip_date,
                            from: trip.from_location,
                            to: trip.to_location,
                            total: trip.supertotal,
                            ...trip
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
                    truckData={truckData?.body || []}
                    truckLoading={truckDataLoading}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    itemMasterData={itemMasterData?.body || []}
                    itemMasterLoading={itemMasterLoading}
                />
            </div>
        </div>
    );
}

export default SummaryListPage;