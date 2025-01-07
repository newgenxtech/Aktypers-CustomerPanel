import React, { useMemo } from 'react';
import { Image, Modal } from 'antd';
import { FileImage } from 'lucide-react';
import { InsuranceMaster } from '@/pages/Insurance/Insurance.d';
import { routes } from "@/routes/routes";
import { CustomCellRendererProps } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import AgGridTable from '../AgGridTable';

interface InsuranceTableProps {
    data: InsuranceMaster[];
    isLoading: boolean;
    setOpen: (open: boolean) => void;
    setIsEdit: (isEdit: boolean) => void;
    setCurrentInsurance: (insurance: InsuranceMaster | null) => void;
}

const InsuranceTable: React.FC<InsuranceTableProps> = ({
    data,
    isLoading,
    setOpen,
    setIsEdit,
    setCurrentInsurance
}) => {
    const columns: ColDef[] = useMemo(() => [
        {
            headerName: 'S.N',
            field: 'sno',
            width: 80,
            valueGetter: 'node.rowIndex + 1'
        },
        {
            headerName: 'Insurance Number',
            field: 'insurance_number',
            cellRenderer: (params: CustomCellRendererProps) => (
                <span
                    className="text-[#00008B] font-semibold cursor-pointer text-base"
                    onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCurrentInsurance(params.data);
                    }}
                >
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Insurance Name',
            field: 'insurance_name'
        },
        {
            headerName: 'Purchase Date',
            field: 'purchase_date'
        },
        {
            headerName: 'Expiry Date',
            field: 'expiry_date'
        },
        {
            headerName: 'Documents',
            field: 'filename',
            cellRenderer: (params: CustomCellRendererProps) => (
                <div className="flex justify-center items-center mt-2">
                    <FileImage
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            Modal.info({
                                title: "Insurance Document",
                                width: 500,
                                content: (
                                    <Image
                                        width={400}
                                        src={`${routes.backend.file.download}/${params.value}`}
                                        alt="Insurance Document"
                                    />
                                )
                            });
                        }}
                    />
                </div>
            )
        }
    ], [setOpen, setIsEdit, setCurrentInsurance]);

    return (
        <AgGridTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            defaultColDef={{
                flex: 1,
                autoHeight: true,
            }}
        />
    );
};

export default InsuranceTable; 