
import { useCallback, useState, lazy, Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlloyMaster } from '@/pages/Alloy/Alloy.d';
import { DatePicker, Input, message } from 'antd';
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
                    const res = await axios.post(routes.backend.alloy.getAll + '1001', {
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

    const handleSearch = useCallback((data: string) => {
        console.log(data);
    }, []);

    return (
        <div className='warehouse'>
            <div
            >
                <div className="flex flex-col md:flex-row items-center mt-2">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                        <label className="font-bold md:text-xl">Alloy Master</label>
                        <Input
                            placeholder="Search Driver"
                            onChange={(e) => handleSearch(e.target.value)}
                            className="lg:w-1/3 md:w-1/3"
                        />
                    </div>

                    <Button
                        onClick={() => {
                            // setOpen(true)
                        }}
                        className="flex justify-center md:justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white mx-2 mt-2 md:mt-0 mb-2"
                        disabled={true}
                    >
                        <Plus className='mr-1' />
                        Add Alloy
                    </Button>
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