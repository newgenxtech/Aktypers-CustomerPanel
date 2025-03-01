import { useState, Suspense, lazy } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { message } from 'antd';
import { useGetInsuranceData, useGetTruckData } from "@/hooks/GetHooks";
import { queryClient } from "@/hooks/queryClient";
import axios from "axios";
import { InsuranceMaster } from '@/pages/Insurance/Insurance.d';
import { routes } from "@/routes/routes";
import toast from 'react-hot-toast';
// import { ITruckData } from '@/pages/Truck/Truck.d';

const InsuranceTable = lazy(() => import('./InsuranceTable'));
const InsuranceDrawer = lazy(() => import('./InsuranceDrawer'));

const InsuranceMasterListPage = () => {
    const [CurrentInsurance, setCurrentInsurance] = useState<InsuranceMaster | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const { data, isLoading } = useGetInsuranceData(localStorage.getItem('customer_id') || '');
    const [open, setOpen] = useState(false);
    // const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null);
    // const [selectedTruck, setSelectedTruck] = useState<ITruckData | null>(null);
    // const [fromDate, setFromDate] = useState<string | null>(null);
    // const [toDate, setToDate] = useState<string | null>(null);


    const { data: TruckListData } = useGetTruckData(localStorage.getItem('customer_id') || '');

    const handleCreateInsurance = async (data: InsuranceMaster) => {
        toast.loading("Creating Insurance...", {
            duration: 0,
        })
        try {
            const response = await axios.post(routes.backend.insurance.create, [
                {
                    ...data,
                    customer_id: parseInt(localStorage.getItem('customer_id') || '0'),
                    vehicle_id: parseInt(data.vehicle_id || '0')
                }
            ]
            );
            if (response.data?.message) {
                message.success(response.data.message);
            }
            await queryClient.invalidateQueries({ queryKey: ['insurance'] });
            setOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to add insurance');
        }
    };

    const handleUpdateInsurance = async (data: InsuranceMaster) => {
        try {
            const response = await axios.post(routes.backend.insurance.update,
                { ...data, insurance_id: CurrentInsurance?.insurance_id }
            );
            if (response.data?.message) {
                message.success(response.data.message);
            }
            await queryClient.invalidateQueries({ queryKey: ['insurance'] });
            setOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to update insurance');
        }
    };

    return (
        <div className='warehouse'>
            <div className="flex flex-col md:flex-row items-center mt-2">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                    <label className="font-bold text-xl md:text-xl">Insurance Master</label>
                    {/* <Input
                        placeholder="Search Insurance"
                        className="lg:w-1/3 md:w-1/3"
                    /> */}
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className="flex justify-center md:justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white mx-2 mt-2 md:mt-0 mb-2"
                >
                    <Plus className='mr-1' />
                    Add Insurance
                </Button>
            </div>

            {/* <div className="flex flex-col md:flex-row justify-center gap-4 my-4">
                <div className="flex items-center justify-center gap-2">
                    <label>Truck</label>
                    <Select
                        className="w-64"
                        onChange={(value) => {
                            setSelectedTruckId(value);
                            setSelectedTruck(
                                TruckListData?.body.find((item) => item.id === value) ?? null
                            );
                        }}
                        options={TruckListData?.body.map((item) => ({
                            value: item.id,
                            label: item.registration_number,
                        }))}
                        placeholder="Select Truck"
                        allowClear
                        filterOption={(inputValue, option) =>
                            option!
                                .label!.toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        showSearch
                    />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <label>Condition</label>
                    <Select
                        mode="multiple"
                        options={[
                            { value: "New", label: "New" },
                            { value: "Re-Used", label: "Re-Used" },
                            { value: "Old", label: "Old" },
                        ]}
                        placeholder="Select conditions..."
                        className="w-32 md:w-60"
                        allowClear
                        onChange={(selectedOptions) => {
                            console.log(selectedOptions);
                        }}
                    />
                </div>
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
            </div> */}
            <Suspense fallback={<div>Loading...</div>}>
                <InsuranceTable
                    data={data?.body || []}
                    isLoading={isLoading}
                    setOpen={setOpen}
                    setIsEdit={setIsEdit}
                    setCurrentInsurance={setCurrentInsurance}
                />
                <InsuranceDrawer
                    open={open}
                    setOpen={setOpen}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    CurrentInsurance={CurrentInsurance}
                    handleCreateInsurance={handleCreateInsurance}
                    handleUpdateInsurance={handleUpdateInsurance}
                    TruckListData={TruckListData?.body || []}
                />
            </Suspense>
        </div>
    );
};

export default InsuranceMasterListPage;