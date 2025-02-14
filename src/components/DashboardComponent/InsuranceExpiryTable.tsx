import React, { useMemo } from 'react';
import { Table } from 'antd';

interface InsuranceRecord {
    insurance_id: string;
    customer_id: string;
    vehicle_id: string;
    insurance_number: string;
    insurance_name: string;
    filename: string;
    purchase_date: string;
    expiry_date: string;
    created_at: string;
    updated_at: string;
}

interface InsuranceExpiryTableProps {
    data: InsuranceRecord[];
    thresholdDays?: number; // Days within which an insurance is considered near expiry
}

const InsuranceExpiryTable: React.FC<InsuranceExpiryTableProps> = ({ data, thresholdDays = 60 }) => {
    // Use new Date() for current date, or for testing override as below:
    // const today = new Date("2025-02-14");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const today = new Date();

    const filteredData = useMemo(() => {
        return data.filter(record => {
            const expiry = new Date(record.expiry_date);
            const diffTime = expiry.getTime() - today.getTime();
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            return diffDays >= 0 && diffDays <= thresholdDays;
        });
    }, [data, thresholdDays, today]);

    const columns = [
        {
            title: 'Insurance ID',
            dataIndex: 'insurance_id',
            key: 'insurance_id',
        },
        {
            title: 'Vehicle ID',
            dataIndex: 'vehicle_id',
            key: 'vehicle_id',
        },
        {
            title: 'Insurance Number',
            dataIndex: 'insurance_number',
            key: 'insurance_number',
        },
        {
            title: 'Insurance Name',
            dataIndex: 'insurance_name',
            key: 'insurance_name',
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiry_date',
            key: 'expiry_date',
        },
        {
            title: 'Days Left',
            key: 'days_left',
            render: (_: unknown, record: InsuranceRecord) => {
                const expiry = new Date(record.expiry_date);
                const diffTime = expiry.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays;
            },
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Insurances Near Expiry</h2>
            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey="insurance_id"
                pagination={false}
                locale={{ emptyText: 'No insurances nearing expiry' }}
                className="modern-table"
            />
            </div>
        </div>
    );
};

export default InsuranceExpiryTable;