
import { useState, lazy, Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlloyMaster } from '@/pages/Alloy/Alloy.d';
import { DatePicker, message } from 'antd';
import axios from "axios";
import { routes } from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";

const AlloyTable = lazy(() => import('./AlloyTable'));

const AlloyListPage = () => {
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    const { data, isLoading } = useQuery<AlloyMaster[]>(
        {
            queryKey: ['alloyData', fromDate, toDate],
            queryFn: async () => {
                try {
                    const res = await axios.post(routes.backend.alloy.getAll + localStorage.getItem('customer_id') || '', {
                        from_date: fromDate,
                        to_date: toDate
                    });
                    const result = res.data;
                    return result;
                } catch (error) {
                    console.error("Error fetching data:", error);
                    message.error("Error fetching data");
                }
            },
            refetchOnWindowFocus: false,
        }
    );

    return (
        <div className='warehouse'>
            <div
            >
                <div className="flex flex-col md:flex-row items-center mt-2">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                        <label className="font-bold md:text-xl">Alloy Master</label>
                    </div>
                </div>
                <div className="flex justify-center gap-6 my-4 px-4">
                    {['From Date', 'To Date'].map((label, index) => (
                        <div
                            key={label}
                            className="flex flex-col lg:flex-row items-center gap-2"
                        >
                            <label className="font-medium">{label}</label>
                            <DatePicker
                                onCalendarChange={(_date, dateString) => {
                                    if (index === 0) {
                                        setFromDate(dateString as string);
                                    } else {
                                        setToDate(dateString as string);
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>

            </div>
            <Suspense fallback={<div>Loading table...</div>}>
                <AlloyTable
                    data={data?.map((item, index) => ({ ...item, key: index })) ?? []}
                    isLoading={isLoading}
                />
            </Suspense>
        </div>
    );
};

export default AlloyListPage;