// import '@/styles/AlloyListPage.css';
import SearchComponent from "@/components/SearchComponent";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from 'react';
// import { trimAndConvertToNumber } from '@/utils/utils';
import { Drawer } from 'vaul';
import FormComponentV2 from '@/components/FormComponentV2';
import { z } from 'zod';
import { Expand, FileImage, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlloyMasterStoreInterface, AlloyMaster } from './Alloy.Interface';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Space, Table, Image, Tooltip, message } from 'antd';
import type { TableProps } from 'antd';
import { useGetAlloyData } from "@/hooks/GetHooks";
import { routes } from "@/routes/routes";
// import { updateSearchColumn } from "@/services/Alloy/Alloy";
import axios from "axios";
import { queryClient } from "@/hooks/queryClient";


const AlloyListPage = () => {

    const [CurrentAlloy, setCurrentAlloy] = useState<AlloyMaster | null>(null);

    const [isEdit, setIsEdit] = useState(false);

    const { data, isLoading } = useGetAlloyData('1001');


    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = useCallback((data: string) => {
        console.log(data);
        const searchTerm = data.toLowerCase();

        // dispatch(updateSearchColumn({
        //     name: searchTerm,
        // }))
    }, []);


    // console.log(StoreData.searchColumn.name ? [StoreData.searchColumn.name] : undefined);

    const columns: TableProps<AlloyMaster>['columns'] = useMemo(() => [
        {
            title: 'Vehicle',
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (_, data: Partial<AlloyMaster>) => <span
                className="text-[#00008B] font-semibold cursor-pointer text-base "
                onClick={() => {
                    setOpen(true);
                    setIsEdit(true);
                    setCurrentAlloy(data as AlloyMaster);
                }}
            >{data.vehicle}</span>,
            sorter: (a, b) => a.vehicle.localeCompare(b.vehicle),
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
            // filteredValue: StoreData.searchColumn.name ? [StoreData.searchColumn.name] : undefined,

        },
        {
            title: 'Cus ID',
            dataIndex: 'customerid',
            key: 'customerid',
            width: 50,
            render: (_, data: Partial<AlloyMaster>) => <span
                className="text-base"
            >{data.customerid}</span>
        },
        {
            title: 'Before PDF',
            dataIndex: 'before',
            key: 'before',
            width: 100,
            render: (_, data: Partial<AlloyMaster>) => (
                <a
                    href={data?.before}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500"
                >
                    Before PDF
                </a>
            )
        },

        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 80,
            render: (_, data: Partial<AlloyMaster>) => <span
                className="text-base" >{data.date}</span>
        },
    ], [

    ])


    // const handleCreateAlloy = async (data: AlloyMaster) => {
    //     try {
    //         const response = await axios.post(routes.backend.alloy.create, data);
    //         console.log(response);
    //         const { data: responseData } = response;

    //         if (responseData?.status === 201) {
    //             alert(responseData?.data?.message);
    //             message.success(responseData?.data?.message);
    //         }
    //         await queryClient.invalidateQueries({
    //             queryKey: ['alloys'],
    //             exact: true
    //         });
    //         setOpen(false);
    //     } catch (error) {
    //         console.error(error);
    //         message.error('Failed to add alloy');
    //     }
    // };

    // const handleUpdateAlloy = async (data: AlloyMaster) => {
    //     try {
    //         const response = await axios.post(routes.backend.alloy.update, {
    //             ...data,
    //             id: CurrentAlloy?.id
    //         });
    //         console.log(response);
    //         const { data: responseData } = response;

    //         if (responseData?.status === 200) {
    //             alert(responseData?.data?.message);
    //             message.success(responseData?.data?.message);
    //         }
    //         await queryClient.invalidateQueries({
    //             queryKey: ['alloys'],
    //             exact: true
    //         });
    //         setOpen(false);
    //     } catch (error) {
    //         console.error(error);
    //         message.error('Failed to update alloy');
    //     }
    // }


    return (
        <div className='warehouse'>
            <div className="container">
                <div className='
                    flex
                    items-center
                    gap-8
                    w-full
                '>
                    <label className="font-bold text-xl">Alloy Master</label>
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
                    Add Alloy
                </Button>

            </div>
            <Table<AlloyMaster>
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

            {/* <Drawer.Root direction="right" open={open} onOpenChange={setOpen}
                dismissible={false}
            >
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content
                        className="right-2 top-2 bottom-2 fixed z-10 outline-none 
                         flex lg:w-96 md:w-80 w-72"
                        style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                    >
                        <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col justify-between items-center rounded-[16px] overflow-y-auto">
                            <div className="w-full">
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
                                    {isEdit ? 'Edit' : 'Add'} Alloy Details
                                </Drawer.Title>

                                <Drawer.Description className="text-zinc-600 mb-2">
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
                                                    defaultValue: isEdit ? CurrentAlloy?.license_expiry_date : ''
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
                                                    defaultValue: isEdit ? CurrentAlloy?.date_of_birth : ''
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
                                                    defaultValue: isEdit ? CurrentAlloy?.date_of_joining : ''
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
                                                handleUpdateAlloy(data as AlloyMaster);
                                            } else {
                                                handleCreateAlloy(data as AlloyMaster);
                                            }
                                        }}
                                        initialValues={CurrentAlloy}
                                    />
                                </Drawer.Description>
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root> */}
        </div >

    );
};

export default AlloyListPage;