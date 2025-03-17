import React, { useState } from 'react';
import TableComponent, { DataCol } from '../TableComponent';
import { AnalyticsData } from '@/hooks/GetHooks';

interface AktyrePurchasedTableProps {
  data: AnalyticsData;
}

const AktyrePurchasedTable: React.FC<AktyrePurchasedTableProps> = ({ data }) => {
  // Transform the data into a format suitable for the table
  const transformedData = data?.product?.map((_item, index) => ({
    product: data.product[index].name,
    quantity: data.quantity[index].name,
    rate: data.rate[index].name,
  }));

  const columns: DataCol<{
    product: string;
    quantity: number;
    rate: number;
  }>[] = [
      // s.no
      {
        label: 'S.No',
        key: 's.no',
        render: (_, index) => index + 1,
      },
      {
        label: 'Product Name',
        key: 'product',
        render: (record) => record.product,
      },
      {
        label: 'Quantity',
        key: 'quantity',
        render: (record) => record.quantity,
      },
      {
        label: 'Price',
        key: 'rate',
        render: (record) => `₹${record.rate.toLocaleString()}`,
      },
    ];

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  return (
    <div className="container mx-auto mt-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 h-[690px] transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Purchased Items</h2>
        <TableComponent
          columns={columns}
          data={transformedData ?? []}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
};

export default AktyrePurchasedTable;