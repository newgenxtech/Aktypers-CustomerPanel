import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Drawer } from 'vaul';
import FormComponentV2, { CustomField } from '@/components/FormComponentV2';
import { z } from 'zod';
import { Expand, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TyresMaster } from '@/pages/Tyres/Tyres.d';
import { message, DatePicker, Select, Input } from 'antd';
import { routes } from "@/routes/routes";
import axios from "axios";
import { queryClient } from "@/hooks/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useGetTruckData, useGetTruckDemensionDetails } from "@/hooks/GetHooks";
import { getTyreLayout } from "@/lib/utils";
import AgGridTable from '../AgGridTable';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { CustomCellRendererProps } from 'ag-grid-react';

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
        if (TruckDemensionDetails && TruckDemensionDetailLoading === false &&
            TruckDemensionDetails.body && TruckDemensionDetails.body.length > 0) {
            const res = TruckDemensionDetails.body[0];
            setPosition(getTyreLayout(
                Number(res?.total_tyres),
                Number(res?.total_axles),
                res?.axtyre,
                true
            ).map((item) => item.value).filter((value): value is string => value !== undefined));
        }
    }, [TruckDemensionDetailLoading, TruckDemensionDetails]);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = useCallback((data: string) => {
        console.log(data);
    }, []);

    const columns: (ColDef | ColGroupDef)[] = useMemo(() => [
        {
            headerName: 'S.No',
            field: 'key',
            sortable: true,
            filter: true,
            cellRenderer: 'params.node.rowIndex + 1'
        },
        {
            headerName: 'Serial Number',
            field: 'Tyre_Serial_Number',
            sortable: true,
            filter: true,
            cellRenderer: (params: CustomCellRendererProps) => (
                <span
                    className="text-[#00008B] font-semibold cursor-pointer text-base"
                    onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCurrentTyres(params.data);
                    }}
                >
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Wheeler Type',
            field: 'Wheeler_Type',
            sortable: true,
            filter: true,
            cellRenderer: (params: CustomCellRendererProps) => <span className="text-base">{params.value}</span>
        },
        {
            headerName: 'Manufacturer',
            field: 'Manufacturer',
            sortable: true,
            filter: true,

        },
        {
            headerName: 'Brand',
            field: 'Brand',
            sortable: true,
            filter: true,

        },
        {
            headerName: 'Fitment KM',
            field: 'Fitment_KM',
            sortable: true,
            filter: true,

        },
        {
            headerName: 'Removal KM',
            field: 'Removal_KM',
            sortable: true,
            filter: true,

        },
        {
            headerName: 'Total Covered KM',
            field: 'Total_Covered_KM',
            sortable: true,
            filter: true,

        },
        {
            headerName: 'New Tyre',
            field: 'Retread_Yes_No',
            sortable: true,
            filter: true,

        },
        {
            headerName: 'Reason for Removal Month',
            field: 'Reason_for_Removal_MONTH',
            sortable: true,
            filter: true,

        },
        {
            headerName: 'Date',
            field: 'Date',
            sortable: true,
            filter: true,

        },
        {
            headerName: 'Position',
            field: 'position',
            sortable: true,
            filter: true,

        },
        {
            headerName: 'Registration Number',
            field: 'registration_number',
            sortable: true,
            filter: true,

        }
    ], [setOpen, setIsEdit, setCurrentTyres]);

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

    const formField: CustomField[] = useMemo(() => [
        {
            label: 'Wheeler Type',
            name: 'Wheeler_Type',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Wheeler Type'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Manufacturer',
            name: 'Manufacturer',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Manufacturer'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Brand',
            name: 'Brand',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Brand'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Tyre Serial Number',
            name: 'Tyre_Serial_Number',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Tyre Serial Number'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Fitment KM',
            name: 'Fitment_KM',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Fitment KM'
            },
            validation: {
                required: true,
                pattern: z.string().min(1).max(10)
            }
        },
        {
            label: 'Removal KM',
            name: 'Removal_KM',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Removal KM'
            },
            validation: {
                required: true,
                pattern: z.string().min(1).max(10)
            }
        },
        {
            label: 'Total Covered KM',
            name: 'Total_Covered_KM',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Total Covered KM'
            },
            validation: {
                required: true,
                pattern: z.string().min(1).max(10)
            }
        },
        {
            label: 'Retread Yes No',
            name: 'Retread_Yes_No',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Retread Yes No'
            },
            validation: {
                required: true,
                pattern: z.string().min(2).max(3)
            }
        },
        {
            label: 'Reason for Removal Month',
            name: 'Reason_for_Removal_MONTH',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Reason for Removal Month'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Date',
            name: 'Date',
            type: 'date',
            isInputProps: {
                placeholder: 'Enter Date',
                defaultValue: isEdit ? CurrentTyres?.Date : ''
            },
            validation: {
                required: true,
                pattern: z.string().refine((val) => {
                    const date = new Date(val);
                    return date <= new Date();
                }, {
                    message: "Date must be today or earlier"
                })
            }
        },
        {
            label: 'Position',
            name: 'position',
            type: 'select',
            isInputProps: {
                placeholder: 'Enter Position'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            },
            options: Position ?? []
        },
        {
            label: 'Registration Number',
            name: 'registration_number',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Registration Number'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        }
    ], [isEdit, CurrentTyres, Position]);

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
                />
            </div>

            <Drawer.Root direction="right" open={open} onOpenChange={setOpen} dismissible={false}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content
                        className="right-2 top-2 bottom-2 fixed z-10 outline-none flex lg:w-96 md:w-80 w-72"
                        style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                    >
                        <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col justify-between items-center rounded-[16px] overflow-y-auto">
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <Expand className=' w-5 cursor-pointer' onClick={() => {
                                        navigate({
                                            pathname: `/tyres/1`
                                        });
                                    }} />
                                    <X className=' cursor-pointer' onClick={() => {
                                        setOpen(false)
                                        setIsEdit(false);
                                    }} />
                                </div>
                                <Drawer.Title className="font-semibold text-xl mb-8 text-zinc-900 text-center">
                                    {isEdit ? 'Edit' : 'Add'} Tyres Details
                                </Drawer.Title>
                                <Drawer.Description className="text-zinc-600 mb-2">
                                    <FormComponentV2
                                        fields={formField}
                                        isUpdate={isEdit}
                                        onSubmit={(data) => {
                                            if (isEdit) {
                                                handleUpdateTyres(data as TyresMaster);
                                            } else {
                                                handleCreateTyres(data as TyresMaster);
                                            }
                                        }}
                                        initialValues={CurrentTyres}
                                    />
                                </Drawer.Description>
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
};

export default TyresMasterListPage;