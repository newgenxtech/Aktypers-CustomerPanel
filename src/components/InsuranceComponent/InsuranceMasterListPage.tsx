import { useState, Suspense, lazy } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, message } from 'antd';
import { useGetInsuranceData } from "@/hooks/GetHooks";
import { queryClient } from "@/hooks/queryClient";
import axios from "axios";
import { InsuranceMaster } from '@/pages/Insurance/Insurance.d';
import { routes } from "@/routes/routes";

const InsuranceTable = lazy(() => import('./InsuranceTable'));
const InsuranceDrawer = lazy(() => import('./InsuranceDrawer'));

const InsuranceMasterListPage = () => {
    const [CurrentInsurance, setCurrentInsurance] = useState<InsuranceMaster | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const { data, isLoading } = useGetInsuranceData('1001');
    const [open, setOpen] = useState(false);

    const handleCreateInsurance = async (data: InsuranceMaster) => {
        try {
            const response = await axios.post(routes.backend.insurance.create, data);
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
                    <Input
                        placeholder="Search Insurance"
                        className="lg:w-1/3 md:w-1/3"
                    />
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className="flex justify-center md:justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white mx-2 mt-2 md:mt-0 mb-2"
                >
                    <Plus className='mr-1' />
                    Add Insurance
                </Button>
            </div>
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
                />
            </Suspense>
        </div>
    );
};

export default InsuranceMasterListPage;