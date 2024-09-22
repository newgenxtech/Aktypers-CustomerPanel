import SearchComponent from "../components/SearchComponent"
import TableComponent from "../components/TableComponent"
import { useSelector } from "react-redux"
import { WareHouseData } from "../Interfaces/interface"
import { Link } from "react-router-dom"


const HomePage = () => {
    const data = useSelector((state: { warehouse: WareHouseData[] }) => state.warehouse)

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                gap: '6rem',
            }}>
                <h1 style={{

                }}>WareHouse</h1>
                <SearchComponent
                    style={{
                        width: '200%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        color: 'black',
                    }}
                    placeholder="Search..."
                    onHandleChange={(e) => {
                        console.log(e)
                    }}
                />
            </div>
            <TableComponent
                columns={['Code', 'Name', 'Type', 'City', 'Available Space']}
                dataCols={
                    [
                        {
                            label: 'Code',
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
                            }
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