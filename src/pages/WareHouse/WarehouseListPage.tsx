import '@/styles/WarehouseListPage.css';
import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { WareHouseData, WarehouseDataStoreInterface } from "@/Interfaces/interface";
import { Link } from "react-router-dom";
import sortIcon from "@/assets/icons8-sort-30.png";
import { resetFilter, UpdateFilteredData, updatePagination, updateSort } from '@/services/warehouse/WarehouseSlice';
import FilterIcon from '@/assets/icons8-filter-96.png';
import { useCallback, useState } from 'react';
import { trimAndConvertToNumber } from '@/utils/utils';
import { Drawer } from 'vaul';


const WarehouseListPage = () => {
    const StoreData = useSelector((state: { warehouse: WarehouseDataStoreInterface }) => state.warehouse);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);


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
                <label className="label">Warehouse</label>
                <SearchComponent
                    className="search-component"
                    placeholder="Search WareHouse"
                    onHandleChange={handleSearch}
                    postfix={<i className="fa fa-search" />}
                />
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
                        className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
                        // The gap between the edge of the screen and the drawer is 8px in this case.
                        style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                    >
                        <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col justify-between items-center rounded-[16px]">
                            <div className="max-w-md mx-auto">
                                <Drawer.Title className="font-medium mb-2 text-zinc-900">It supports all directions.</Drawer.Title>
                                <Drawer.Description className="text-zinc-600 mb-2">
                                    The drawer can be opened from any direction. It can be opened from the top, right, bottom, or left.
                                </Drawer.Description>
                            </div>
                            <Drawer.Description >
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => {
                                            alert('Submit');
                                            setOpen(false);
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
                            </Drawer.Description>

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

export default WarehouseListPage;