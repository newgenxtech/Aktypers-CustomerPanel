import React, { useMemo, useState } from 'react';
import TableComponent, { DataCol } from '../TableComponent';

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

    const columns: DataCol<InsuranceRecord>[] = [
        {
            label: 'Insurance ID',
            key: 'insurance_id',
            render: (record: InsuranceRecord) => record.insurance_id,
        },
        {
            label: 'Vehicle ID',
            key: 'vehicle_id',
            render: (record: InsuranceRecord) => record.vehicle_id
        },
        {
            label: 'Insurance Number',
            key: 'insurance_number',
            render: (record: InsuranceRecord) => record.insurance_number,
        },
        {
            label: 'Insurance Name',
            key: 'insurance_name',
            render: (record: InsuranceRecord) => record.insurance_name,
        },
        {
            label: 'Expiry Date',
            key: 'expiry_date',
            render: (record: InsuranceRecord) => record.expiry_date,
        },
        {
            label: 'Days Left',
            key: 'days_left',
            render: (record: InsuranceRecord) => {
                const expiry = new Date(record.expiry_date);
                const diffTime = expiry.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays;
            },
        },
    ];

    const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

    return (
        <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Insurances Near Expiry</h2>
                <TableComponent
                    data={filteredData}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}

                />
            </div>
        </div>
    );
};

export default InsuranceExpiryTable;