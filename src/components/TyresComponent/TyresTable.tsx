import React, { useMemo } from 'react';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { CustomCellRendererProps } from 'ag-grid-react';
import { TyresMaster } from '@/pages/Tyres/Tyres.d';
import AgGridTable from '../AgGridTable';

interface TyresTableProps {
    data: TyresMaster[];
    isLoading: boolean;
    setOpen: (open: boolean) => void;
    setIsEdit: (isEdit: boolean) => void;
    setCurrentTyres: (tyres: TyresMaster | null) => void;
}

const TyresTable: React.FC<TyresTableProps> = ({ data, isLoading, setOpen, setIsEdit, setCurrentTyres }) => {
    const columns: (ColDef | ColGroupDef)[] = useMemo(() => [
        {
            headerName: 'S.No',
            field: 'key',
            sortable: true,
            filter: true,
            width: 50,
            cellRenderer: 'params.node.rowIndex + 1'
        },
        {
            headerName: 'Serial Number',
            field: 'Tyre_Serial_Number',
            sortable: true,
            filter: true,
            cellRenderer: (params: CustomCellRendererProps) => (
                <span
                    className="text-[#00008B] font-semibold cursor-pointer text-base"
                    onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCurrentTyres(params.data);
                    }}
                >
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Wheeler Type',
            field: 'Wheeler_Type',
            sortable: true,
            filter: true,
            width: 50,
            cellRenderer: (params: CustomCellRendererProps) => <span className="text-base">{params.value}</span>
        },
        {
            headerName: 'Manufacturer',
            field: 'Manufacturer',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Brand',
            field: 'Brand',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Fitment KM',
            field: 'Fitment_KM',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Removal KM',
            field: 'Removal_KM',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Total Covered KM',
            field: 'Total_Covered_KM',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'New Tyre',
            field: 'Retread_Yes_No',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Reason for Removal Month',
            field: 'Reason_for_Removal_MONTH',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Date',
            field: 'Date',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Position',
            field: 'position',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Registration Number',
            field: 'registration_number',
            sortable: true,
            filter: true,
            width: 100
        }
    ], [setOpen, setIsEdit, setCurrentTyres]);

    return (
        <AgGridTable
            columns={columns}
            data={data}
            isLoading={isLoading}
        />
    );
};

export default TyresTable;