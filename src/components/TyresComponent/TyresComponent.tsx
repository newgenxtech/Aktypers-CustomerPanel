import { useCallback, useEffect, useMemo, useState } from 'react';
import { CustomField } from '@/components/FormComponentV2';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { message, DatePicker, Select, Input } from 'antd';
import { routes } from "@/routes/routes";
import axios from "axios";
import { queryClient } from "@/hooks/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useGetTruckData, useGetTruckDemensionDetails } from "@/hooks/GetHooks";
import { getTyreLayout } from "@/lib/utils";
import AgGridTable from '@/components/AgGridTable';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { TyresMaster } from "@/pages/Tyres/Tyres";
import TyresFormFields from "./constants/TyresFormFields";
import TyresDrawer from "./TyresDrawer";
import TyresColumns from "./constants/TyresColumns";

const TyresMasterListPage = () => {
    const [CurrentTyres, setCurrentTyres] = useState<TyresMaster | null>(null);
    const [SelectedTruckId, setSelectedTruckId] = useState<string>('');
    const [Position, setPosition] = useState<string[]>([]);
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [isEdit, setIsEdit] = useState(false);

    const { data: TruckListData } = useGetTruckData('1001');
    const { data, isLoading } = useQuery({
        queryKey: ['tyres', SelectedTruckId, fromDate, toDate],
        queryFn: async () => {
            try {
                const res = await axios.post(routes.backend.tyre.getTyreDetailsByCustomer, {
                    "truck_id": SelectedTruckId,
                    "from_date": fromDate,
                    "to_date": toDate,
                    "customerid": 1001
                });
                const result = res.data;
                return result;
            } catch (error) {
                console.error("Error fetching data:", error);
                message.error("Error fetching data");
            }
        },
        refetchOnWindowFocus: false,
    });

    const { data: TruckDemensionDetails, isLoading: TruckDemensionDetailLoading } = useGetTruckDemensionDetails(SelectedTruckId);

    useEffect(() => {
        if (
            TruckDemensionDetails &&
            TruckDemensionDetailLoading === false &&
            TruckDemensionDetails.body &&
            TruckDemensionDetails.body.length > 0
        ) {
            const res = TruckDemensionDetails.body[0];
            setPosition(
                getTyreLayout(
                    Number(res?.total_tyres),
                    Number(res?.total_axles),
                    res?.axtyre,
                    true
                )
                    .map((item) => item.value)
                    .filter((value): value is string => value !== undefined)
            );
        }
    }, [TruckDemensionDetailLoading, TruckDemensionDetails]);

    const [open, setOpen] = useState(false);


    const handleSearch = useCallback((data: string) => {
        console.log(data);
    }, []);

    const columns: (ColDef | ColGroupDef)[] = useMemo(() => TyresColumns(setOpen, setIsEdit, setCurrentTyres), [setOpen, setIsEdit, setCurrentTyres]);

    const handleCreateTyres = async (data: TyresMaster) => {
        try {
            const response = await axios.post(routes.backend.tyre.createTyre, {
                ...data,
                Vehicle_Registration_Number: SelectedTruckId
            });
            const { data: responseData } = response;

            if (responseData?.status === 201) {
                alert(responseData?.data?.message);
                message.success(responseData?.data?.message);
            }
            await queryClient.invalidateQueries({
                queryKey: ['tyress'],
                exact: true
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to add tyres');
        }
    };

    const handleUpdateTyres = async (data: TyresMaster) => {
        try {
            const response = await axios.post(routes.backend.tyre.updateTyre, {
                ...data,
                id: CurrentTyres?.id
            });
            const { data: responseData } = response;

            if (responseData?.status === 200) {
                alert(responseData?.data?.message);
                message.success(responseData?.data?.message);
            }
            await queryClient.invalidateQueries({
                queryKey: ['tyress'],
                exact: true
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to update tyres');
        }
    }

    const formField: CustomField[] = useMemo(() => TyresFormFields(Position, isEdit, CurrentTyres), [isEdit, CurrentTyres, Position]);

    return (
        <div className='tyres'>
            <div className="flex flex-col md:flex-row items-center mt-2">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                    <label className="font-bold text-xl md:text-xl">Tyres Master</label>
                    <Input
                        placeholder="Search Driver"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full md:w-1/3"
                    />
                </div>
                <Button
                    onClick={() => {
                        if (SelectedTruckId === '' && Position.length === 0) {
                            message.error('Please select a truck');
                        } else {
                            setOpen(true)
                        }
                    }}
                    className="flex justify-center md:justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white mx-2 mt-2 md:mt-0"
                >
                    <Plus className='mr-1' />
                    Add Tyres
                </Button>
            </div>
            <div className="w-full ">
                <div className="flex flex-col md:flex-row justify-center gap-4 my-4">
                    <div className="flex items-center justify-center gap-2">
                        <label>Truck</label>
                        <Select
                            className="w-64"
                            onChange={(value) => {
                                setSelectedTruckId(value);
                            }}
                            options={TruckListData?.body.map((item) => ({
                                value: item.id,
                                label: item.registration_number,
                            }))}
                            placeholder="Select Truck"
                            allowClear
                            filterOption={(inputValue, option) =>
                                option!.label!.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            showSearch
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
                </div>
                <AgGridTable
                    columns={columns}
                    data={data?.body.map((item: TyresMaster, index: number) => ({ ...item, key: index })) ?? []}
                    isLoading={isLoading}
                    defaultColDef={{
                        flex: 0,
                        autoHeight: true,
                    }}
                />
            </div>

            <TyresDrawer
                open={open}
                setOpen={setOpen}
                isEdit={isEdit}
                formField={formField}
                handleCreateTyres={handleCreateTyres}
                handleUpdateTyres={handleUpdateTyres}
                CurrentTyres={CurrentTyres}
                setIsEdit={setIsEdit}
            />
        </div>
    );
};

export default TyresMasterListPage;