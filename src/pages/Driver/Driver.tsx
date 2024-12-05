import { useCallback, useState, Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DriverMaster } from './Driver.d';
import { Input, message } from 'antd';
import { useGetDriverData } from "@/hooks/GetHooks";
import { queryClient } from "@/hooks/queryClient";
import axios from "axios";
import { routes } from "@/routes/routes";
import React from "react";

const DriverTable = React.lazy(() => import('@/components/DriverComponent/DriverTable'));
const DriverDrawer = React.lazy(() => import('@/components/DriverComponent/DriverDrawer'));
const DriverListPage = () => {
    const [CurrentDriver, setCurrentDriver] = useState<DriverMaster | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const { data, isLoading } = useGetDriverData('1001');
    const [open, setOpen] = useState(false);
    // const navigate = useNavigate();

    const handleSearch = useCallback((data: string) => {
        console.log(data);
    }, []);

    const handleCreateDriver = async (data: DriverMaster) => {
        try {
            const response = await axios.post(routes.backend.driver.create, data);
            const { data: responseData } = response;

            if (responseData?.status === 201) {
                message.success(responseData?.data?.message);
            }
            await queryClient.invalidateQueries({ queryKey: ['drivers'], exact: true });
            setOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to add driver');
        }
    };

    const handleUpdateDriver = async (data: DriverMaster) => {
        try {
            const response = await axios.post(routes.backend.driver.update, { ...data, id: CurrentDriver?.id });
            const { data: responseData } = response;

            if (responseData?.status === 200) {
                message.success(responseData?.data?.message);
            }
            await queryClient.invalidateQueries({ queryKey: ['drivers'], exact: true });
            setOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to update driver');
        }
    };

    return (
        <div className='warehouse'>
            <div className="flex flex-col md:flex-row items-center mt-2">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                    <label className="font-bold text-xl md:text-xl">Driver Master</label>
                    <Input
                        placeholder="Search Driver"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="lg:w-1/3 md:w-1/3"
                    />
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className="flex justify-center md:justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white mx-2 mt-2 md:mt-0 mb-2"
                >
                    <Plus className='mr-1' />
                    Add Driver
                </Button>
            </div>
            <Suspense fallback={<div>Loading table...</div>}>
                <DriverTable
                    data={data?.body ?? []}
                    isLoading={isLoading}
                    setOpen={setOpen}
                    setIsEdit={setIsEdit}
                    setCurrentDriver={setCurrentDriver}
                />
            </Suspense>
            <Suspense fallback={<div>Loading drawer...</div>}>
                <DriverDrawer
                    open={open}
                    setOpen={setOpen}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    CurrentDriver={CurrentDriver}
                    handleCreateDriver={handleCreateDriver}
                    handleUpdateDriver={handleUpdateDriver}
                />
            </Suspense>
        </div>
    );
};

export default DriverListPage;