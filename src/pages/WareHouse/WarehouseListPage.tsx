import '@/styles/WarehouseListPage.css';
import SearchComponent from "@/components/SearchComponent";
import TableComponent from "@/components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { WareHouseData } from "@/Interfaces/interface";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { searchTable, setData, TableState } from "@/services/TableSlice";
import sortIcon from "@/assets/icons8-sort-30.png";

const WarehouseListPage = () => {
    const data = useSelector((state: { warehouse: { data: WareHouseData[] } }) => state.warehouse.data);
    const SortedColumnName = useSelector((state: { table: TableState<WareHouseData> }) => state.table.sortColumn);
    console.log(data);

    const dispatch = useDispatch();

    const handleSearch = (data: string) => {
        console.log(data);
        dispatch(searchTable(data));
    };

    useEffect(() => {
        dispatch(setData(data));
    }, [data, dispatch]);

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
                        render: (data: Partial<WareHouseData>) => {
                            return <Link to={`/warehouse/${data.code}`} className="link" state={{
                                propsData: data
                            }}>{data.name}</Link>;
                        }
                    },
                    {
                        label: (
                            <div className="sortable-icon-container">
                                <span>Code</span>
                                <img
                                    src={sortIcon}
                                    alt="sort"
                                    className={SortedColumnName === 'code' ? 'sortable-icon' : 'sortable-icon-rotated'}
                                />
                            </div>
                        ),
                        key: 'code',
                        render: (data: Partial<WareHouseData>) => {
                            return <span>{data.code}</span>;
                        },
                        sortable: true
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
                data={data}
            />
        </div>
    );
};

export default WarehouseListPage;