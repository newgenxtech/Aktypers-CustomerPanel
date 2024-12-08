import React, { useMemo } from 'react';
import { FileImage } from 'lucide-react';
import { CustomCellRendererProps } from 'ag-grid-react'; // React Data Grid Component
import { AlloyMaster } from '@/pages/Alloy/Alloy.d';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, ColGroupDef } from 'ag-grid-community';
import AgGridTable from '../AgGridTable';

interface AlloyTableProps {
    data: AlloyMaster[];
    isLoading: boolean;
}

const AlloyTable: React.FC<AlloyTableProps> = ({ data, isLoading }) => {
    const columns: (ColDef | ColGroupDef)[] = useMemo(() => [
        {
            headerName: 'S.N',
            field: 'id',
            sortable: true,
            filter: true,
            width: 100,
            valueGetter: 'node.rowIndex + 1'
        },
        {
            headerName: 'Vehicle',
            field: 'vehicle',
            sortable: true,
            filter: true,
            cellRenderer: (params: CustomCellRendererProps) => (
                <span className="text-[#00008B] font-semibold cursor-pointer text-base">
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Cus ID',
            field: 'customerid',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Date',
            field: 'date',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Before PDF',
            field: 'before',
            sortable: false,
            filter: false,
            width: 150,
            cellRenderer: (params: CustomCellRendererProps) => (
                <a
                    href={params.value}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center"
                >
                    <FileImage className="cursor-pointer hover:text-blue-500" />
                </a>
            )
        }
    ], []);

    return (
        <AgGridTable
            columns={columns}
            data={data}
            isLoading={isLoading}
        />
    );
};

export default AlloyTable;