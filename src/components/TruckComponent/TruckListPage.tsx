import { useCallback, useState, Suspense, lazy } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, message } from 'antd';
import { useGetTruckConfig, useGetTruckData } from "@/hooks/GetHooks";
import { queryClient } from "@/hooks/queryClient";
import axios from "axios";
import { ITruckData } from "@/pages/Truck/Truck.d";
import { routes } from "@/routes/routes";

const TruckTable = lazy(() => import('./TruckTable'));
const TruckDrawer = lazy(() => import('./TruckDrawer'));

const TruckListPage = () => {
    const [CurrentTruck, setCurrentTruck] = useState<ITruckData | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const { data, isLoading } = useGetTruckData(localStorage.getItem('customer_id') || '');
    const [open, setOpen] = useState(false);
    const { data: TruckConfigData } = useGetTruckConfig();


    const handleSearch = useCallback((data: string) => {
        console.log(data);
    }, []);

    const handleCreateTruck = async (data: ITruckData) => {
        try {
            const response = await axios.post(routes.backend.truck.create, {
                ...data,
                customerid: localStorage.getItem('customer_id'),
                wheels: data.tyre_type.split('Tyres')[0]
            });
            const { data: responseData } = response;

            if (responseData?.status === 201) {
                message.success(responseData?.data?.message);
            }
            await queryClient.invalidateQueries({ queryKey: ['trucks'], exact: true });
            setOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to add driver');
        }
    };

    const handleUpdateTruck = async (data: ITruckData) => {
        try {
            const response = await axios.post(routes.backend.truck.update, {
                ...data,
                id: CurrentTruck?.id,
                customerid: localStorage.getItem('customer_id'),
                wheels: data.tyre_type.split('Tyres')[0]
            });
            const { data: responseData } = response;

            if (responseData?.status === 200) {
                message.success(responseData?.data?.message);
            }
            await queryClient.invalidateQueries({ queryKey: ['trucks'], exact: true });
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
                    <label className="font-bold text-xl md:text-xl">Truck Master</label>
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
                    Add Truck
                </Button>

            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <TruckTable
                    data={data?.body || []}
                    isLoading={isLoading}
                    setOpen={setOpen}
                    setIsEdit={setIsEdit}
                    setCurrentTruck={setCurrentTruck}
                />
                <TruckDrawer
                    open={open}
                    setOpen={setOpen}
                    isEdit={isEdit}
                    TruckConfigData={TruckConfigData?.body || []}
                    CurrentTruck={CurrentTruck}
                    handleCreateTruck={handleCreateTruck}
                    handleUpdateTruck={handleUpdateTruck}
                    setIsEdit={
                        (value: boolean) => {
                            setIsEdit(value);
                        }
                    } />
            </Suspense>
        </div>
    );
}


export default TruckListPage;