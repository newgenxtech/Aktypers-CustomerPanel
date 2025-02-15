import { useState, useCallback } from 'react';
import { Input, Select } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from '@/components/ui/button';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { ColDef } from 'ag-grid-community';

const SummaryListPage = () => {
    interface FilterData {
        arrivalDate: dayjs.Dayjs | null;
        returnDate: dayjs.Dayjs | null;
        truck: string;
        driver: string;
        returnDriver: string;
    }

    const [filterData, setFilterData] = useState<FilterData>({
        arrivalDate: null,
        returnDate: null,
        truck: '',
        driver: '',
        returnDriver: ''
    });

    const columnDefs: ColDef[]
        = [
            {
                headerName: 'Actions',
                cellRenderer: () => (
                    <Button
                        onClick={() => { }}
                        className="bg-[#69C6DE] text-white hover:bg-[#69C6DE] hover:text-white"
                    >
                        EDIT
                    </Button>
                ),
                width: 100
            },
            { field: 'sl_no', headerName: 'Sl No', sortable: true, filter: true },
            { field: 'truck_no', headerName: 'Truck No', sortable: true, filter: true },
            { field: 'driver_name', headerName: 'Driver name', sortable: true, filter: true },
            { field: 'return_driver_name', headerName: 'Return Driver name', sortable: true, filter: true },
            { field: 'loading_date', headerName: 'Loading Date', sortable: true, filter: true },
            { field: 'unloading_date', headerName: 'Unloading Date', sortable: true, filter: true },
            { field: 'from', headerName: 'From', sortable: true, filter: true },
            { field: 'to', headerName: 'To', sortable: true, filter: true },
            { field: 'total', headerName: 'Total', sortable: true, filter: true }
        ];

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        resizable: true,
    };

    // Sample data - Replace this with your actual API data
    const rowData = [
        {
            sl_no: '1',
            truck_no: 'ABC123',
            driver_name: 'John Doe',
            return_driver_name: 'John Doe',
            loading_date: '2024-09-18',
            unloading_date: '2024-09-24',
            from: 'Vellore',
            to: 'Chennai',
            total: 498
        },
        // Add more data as needed
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

                <div className="ag-theme-alpine w-full h-[600px]">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={10}
                        animateRows={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default SummaryListPage;