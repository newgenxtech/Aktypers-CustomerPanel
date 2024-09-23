import '@/styles/WarehouseListPage.css';
import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { WareHouseData, WarehouseDataStoreInterface } from "@/Interfaces/interface";
import { Link } from "react-router-dom";
import sortIcon from "@/assets/icons8-sort-30.png";

import { resetFilter, UpdateFilteredData, updatePagination, updateSort } from '@/services/warehouse/WarehouseSlice';
import FilterIcon from '@/assets/icons8-filter-96.png';


const WarehouseListPage = () => {
    const StoreData = useSelector((state: { warehouse: WarehouseDataStoreInterface }) => state.warehouse);
    const dispatch = useDispatch();

    const handleSearch = (data: string) => {
        console.log(data);
        const searchTerm = data.toLowerCase();
        if (data) {
            const filteredData = StoreData.data.filter((row: WareHouseData) =>
                Object.values(row).some((value) => {
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(searchTerm);
                    } else if (typeof value === 'number') {
                        return value.toString().includes(searchTerm);
                    }
                    return false;
                })
            );
            dispatch(UpdateFilteredData(filteredData));
        }

    };
    return (
        <div>
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
                        <button
                            onClick={() => {
                                dispatch(UpdateFilteredData([]));
                                dispatch(resetFilter());
                            }}
                            className="clear-filter-button"
                        >
                            Clear Filter
                        </button>
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
                            <Link to={`/warehouse/${data.code}`} className="link" state={{ propsData: data }}>
                                {data.name}
                            </Link>
                        ),
                        sortable: true,
                        onSort: (columnKey: string) => {
                            dispatch(updateSort(columnKey));
                            // Warehouse-2205
                            const trimAndConvertToNumber = (name: string) => {
                                return parseInt(name.replace('Warehouse-', ''), 10);
                            };

                            const sortedData = [...StoreData.data].sort((a, b) => {
                                const numA = trimAndConvertToNumber(a.name);
                                const numB = trimAndConvertToNumber(b.name);

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
                            dispatch(updateSort(columnKey));
                            // W-1, W-2, W-3
                            // Helper function to trim the 'W-' prefix and convert to number
                            const trimAndConvertToNumber = (code: string) => {
                                return parseInt(code.replace('W-', ''), 10);
                            };

                            // Sorting logic
                            const sortedData = [...StoreData.data].sort((a, b) => {
                                const numA = trimAndConvertToNumber(a.code);
                                const numB = trimAndConvertToNumber(b.code);

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
                            dispatch(updateSort(columnKey));
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
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '5px',
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
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
        </div>
    );
};

export default WarehouseListPage;