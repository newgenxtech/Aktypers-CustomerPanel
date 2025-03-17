import { Suspense, lazy } from 'react';
// import { Plus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { useGetComplaintsData } from "@/hooks/GetHooks";
// import { ITruckData } from '@/pages/Truck/Truck.d';

const CompliantTable = lazy(() => import('./CompliantTable'));

const CompliantListPage = () => {


    const { data, isLoading } = useGetComplaintsData(localStorage.getItem('customer_id') || '');


    return (
        <div className='warehouse'>
            <div className="flex flex-col md:flex-row items-center mt-2">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                    <label className="font-bold text-xl md:text-xl">Complaints Master</label>
                    {/* <Input
                        placeholder="Search Complaints"
                        className="lg:w-1/3 md:w-1/3"
                    /> */}
                </div>
                {/* <Button
                    onClick={
                        () => {
                            console.log("onClick");
                        }
                    }
                    className="flex justify-center md:justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white mx-2 mt-2 md:mt-0 mb-2"
                >
                    <Plus className='mr-1' />
                    Add Complaints
                </Button> */}
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <CompliantTable
                    data={data?.body || []}
                    isLoading={isLoading}
                    setOpen={
                        () => {
                            console.log("setOpen");
                        }
                    }
                    setIsEdit={
                        () => {
                            console.log("setIsEdit");
                        }
                    }
                    setCurrentComplaints={
                        () => {
                            console.log("setCurrentComplaints");
                        }
                    }
                />
            </Suspense>
        </div>
    );
};

export default CompliantListPage;