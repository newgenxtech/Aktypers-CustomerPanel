import '@/styles/WarehouseListPage.css';
import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { WareHouseData, WarehouseDataStoreInterface } from "@/Interfaces/interface";
import { Link } from "react-router-dom";
import sortIcon from "@/assets/icons8-sort-30.png";
import { searchTable } from '@/services/TableSlice';
import { updatePagination } from '@/services/warehouse/WarehouseSlice';

const WarehouseListPage = () => {
    const data = useSelector((state: { warehouse: WarehouseDataStoreInterface }) => state.warehouse);
    const dispatch = useDispatch();

    const handleSearch = (data: string) => {
        console.log(data);
        dispatch(searchTable(data));

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
            <TableComponent
                columns={[
                    {
                        label: 'Name',
                        key: 'name',
                        render: (data: Partial<WareHouseData>) => (
                            <Link to={`/warehouse/${data.code}`} className="link" state={{ propsData: data }}>
                                {data.name}
                            </Link>
                        )
                    },
                    {
                        label: (
                            <div className="sortable-icon-container">
                                <span>Code</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                // className={sortBy === 'code' ? (sortDirection === 'asc' ? 'sortable-icon' : 'sortable-icon-rotated') : ''}
                                />
                            </div>
                        ),
                        key: 'code',
                        sortable: true,
                        render: (data: Partial<WareHouseData>) => <span>{data.code}</span>,
                        // onSort: (columnKey: string) => {

                        // }
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
                        label: 'Available Space',
                        key: 'space_available',
                        render: (data: Partial<WareHouseData>) => {
                            return <span>{data.space_available}</span>;
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
                data={data.data}
                pagination={
                    {
                        currentPage: data.currentPage,
                        rowsPerPage: data.rowsPerPage,
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