import React, { useMemo, useState } from 'react';
import TableComponent, { DataCol } from '../TableComponent';

interface ComplaintRecord {
  complaint_id: string;
  customer_id: string;
  truck_id: string;
  filename: string;
  complaint_description: string;
  complaint_date: string;
  status: string;
  updated_by: string | null;
  updated_date: string | null;
}

interface RecentComplaintsTableProps {
  data: ComplaintRecord[];
  thresholdDays?: number; // Show complaints within the last thresholdDays (default: 60)
}

const RecentComplaintsTable: React.FC<RecentComplaintsTableProps> = ({ data, thresholdDays = 60 }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();

  const filteredData = useMemo(() => {
    return data.filter(record => {
      const complaintDate = new Date(record.complaint_date);
      const diffTime = today.getTime() - complaintDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= thresholdDays;
    });
  }, [data, thresholdDays, today]);

  const columns: DataCol<ComplaintRecord>[]
    = [
      {
        label: 'Complaint ID',
        key: 'complaint_id',
        render: (record: ComplaintRecord) => record.complaint_id,
      },
      {
        label: 'Truck ID',
        key: 'truck_id',
        render: (record: ComplaintRecord) => record.truck_id,
      },
      {
        label: 'Complaint Description',
        key: 'complaint_description',
        render: (record: ComplaintRecord) => record.complaint_description,
      },
      {
        label: 'Complaint Date',
        key: 'complaint_date',
        render: (record: ComplaintRecord) => record.complaint_date,
      },
      {
        label: 'Status',
        key: 'status',
        render: (record: ComplaintRecord) => record.status,
      },
      {
        label: 'Days Ago',
        key: 'days_ago',
        render: (record: ComplaintRecord) => {
          const complaintDate = new Date(record.complaint_date);
          const diffTime = today.getTime() - complaintDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays;
        },
      },
    ];

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  return (
    <div className="container mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4" >Recent Complaints (Last {thresholdDays} Days)</h2>
        <TableComponent
          columns={columns}
          data={filteredData}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div >
  );
};

export default RecentComplaintsTable;