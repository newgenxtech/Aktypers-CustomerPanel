import '@/styles/WarehouseListPage.css';
import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { WareHouseData, WarehouseDataStoreInterface } from "@/Interfaces/interface";
import { Link, useNavigate } from "react-router-dom";
import sortIcon from "@/assets/icons8-sort-30.png";
import { addWarehouse, resetFilter, UpdateFilteredData, updatePagination, updateSort } from '@/services/warehouse/WarehouseSlice';
import FilterIcon from '@/assets/icons8-filter-96.png';
import { useCallback, useState } from 'react';
import { trimAndConvertToNumber } from '@/utils/utils';
import { Drawer } from 'vaul';
import FormComponentV2 from '@/components/FormComponentV2';
import { z } from 'zod';
import { Expand, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';


const WarehouseListPage = () => {
    const StoreData = useSelector((state: { warehouse: WarehouseDataStoreInterface }) => state.warehouse);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = useCallback((data: string) => {
        console.log(data);
        const searchTerm = data.toLowerCase();

        const filteredData = StoreData.data.filter((row: WareHouseData) => {
            return Object.values(row).some((value) => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchTerm);
                } else if (typeof value === 'number') {
                    return value.toString().includes(searchTerm);
                }
                return false;
            });
        });

        console.log(filteredData);
        if (filteredData.length === 0) {
            // alert('No Data Found');
        } else {
            dispatch(UpdateFilteredData(filteredData));
        }
    }, [StoreData.data, dispatch]);

    return (
        <div className='warehouse'>
            <div className="container">
                <div className='
                    flex
                    items-center
                    gap-8
                    w-full
                '>
                    <label className="font-bold text-xl">Warehouse</label>
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
                    Add Warehouse
                </Button>

            </div>
            <div>

                <div className="filter-section">
                    <div className="filter-header">
                        <div className='filter-icon-container'>
                            <img src={FilterIcon} alt="filter" className='filterIcon' />
                            <span className="filter-title">Filters</span>
                        </div>
                        {
                            StoreData.filterData.length > 0 && StoreData.sortColumn &&
                            (

                                <button
                                    onClick={() => {
                                        dispatch(UpdateFilteredData([]));
                                        dispatch(resetFilter());
                                    }}
                                    className="clear-filter-button"
                                >
                                    Clear Filter
                                </button>
                            )
                        }
                    </div>

                    {
                        StoreData.filterData.length > 0 && (

                            StoreData.sortColumn && (
                                <div className="sort-info">
                                    <span>Sort By: <strong>{StoreData.sortColumn}</strong></span>
                                    <span>Sort Direction: <strong>{StoreData.sortDirection}</strong></span>
                                </div>
                            )

                        )
                    }
                </div>

            </div>

            <TableComponent
                columns={[
                    {
                        // label: 'Name',
                        label: (
                            <div className="sortable-icon-container">
                                <span>Name</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'name',
                        render: (data: Partial<WareHouseData>) => (
                            <Link to={`/warehouse/${data.code}`} className="link" >
                                {data.name}
                            </Link>
                            // <button
                            //     onClick={() => {
                            //         if (data.code) {
                            //             setSearchParams({
                            //                 code: data.code
                            //             });
                            //             setOpen(true);
                            //         }
                            //     }}
                            //     className="link"
                            // >
                            //     {data.name}
                            // </button>
                        ),
                        sortable: true,
                        onSort: (columnKey: string) => {
                            dispatch(updateSort({
                                sortColumn: columnKey,
                                sortDirection: StoreData.sortDirection === 'asc' ? 'desc' : 'asc'
                            }));
                            // Warehouse-2205

                            const sortedData = [...StoreData.data].sort((a, b) => {
                                const numA = trimAndConvertToNumber(a.name, 'Warehouse-', '');
                                const numB = trimAndConvertToNumber(b.name, 'Warehouse-', '');

                                if (StoreData.sortDirection === 'asc') {
                                    return numA - numB;
                                } else {
                                    return numB - numA;
                                }
                            });
                            dispatch(UpdateFilteredData(sortedData));
                        }
                    },
                    {
                        label: (
                            <div className="sortable-icon-container">
                                <span>Code</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'code',
                        sortable: true,
                        render: (data: Partial<WareHouseData>) => <span>{data.code}</span>,
                        onSort: (columnKey: string) => {
                            dispatch(updateSort({
                                sortColumn: columnKey,
                                sortDirection: StoreData.sortDirection === 'asc' ? 'desc' : 'asc'
                            }));
                            // W-1, W-2, W-3

                            // Sorting logic
                            const sortedData = [...StoreData.data].sort((a, b) => {
                                const numA = trimAndConvertToNumber(a.code, 'W-', '');
                                const numB = trimAndConvertToNumber(b.code, 'W-', '');

                                if (StoreData.sortDirection === 'asc') {
                                    return numA - numB;
                                } else {
                                    return numB - numA;
                                }
                            });
                            dispatch(UpdateFilteredData(sortedData));
                        }
                    },
                    {
                        label: 'Type',
                        key: 'type',
                        render: (data: Partial<WareHouseData>) => {
                            return <span>{data.type}</span>;
                        }
                    },
                    {
                        label: 'City',
                        key: 'city',
                        render: (data: Partial<WareHouseData>) => {
                            return <span>{data.city}</span>;
                        }
                    },
                    {
                        // label: 'Available Space',
                        label: (
                            <div className="sortable-icon-container">
                                <span>Space Available</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={'sortable-icon'}
                                />
                            </div>
                        ),
                        key: 'space_available',
                        render: (data: Partial<WareHouseData>) => {
                            return <span>{data.space_available}</span>;
                        },
                        sortable: true,
                        onSort: (columnKey: string) => {
                            dispatch(updateSort({
                                sortColumn: columnKey,
                                sortDirection: StoreData.sortDirection === 'asc' ? 'desc' : 'asc'
                            }));
                            const sortedData = [...StoreData.data].sort((a, b) => {
                                if (StoreData.sortDirection === 'asc') {
                                    return a.space_available - b.space_available;
                                } else {
                                    return b.space_available - a.space_available;
                                }
                            });
                            dispatch(UpdateFilteredData(sortedData));
                        }
                    },
                    {
                        label: 'Cluster',
                        key: 'cluster',
                        render: (data: Partial<WareHouseData>) => {
                            return <span>{data.cluster}</span>;
                        }
                    },
                    {
                        label: 'Status',
                        key: 'is_live',
                        render: (data: Partial<WareHouseData>) => {
                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '5px',
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        width: '100%',
                                        height: '100%',
                                        minWidth: '80px',
                                        backgroundColor: data.is_live ? '#61BC68' : '#EA5756',
                                    }}>
                                    <span style={{
                                        color: 'white',
                                        fontWeight: 500,
                                        // backgroundColor: data.is_live ? 'lightgreen' : 'lightcoral',
                                    }}>{data.is_live ? 'Live' : 'Not Live'}</span>
                                </div>
                            )
                        }
                    }
                ]}
                data={
                    StoreData.filterData.length > 0 ? StoreData.filterData : StoreData.data
                }
                pagination={
                    {
                        currentPage: StoreData.currentPage,
                        rowsPerPage: StoreData.rowsPerPage,
                    }
                }
                setPagination={
                    (data: { currentPage: number, rowsPerPage: number }) => {
                        dispatch(updatePagination(data));
                    }
                }
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
                        <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col justify-between items-center rounded-[16px]">
                            <div className="w-full">
                                {/* 
                                    exit button
                                */}
                                <Expand className='absolute top-2 left-2 w-5 cursor-pointer' onClick={() => {

                                    navigate({
                                        pathname: `/warehouse/1`
                                    });
                                }} />
                                <X className='absolute top-2 right-2 cursor-pointer' onClick={() => setOpen(false)} />

                                <Drawer.Title className="font-semibold text-xl mb-8 text-zinc-900 text-center">
                                    Add Warehouse
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
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Code',
                                                name: 'code',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Code'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().min(3).max(20)
                                                }
                                            },
                                            {
                                                label: 'Type',
                                                name: 'type',
                                                type: 'select',
                                                isInputProps: {
                                                    placeholder: 'Select Type'
                                                },
                                                options: ['Warehouse', 'Office', 'Factory'],
                                                validation: {
                                                    required: true,
                                                    pattern: z.string()
                                                        .trim().min(1, {
                                                            message: 'This field is required'
                                                        })

                                                }
                                            },
                                            {
                                                label: 'City',
                                                name: 'city',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter City'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().trim().min(2, {
                                                        message: 'This field is required'
                                                    })
                                                }
                                            },
                                            {
                                                label: 'Space Available',
                                                name: 'space_available',
                                                type: 'number',
                                                isInputProps: {
                                                    placeholder: 'Enter Space Available'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().trim().min(1, {
                                                        message: 'This field is required'
                                                    })
                                                }
                                            },
                                            {
                                                label: 'Cluster',
                                                name: 'cluster',
                                                type: 'text',
                                                isInputProps: {
                                                    placeholder: 'Enter Cluster'
                                                },
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().trim().min(2, {
                                                        message: 'This field is required'
                                                    })
                                                }
                                            },
                                            {
                                                label: 'Status',
                                                name: 'is_live',
                                                type: 'select',
                                                isInputProps: {
                                                    placeholder: 'Select Status'
                                                },
                                                options: ['Live', 'Not Live'],
                                                validation: {
                                                    required: true,
                                                    pattern: z.string().trim().min(1, {
                                                        message: 'This field is required'
                                                    })
                                                }
                                            },
                                        ]}
                                        onSubmit={(data) => {
                                            dispatch(addWarehouse({
                                                ...data,
                                                is_live: data.is_live === 'Live' ? true : false,
                                                is_registered: true,
                                                id: StoreData.data.length + 1,
                                            }))
                                            alert('Warehouse Added Successfully 🎉');
                                            setOpen(false);
                                        }}
                                        // buttonComponent={
                                        //     <></>
                                        // }

                                        // AdditionalButton={
                                        //     // <Button onClick={() => setOpen(false)} className='bg-[#629eec] text-white px-4 py-2 rounded-md
                                        //     // hover:bg-[#629eec] hover:text-white w-2/6
                                        //     // '>
                                        //     //     Copy
                                        //     // </Button>
                                        //     <>
                                        //     </>
                                        // }

                                        CutomRender={
                                            (fields, renderField, { formState }) => {
                                                return (
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {
                                                            (
                                                                <>
                                                                    <div className="col-span-2">
                                                                        <label htmlFor={fields[0].name} className="text-sm" >{fields[0].label}
                                                                            {fields[0]?.validation?.required && <span className="text-red-500">*</span>}
                                                                        </label>
                                                                        {renderField(fields[0])}
                                                                        {formState?.errors[fields[0].name] && (
                                                                            <p className=' text-red-500 text-xs mt-1'>{
                                                                                formState?.errors[fields[0].name]?.message?.toString() ?? 'This field is required'
                                                                            }</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="col-span-1">
                                                                        <label htmlFor={fields[1].name} className="text-sm" >{fields[1].label}
                                                                            {fields[1]?.validation?.required && <span className="text-red-500">*</span>}
                                                                        </label>
                                                                        {renderField(fields[1])}
                                                                        {formState?.errors[fields[1].name] && (
                                                                            <p className=' text-red-500 text-xs mt-1'>{
                                                                                formState?.errors[fields[1].name]?.message?.toString() ?? 'This field is required'
                                                                            }</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="col-span-1">
                                                                        <label htmlFor={fields[2].name} className="text-sm" >{fields[2].label}
                                                                            {fields[2]?.validation?.required && <span className="text-red-500">*</span>}
                                                                        </label>
                                                                        {renderField(fields[2])}
                                                                        {formState?.errors[fields[2].name] && (
                                                                            <p className=' text-red-500 text-xs mt-1'>{
                                                                                formState?.errors[fields[2].name]?.message?.toString() ?? 'This field is required'
                                                                            }</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="col-span-1">
                                                                        <label htmlFor={fields[3].name} className="text-sm" >{fields[3].label}
                                                                            {fields[3]?.validation?.required && <span className="text-red-500">*</span>}
                                                                        </label>
                                                                        {renderField(fields[3])}
                                                                        {formState?.errors[fields[3].name] && (
                                                                            <p className=' text-red-500 text-xs mt-1'>{
                                                                                formState?.errors[fields[3].name]?.message?.toString() ?? 'This field is required'
                                                                            }</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="col-span-1">
                                                                    </div>
                                                                    <div className="col-span-3">
                                                                        <label htmlFor={fields[4].name} className="text-sm" >{fields[4].label}
                                                                            {fields[4]?.validation?.required && <span className="text-red-500">*</span>}
                                                                        </label>
                                                                        {renderField(fields[4])}
                                                                        {formState?.errors[fields[4].name] && (
                                                                            <p className=' text-red-500 text-xs mt-1'>{
                                                                                formState?.errors[fields[4].name]?.message?.toString() ?? 'This field is required'
                                                                            }</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="col-span-3">
                                                                        <label htmlFor={fields[5].name} className="text-sm" >{fields[5].label}
                                                                            {fields[5]?.validation?.required && <span className="text-red-500">*</span>}
                                                                        </label>
                                                                        {renderField(fields[5])}
                                                                        {formState?.errors[fields[5].name] && (
                                                                            <p className=' text-red-500 text-xs mt-1'>{
                                                                                formState?.errors[fields[5].name]?.message?.toString() ?? 'This field is required'
                                                                            }</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="col-span-3">
                                                                        <label htmlFor={fields[6].name} className="text-sm" >{fields[6].label}
                                                                            {fields[6]?.validation?.required && <span className="text-red-500">*</span>}
                                                                        </label>
                                                                        {renderField(fields[6])}
                                                                        {formState?.errors[fields[6].name] && (
                                                                            <p className=' text-red-500 text-xs mt-1'>{
                                                                                formState?.errors[fields[6].name]?.message?.toString() ?? 'This field is required'
                                                                            }</p>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )

                                                        }
                                                    </div>
                                                );
                                            }
                                        }
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
            {/* <FormComponentV2
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
                            pattern: z.string().min(3).max(20)
                        }
                    },
                    {
                        label: 'Code',
                        name: 'code',
                        type: 'text',
                        isInputProps: {
                            placeholder: 'Enter Code'
                        },
                        validation: {
                            required: true,
                            pattern: z.string().min(3).max(20)
                        }
                    },
                    {
                        label: 'Type',
                        name: 'type',
                        type: 'select',
                        isInputProps: {
                            placeholder: 'Select Type'
                        },
                        options: ['Warehouse', 'Office', 'Factory'],
                        validation: {
                            required: true,
                            pattern: z.string()
                        }
                    },
                    {
                        label: 'City',
                        name: 'city',
                        type: 'text',
                        isInputProps: {
                            placeholder: 'Enter City'
                        },
                        validation: {
                            required: true
                        }
                    },
                    {
                        label: 'Space Available',
                        name: 'space_available',
                        type: 'number',
                        isInputProps: {
                            placeholder: 'Enter Space Available'
                        },
                        validation: {
                            required: true
                        }
                    },
                    {
                        label: 'Cluster',
                        name: 'cluster',
                        type: 'text',
                        isInputProps: {
                            placeholder: 'Enter Cluster'
                        },
                        validation: {
                            required: true
                        }
                    },
                    {
                        label: 'Status',
                        name: 'is_live',
                        type: 'select',
                        isInputProps: {
                            placeholder: 'Select Status'
                        },
                        options: ['Live', 'Not Live'],
                        validation: {
                            required: true
                        }
                    },
                ]}
                onSubmit={(data) => {
                    console.log(data);
                }}
                AdditionalButton={
                    <Button onClick={() => setOpen(false)} className='bg-[#629eec] text-white px-4 py-2 rounded-md
                                            hover:bg-[#629eec] hover:text-white w-2/6
                                            '>
                        Copy
                    </Button>
                }
                layoutConfig={layoutConfig}
            /> */}

        </div >

    );
};

export default WarehouseListPage;