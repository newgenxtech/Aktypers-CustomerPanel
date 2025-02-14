import React, { useMemo } from 'react';
import { Table } from 'antd';

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
  // Use new Date() for current date; you can override for testing.
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

  const columns = [
    {
      title: 'Complaint ID',
      dataIndex: 'complaint_id',
      key: 'complaint_id',
    },
    {
      title: 'Truck ID',
      dataIndex: 'truck_id',
      key: 'truck_id',
    },
    {
      title: 'Complaint Description',
      dataIndex: 'complaint_description',
      key: 'complaint_description',
    },
    {
      title: 'Complaint Date',
      dataIndex: 'complaint_date',
      key: 'complaint_date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Days Ago',
      key: 'days_ago',
      render: (_: unknown, record: ComplaintRecord) => {
        const complaintDate = new Date(record.complaint_date);
        const diffTime = today.getTime() - complaintDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
      },
    },
  ];

  return (
    <div className="container mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4" >Recent Complaints (Last {thresholdDays} Days)</h2>
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="complaint_id"
          pagination={false}
          locale={{ emptyText: 'No recent complaints' }}
          className="modern-table"
        />
      </div>
    </div >
  );
};

export default RecentComplaintsTable;