import React, { useMemo } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { FileImage } from 'lucide-react';
import { AlloyMaster } from '@/pages/Alloy/Alloy.d';

interface AlloyTableProps {
    data: AlloyMaster[];
    isLoading: boolean;
}

const AlloyTable: React.FC<AlloyTableProps> = ({ data, isLoading }) => {
    const columns: TableProps<AlloyMaster>['columns'] = useMemo(() => [
        {
            title: 'S.N',
            dataIndex: 'id',
            key: 'id',
            render: (_, __, index) => <span>{index + 1}</span>,
            width: 'auto',
        },
        {
            title: 'Vehicle',
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (_, data: Partial<AlloyMaster>) => <span
                className="text-[#00008B] font-semibold cursor-pointer text-base "
            >{data.vehicle}</span>,
            sorter: (a, b) => a.vehicle.localeCompare(b.vehicle),
            width: "auto",
        },
        {
            title: 'Cus ID',
            dataIndex: 'customerid',
            key: 'customerid',
            width: "auto",
            render: (_, data: Partial<AlloyMaster>) => <span className="text-base">{data.customerid}</span>
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: "auto",
            render: (_, data: Partial<AlloyMaster>) => <span className="text-base">{data.date}</span>
        },
        {
            title: 'Before PDF',
            dataIndex: 'before',
            key: 'before',
            width: 'auto',
            render: (_, data: Partial<AlloyMaster>) => (
                <a
                    href={data?.before}
                    target="_blank"
                    rel="noreferrer"
                    className="" >
                    <FileImage />
                </a>
            )
        }
    ], []);

    return (
        <Table<AlloyMaster>
            columns={columns}
            dataSource={data?.map((item, index) => ({ ...item, key: index })) ?? []}
            loading={isLoading}
            pagination={{
                position: ['bottomRight'],
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '30', '40', '50'],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            size="middle"
            scroll={{ x: 'auto', y: '60vh' }}
            className="p-2 border border-gray-200 rounded-md mx-2"
        />
    );
};

export default AlloyTable;