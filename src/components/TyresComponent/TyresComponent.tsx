
// import SearchComponent from "@/components/SearchComponent";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Drawer } from 'vaul';
import FormComponentV2, { CustomField } from '@/components/FormComponentV2';
import { z } from 'zod';
import { Expand, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TyresMaster } from '@/pages/Tyres/Tyres.d';
import { Table, message, DatePicker, Select, Input } from 'antd';
import type { TableProps } from 'antd';
import { routes } from "@/routes/routes";
import axios from "axios";
import { queryClient } from "@/hooks/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useGetTruckData, useGetTruckDemensionDetails } from "@/hooks/GetHooks";
import { getTyreLayout } from "@/lib/utils";
// import { TyrePressureProps } from "../TyprePressure/TyrePressure";


const TyresMasterListPage = () => {

    const [CurrentTyres, setCurrentTyres] = useState<TyresMaster | null>(null);

    // const [SelectedTyre, setSelectedTyre] = useState<TyrePressureProps | null>(null);
    const [SelectedTruckId, setSelectedTruckId] = useState<string>('');
    const [Position, setPosition] = useState<string[]>([]);
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    const [isEdit, setIsEdit] = useState(false);

    const {
        data: TruckListData
    } = useGetTruckData('1001');

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
        if (TruckDemensionDetails && TruckDemensionDetailLoading === false && TruckDemensionDetails.body.length > 0
        ) {
            // setSelectedTyre(TruckDemensionDetails.body[0]);
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
        // const searchTerm = data.toLowerCase();

        // dispatch(updateSearchColumn({
        //     name: searchTerm,
        // }))
    }, []);



    const columns: TableProps<TyresMaster>['columns'] = useMemo(() => [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (_, __, index) => <span>{index + 1}</span>,
            width: 50
        },
        {
            title: 'Serial Number',
            dataIndex: 'Tyre_Serial_Number',
            key: 'Tyre_Serial_Number',
            render: (_, data: Partial<TyresMaster>) => <span
                className="text-[#00008B] font-semibold cursor-pointer text-base "
                onClick={() => {
                    setOpen(true);
                    setIsEdit(true);
                    setCurrentTyres(data as TyresMaster);
                }}
            >{data.Tyre_Serial_Number}</span>,
            sorter: (a, b) => a.Tyre_Serial_Number.localeCompare(b.Tyre_Serial_Number),
            width: 100,
        },
        {
            title: 'Wheeler Type',
            dataIndex: 'Wheeler_Type',
            key: 'Wheeler_Type',
            width: 50,
            render: (_, data: Partial<TyresMaster>) => <span
                className="text-base"
            >{data.Wheeler_Type}</span>
        },
        {
            title: 'Manufacturer',
            dataIndex: 'Manufacturer',
            key: 'Manufacturer',
            width: 100
        },
        {
            title: 'Brand',
            dataIndex: 'Brand',
            key: 'Brand',
            width: 100
        },
        {
            title: 'Fitment KM',
            dataIndex: 'Fitment_KM',
            key: 'Fitment_KM',
            width: 100
        },
        {
            title: 'Removal KM',
            dataIndex: 'Removal_KM',
            key: 'Removal_KM',
            width: 100
        },
        {
            title: 'Total Covered KM',
            dataIndex: 'Total_Covered_KM',
            key: 'Total_Covered_KM',
            width: 100
        },
        {
            title: 'Retread Yes No',
            dataIndex: 'Retread_Yes_No',
            key: 'Retread_Yes_No',
            width: 100
        },
        {
            title: 'Reason for Removal Month',
            dataIndex: 'Reason_for_Removal_MONTH',
            key: 'Reason_for_Removal_MONTH',
            width: 100
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
            width: 100
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            width: 100
        },
        {
            title: 'Registration Number',
            dataIndex: 'registration_number',
            key: 'registration_number',
            width: 100
        }

    ], [
        // StoreData.searchColumn.name
    ])


    const handleCreateTyres = async (data: TyresMaster) => {
        try {
            const response = await axios.post(routes.backend.tyre.createTyre, {
                ...data,
                Vehicle_Registration_Number: SelectedTruckId
            });
            console.log(response);
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
            console.log(response);
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
                <Table<TyresMaster>
                    columns={columns}
                    dataSource={data?.body.map((item: TyresMaster, index: number) => ({ ...item, key: index })) ?? []

                    }
                    loading={isLoading}
                    pagination={{
                        position: ['bottomRight'],
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30', '40', '50'],
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        total: data?.itemCount,
                    }}
                    size="middle"
                    scroll={{ x: 'auto', y: '60vh' }}
                    className="m-4 p-2 border border-gray-200 rounded-md"
                />
            </div>

            <Drawer.Root direction="right" open={open} onOpenChange={setOpen}
                dismissible={false}
            >
                {/* <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
                    Open Drawer
                </Drawer.Trigger> */}
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content
                        className="right-2 top-2 bottom-2 fixed z-10 outline-none 
                         flex lg:w-96 md:w-80 w-72"
                        // The gap between the edge of the screen and the drawer is 8px in this case.
                        style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                    >
                        <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col justify-between items-center rounded-[16px] overflow-y-auto">
                            <div className="w-full">
                                {/* 
                                    exit button
                                */}
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
                                    {/* The drawer can be opened from any direction. It can be opened from the top, right, bottom, or left. */}
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
        </div >

    );
};

export default TyresMasterListPage;