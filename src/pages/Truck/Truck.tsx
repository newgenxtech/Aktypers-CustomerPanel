// import '@/styles/DriverListPage.css';
import SearchComponent from "@/components/SearchComponent";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from 'react';
// import { trimAndConvertToNumber } from '@/utils/utils';
import { Drawer } from 'vaul';
import FormComponentV2 from '@/components/FormComponentV2';
import { z } from 'zod';
import { Expand, FileImage, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal, Space, Table, Image, Tooltip, message } from 'antd';
import type { TableProps } from 'antd';
import { useGetTruckData } from "@/hooks/GetHooks";
import { routes } from "@/routes/routes";
import axios from "axios";
import { queryClient } from "@/hooks/queryClient";

import { ITruckData } from "./Truck.d";


const TruckListPage = () => {



    const [CurrentTruck, setCurrentTruck] = useState<ITruckData | null>(null);

    const [isEdit, setIsEdit] = useState(false);

    const { data, isLoading } = useGetTruckData('1001');


    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = useCallback((data: string) => {
        console.log(data);
        // const searchTerm = data.toLowerCase();

        // dispatch(updateSearchColumn({
        //     name: searchTerm,
        // }))
    }, []);


    // console.log(StoreData.searchColumn.name ? [StoreData.searchColumn.name] : undefined);

    const columns: TableProps<ITruckData>['columns'] = useMemo(() => [
        // {
        //     title: 'Customer ID',
        //     dataIndex: 'customerid',
        //     key: 'customerid',
        //     width: 100,
        //     render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.customerid}</span>
        // },
        {
            title: 'S.N',
            dataIndex: 'id',
            key: 'id',
            render: (_, __, index) => <span>{index + 1}</span>,
            width: 80,
        },
        {
            title: 'Registration Number',
            dataIndex: 'registration_number',
            key: 'registration_number',
            width: 150,
            render: (_, data: Partial<ITruckData>) =>
                <span
                    className="text-[#00008B] font-semibold cursor-pointer text-base "
                    onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCurrentTruck(data as ITruckData);
                    }}
                >{data.registration_number}</span>,
        },
        {
            title: 'Chassis Number',
            dataIndex: 'chassis_number',
            key: 'chassis_number',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.chassis_number}</span>
        },
        {
            title: 'Engine Number',
            dataIndex: 'engine_number',
            key: 'engine_number',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.engine_number}</span>
        },
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.make}</span>
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.model}</span>
        },
        {
            title: 'Year of Manufacture',
            dataIndex: 'year_of_manufacture',
            key: 'year_of_manufacture',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.year_of_manufacture}</span>
        },
        {
            title: 'Wheels',
            dataIndex: 'wheels',
            key: 'wheels',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.wheels}</span>
        },
        {
            title: 'Tyre Type',
            dataIndex: 'tyre_type',
            key: 'tyre_type',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.tyre_type}</span>
        },
        {
            title: 'Load Capacity',
            dataIndex: 'load_capacity',
            key: 'load_capacity',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.load_capacity}</span>
        },
        {
            title: 'Fuel Type',
            dataIndex: 'fuel_type',
            key: 'fuel_type',
            width: 100,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.fuel_type}</span>
        },
        {
            title: 'Insurance Number',
            dataIndex: 'insurance_number',
            key: 'insurance_number',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.insurance_number}</span>
        },
        {
            title: 'Insurance Expiry Date',
            dataIndex: 'insurance_expiry_date',
            key: 'insurance_expiry_date',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.insurance_expiry_date}</span>
        },
        {
            title: 'Last Service Date',
            dataIndex: 'last_service_date',
            key: 'last_service_date',
            width: 150,
            render: (_, data: Partial<ITruckData>) => <span className="text-base">{data.last_service_date}</span>
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            width: 200,
            render: (_, data: Partial<ITruckData>) => (
                <Tooltip title={data?.remarks} key={data?.remarks}>
                    <span>{(data?.remarks?.trim().length ?? 0) > 20 ? `${data?.remarks?.slice(0, 20)}...` : data?.remarks ?? ''}</span>
                </Tooltip>
            ),
        },
        {
            title: "Documents",
            dataIndex: 'documents',
            key: 'documents',
            width: 80,
            render: (_, data: Partial<ITruckData>) => (
                <div className="flex justify-center items-center">
                    <FileImage
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            Modal.info({
                                title: "Documents",
                                width: 500,
                                content: <>
                                    <Space className="my-2">
                                        <Image
                                            width={
                                                data?.rc_book ? 30 : 100
                                            }
                                            src={`${routes.backend.file.upload}/${data.rc_book}`}
                                            alt={data?.rc_book ? 'RC Book' : 'RC Book Not Uploaded'}
                                        />
                                        <Image
                                            width={
                                                data?.insurance ? 30 : 100
                                            }
                                            src={`${routes.backend.file.upload}/${data.insurance}`}
                                            alt={data?.insurance ? 'Insurance' : 'Insurance Not Uploaded'}
                                        />
                                        <Image
                                            width={
                                                data?.pic ? 30 : 100
                                            }
                                            src={`${routes.backend.file.upload}/${data.pic}`}
                                            alt={data?.pic ? 'Picture' : 'Picture Not Uploaded'}
                                        />
                                    </Space>
                                </>
                            });
                        }}
                    />
                </div>
            ),
        }
    ], []);


    const handleCreateTruck = async (data: ITruckData) => {
        try {
            const response = await axios.post(routes.backend.driver.create, data);
            console.log(response);
            const { data: responseData } = response;

            if (responseData?.status === 201) {
                alert(responseData?.data?.message);
                message.success(responseData?.data?.message);
            }
            await queryClient.invalidateQueries({
                queryKey: ['drivers'],
                exact: true
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to add driver');
        }
    };

    const handleUpdateTruck = async (data: ITruckData) => {
        try {
            const response = await axios.post(routes.backend.driver.update, {
                ...data,
                id: CurrentTruck?.id
            });
            console.log(response);
            const { data: responseData } = response;

            if (responseData?.status === 200) {
                alert(responseData?.data?.message);
                message.success(responseData?.data?.message);
            }
            await queryClient.invalidateQueries({
                queryKey: ['drivers'],
                exact: true
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to update driver');
        }
    }


    return (
        <div className='warehouse'>
            <div className="container">
                <div className='
                    flex
                    items-center
                    gap-8
                    w-full
                '>
                    <label className="font-bold text-xl">Truck Master</label>
                    <SearchComponent
                        className="search-component"
                        placeholder="Search WareHouse"
                        onHandleChange={handleSearch}
                        postfix={<i className="fa fa-search" />}
                    />
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className='flex justify-end bg-[#D64848] text-white px-4 py-2 rounded-md
                    hover:bg-[#D64848] hover:text-white
                    '
                >
                    <Plus className='mr-1' />
                    Add Truck
                </Button>

            </div>
            <Table<ITruckData>
                columns={columns}
                dataSource={data?.body.map((item, index) => ({ ...item, key: index })) ?? []}
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
            />

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
                                            pathname: `/warehouse/1`
                                        });
                                    }} />
                                    <X className=' cursor-pointer' onClick={() => {
                                        setOpen(false)
                                        setIsEdit(false);
                                    }} />
                                </div>
                                <Drawer.Title className="font-semibold text-xl mb-8 text-zinc-900 text-center">
                                    {isEdit ? 'Edit' : 'Add'} Truck Details
                                </Drawer.Title>

                                <Drawer.Description className="text-zinc-600 mb-2">
                                    {/* The drawer can be opened from any direction. It can be opened from the top, right, bottom, or left. */}
                                    <FormComponentV2
                                        fields={[
                                            {
                                                label: 'Customer ID',
                                                name: 'customerid',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Customer ID'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
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
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Chassis Number',
                                                name: 'chassis_number',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Chassis Number'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Engine Number',
                                                name: 'engine_number',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Engine Number'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Make',
                                                name: 'make',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Make'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Model',
                                                name: 'model',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Model'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Year of Manufacture',
                                                name: 'year_of_manufacture',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Year of Manufacture'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(4).max(4)
                                                }
                                            },
                                            {
                                                label: 'Wheels',
                                                name: 'wheels',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Wheels'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(1).max(2)
                                                }
                                            },
                                            {
                                                label: 'Tyre Type',
                                                name: 'tyre_type',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Tyre Type'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Load Capacity',
                                                name: 'load_capacity',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Load Capacity'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(1).max(20)
                                                }
                                            },
                                            {
                                                label: 'Fuel Type',
                                                name: 'fuel_type',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Fuel Type'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Insurance Number',
                                                name: 'insurance_number',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Insurance Number'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Insurance Expiry Date',
                                                name: 'insurance_expiry_date',
                                                type: 'date',
                                                isInputProps: {
                                                    placeholder: 'Enter Insurance Expiry Date',
                                                    defaultValue: isEdit ? CurrentTruck?.insurance_expiry_date : ''
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().refine((val) => {
                                                        const date = new Date(val);
                                                        return date >= new Date();
                                                    })
                                                }
                                            },
                                            {
                                                label: 'Last Service Date',
                                                name: 'last_service_date',
                                                type: 'date',
                                                isInputProps: {
                                                    placeholder: 'Enter Last Service Date',
                                                    defaultValue: isEdit ? CurrentTruck?.last_service_date : ''
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().refine((val) => {
                                                        const date = new Date(val);
                                                        return date >= new Date('1900-01-01') && date <= new Date();
                                                    }, {
                                                        message: "Date must be between 01-01-1900 and today"
                                                    })
                                                }
                                            },
                                            {
                                                label: 'Remarks',
                                                name: 'remarks',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Remarks'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(120)
                                                }
                                            },
                                            {
                                                label: 'RC Book',
                                                name: 'rc_book',
                                                type: 'upload',
                                                isInputProps: {
                                                    placeholder: 'Upload RC Book'
                                                },
                                                validation: {
                                                    required: false,
                                                    pattern: z.string().nullable()
                                                }
                                            },
                                            {
                                                label: 'Insurance',
                                                name: 'insurance',
                                                type: 'upload',
                                                isInputProps: {
                                                    placeholder: 'Upload Insurance'
                                                },
                                                validation: {
                                                    required: false,
                                                    pattern: z.string().nullable()
                                                }
                                            },
                                            {
                                                label: 'Picture',
                                                name: 'pic',
                                                type: 'upload',
                                                isInputProps: {
                                                    placeholder: 'Upload Picture'
                                                },
                                                validation: {
                                                    required: false,
                                                    pattern: z.string().nullable()
                                                }
                                            }
                                        ]}
                                        isUpdate={isEdit}
                                        onSubmit={(data) => {
                                            if (isEdit) {
                                                handleUpdateTruck(data as ITruckData);
                                            } else {
                                                handleCreateTruck(data as ITruckData);
                                            }
                                        }}
                                        initialValues={CurrentTruck}
                                    />
                                </Drawer.Description>
                            </div>
                            {/* <Drawer.Description >
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => {
                                            alert('Submit');
                                            setOpen(false);
                                            // handleSubmit()
                                        }}
                                        className="bg-primary text-white px-4 py-2 rounded-md"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="clear-filter-button"
                                    >
                                        Close
                                    </button>
                                </div>
                            </Drawer.Description> */}

                        </div>
                        {/* <Drawer.Root>
                            <Drawer.Trigger />
                            <Drawer.Portal>
                                <Drawer.Overlay />
                                <Drawer.Content>
                                    <Drawer.Handle />
                                    <Drawer.Title />
                                    <Drawer.Description />
                                    <Drawer.Close />
                                </Drawer.Content>
                            </Drawer.Portal>
                        </Drawer.Root> */}

                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div >

    );
};

export default TruckListPage;