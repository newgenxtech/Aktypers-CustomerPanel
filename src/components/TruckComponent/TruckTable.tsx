import React, { useMemo } from 'react';
import { Tooltip, Image, Modal, Space } from 'antd';
import { FileImage } from 'lucide-react';
import { ITruckData } from '@/pages/Truck/Truck.d';
import { routes } from "@/routes/routes";
import { CustomCellRendererProps } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, ColGroupDef } from 'ag-grid-community';
import AgGridTable from '../AgGridTable';

interface TruckTableProps {
    data: ITruckData[];
    isLoading: boolean;
    setOpen: (open: boolean) => void;
    setIsEdit: (isEdit: boolean) => void;
    setCurrentTruck: (truck: ITruckData | null) => void;
}

const TruckTable: React.FC<TruckTableProps> = ({ data, isLoading, setOpen, setIsEdit, setCurrentTruck }) => {
    const columns: (ColDef | ColGroupDef)[] = useMemo(() => [
        {
            headerName: 'S.N',
            field: 'sno',
            width: 80,
            minWidth: 0,
            flex: 0,
            autoHeight: false,
            valueGetter: 'node.rowIndex + 1'
        },
        {
            headerName: 'Registration Number',
            field: 'registration_number',
            cellRenderer: (params: CustomCellRendererProps) => (
                <span
                    className="text-[#00008B] font-semibold cursor-pointer text-base"
                    onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCurrentTruck(params.data);
                    }}
                >
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Chassis Number',
            field: 'chassis_number'
        },
        {
            headerName: 'Engine Number',
            field: 'engine_number'
        },
        {
            headerName: 'Make',
            field: 'make'
        },
        {
            headerName: 'Model',
            field: 'model'
        },
        {
            headerName: 'Year of Manufacture',
            field: 'year_of_manufacture'
        },
        {
            headerName: 'Wheels',
            field: 'wheels'
        },
        {
            headerName: 'Tyre Type',
            field: 'tyre_type'
        },
        {
            headerName: 'Load Capacity',
            field: 'load_capacity'
        },
        {
            headerName: 'Fuel Type',
            field: 'fuel_type'
        },
        {
            headerName: 'Insurance Number',
            field: 'insurance_number'
        },
        {
            headerName: 'Insurance Expiry Date',
            field: 'insurance_expiry_date'
        },
        {
            headerName: 'Last Service Date',
            field: 'last_service_date'
        },
        {
            headerName: 'Remarks',
            field: 'remarks',
            cellRenderer: (params: CustomCellRendererProps) => (
                <Tooltip title={params.value || ''}>
                    <span>{params.value && params.value.length > 20 ? `${params.value.slice(0, 20)}...` : params.value || 'N/A'}</span>
                </Tooltip>
            )
        },
        {
            headerName: 'Documents',
            field: 'documents',
            cellRenderer: (params: CustomCellRendererProps) => (
                <div className="flex justify-center items-center mt-2 ">
                    <FileImage
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            Modal.info({
                                title: "Documents",
                                width: 500,
                                content: (
                                    <Space className="my-2">
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${params.data.rc_book}`}
                                            alt={params.data?.rc_book ? 'RC Book' : 'RC Book Not Uploaded'}
                                        />
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${params.data.insurance}`}
                                            alt={params.data?.insurance ? 'Insurance' : 'Insurance Not Uploaded'}
                                        />
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${params.data.pic}`}
                                            alt={params.data?.pic ? 'Picture' : 'Picture Not Uploaded'}
                                        />
                                    </Space>
                                )
                            });
                        }}
                    />
                </div>
            )
        }
    ], [setOpen, setIsEdit, setCurrentTruck]);

    return (
        <AgGridTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            defaultColDef={{
                flex: 0,
                autoHeight: true,
            }}
        />
    );
};

export default TruckTable;