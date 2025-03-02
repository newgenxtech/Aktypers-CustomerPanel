import React, { useState } from 'react';
import TableComponent, { DataCol } from '../TableComponent';
import { ITyrePressure } from '@/pages/TyprePressure/Tyre';

interface TyresMaintainanceTableProps {
  data: ITyrePressure[];
}

const TyresMaintainanceTable: React.FC<TyresMaintainanceTableProps> = ({ data }) => {
  const columns: DataCol<ITyrePressure>[] = [
    {
      label: 'S.No',
      key: 's.no',
      render: (_, index) => index + 1,
    },
    {
      label: 'Pressure ID',
      key: 'pressure_id',
      render: (record: ITyrePressure) => record.pressure_id,
    },
    {
      label: 'Truck ID',
      key: 'truck_id',
      render: (record: ITyrePressure) => record.truck_id,
    },
    {
      label: 'Tyre Position',
      key: 'tyre_position',
      render: (record: ITyrePressure) => record.tyre_position,
    },
    {
      label: 'Tyre Pressure',
      key: 'tyre_pressure',
      render: (record: ITyrePressure) => record.tyre_pressure,
    },
    {
      label: 'Depth',
      key: 'Depth',
      render: (record: ITyrePressure) => record.Depth || '-',
    },
    {
      label: 'To Be Run',
      key: 'Toberun',
      render: (record: ITyrePressure) => record.Toberun || '-',
    },
    {
      label: 'Fixed Depth',
      key: 'fixedDep',
      render: (record: ITyrePressure) => record.fixedDep || '-',
    },
    {
      label: 'Current Depth',
      key: 'actualDep',
      render: (record: ITyrePressure) => record.actualDep || '-',
    },
    {
      label: 'Pressure Status',
      key: 'pressure_status',
      render: (record: ITyrePressure) => record.pressure_status || '-',
    },
    {
      label: 'Recorded At',
      key: 'recorded_at',
      render: (record: ITyrePressure) => record.recorded_at,
    },
  ];
  console.log(data);
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  return (
    <div className="container mx-auto mt-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 h-[690px] transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4" >Tyre Maintainance</h2>
        <TableComponent
          columns={columns}
          data={data}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div >
  );
};

export default TyresMaintainanceTable;