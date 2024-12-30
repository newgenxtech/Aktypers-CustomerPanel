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
            field: 'sno',
            width: 50,
            minWidth: 0,
            flex: 0,
            autoHeight: false,
            valueGetter: 'node.rowIndex + 1'
        },
        {
            headerName: 'Serial Number',
            field: 'Tyre_Serial_Number',
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
            cellRenderer: (params: CustomCellRendererProps) => <span className="text-base">{params.value}</span>
        },
        {
            headerName: 'Manufacturer',
            field: 'Manufacturer'
        },
        {
            headerName: 'Brand',
            field: 'Brand'
        },
        {
            headerName: 'Fitment KM',
            field: 'Fitment_KM'
        },
        {
            headerName: 'Removal KM',
            field: 'Removal_KM'
        },
        {
            headerName: 'Total Covered KM',
            field: 'Total_Covered_KM'
        },
        {
            headerName: 'New Tyre',
            field: 'Retread_Yes_No'
        },
        {
            headerName: 'Reason for Removal Month',
            field: 'Reason_for_Removal_MONTH'
        },
        {
            headerName: 'Date',
            field: 'Date'
        },
        {
            headerName: 'Position',
            field: 'position'
        },
        {
            headerName: 'Registration Number',
            field: 'registration_number'
        }
    ], [setOpen, setIsEdit, setCurrentTyres]);

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

export default TyresTable;