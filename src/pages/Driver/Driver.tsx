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
import { DriverDataStoreInterface, DriverMaster } from './Driver';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Space, Table, Image, Tooltip, message } from 'antd';
import type { TableProps } from 'antd';
import { useGetDriverData } from "@/hooks/GetHooks";
import { routes } from "@/routes/routes";
import { updateSearchColumn } from "@/services/Driver/Driver";
import axios from "axios";
import { queryClient } from "@/hooks/queryClient";


const DriverListPage = () => {
    const StoreData = useSelector((state: { driver: DriverDataStoreInterface }) => state.driver);
    const dispatch = useDispatch();

    const [CurrentDriver, setCurrentDriver] = useState<DriverMaster | null>(null);

    const [isEdit, setIsEdit] = useState(false);

    const { data, isLoading } = useGetDriverData('1001');


    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = useCallback((data: string) => {
        console.log(data);
        const searchTerm = data.toLowerCase();

        dispatch(updateSearchColumn({
            name: searchTerm,
        }))
    }, [dispatch]);


    console.log(StoreData.searchColumn.name ? [StoreData.searchColumn.name] : undefined);

    const columns: TableProps<DriverMaster>['columns'] = useMemo(() => [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, data: Partial<DriverMaster>) => <span
                className="text-[#00008B] font-semibold cursor-pointer text-base "
                onClick={() => {
                    setOpen(true);
                    setIsEdit(true);
                    setCurrentDriver(data as DriverMaster);
                }}
            >{data.name}</span>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 100,
            // filterSearch: true,
            // onFilter: (value, record) => record.address.includes(value as string),
            // filtered: true,
            // filterIcon: () =>
            //     <Search
            //         className={`cursor-pointer text-black w-4`}
            //     />,
            // filterDropdown(props) {
            //     let debounceTimeout: NodeJS.Timeout;
            //     return (
            //         <div className="p-2">
            //             <input
            //                 className="w-full p-2 border border-gray-300 rounded-md"
            //                 placeholder="Search Name"
            //                 onChange={(e) => {
            //                     const value = e.target.value;
            //                     if (debounceTimeout) {
            //                         clearTimeout(debounceTimeout);
            //                     }
            //                     debounceTimeout = setTimeout(() => {
            //                         props.setSelectedKeys(value ? [value] : []);
            //                         props.confirm();
            //                     }, 300); // Adjust the debounce delay as needed
            //                 }}
            //             />
            //         </div>
            //     );
            // },
            filteredValue: StoreData.searchColumn.name ? [StoreData.searchColumn.name] : undefined,

        },
        {
            title: 'Cus ID',
            dataIndex: 'customerid',
            key: 'customerid',
            width: 50,
            render: (_, data: Partial<DriverMaster>) => <span
                className="text-base"
            >{data.customerid}</span>
        },
        {
            title: 'License Number',
            dataIndex: 'license_number',
            key: 'license_number',
            width: 100
        },
        {
            title: 'License Expiry Date',
            dataIndex: 'license_expiry_date',
            key: 'license_expiry_date',
            width: 100
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
            width: 100
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 100,
            render: (_, data: Partial<DriverMaster>) => (
                <Tooltip
                    title={data?.address}
                    key={data?.address}
                >
                    <span>{(data?.address?.trim().length ?? 0) > 20 ? `${data?.address?.slice(0, 20)}...` : data?.address ?? ''
                    }</span>
                </Tooltip>
            ),
        },
        {
            title: 'Date of Birth',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            width: 80
        },
        {
            title: 'Date of Joining',
            dataIndex: 'date_of_joining',
            key: 'date_of_joining',
            width: 80
        },
        {
            title: 'Emergency Contact',
            dataIndex: 'emergency_contact',
            key: 'emergency_contact',
            width: 150
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 50
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 100
        },
        {
            title: "Documents",
            dataIndex: 'documents',
            key: 'documents',
            width: 80,
            render: (_, data: Partial<DriverMaster>) => (
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
                                                data?.aadhaar_pic ? 30 : 100
                                            }
                                            src={`${routes.backend.file.upload}/${data.aadhaar_pic}`}
                                            alt={
                                                data?.aadhaar_pic ? 'Aadhar Card' : 'Adhar Card Not Uploaded'
                                            }
                                        />
                                        <Image
                                            width={
                                                data?.pancard_pic ? 30 : 100
                                            }
                                            src={`${routes.backend.file.upload}/${data.pancard_pic}`}
                                            alt={
                                                data?.pancard_pic ? 'Pancard' : 'Pancard Not Uploaded'
                                            }
                                        />
                                        <Image
                                            width={
                                                data?.license_pic ? 30 : 100
                                            }
                                            src={`${routes.backend.file.upload}/${data.license_pic}`}
                                            alt={
                                                data?.license_pic ? 'License' : 'License Not Uploaded'
                                            }
                                        />
                                    </Space>
                                </>
                            });
                        }}
                    />
                </div>
            ),
        }
    ], [
        StoreData.searchColumn.name
    ])


    const handleCreateDriver = async (data: DriverMaster) => {
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

    const handleUpdateDriver = async (data: DriverMaster) => {
        try {
            const response = await axios.post(routes.backend.driver.update, {
                ...data,
                id: CurrentDriver?.id
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
                    <label className="font-bold text-xl">Driver Master</label>
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
                    Add Driver
                </Button>

            </div>
            <Table<DriverMaster>
                columns={columns}
                dataSource={data?.body}
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
                                    {isEdit ? 'Edit' : 'Add'} Driver Details
                                </Drawer.Title>

                                <Drawer.Description className="text-zinc-600 mb-2">
                                    {/* The drawer can be opened from any direction. It can be opened from the top, right, bottom, or left. */}
                                    <FormComponentV2
                                        fields={[
                                            {
                                                label: 'Name',
                                                name: 'name',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Name'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(30)
                                                }
                                            },
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
                                                label: 'License Number',
                                                name: 'license_number',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter License Number'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'License Expiry Date',
                                                name: 'license_expiry_date',
                                                type: 'date',
                                                isInputProps: {
                                                    placeholder: 'Enter License Expiry Date',
                                                    defaultValue: isEdit ? CurrentDriver?.license_expiry_date : ''
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
                                                label: 'Phone Number',
                                                name: 'phone_number',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Phone Number'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Address',
                                                name: 'address',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Address'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(120)
                                                }
                                            },
                                            {
                                                label: 'Date of Birth',
                                                name: 'date_of_birth',
                                                type: 'date',
                                                isInputProps: {
                                                    placeholder: 'Enter Date of Birth',
                                                    defaultValue: isEdit ? CurrentDriver?.date_of_birth : ''
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z
                                                        .string().refine((val) => {
                                                            const date = new Date(val);
                                                            return date >= new Date('1900-01-01') && date <= new Date();
                                                        }, {
                                                            message: "Date must be between 01-01-1900 and today"
                                                        })
                                                }
                                            },
                                            {
                                                label: 'Date of Joining',
                                                name: 'date_of_joining',
                                                type: 'date',
                                                isInputProps: {
                                                    placeholder: 'Enter Date of Joining',
                                                    defaultValue: isEdit ? CurrentDriver?.date_of_joining : ''
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
                                                label: 'Emergency Contact',
                                                name: 'emergency_contact',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Emergency Contact'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Status',
                                                name: 'status',
                                                type: 'select',
                                                isInputProps: {
                                                    placeholder: 'Select Status'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                },
                                                options: ['Active', 'Inactive']
                                            },
                                            {
                                                label: 'Aadhaar Pic',
                                                name: 'aadhaar_pic',
                                                type: 'upload',
                                                isInputProps: {
                                                    placeholder: 'Enter Aadhaar Pic'
                                                },
                                                validation: {
                                                    required: false,
                                                    pattern: z.string().nullable()

                                                }
                                            },
                                            {
                                                label: 'Pancard Pic',
                                                name: 'pancard_pic',
                                                type: 'upload',
                                                isInputProps: {
                                                    placeholder: 'Enter Pancard Pic'
                                                },
                                                validation: {
                                                    required: false,
                                                    pattern: z.string().nullable()
                                                    // .instanceof(FileList)
                                                    // .refine((file) => file?.length == 1, 'File is required.')
                                                }
                                            },
                                            {
                                                label: 'License Pic',
                                                name: 'license_pic',
                                                type: 'upload',
                                                isInputProps: {
                                                    placeholder: 'Enter License Pic'
                                                },
                                                validation: {
                                                    required: false,
                                                    pattern: z.string().nullable()
                                                    //     .instanceof(FileList)
                                                    //     .refine((file) => file?.length == 1, 'File is required.')
                                                }
                                            },
                                            {
                                                label: 'Email',
                                                name: 'email',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Email'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(40)
                                                }
                                            }
                                        ]}
                                        isUpdate={isEdit}
                                        onSubmit={(data) => {
                                            if (isEdit) {
                                                handleUpdateDriver(data as DriverMaster);
                                            } else {
                                                handleCreateDriver(data as DriverMaster);
                                            }
                                        }}
                                        initialValues={CurrentDriver}

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

export default DriverListPage;