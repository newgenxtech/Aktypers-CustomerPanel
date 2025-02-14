import React, { useMemo } from 'react';
import { Table } from 'antd';
import { ITyrePressure } from '@/pages/TyprePressure/Tyre';

interface TyreConditionTableProps {
    data: ITyrePressure[];
}

const TyreConditionTable: React.FC<TyreConditionTableProps> = ({ data }) => {
    const filteredData = useMemo(() => {
        return data.filter(record => {
            return record.pressure_status === "Bad";
        });
    }, [data]);
    
    const columns = [
        {
            title: 'Truck ID',
            dataIndex: 'truck_id',
            key: 'truck_id',
        },
        {
            title: 'Tyre Position',
            dataIndex: 'tyre_position',
            key: 'tyre_position',
        },
        {
            title: 'Tyre Pressure',
            dataIndex: 'tyre_pressure',
            key: 'tyre_pressure',
        },
        {
            title: 'Recorded At',
            dataIndex: 'recorded_at',
            key: 'recorded_at',
        },
        {
            title: 'Pressure Status',
            dataIndex: 'pressure_status',
            key: 'pressure_status',
        },
    ];

    return (
        <div className="container mx-auto mt-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4" >Bad Tyre List</h2>
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="complaint_id"
                    pagination={false}
                    locale={{ emptyText: 'No recent Bad Tyres' }}
                    className="modern-table"
                />
            </div>
        </div >
    );
};

export default TyreConditionTable;