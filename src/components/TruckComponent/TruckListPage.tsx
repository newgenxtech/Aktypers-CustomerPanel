import { useState, Suspense, lazy } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetTruckConfig, useGetTruckData, useTruckOperations } from "@/hooks/GetHooks";
import { ITruckData } from "@/pages/Truck/Truck.d";

const TruckTable = lazy(() => import('./TruckTable'));
const TruckDrawer = lazy(() => import('./TruckDrawer'));

const TruckListPage = () => {
    const [CurrentTruck, setCurrentTruck] = useState<ITruckData | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false);

    const { data, isLoading } = useGetTruckData(localStorage.getItem('customer_id') || '');
    const { data: TruckConfigData } = useGetTruckConfig();
    const { createTruck, updateTruck } = useTruckOperations();

    const handleCreateTruck = async (data: ITruckData) => {
        await createTruck.mutateAsync(data, {
            onSuccess: () => {
                setOpen(false);
            }
        });
    };

    const handleUpdateTruck = async (data: ITruckData) => {
        await updateTruck.mutateAsync({
            ...data,
            id: CurrentTruck?.id!
        }, {
            onSuccess: () => {
                setOpen(false);
                setIsEdit(false);
            }
        });
    };

    return (
        <div className='warehouse'>
            <div className="flex flex-col md:flex-row items-center mt-2">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                    <label className="font-bold text-xl md:text-xl">Truck Master</label>
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className="flex justify-center md:justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white mx-2 mt-2 md:mt-0 mb-2"
                    disabled={createTruck.isPending}
                >
                    {createTruck.isPending ? (
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
                            Add Truck
                        </>
                    )}
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
                    setIsEdit={setIsEdit}
                    TruckConfigData={TruckConfigData?.body || []}
                    CurrentTruck={CurrentTruck}
                    handleCreateTruck={handleCreateTruck}
                    handleUpdateTruck={handleUpdateTruck}
                // isLoading={createTruck.isPending || updateTruck.isPending}
                />
            </Suspense>
        </div>
    );
};

export default TruckListPage;