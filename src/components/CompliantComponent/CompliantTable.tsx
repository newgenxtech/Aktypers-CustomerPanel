import React, { useMemo } from 'react';
import { Image, Modal } from 'antd';
import { FileImage } from 'lucide-react';
import { routes } from "@/routes/routes";
import { CustomCellRendererProps } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import AgGridTable from '../AgGridTable';
import { ComplaintsMaster } from '@/pages/Compliant/Compliant.d';
interface CompliantTableProps {
    data: ComplaintsMaster[];
    isLoading: boolean;
    setOpen: (open: boolean) => void;
    setIsEdit: (isEdit: boolean) => void;
    setCurrentComplaints: (complaints: ComplaintsMaster | null) => void;
}

const CompliantTable: React.FC<CompliantTableProps> = ({
    data,
    isLoading,
    setOpen,
    setIsEdit,
    setCurrentComplaints
}) => {
    console.log(data);
    const columns: ColDef[] = useMemo(() => [
        // [
        //     {
        //         "complaint_id": "1",
        //         "customer_id": "123",
        //         "truck_id": "456",
        //         "filename": "example.jpg",
        //         "complaint_description": "Brake issue",
        //         "complaint_date": "2025-01-09 11:01:09",
        //         "status": "Resolved",
        //         "updated_by": "Admin",
        //         "updated_date": "2025-01-09 12:34:56"
        //     }
        // ]
        {
            headerName: 'S.N',
            field: 'sno',
            width: 80,
            valueGetter: 'node.rowIndex + 1'
        },
        {
            headerName: 'Complaint ID',
            field: 'complaint_id',
            cellRenderer: (params: CustomCellRendererProps) => (
                <span
                    className="text-[#00008B] font-semibold cursor-pointer text-base"
                    onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCurrentComplaints(params.data);
                    }}
                >
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Complaint Description',
            field: 'complaint_description',
        },
        {
            headerName: 'Truck',
            field: 'truck_id',
            cellRenderer: (params: CustomCellRendererProps) => (
                <span>{params.data.truck_id}</span>
            )
        },
        {
            headerName: 'Complaint Date',
            field: 'complaint_date',
        },
        {
            headerName: 'Status',
            field: 'status',
        },
        {
            headerName: 'Updated By',
            field: 'updated_by',
        },
        {
            headerName: 'Updated Date',
            field: 'updated_date',
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
                                title: "Complaint Document",
                                width: 500,
                                content: (
                                    <Image
                                        width={400}
                                        src={`${routes.backend.file.download}/${params.value}`}
                                        alt="Complaint Document"
                                    />
                                )
                            });
                        }}
                    />
                </div>
            )
        }
    ] as ColDef[], [setOpen, setIsEdit, setCurrentComplaints]);

    return (
        <AgGridTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            defaultColDef={{
                flex: 0,
                autoHeight: true,
                floatingFilter: true,
            }}
        />
    );
};

export default CompliantTable; 