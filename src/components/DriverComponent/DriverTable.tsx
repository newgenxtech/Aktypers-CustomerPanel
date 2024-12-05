import React, { useMemo } from 'react';
import { Table, Tooltip, Image, Modal, Space } from 'antd';
import type { TableProps } from 'antd';
import { FileImage } from 'lucide-react';
import { DriverMaster } from '@/pages/Driver/Driver.d';
import { routes } from "@/routes/routes";

interface DriverTableProps {
    data: DriverMaster[];
    isLoading: boolean;
    setOpen: (open: boolean) => void;
    setIsEdit: (isEdit: boolean) => void;
    setCurrentDriver: (driver: DriverMaster | null) => void;
}

const DriverTable: React.FC<DriverTableProps> = ({ data, isLoading, setOpen, setIsEdit, setCurrentDriver }) => {
    const columns: TableProps<DriverMaster>['columns'] = useMemo(() => [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, data: Partial<DriverMaster>) => <span
                className="text-[#00008B] font-semibold cursor-pointer text-base "
                onClick={() => {
                    setOpen(true);
                    setIsEdit(true);
                    setCurrentDriver(data as DriverMaster);
                }}
            >{data.name}</span>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 100,
        },
        {
            title: 'Cus ID',
            dataIndex: 'customerid',
            key: 'customerid',
            width: 50,
            render: (_, data: Partial<DriverMaster>) => <span className="text-base">{data.customerid}</span>
        },
        {
            title: 'License Number',
            dataIndex: 'license_number',
            key: 'license_number',
            width: 100
        },
        {
            title: 'License Expiry Date',
            dataIndex: 'license_expiry_date',
            key: 'license_expiry_date',
            width: 100
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
            width: 100
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 100,
            render: (_, data: Partial<DriverMaster>) => (
                <Tooltip title={data?.address} key={data?.address}>
                    <span>{(data?.address?.trim().length ?? 0) > 20 ? `${data?.address?.slice(0, 20)}...` : data?.address ?? ''}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Date of Birth',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            width: 80
        },
        {
            title: 'Date of Joining',
            dataIndex: 'date_of_joining',
            key: 'date_of_joining',
            width: 80
        },
        {
            title: 'Emergency Contact',
            dataIndex: 'emergency_contact',
            key: 'emergency_contact',
            width: 150
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 50
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 100
        },
        {
            title: "Documents",
            dataIndex: 'documents',
            key: 'documents',
            width: 80,
            render: (_, data: Partial<DriverMaster>) => (
                <div className="flex justify-center items-center">
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
                                            src={`${routes.backend.file.download}/${data.aadhaar_pic}`}
                                            alt={data?.aadhaar_pic ? 'Aadhar Card' : 'Adhar Card Not Uploaded'}
                                        />
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${data.pancard_pic}`}
                                            alt={data?.pancard_pic ? 'Pancard' : 'Pancard Not Uploaded'}
                                        />
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${data.license_pic}`}
                                            alt={data?.license_pic ? 'License' : 'License Not Uploaded'}
                                        />
                                    </Space>
                                )
                            });
                        }}
                    />
                </div>
            ),
        }
    ], []);

    return (
        <Table<DriverMaster>
            columns={columns}
            dataSource={data}
            loading={isLoading}
            pagination={{
                position: ['bottomRight'],
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '30', '40', '50'],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                total: data?.length,
            }}
            size="middle"
            scroll={{ x: 'auto', y: '60vh' }}
            className="p-2 border border-gray-200 rounded-md mx-2"
        />
    );
};

export default DriverTable;