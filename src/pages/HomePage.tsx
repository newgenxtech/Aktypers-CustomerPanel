import SearchComponent from "../components/SearchComponent"
import TableComponent from "../components/TableComponent"
import { useDispatch, useSelector } from "react-redux"
import { WareHouseData } from "../Interfaces/interface"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { searchTable, setData, TableState } from "../services/TableSlice"
import sortIcon from "@/assets/icons8-sort-30.png"

const HomePage = () => {
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
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                gap: '6rem',
            }}>
                <label style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}>WareHouse</label>
                <SearchComponent
                    style={{
                        backgroundColor: '#EDEDF3',
                        width: '200%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: 'none',
                        color: '#C2C2C8',
                        fontFamily: 'Montserrat',
                        fontSize: '1rem',
                        fontWeight: 500,
                        // opacity: 0.7,
                        outline: 'none'
                    }}
                    placeholder="Search WareHouse"
                    onHandleChange={handleSearch}
                    postfix={<i className="fa fa-search" />}
                />
            </div>
            <TableComponent
                columns={
                    [
                        {
                            label: (
                                // 'Code'
                                // Sortable icon
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>

                                    <span >Code</span>
                                    {
                                        SortedColumnName === 'code' ?

                                            <img src={sortIcon} alt="sort"
                                                style={{ width: '16px', height: '16px' }}
                                            />
                                            :
                                            <img src={sortIcon} alt="sort"
                                                style={{
                                                    width: '16px', height: '16px',
                                                    transform: 'rotate(180deg)'
                                                }}
                                            />

                                    }
                                </div>
                            ),
                            key: 'code',
                            render: (data: Partial<WareHouseData>) => {
                                return (
                                    <Link
                                        to={`/warehouse/${data.code}`}
                                        style={{
                                            color: 'blue',
                                            textDecoration: 'underline'
                                        }}
                                    >{data.code}</Link>
                                )
                            },
                            sortable: true
                        },
                        {
                            label: 'Name',
                            key: 'name',
                            render: (data: Partial<WareHouseData>) => {
                                return <Link to={`/warehouse/${data.code}`} style={{
                                    color: 'blue',
                                    textDecoration: 'underline'
                                }}>{data.name}</Link>
                            }
                        },
                        {
                            label: 'Type',
                            key: 'type',
                            render: (data: Partial<WareHouseData>) => {
                                return <span>{data.type}</span>
                            }
                        },
                        {
                            label: 'City',
                            key: 'city',
                            render: (data: Partial<WareHouseData>) => {
                                return <span>{data.city}</span>
                            }
                        },
                        {
                            label: 'Available Space',
                            key: 'space_available',
                            render: (data: Partial<WareHouseData>) => {
                                return <span>{data.space_available}</span>
                            }
                        }
                    ]
                }
                data={data}
            />
        </div>
    )
}

export default HomePage