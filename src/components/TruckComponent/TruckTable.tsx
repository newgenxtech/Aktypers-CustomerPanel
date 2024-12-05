import React, { useMemo } from 'react';
import { Table, Tooltip, Image, Modal, Space } from 'antd';
import type { TableProps } from 'antd';
import { FileImage } from 'lucide-react';
import { ITruckData } from '@/pages/Truck/Truck.d';
import { routes } from "@/routes/routes";

interface TruckTableProps {
    data: ITruckData[];
    isLoading: boolean;
    setOpen: (open: boolean) => void;
    setIsEdit: (isEdit: boolean) => void;
    setCurrentTruck: (truck: ITruckData | null) => void;
}

const TruckTable: React.FC<TruckTableProps> = ({ data, isLoading, setOpen, setIsEdit, setCurrentTruck }) => {
    const columns: TableProps<ITruckData>['columns'] = useMemo(() => [
        {
            title: 'S.N',
            dataIndex: 'id',
            key: 'id',
            render: (_, __, index) => <span>{index + 1}</span>,
            width: 80,
        },
        {
            title: 'Registration Number',
            dataIndex: 'registration_number',
            key: 'registration_number',
            width: 150,
            render: (_, data: Partial<ITruckData>) =>
                <span
                    className="text-[#00008B] font-semibold cursor-pointer text-base "
                    onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCurrentTruck(data as ITruckData);
                    }}
                >{data.registration_number}</span>,
        },
        {
            title: 'Chassis Number',
            dataIndex: 'chassis_number',
            key: 'chassis_number',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.chassis_number}</span>
        },
        {
            title: 'Engine Number',
            dataIndex: 'engine_number',
            key: 'engine_number',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.engine_number}</span>
        },
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.make}</span>
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.model}</span>
        },
        {
            title: 'Year of Manufacture',
            dataIndex: 'year_of_manufacture',
            key: 'year_of_manufacture',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.year_of_manufacture}</span>
        },
        {
            title: 'Wheels',
            dataIndex: 'wheels',
            key: 'wheels',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.wheels}</span>
        },
        {
            title: 'Tyre Type',
            dataIndex: 'tyre_type',
            key: 'tyre_type',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.tyre_type}</span>
        },
        {
            title: 'Load Capacity',
            dataIndex: 'load_capacity',
            key: 'load_capacity',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.load_capacity}</span>
        },
        {
            title: 'Fuel Type',
            dataIndex: 'fuel_type',
            key: 'fuel_type',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.fuel_type}</span>
        },
        {
            title: 'Insurance Number',
            dataIndex: 'insurance_number',
            key: 'insurance_number',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.insurance_number}</span>
        },
        {
            title: 'Insurance Expiry Date',
            dataIndex: 'insurance_expiry_date',
            key: 'insurance_expiry_date',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.insurance_expiry_date}</span>
        },
        {
            title: 'Last Service Date',
            dataIndex: 'last_service_date',
            key: 'last_service_date',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.last_service_date}</span>
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            width: 200,
            render: (_, data: Partial<ITruckData>) => (
                <Tooltip title={data?.remarks} key={data?.remarks}>
                    <span>{(data?.remarks?.trim().length ?? 0) > 20 ? `${data?.remarks?.slice(0, 20)}...` : data?.remarks ?? ''}</span>
                </Tooltip>
            ),
        },
        {
            title: "Documents",
            dataIndex: 'documents',
            key: 'documents',
            width: 80,
            render: (_, data: Partial<ITruckData>) => (
                <div className="flex justify-center items-center">
                    <FileImage
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            Modal.info({
                                title: "Documents",
                                width: 500,
                                content: <>
                                    <Space className="my-2">
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${data.rc_book}`}
                                            alt={data?.rc_book ? 'RC Book' : 'RC Book Not Uploaded'}
                                        />
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${data.insurance}`}
                                            alt={data?.insurance ? 'Insurance' : 'Insurance Not Uploaded'}
                                        />
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${data.pic}`}
                                            alt={data?.pic ? 'Picture' : 'Picture Not Uploaded'}
                                        />
                                    </Space>
                                </>
                            });
                        }}
                    />
                </div>
            ),
        }
    ], []);

    return (
        <Table<ITruckData>
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

export default TruckTable;