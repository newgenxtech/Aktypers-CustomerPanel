import React, { useMemo } from 'react';
import { Image, message, Modal } from 'antd';
import { FileImage } from 'lucide-react';
import { InvoiceMaster } from '@/pages/Invoice/Invoice.d';
import { routes } from "@/routes/routes";
import { CustomCellRendererProps } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import AgGridTable from '../AgGridTable';
import axios from 'axios';

interface InvoiceTableProps {
    data: InvoiceMaster[];
    isLoading: boolean;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ data, isLoading }) => {
    const columns: ColDef[] = useMemo(() => [
        {
            headerName: 'S.N',
            field: 'sno',
            width: 80,
            valueGetter: 'node.rowIndex + 1'
        },
        {
            headerName: 'Invoice ID',
            field: 'Invoiceid',
            cellRenderer: (params: CustomCellRendererProps) => (
                <span className="text-[#00008B] font-semibold cursor-pointer text-base">
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Date',
            field: 'Date'
        },
        {
            headerName: 'Particulars',
            field: 'Particulars'
        },
        {
            headerName: 'VCH Type',
            field: 'VCH_TYP'
        },
        {
            headerName: 'VCH No',
            field: 'VCH_NO'
        },
        {
            headerName: 'Debit',
            field: 'Debit'
        },
        {
            headerName: 'Credit',
            field: 'Credit'
        },
        {
            headerName: 'Documents',
            field: 'file_name',
            cellRenderer: (params: CustomCellRendererProps) => (
                <div className="flex justify-center items-center mt-2">
                    <FileImage
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            // Modal.info({
                            //     title: "Invoice Document",
                            //     width: 500,
                            //     content: (
                            //         <Image
                            //             width={400}
                            //             src={`${routes.backend.file.download}/${params.value}`}
                            //             alt="Invoice Document"
                            //         />
                            //     )
                            // });
                            axios.get(`${routes.backend.invoice.getInvoiceFiles}${params.data.Invoiceid}`).then((res) => {
                                if (res.status === 200) {
                                    console.log(res.data);
                                    // [
                                    //     {
                                    //     "id": "1",
                                    //     "invoice_id": "72",
                                    //     "file_name": "uploads/1736278157_Aktypers New changes.pdf",
                                    //     "created_at": "2025-01-05 08:16:36",
                                    //     "updated_at": "2025-01-07 19:29:28"
                                    //     }
                                    //     ]
                                    Modal.info({
                                        title: "Invoice Document",
                                        width: 500,
                                        content: (
                                            <Image.PreviewGroup>
                                                {res.data.map((file: {
                                                    id: string;
                                                    invoice_id: string;
                                                    file_name: string;
                                                    created_at: string;
                                                    updated_at: string;
                                                }) => (
                                                    <div key={file.id}>
                                                        <a href={`${routes.backend.file.download}/${file.file_name}`} target="_blank" rel="noopener noreferrer">
                                                            {file.file_name}
                                                        </a>
                                                    </div>
                                                ))}
                                            </Image.PreviewGroup>
                                        )
                                    });

                                } else {
                                    message.error("Failed to fetch invoice files");
                                }
                            }).catch((error) => {
                                console.error("Error fetching invoice files:", error);
                                message.error("Failed to fetch invoice files");
                            });
                        }}
                    />
                </div>
            )
        }
    ], []);

    return (
        <AgGridTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            defaultColDef={{
                flex: 1,
                autoHeight: true,
                floatingFilter: true,
            }}
        />
    );
};

export default InvoiceTable; 