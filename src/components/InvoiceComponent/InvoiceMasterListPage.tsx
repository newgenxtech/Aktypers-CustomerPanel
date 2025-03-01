import { useState } from 'react';
import { DatePicker, message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { routes } from '@/routes/routes';
// import { InvoiceMaster } from '@/pages/Invoice/Invoice.d';
import InvoiceTable from './InvoiceTable';

const InvoiceMasterListPage = () => {
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");

    const { data, isLoading } = useQuery({
        queryKey: ['invoices', fromDate, toDate],
        queryFn: async () => {
            try {
                const res = await axios.post(
                    routes.backend.invoice.getCustomerpayfilter,
                    {
                        // customer_id: localStorage.getItem('customer_id') || '',
                        customer_id: '1006',
                    }
                );
                return res.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                message.error("Error fetching invoice data");
                return [];
            }
        },
    });

    return (
        <div className="invoice">
            <div className="flex flex-col md:flex-row items-center mt-2">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                    <label className="font-bold text-xl md:text-xl">Invoice Master</label>
                    {/* <Input
                        placeholder="Search Invoice"
                        className="w-full md:w-1/3"
                    /> */}
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 my-4">
                <div className="flex items-center justify-center gap-2">
                    <label>From Date</label>
                    <DatePicker
                        onChange={(_date, dateString) => {
                            setFromDate(dateString as string);
                        }}
                    />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <label>To Date</label>
                    <DatePicker
                        onChange={(_date, dateString) => {
                            setToDate(dateString as string);
                        }}
                    />
                </div>
            </div>

            <InvoiceTable
                data={data || []}
                isLoading={isLoading}
            />
        </div>
    );
};

export default InvoiceMasterListPage; 