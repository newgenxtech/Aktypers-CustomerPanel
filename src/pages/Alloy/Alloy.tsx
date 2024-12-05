import { useCallback, useMemo, useState } from 'react';
import { FileImage, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlloyMaster } from './Alloy.d';
import { DatePicker, Input, message, Table } from 'antd';
import type { TableProps } from 'antd';
// import { useGetAlloyData } from "@/hooks/GetHooks";
import axios from "axios";
import { routes } from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";

const AlloyListPage = () => {


    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    // const { data, isLoading } = useGetAlloyData('1001', fromDate, toDate);
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
        // const searchTerm = data.toLowerCase();

        // dispatch(updateSearchColumn({
        //     name: searchTerm,
        // }))
    }, []);


    const columns: TableProps<AlloyMaster>['columns'] = useMemo(() => [
        {
            title: 'S.N',
            dataIndex: 'id',
            key: 'id',
            render: (_, __, index) => <span>{index + 1}</span>,
            width: 'auto',
        },
        {
            title: 'Vehicle',
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (_, data: Partial<AlloyMaster>) => <span
                className="text-[#00008B] font-semibold cursor-pointer text-base "
                onClick={() => {
                }}
            >{data.vehicle}</span>,
            sorter: (a, b) => a.vehicle.localeCompare(b.vehicle),
            width: "auto",

        },
        {
            title: 'Cus ID',
            dataIndex: 'customerid',
            key: 'customerid',
            width: "auto",
            render: (_, data: Partial<AlloyMaster>) => <span
                className="text-base"
            >{data.customerid}</span>
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: "auto",
            render: (_, data: Partial<AlloyMaster>) => <span
                className="text-base" >{data.date}</span>
        },
        {
            title: 'Before PDF',
            dataIndex: 'before',
            key: 'before',
            width: 'auto',
            render: (_, data: Partial<AlloyMaster>) => (
                <a
                    href={data?.before}
                    target="_blank"
                    rel="noreferrer"
                    className="" >
                    <FileImage />
                </a>
            )
        }
    ], [])



    return (
        <div className='warehouse'>
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
            {/* from date and to Date */}
            <div className='flex justify-center gap-4 my-4'>
                <div className=" 
                    flex
                    items-center
                    justify-center
                    gap-2
                ">
                    <label>From Date</label>
                    <DatePicker
                        onCalendarChange={(date, dateString) => {
                            console.log(date, dateString);
                            setFromDate(dateString as string);
                        }}
                    />

                </div>
                <div
                    className="
                        flex
                        justify-center
                        items-center
                        gap-2
                    "
                >
                    <label>To Date</label>
                    <DatePicker
                        onCalendarChange={(date, dateString) => {
                            console.log(date, dateString);
                            setToDate(dateString as string);
                        }}
                    />
                </div>
            </div>
            <Table<AlloyMaster>
                columns={columns}
                dataSource={data?.map((item, index) => ({ ...item, key: index })) ?? []}
                loading={isLoading}
                pagination={{
                    position: ['bottomRight'],
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30', '40', '50'],
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    // total: data?.itemCount,
                }}
                size="middle"
                scroll={{ x: 'auto', y: '60vh' }}
                className=" p-2 border border-gray-200 rounded-md mx-2"

            />

        </div >

    );
};

export default AlloyListPage;