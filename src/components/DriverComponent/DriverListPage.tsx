import { useState, Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DriverMaster } from '@/pages/Driver/Driver.d';
import { useGetDriverData, useDriverOperations } from "@/hooks/GetHooks";
import React from "react";
import { message } from 'antd';

const DriverTable = React.lazy(() => import('@/components/DriverComponent/DriverTable'));
const DriverDrawer = React.lazy(() => import('@/components/DriverComponent/DriverDrawer'));

const DriverListPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [CurrentDriver, setCurrentDriver] = useState<DriverMaster | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false);

    const { data, isLoading } = useGetDriverData(localStorage.getItem('customer_id') || '');
    const { createDriver, updateDriver } = useDriverOperations(messageApi);

    const handleCreateDriver = async (data: DriverMaster) => {
        await createDriver.mutateAsync(data);
        setOpen(false);
    };

    const handleUpdateDriver = async (data: DriverMaster) => {
        await updateDriver.mutateAsync({
            ...data,
            id: CurrentDriver?.id
        });
        setOpen(false);
        setIsEdit(false);
    };

    return (
        <div className='warehouse'>
            {contextHolder}
            <div className="flex flex-col md:flex-row items-center mt-2">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                    <label className="font-bold text-xl md:text-xl">Driver Master</label>
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className="flex justify-center md:justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white mx-2 mt-2 md:mt-0 mb-2"
                    disabled={createDriver.isPending}
                >
                    {createDriver.isPending ? (
                        <span className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Creating...
                        </span>
                    ) : (
                        <>
                            <Plus className='mr-1' />
                            Add Driver
                        </>
                    )}
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
                    isLoading={createDriver.isPending || updateDriver.isPending}
                    messageApi={messageApi}
                />
            </Suspense>
        </div>
    );
};

export default DriverListPage;